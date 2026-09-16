import type { AvailabilityBlock, RescheduleProposal, Task } from "./domain";

type CandidateInput = {
  task: Task;
  slots: Array<{ startAt: string; endAt: string }>;
  examDate: string;
  availability: AvailabilityBlock[];
  now?: string;
};

const WEIGHTS = { urgency: 0.3, weakness: 0.25, overdue: 0.2, importance: 0.15, spacing: 0.1 };

/**
 * Safely ranks up to three candidate slots. The function is pure so it can be
 * used by a Supabase edge function, a server action, or an offline queue.
 */
export function recommendReschedules(input: CandidateInput): RescheduleProposal {
  const now = new Date(input.now ?? new Date().toISOString()).getTime();
  const exam = Math.max(1, new Date(input.examDate).getTime() - now);
  const urgency = Math.max(0, Math.min(1, 1 - exam / (365 * 24 * 60 * 60 * 1000)));
  const weakness = Math.max(0, Math.min(1, 1 - input.task.priority / 5));
  const overdue = ["overdue", "partial", "not_done"].includes(input.task.status) ? 1 : 0;
  const importance = Math.max(0, Math.min(1, input.task.priority / 5));

  const candidates = input.slots
    .filter((slot) => !hasLockedConflict(slot, input.availability))
    .map((slot) => {
      const slotTime = new Date(slot.startAt).getTime();
      const spacing = Math.max(0, Math.min(1, 1 - Math.abs(slotTime - now) / (7 * 24 * 60 * 60 * 1000)));
      const score = Math.round((urgency * WEIGHTS.urgency + weakness * WEIGHTS.weakness + overdue * WEIGHTS.overdue + importance * WEIGHTS.importance + spacing * WEIGHTS.spacing) * 100);
      return {
        ...slot,
        score,
        rationale: score >= 70 ? "Yakın tarih ve gecikme önceliği yüksek." : "Boşluk, konu ağırlığı ve çalışma ritmine uyuyor.",
        conflicts: [],
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return { taskOccurrenceId: input.task.id, candidates };
}

function hasLockedConflict(slot: { startAt: string; endAt: string }, blocks: AvailabilityBlock[]) {
  const start = new Date(slot.startAt).getTime();
  const end = new Date(slot.endAt).getTime();
  return blocks.some((block) => block.locked && new Date(block.startAt).getTime() < end && new Date(block.endAt).getTime() > start);
}
