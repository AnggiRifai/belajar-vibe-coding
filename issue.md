# Project Setup: ElysiaJS + Drizzle + MySQL

## Tujuan
Menginisialisasi project backend baru menggunakan Bun dengan framework ElysiaJS dan ORM Drizzle yang terhubung ke database MySQL.

## Langkah-langkah Implementasi

1. **Inisialisasi Project**
   - Buat project baru menggunakan perintah inisialisasi dari Bun di folder ini.

2. **Instalasi Dependensi Utama**
   - Install **ElysiaJS** sebagai web framework.
   - Install **Drizzle ORM** beserta driver koneksi ke **MySQL** (misalnya `mysql2`).
   - Install *developer tools* untuk Drizzle seperti `drizzle-kit` untuk keperluan migrasi.

3. **Konfigurasi Database & Environment**
   - Buat file konfigurasi `.env` untuk menyimpan kredensial database MySQL (Host, User, Password, Nama Database).
   - Buat file konfigurasi Drizzle (`drizzle.config.ts` atau sejenisnya) agar mengenali skema dan koneksi database.

4. **Inisialisasi Skema & Migrasi**
   - Buat sebuah skema tabel sederhana (contoh: tabel `users`) menggunakan sintaks Drizzle.
   - Jalankan migrasi untuk membuat tabel tersebut di database MySQL.

5. **Setup Server Elysia**
   - Buat *entry point* aplikasi (misal: `src/index.ts`).
   - Setup server ElysiaJS dan lakukan *setup* koneksi Drizzle di dalamnya.
   - Buat *endpoint* sederhana (seperti `GET /`) yang menguji koneksi dengan melakukan query ke tabel yang sudah dibuat.

6. **Pengujian**
   - Pastikan server dapat berjalan (menggunakan mode *watch* dari Bun) dan *endpoint* berjalan tanpa error.
