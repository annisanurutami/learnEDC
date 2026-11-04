import { page } from './shared.js';

export const studentPages = [
    page('student-dashboard', 'student', 'Dashboard Siswa', 'Ruang Belajar', 'dashboard', 'Selamat datang, Nadia! Yuk, lanjutkan perjalanan belajarmu.', {
        stats: [['Mata pelajaran', '6', 'Semua kelas aktif', 'bi-journals'], ['Tugas menunggu', '3', '2 segera dikumpulkan', 'bi-clipboard-check'], ['Rata-rata nilai', '86', 'Semester ganjil', 'bi-award'], ['Progres belajar', '72%', 'Terus pertahankan!', 'bi-graph-up']],
        chartTitle: 'Progres mata pelajaran', chart: [['Pemrograman Web', 78], ['Basis Data', 71], ['Bahasa Inggris', 84], ['Matematika', 65]],
    }),
    page('student-subjects', 'student', 'Mata Pelajaran Saya', 'Ruang Belajar', 'course-list', 'Kelas XI RPL 1 · Semester Ganjil 2026/2027.'),
    page('student-subject-detail', 'student', 'Detail Mata Pelajaran', 'Ruang Belajar', 'course-detail', 'Pemrograman Web · XI RPL 1', {
        details: [['Guru pengampu', 'Andini Rahmawati, S.Kom.'], ['Jadwal kelas', 'Senin · 08.00–09.30'], ['Ruang', 'Lab Komputer 2'], ['Materi tersedia', '8 materi pembelajaran'], ['Tugas aktif', '3 tugas menunggu']],
        actions: ['Lihat materi', 'Lihat tugas', 'Lihat nilai'],
    }),
    page('student-materials', 'student', 'Daftar Materi Belajar', 'Ruang Belajar', 'materials', 'Jelajahi materi dan lanjutkan pertemuan yang belum selesai.', {
        rows: [['Pertemuan 4', 'Pengenalan HTML Semantik', 'PDF · Video', '4 Nov 2026', 'Belum dibaca'], ['Pertemuan 3', 'Dasar CSS Flexbox', 'Video · PDF', '28 Okt 2026', 'Sedang dipelajari'], ['Pertemuan 2', 'Struktur Dokumen Web', 'PDF', '21 Okt 2026', 'Selesai'], ['Pertemuan 1', 'Pengenalan Pemrograman Web', 'Video', '14 Okt 2026', 'Selesai']],
    }),
    page('student-material-viewer', 'student', 'Viewer Materi Pembelajaran', 'Ruang Belajar', 'viewer', 'Pengenalan HTML Semantik · Pertemuan 4', {
        details: [['Mata pelajaran', 'Pemrograman Web'], ['Guru', 'Andini Rahmawati, S.Kom.'], ['Durasi video', '12 menit'], ['Lampiran materi', 'HTML_semantik.pdf']],
        actions: ['Materi sebelumnya', 'Tandai selesai', 'Materi berikutnya'],
    }),
    page('student-assignments', 'student', 'Daftar Tugas', 'Tugas & Ujian', 'student-assignments', 'Pantau tugas yang belum dikerjakan, sudah dikumpulkan, atau terlambat.', {
        filters: ['Semua status', 'Belum dikerjakan', 'Sudah dikirim', 'Terlambat'],
        rows: [['Membuat halaman profil responsif', 'Pemrograman Web', '6 Nov 2026 · 23.59', 'Belum dikerjakan'], ['Latihan query SQL dasar', 'Basis Data', '8 Nov 2026 · 23.59', 'Baru'], ['Latihan HTML semantik', 'Pemrograman Web', '1 Nov 2026 · 23.59', 'Sudah dikirim'], ['Ringkasan narrative text', 'Bahasa Inggris', '30 Okt 2026 · 23.59', 'Terlambat']],
    }),
    page('student-assignment-detail', 'student', 'Detail Tugas', 'Tugas & Ujian', 'assignment-detail', 'Tinjau instruksi dan tenggat sebelum mengirimkan tugas.', {
        details: [['Judul tugas', 'Membuat halaman profil responsif'], ['Mata pelajaran', 'Pemrograman Web · XI RPL 1'], ['Guru', 'Andini Rahmawati, S.Kom.'], ['Batas pengumpulan', 'Jumat, 6 November 2026 · 23.59'], ['Status', 'Belum dikerjakan']],
        instructions: 'Buatlah sebuah halaman profil sederhana yang responsif menggunakan HTML dan CSS. Sertakan foto, deskripsi singkat, daftar keahlian, dan kontak. Pastikan tampilan tetap nyaman digunakan di layar ponsel.',
        actions: ['Kumpulkan tugas', 'Kembali ke daftar tugas'],
    }),
    page('student-assignment-submit', 'student', 'Form Pengumpulan Tugas', 'Tugas & Ujian', 'form', 'Lampirkan hasil pekerjaan dan periksa kembali sebelum mengirimkannya.', {
        fields: [['Tugas', 'text', 'Membuat halaman profil responsif'], ['Unggah berkas jawaban', 'file', 'Pilih PDF, ZIP, atau foto jawaban'], ['Catatan untuk guru', 'textarea', 'Tambahkan catatan (opsional)']],
        actions: ['Simpan draf', 'Kirim tugas'],
    }),
    page('student-submission-history', 'student', 'Riwayat Pengumpulan Tugas', 'Tugas & Ujian', 'table', 'Riwayat pengiriman tugas dan hasil penilaian dari guru.', {
        columns: ['Nama tugas', 'Mata pelajaran', 'Waktu dikirim', 'Status', 'Nilai'],
        rows: [['Latihan HTML semantik', 'Pemrograman Web', '31 Okt · 18.42', 'Sudah dinilai', '92'], ['Latihan CSS dasar', 'Pemrograman Web', '28 Okt · 16.20', 'Sudah dinilai', '87'], ['Ringkasan narrative text', 'Bahasa Inggris', '30 Okt · 23.58', 'Terlambat', '—']],
        filters: ['Semua status', 'Sudah dinilai', 'Menunggu penilaian', 'Terlambat'],
    }),
    page('student-exams', 'student', 'Daftar Ujian', 'Tugas & Ujian', 'exam-list', 'Lihat ujian yang akan datang dan riwayat ujianmu.', {
        rows: [['Ujian Harian · HTML & CSS', 'Pemrograman Web', '9 Nov · 08.00–09.00', 'Akan datang'], ['Kuis Basis Data Bab 2', 'Basis Data', '12 Nov · 10.00–10.30', 'Akan datang'], ['Kuis CSS Dasar', 'Pemrograman Web', '28 Okt · 13.00–13.30', 'Selesai']],
    }),
    page('student-exam-room', 'student', 'Ruang Ujian CBT', 'Tugas & Ujian', 'exam-room', 'Ujian Harian · HTML & CSS', {
        details: [['Mata pelajaran', 'Pemrograman Web'], ['Guru pengawas', 'Andini Rahmawati, S.Kom.'], ['Waktu ujian', '9 November 2026 · 08.00–09.00'], ['Durasi', '60 menit'], ['Jumlah soal', '13 soal · Pilihan ganda & esai']],
        instructions: 'Pastikan koneksi internet stabil sebelum memulai. Waktu ujian berjalan setelah Anda menekan tombol mulai. Jangan menutup atau berpindah dari halaman ujian.',
        actions: ['Mulai ujian'],
    }),
    page('student-exam-take', 'student', 'Pengerjaan Ujian', 'Tugas & Ujian', 'exam-take', 'Ujian Harian · HTML & CSS', {
        questions: [
            ['Manakah elemen HTML semantik untuk konten utama halaman?', ['<main>', '<span>', '<b>', '<br>']],
            ['Properti CSS untuk menyusun elemen dalam satu baris adalah…', ['display: flex', 'position: fixed', 'text-align: left', 'overflow: hidden']],
            ['Jelaskan perbedaan elemen <section> dengan <div>.', []],
        ],
    }),
    page('student-exam-confirm', 'student', 'Konfirmasi Selesai Ujian', 'Tugas & Ujian', 'exam-confirm', 'Periksa kembali jawaban sebelum mengakhiri ujian.', {
        details: [['Ujian', 'Ujian Harian · HTML & CSS'], ['Soal terjawab', '12 dari 13 soal'], ['Belum dijawab', '1 soal'], ['Sisa waktu', '18 menit 42 detik']],
        actions: ['Kembali ke ujian', 'Akhiri ujian'],
    }),
    page('student-gradebook', 'student', 'Buku Nilai', 'Akademik', 'grades', 'Nilai tugas, kuis, ujian, dan rata-rata mata pelajaranmu.', {
        columns: ['Mata pelajaran', 'Tugas', 'Kuis', 'UTS', 'Rata-rata', 'Predikat'],
        rows: [['Pemrograman Web', '92', '88', '86', '89', 'A'], ['Basis Data', '88', '82', '85', '85', 'A'], ['Bahasa Inggris', '84', '86', '82', '84', 'B'], ['Matematika', '78', '81', '80', '80', 'B']],
    }),
    page('student-grade-detail', 'student', 'Detail Nilai & Feedback', 'Akademik', 'grade-detail', 'Lihat rincian penilaian dan masukan dari guru.', {
        details: [['Tugas', 'Membuat halaman profil responsif'], ['Mata pelajaran', 'Pemrograman Web'], ['Guru', 'Andini Rahmawati, S.Kom.'], ['Nilai', '92 / 100'], ['Tanggal penilaian', '3 November 2026']],
        instructions: 'Struktur halaman sudah rapi dan responsif. Pemilihan warna nyaman dilihat. Untuk tugas berikutnya, coba gunakan elemen HTML semantik secara lebih konsisten.',
    }),
    page('student-report-card', 'student', 'Download E-Rapor', 'Akademik', 'student-report', 'Lihat status penerbitan dan unduh rapor semester Anda.', {
        reportRows: [['2026/2027 · Ganjil', 'XI RPL 1', 'Belum diterbitkan'], ['2025/2026 · Genap', 'X RPL 1', 'Tersedia · PDF'], ['2025/2026 · Ganjil', 'X RPL 1', 'Tersedia · PDF']],
    }),
];
