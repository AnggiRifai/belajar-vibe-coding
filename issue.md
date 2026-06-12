# Fitur Registrasi User

Issue ini berisi tahapan implementasi fitur registrasi user baru. Panduan ini dirancang agar dapat diimplementasikan selangkah demi selangkah secara berurutan oleh junior programmer atau asisten model AI.

## 1. Pembaruan Skema Database

**File Target:** `src/db/schema.ts`

Perbarui skema tabel `users` agar memiliki spesifikasi kolom berikut menggunakan sintaks Drizzle ORM:
- `id`: integer, auto increment, primary key.
- `name`: varchar(255), not null.
- `email`: varchar(255), not null, bersifat unique.
- `password`: varchar(255), not null.
- `create_at`: timestamp, default current_timestamp.

**Tindakan Lanjutan:** Setelah skema diperbarui, jalankan push/migrasi ke database lokal MySQL.

## 2. Instalasi Dependensi (Bcrypt)

- Pastikan project memiliki library untuk melakukan hashing password.
- Anda bisa menggunakan modul bawaan Bun yaitu `Bun.password.hash(password, { algorithm: "bcrypt" })`. Jika memilih menggunakan library terpisah, silakan jalankan `bun add bcrypt` dan `bun add -d @types/bcrypt`.

## 3. Pembuatan Struktur Folder & File

Buat struktur folder dan file baru di dalam direktori `src` seperti berikut:
```text
src/
├── routes/
│   └── user-route.ts
├── services/
│   └── user-service.ts
```

## 4. Implementasi Logic Bisnis (Service)

**File Target:** `src/services/user-service.ts`

Buat fungsionalitas (fungsi/class) untuk registrasi user dengan alur logika berikut:
1. Terima input berupa objek yang berisi `name`, `email`, dan `password`.
2. Lakukan pengecekan ke tabel `users` berdasarkan `email` tersebut menggunakan Drizzle.
3. Jika email **sudah ada**, hentikan proses dan kembalikan error (atau throw exception) bahwa email sudah terdaftar.
4. Jika email **belum ada**, lakukan proses *hashing* pada input password menggunakan *bcrypt*.
5. Simpan data (name, email, password yang sudah di-hash) ke dalam tabel `users`.
6. Kembalikan tanda atau status berhasil.

## 5. Implementasi API Route

**File Target:** `src/routes/user-route.ts`

Buat konfigurasi *routing* ElysiaJS dengan ketentuan:
- **Metode & Path:** `POST /api/users`
- Panggil service/fungsi registrasi dari `user-service.ts`.
- **Request Body (Format JSON yang diharapkan):**
  ```json
  {
      "name": "Eko",
      "email": "eko@localhost",
      "password": "rahasia"  
  }
  ```
- **Penanganan Response:**
  - Jika registrasi berhasil, kembalikan respons ini (berserta status 200/201):
    ```json
    {
        "data": "OK"
    }
    ```
  - Jika registrasi gagal (karena email duplikat), tangkap error dari service dan kembalikan respons ini (berserta status misal 400):
    ```json
    {
        "error": "Email sudah terdaftar"
    }
    ```

## 6. Integrasi Route ke Server Utama

**File Target:** `src/index.ts`

- Impor route `user-route.ts` yang telah dibuat.
- Integrasikan/daftarkan route tersebut ke instance utama ElysiaJS agar endpoint `/api/users` bisa diakses dari luar.

## Acceptance Criteria
- Mampu mendemonstrasikan sukses mendaftarkan user baru dengan password yang terenkripsi (bcrypt).
- Mampu mendemonstrasikan penolakan registrasi jika email sudah pernah dipakai dengan output JSON yang telah disepakati.
