/** Backend'e taşınırken kullanılacak ortak domain sözleşmeleri. */
export type TaskStatus =
  | "planned"
  | "in_progress"
  | "done"
  | "partial"
  | "overdue"
  | "not_done"
  | "cancelled"
  | "rescheduled";

export type StudyMode = "pomodoro" | "stopwatch" | "planned";

export type Task = {
  id: string;
  title: string;
  subject: string;
  topicId?: string;
  startAt: string;
  endAt: string;
  durationMinutes: number;
  questionTarget?: number;
  questionCompleted?: number;
  status: TaskStatus;
  priority: number;
  recurrenceId?: string;
};

export type AvailabilityBlock = {
  id: string;
  startAt: string;
  endAt: string;
  kind: "study" | "sleep" | "school" | "course" | "break";
  locked: boolean;
};

export type RescheduleProposal = {
  taskOccurrenceId: string;
  candidates: Array<{
    startAt: string;
    endAt: string;
    score: number;
    rationale: string;
    conflicts: string[];
  }>;
};

export type StudySession = {
  id: string;
  taskId?: string;
  mode: StudyMode;
  startedAt: string;
  endedAt?: string;
  plannedMinutes?: number;
  actualMinutes?: number;
  questionsAttempted?: number;
  correct?: number;
  wrong?: number;
  blank?: number;
  topicIds: string[];
  notes?: string;
};

export type TopicProgress = {
  topicId: string;
  status: "not_started" | "learning" | "review" | "mastered";
  confidence: 1 | 2 | 3 | 4 | 5;
  questionTarget?: number;
  lastStudiedAt?: string;
  nextReviewAt?: string;
};
