# 🚀 SQL Brutal - Web Latihan SQL

SQL Brutal adalah aplikasi web interaktif sederhana yang dibuat untuk membantu pengguna melatih dan mengasah keterampilan kueri SQL mereka. Proyek ini dibangun menggunakan React dan Vite, serta dijalankan dalam lingkungan pengembangan Docker yang terisolasi.

## ✨ Fitur Utama

* 📝 **Editor Kueri Interaktif:** Tulis kueri SQL langsung di browser.
* ✅ **Validasi Instan:** Dapatkan umpan balik langsung apakah kuerimu benar atau salah.
* 🔄 **Reset Latihan:** Mengulang tantangan dengan mudah.
* 🏆 **Sistem Tantangan:** Selesaikan soal-soal untuk menguji pemahamanmu.

## 🛠️ Tumpukan Teknologi (Tech Stack)

* **Frontend:** React.js
* **Build Tool:** Vite
* **Ikon:** Lucide React (`lucide-react`)
* **Lingkungan Pengembangan:** Docker & Docker Compose

---

## 🏁 Memulai (Getting Started)

Proyek ini dirancang untuk dijalankan sepenuhnya di dalam container Docker. Kamu hanya perlu menginstal Docker Desktop.

### Prasyarat

* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Git](https://git-scm.com/) (untuk kloning repositori)

### Instalasi & Menjalankan

1.  **Clone Repositori**
    Buka terminal dan clone repositori ini ke komputermu.

    ```bash
    git clone [URL-REPOSITORI-KAMU]
    cd sql-brutal
    ```

2.  **Jalankan dengan Docker Compose**
    Perintah ini akan membangun *image* Docker (jika belum ada) dan menyalakan *container* dalam mode *development* (termasuk *hot-reload*).

    ```bash
    docker-compose up --build
    ```

    * Gunakan `--build` saat pertama kali menjalankan atau jika kamu baru saja mengubah `Dockerfile` atau menginstal paket npm baru.
    * Untuk menjalankan di lain waktu, cukup gunakan `docker-compose up`.

3.  **Buka Aplikasi**
    Setelah *container* berjalan, buka browser dan akses:
    [**http://localhost:5173**](http://localhost:5173)

Aplikasi sekarang berjalan, dan setiap perubahan yang kamu buat pada kode di VS Code akan langsung terlihat di browser.

### 💡 Tips Pengembangan: Menambah Paket NPM Baru

Jika kamu perlu menambahkan paket baru (seperti `axios` atau `react-router-dom`), kamu harus menginstalnya **di dalam container** agar `package.json` di *host* dan *container* tetap sinkron.

1.  **Pastikan `package.json` di Host Ter-update**
    Jalankan ini di terminal **host** (komputer utamamu):
    ```bash
    npm install [nama-paket-baru]
    ```

2.  **Bangun Ulang (Rebuild) Container**
    Hentikan container (`Ctrl + C`) dan jalankan kembali dengan `--build`:
    ```bash
    docker-compose up --build
    ```

    Ini akan memastikan `RUN npm install` di `Dockerfile` mengambil paket baru yang sudah tercatat di `package.json`.

---

## 📸 Tampilan Aplikasi

![Tampilan SQL Brutal](src/screenshot.png)


## 📄 Lisensi

Proyek ini didistribusikan di bawah Lisensi MIT.