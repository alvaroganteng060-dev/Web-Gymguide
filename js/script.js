// ============================================================
// PENJELASAN PENTING TENTANG JAVASCRIPT:
//
// JavaScript (JS) = bahasa pemrograman yang membuat web INTERAKTIF.
// HTML = struktur (kerangka), CSS = gaya (makeup), JS = perilaku (otak).
//
// File ini dihubungkan ke HTML melalui tag <script src="js/script.js"></script>
// yang diletakkan DI PALING BAWAH sebelum </body>.
//
// CARA KERJA FILE INI (SANGAT SEDERHANA):
// 1. Tunggu sampai seluruh HTML selesai di-load (DOMContentLoaded).
// 2. Cari tombol "Menu" (☰) dan daftar menu (navLinks).
// 3. Kalau tombol Menu diklik, toggle (nyala/matikan) class "active" pada daftar menu.
// 4. Class "active" di CSS akan mengubah display: none menjadi display: flex.
//    Hasilnya: menu yang tadinya tersembunyi di HP, jadi muncul!
// ============================================================


// ============================================================
// BAGIAN 1: MENUNGGU HALAMAN SIAP
// ============================================================

/* 
  document.addEventListener('DOMContentLoaded', function() { ... });

  PENJELASAN:
  - document = objek yang mewakili SELURUH halaman web (file HTML).
  - addEventListener = "tambahkan pendengar kejadian".
    Artinya: "Hei browser, tolong pantau kalau ada kejadian tertentu, lalu jalankan kode ini."
  - 'DOMContentLoaded' = nama kejadian. Artinya: "HTML sudah selesai di-load dan siap dimanipulasi."
  - function() { ... } = kode yang akan dijalankan SAAT kejadian terjadi.

  KENAPA HARUS MENUNGGU?
  Kalau JavaScript jalan SEBELUM HTML selesai load, dia nggak bisa menemukan elemen 
  yang belum dibuat (misal: tombol Menu belum ada di memori).
  Jadi kita tunggu sampai "semua barang sudah masuk rumah", baru kita mulai beres-beres.
*/
document.addEventListener('DOMContentLoaded', function() {

  // ============================================================
  // BAGIAN 2: MENANGKAP ELEMEN DARI HTML
  // ============================================================

  /* 
    document.getElementById('menuBtn')

    PENJELASAN:
    - document.getElementById = cari ELEMEN berdasarkan ID-nya.
    - 'menuBtn' = ID yang kita kasih di HTML (id="menuBtn" pada tombol ☰ Menu).
    - Hasilnya: objek yang mewakili tombol tersebut. Kita simpan di variabel "menuBtn".

    VARIABEL = "wadah" untuk menyimpan data.
    var/let/const = cara membuat variabel di JavaScript.
    Di sini kita pakai "const" (constant = tetap, nggak akan diubah isinya).
  */
  const menuBtn = document.getElementById('menuBtn');

  /* 
    document.getElementById('navLinks')

    Sama seperti di atas, tapi kali ini kita tangkap elemen dengan id="navLinks".
    Itu adalah <ul> yang berisi daftar link menu.
  */
  const navLinks = document.getElementById('navLinks');

  // ============================================================
  // BAGIAN 3: MEMERIKSA APAKAH ELEMEN DITEMUKAN
  // ============================================================

  /* 
    if (menuBtn && navLinks) { ... }

    PENJELASAN:
    - if = "kalau" (syarat). Kode di dalam kurung kurawal hanya jalan KALAU syaratnya benar.
    - && = "DAN". Syaratnya benar kalau KEDUANYA benar.
    - menuBtn = benar (truthy) kalau elemen DITEMUKAN.
    - navLinks = benar kalau elemen DITEMUKAN.

    KENAPA HARUS DI-CHECK?
    Kalau HTML-nya salah (misal ID typo), getElementById akan mengembalikan "null" (kosong).
    Kalau kita coba klik "null", JavaScript akan error.
    Jadi kita pastikan dulu: "Apakah tombol dan menu benar-benar ada?"
    Kalau ada, baru kita pasang event listener.
  */
  if (menuBtn && navLinks) {

    // ============================================================
    // BAGIAN 4: MENAMBAHKAN EVENT LISTENER (PENDENGAR KEJADIAN)
    // ============================================================

    /* 
      menuBtn.addEventListener('click', function() { ... });

      PENJELASAN:
      - menuBtn = tombol ☰ Menu yang sudah kita tangkap tadi.
      - addEventListener = tambahkan pendengar kejadian.
      - 'click' = nama kejadian. Artinya: "saat tombol ini DIKLIK."
      - function() { ... } = kode yang dijalankan SAAT diklik.

      Jadi artinya: "Browser, tolong pantau tombol Menu. 
      Kalau ada orang yang klik tombol itu, jalankan kode di bawah ini."
    */
    menuBtn.addEventListener('click', function() {

      /* 
        navLinks.classList.toggle('active');

        PENJELASAN (INI INTI DARI SEMUANYA!):
        - navLinks = daftar menu <ul> yang kita tangkap tadi.
        - classList = daftar SEMUA class yang dimiliki elemen tersebut.
          Di HTML, elemen ini punya class="nav-links". classList menyimpan itu.
        - toggle('active') = "NYALA/MATIKAN class 'active'".
          - Kalau class 'active' BELUM ada → TAMBAHKAN.
          - Kalau class 'active' SUDAH ada → HAPUS.

        KENAPA CLASS 'active'?
        Di CSS (file style.css), kita punya aturan:

        .nav-links {
          display: none;   ← di HP, menu disembunyikan
        }

        .nav-links.active {
          display: flex;   ← kalau ada class 'active', tampilkan!
        }

        Jadi toggle('active') = menyalakan/mematikan menu di HP!
        Simpel kan?
      */
      navLinks.classList.toggle('active');

      /* 
        MENGUBAH TEKS TOMBOL (OPSIONAL, BIAR LEBIH JELAS):

        if (navLinks.classList.contains('active')) { ... }

        - classList.contains('active') = cek apakah class 'active' SEDANG ADA.
        - Kalau ADA (menu terbuka) → ubah teks tombol jadi "✕ Tutup".
        - Kalau TIDAK ADA (menu tertutup) → ubah teks tombol jadi "☰ Menu".

        menuBtn.textContent = ... mengubah TEKS di dalam tombol.
      */
      if (navLinks.classList.contains('active')) {
        menuBtn.textContent = '✕ Tutup';
      } else {
        menuBtn.textContent = '☰ Menu';
      }
    });

    // ============================================================
    // BAGIAN 5: MENUTUP MENU SAAT LINK DIKLIK (OPSIONAL TAPI NICE)
    // ============================================================

    /* 
      navLinks.querySelectorAll('a')

      PENJELASAN:
      - querySelectorAll = cari SEMUA elemen yang cocok dengan selector CSS.
      - 'a' = selector untuk tag <a> (link).
      - Hasilnya: daftar SEMUA link di dalam menu (Beranda, Dada, Punggung, dll).

      forEach = untuk SETIAP link, jalankan fungsi berikut...
    */
    navLinks.querySelectorAll('a').forEach(function(link) {

      /* 
        link.addEventListener('click', function() { ... });

        Tambahkan pendengar kejadian 'click' untuk SETIAP link di menu.
        Jadi kalau user klik salah satu link menu...
      */
      link.addEventListener('click', function() {

        /* 
          navLinks.classList.remove('active');

          - remove('active') = HAPUS class 'active' (beda dengan toggle yang nyala/matikan).
          - Ini selalu MENUTUP menu, nggak peduli sebelumnya terbuka atau tertutup.

          KENAPA?
          Di HP, setelah user klik menu (misal: "Dada"), menu sebaiknya TERTUTUP 
          supaya user bisa langsung baca konten, nggak perlu klik "Tutup" dulu.
        */
        navLinks.classList.remove('active');

        /* Kembalikan teks tombol jadi "☰ Menu" */
        menuBtn.textContent = '☰ Menu';
      });
    });
  }

  // ============================================================
  // BAGIAN 6: HIGHLIGHT MENU AKTIF OTOMATIS (BONUS)
  // ============================================================

  /* 
    Kode di bawah ini akan secara OTOMATIS menandai link menu yang sedang aktif
    berdasarkan NAMA FILE yang sedang dibuka.

    CONTOH:
    - Kalau buka dada.html → link "Dada" di menu akan berwarna biru + garis bawah.
    - Kalau buka index.html → link "Beranda" yang aktif.

    Ini berguna kalau lu lupa kasih class="active" di HTML secara manual.
  */

  /* 
    window.location.pathname

    PENJELASAN:
    - window = objek yang mewakili JENDELA BROWSER (tab yang sedang terbuka).
    - location = informasi tentang URL yang sedang dibuka.
    - pathname = bagian PATH dari URL (misal: "/dada.html", "/index.html").

    CONTOH:
    URL: https://website.com/folder/dada.html
    pathname = "/folder/dada.html"

    Kita pakai .split('/').pop() untuk mengambil NAMA FILE saja:
    - split('/') = pecah string berdasarkan tanda "/" → jadi array.
    - pop() = ambil elemen TERAKHIR dari array → "dada.html".
  */
  const currentPage = window.location.pathname.split('/').pop();

  /* 
    navLinks.querySelectorAll('a')

    Ambil SEMUA link di menu lagi.
  */
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function(link) {

      /* 
        link.getAttribute('href')

        - getAttribute('href') = ambil nilai atribut href dari tag <a>.
        - Contoh: <a href="dada.html"> → hasilnya "dada.html".

        Kita bandingkan: apakah href SAMA DENGAN currentPage?
        Kalau YA → tambahkan class "active".
      */
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }

});
// ============================================================
// AKHIR FILE
// ============================================================
