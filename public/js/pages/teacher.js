import { page } from './shared.js';

export const teacherPages = [
    page('teacher-dashboard', 'teacher', 'Dashboard Guru', 'Ringkasan', 'dashboard', 'Selamat datang kembali, Bu Andini. Inilah ringkasan kelas Anda.', {
        stats: [['Kelas diajar', '4', 'Tahun ajaran 2026/2027', 'bi-door-open'], ['Materi terbit', '18', 'Pada semester ini', 'bi-journal-bookmark'], ['Tugas perlu dinilai', '12', 'Dari 3 kelas', 'bi-inbox'], ['Rata-rata kelas', '84,2', 'Pemrograman Web', 'bi-graph-up']],
        chartTitle: 'Pengumpulan tugas minggu ini', chart: [['XI RPL 1', 86], ['XI RPL 2', 74], ['X RPL 1', 91]],
    }),
    page('teacher-class-subject', 'teacher', 'Pilih Kelas & Mata Pelajaran', 'Pembelajaran', 'table', 'Pilih ruang kelas yang ingin dikelola.', {
        columns: ['Kelas', 'Mata pelajaran', 'Jumlah siswa', 'Materi aktif', 'Tugas perlu dinilai'],
        rows: [['XI RPL 1', 'Pemrograman Web', '32', '8', '5'], ['XI RPL 2', 'Pemrograman Web', '30', '7', '4'], ['X RPL 1', 'Pemrograman Web', '34', '6', '3']],
        actions: ['Buka kelas'],
    }),
    page('teacher-materials', 'teacher', 'Manajemen Materi', 'Pembelajaran', 'table', 'Atur materi pembelajaran dan jadwal publikasi untuk kelas.', {
        columns: ['Judul materi', 'Pertemuan', 'Kelas', 'Tanggal terbit', 'Lampiran'],
        rows: [['Pengenalan HTML Semantik', 'Pertemuan 4', 'XI RPL 1', '4 Nov 2026', 'HTML_semantik.pdf'], ['Dasar CSS Flexbox', 'Pertemuan 3', 'XI RPL 1', '28 Okt 2026', 'Video & PDF'], ['Struktur Dokumen Web', 'Pertemuan 2', 'XI RPL 1', '21 Okt 2026', 'struktur-web.pdf']],
        actions: ['Tambah materi'],
    }),
    page('teacher-material-form', 'teacher', 'Tambah / Edit Materi', 'Pembelajaran', 'form', 'Siapkan materi teks, berkas belajar, dan video pembelajaran.', {
        fields: [['Judul materi', 'text', 'Contoh: Pengenalan HTML Semantik'], ['Kelas', 'select', 'XI RPL 1', ['XI RPL 1', 'XI RPL 2', 'X RPL 1']], ['Pertemuan / topik', 'text', 'Pertemuan 5 · Form HTML'], ['Deskripsi materi', 'textarea', 'Jelaskan tujuan dan ringkasan pembelajaran.'], ['Berkas materi', 'file', 'Unggah PDF, PPT, atau dokumen'], ['Link video YouTube', 'url', 'https://youtube.com/watch?v=...'], ['Jadwal publikasi', 'datetime-local', '']],
        actions: ['Simpan draf', 'Terbitkan materi'],
    }),
    page('teacher-assignments', 'teacher', 'Manajemen Tugas', 'Evaluasi', 'table', 'Buat tugas dan pantau status pengumpulan siswa.', {
        columns: ['Judul tugas', 'Kelas', 'Tenggat', 'Terkumpul', 'Status'],
        rows: [['Membuat halaman profil responsif', 'XI RPL 1', '6 Nov 2026', '25 / 32', 'Aktif'], ['Latihan HTML semantik', 'XI RPL 2', '7 Nov 2026', '22 / 30', 'Aktif'], ['Kuis CSS dasar', 'X RPL 1', '2 Nov 2026', '34 / 34', 'Selesai']],
        actions: ['Tambah tugas'],
    }),
    page('teacher-assignment-form', 'teacher', 'Tambah / Edit Tugas', 'Evaluasi', 'form', 'Buat instruksi tugas, pilih kelas, dan tentukan batas pengumpulan.', {
        fields: [['Judul tugas', 'text', 'Contoh: Membuat halaman profil responsif'], ['Kelas', 'select', 'XI RPL 1', ['XI RPL 1', 'XI RPL 2', 'X RPL 1']], ['Deskripsi / instruksi', 'textarea', 'Tuliskan petunjuk pengerjaan dengan jelas.'], ['Lampiran soal', 'file', 'Pilih dokumen pendukung'], ['Batas pengumpulan', 'datetime-local', ''], ['Izinkan pengumpulan terlambat', 'checkbox', 'Berikan toleransi setelah batas waktu']],
    }),
    page('teacher-submissions', 'teacher', 'Daftar Pengumpulan Tugas', 'Evaluasi', 'table', 'Periksa status pengumpulan dan prioritaskan jawaban yang belum dinilai.', {
        columns: ['Nama siswa', 'Tugas', 'Dikirim pada', 'Status', 'Nilai'],
        rows: [['Nadia Aulia Putri', 'Membuat halaman profil', '4 Nov · 09.12', 'Menunggu penilaian', '—'], ['Bagus Pratama', 'Membuat halaman profil', '4 Nov · 10.36', 'Menunggu penilaian', '—'], ['Siti Amalia', 'Membuat halaman profil', '3 Nov · 16.20', 'Terlambat', '—'], ['Rizky Ramadhan', 'Membuat halaman profil', '3 Nov · 14.08', 'Dinilai', '88']],
        filters: ['Semua status', 'Menunggu penilaian', 'Terlambat', 'Dinilai'],
        actions: ['Ekspor daftar'],
    }),
    page('teacher-submission-detail', 'teacher', 'Detail Jawaban Siswa', 'Evaluasi', 'submission-detail', 'Buka kiriman siswa, tinjau lampiran, lalu isi nilai dan feedback.', {
        details: [['Nama siswa', 'Nadia Aulia Putri'], ['Nama tugas', 'Membuat halaman profil responsif'], ['Dikirim pada', '4 November 2026 · 09.12'], ['Status', 'Terkirim tepat waktu'], ['Lampiran', 'halaman-profil-nadia.zip']],
        actions: ['Unduh lampiran', 'Beri nilai & feedback'],
    }),
    page('teacher-grade-feedback', 'teacher', 'Penilaian & Feedback', 'Evaluasi', 'form', 'Berikan nilai dan catatan yang membantu siswa berkembang.', {
        fields: [['Nama siswa', 'text', 'Nadia Aulia Putri'], ['Nilai (0–100)', 'number', '92'], ['Feedback guru', 'textarea', 'Struktur halaman sudah rapi dan responsif. Pertahankan kualitas ini!'], ['Status penilaian', 'select', 'Simpan sebagai dinilai', ['Simpan sebagai draf', 'Simpan sebagai dinilai']]],
    }),
    page('teacher-question-bank', 'teacher', 'Manajemen Bank Soal', 'Ujian CBT', 'table', 'Susun bank soal pilihan ganda dan esai untuk berbagai kelas.', {
        columns: ['Pertanyaan', 'Mata pelajaran', 'Tipe', 'Kesulitan', 'Status'],
        rows: [['Tag HTML untuk tautan adalah…', 'Pemrograman Web', 'Pilihan ganda', 'Mudah', 'Aktif'], ['Jelaskan fungsi semantic HTML.', 'Pemrograman Web', 'Esai', 'Menengah', 'Aktif'], ['Properti untuk mengatur jarak antar elemen flex…', 'Pemrograman Web', 'Pilihan ganda', 'Menengah', 'Aktif']],
        actions: ['Tambah soal'],
    }),
    page('teacher-question-form', 'teacher', 'Tambah / Edit Soal', 'Ujian CBT', 'form', 'Tulis pertanyaan dan atur tipe, opsi jawaban, serta bobot soal.', {
        fields: [['Mata pelajaran', 'select', 'Pemrograman Web', ['Pemrograman Web', 'Basis Data', 'Bahasa Inggris']], ['Tipe soal', 'select', 'Pilihan ganda', ['Pilihan ganda', 'Esai']], ['Pertanyaan', 'textarea', 'Tuliskan pertanyaan dengan jelas…'], ['Opsi jawaban A', 'text', 'Pilihan jawaban pertama'], ['Opsi jawaban B', 'text', 'Pilihan jawaban kedua'], ['Opsi jawaban C', 'text', 'Pilihan jawaban ketiga'], ['Opsi jawaban D', 'text', 'Pilihan jawaban keempat'], ['Kunci jawaban', 'select', 'A', ['A', 'B', 'C', 'D']], ['Bobot nilai', 'number', '10']],
    }),
    page('teacher-cbt-settings', 'teacher', 'Pengaturan Ujian CBT', 'Ujian CBT', 'form', 'Atur sesi ujian, batas waktu, acak soal, dan aturan pengerjaan.', {
        fields: [['Judul ujian', 'text', 'Ujian Harian · HTML & CSS'], ['Kelas', 'select', 'XI RPL 1', ['XI RPL 1', 'XI RPL 2', 'X RPL 1']], ['Pilih soal dari bank', 'multiselect', 'Pilih soal ujian', ['Pilihan ganda HTML (10 soal)', 'Esai CSS (3 soal)', 'Praktik layout responsif']], ['Tanggal dan waktu mulai', 'datetime-local', ''], ['Tanggal dan waktu selesai', 'datetime-local', ''], ['Durasi (menit)', 'number', '60'], ['Acak urutan soal dan opsi', 'checkbox', 'Aktifkan pengacakan'], ['Deteksi perpindahan tab', 'checkbox', 'Tampilkan peringatan saat peserta berpindah tab']],
        actions: ['Simpan draf', 'Aktifkan ujian'],
    }),
    page('teacher-cbt-preview', 'teacher', 'Preview Ujian CBT', 'Ujian CBT', 'exam-preview', 'Pastikan informasi, instruksi, dan soal tampil sebelum ujian dibuka.', {
        details: [['Nama ujian', 'Ujian Harian · HTML & CSS'], ['Kelas', 'XI RPL 1 · 32 siswa'], ['Jumlah soal', '13 soal · 10 pilihan ganda, 3 esai'], ['Durasi', '60 menit'], ['Jadwal', '9 November 2026 · 08.00–09.00'], ['Pengacakan soal', 'Aktif']],
    }),
    page('teacher-essay-grading', 'teacher', 'Pemeriksaan Jawaban Esai', 'Ujian CBT', 'grading', 'Periksa jawaban esai siswa yang menunggu penilaian.', {
        columns: ['Nama siswa', 'Pertanyaan esai', 'Jawaban masuk', 'Nilai', 'Status'],
        rows: [['Nadia Aulia Putri', 'Jelaskan fungsi semantic HTML.', '1 Nov · 10.42', '—', 'Belum dinilai'], ['Bagus Pratama', 'Jelaskan fungsi semantic HTML.', '1 Nov · 10.55', '82', 'Selesai dinilai'], ['Siti Amalia', 'Jelaskan fungsi semantic HTML.', '1 Nov · 10.57', '—', 'Belum dinilai']],
        actions: ['Periksa jawaban terpilih'],
    }),
    page('teacher-grade-summary', 'teacher', 'Rekapitulasi Nilai', 'Laporan', 'grades', 'Pantau dan unduh nilai siswa untuk kelas dan mata pelajaran.', {
        columns: ['Nama siswa', 'Tugas', 'Kuis', 'UTS', 'UAS', 'Nilai akhir'],
        rows: [['Nadia Aulia Putri', '92', '88', '86', '—', '88,7'], ['Bagus Pratama', '84', '78', '82', '—', '81,3'], ['Siti Amalia', '82', '85', '76', '—', '81,0'], ['Rizky Ramadhan', '90', '86', '84', '—', '86,7']],
        actions: ['Unduh Excel'],
    }),
];
