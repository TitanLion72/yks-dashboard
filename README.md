# YKS Orbit

YKS hazırlığını planlamak, çalışmak ve gelişimini izlemek için hazırlanmış Next.js arayüz prototipi.

## Çalıştırma

```bash
npm install
npm run dev
```

Ardından [http://localhost:3000](http://localhost:3000) adresini aç.

## Şu an çalışanlar

- Dashboard: günlük odak, haftalık ilerleme, konu radarı ve içgörüler
- Planlayıcı: hafta/gün görünümü, drag-drop görev taşıma, görev modalı ve durum işaretleme
- Konular: TYT/AYT filtreleri, ilerleme kartları ve yeni konu ekleme
- Çalışma alanı: Pomodoro, kronometre ve planlı seans sayaçları
- Günlük: takvim, günlük/haftalık kayıtlar ve hızlı not modalı
- Kaynaklar: kitap ve soru bankası ilerleme kartları
- Denemeler: hedef, net trendi ve son deneme özeti
- Ayarlar: tema, profil, veri ve AI tercihleri

Görevler ve günlük notları, backend bağlantısı kurulana kadar tarayıcının `localStorage` alanında saklanır. Supabase/Auth, RLS, scraper adapter’ları ve kalıcı analitik katmanı için ekranlar bu temel üzerine ayrıştırılabilir.

## Tasarım

Mavi/indigo glassmorphism, açık-koyu tema, mobil uyumlu alt navigasyon ve yoğun veri yüzeylerinde okunabilirliği koruyan opak paneller kullanılır.
