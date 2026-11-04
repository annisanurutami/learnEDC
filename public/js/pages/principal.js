import { page } from './shared.js';

export const principalPages = [
    page('principal-dashboard', 'principal', 'Dashboard Kepala Sekolah', 'Ringkasan', 'dashboard', 'Ringkasan kondisi akademik dan aktivitas sekolah.', {
        stats: [['Siswa aktif', '1.142', '+24 siswa tahun ini', 'bi-mortarboard'], ['Guru aktif', '96', '92% aktif mengajar', 'bi-person-workspace'], ['Rombongan belajar', '36', '3 tingkat kelas', 'bi-door-open'], ['Rata-rata nilai', '84,6', 'Naik 2,4 poin', 'bi-graph-up-arrow']],
        chartTitle: 'Rata-rata nilai per tingkat', chart: [['Kelas X', 78], ['Kelas XI', 85], ['Kelas XII', 91]],
    }),
    page('principal-teacher-monitoring', 'principal', 'Monitoring Keaktifan Guru', 'Monitoring', 'table', 'Pantau publikasi materi, tugas, dan aktivitas pengajaran guru.', {
        columns: ['Nama guru', 'Mata pelajaran', 'Materi bulan ini', 'Tugas aktif', 'Aktivitas'],
        rows: [['Andini Rahmawati', 'Pemrograman Web', '8', '3', 'Sangat aktif'], ['Seno Wibowo', 'Basis Data', '6', '2', 'Aktif'], ['Dimas Pratama', 'Bahasa Inggris', '4', '3', 'Aktif'], ['Maya Permata', 'Matematika', '2', '1', 'Perlu perhatian']],
        filters: ['Semua guru', 'Sangat aktif', 'Aktif', 'Perlu perhatian'],
    }),
    page('principal-student-monitoring', 'principal', 'Monitoring Keaktifan Siswa', 'Monitoring', 'table', 'Lihat partisipasi siswa dalam materi, pengumpulan tugas, dan ujian.', {
        columns: ['Nama siswa', 'Kelas', 'Materi diakses', 'Tugas terkumpul', 'Aktivitas'],
        rows: [['Nadia Aulia Putri', 'XI RPL 1', '92%', '18 / 20', 'Sangat aktif'], ['Bagus Pratama', 'XI TKJ 2', '78%', '14 / 20', 'Aktif'], ['Siti Amalia', 'XI RPL 1', '45%', '9 / 20', 'Perlu perhatian']],
        filters: ['Semua siswa', 'Sangat aktif', 'Aktif', 'Perlu perhatian'],
    }),
    page('principal-grade-chart', 'principal', 'Grafik Rata-rata Nilai', 'Akademik', 'analytics', 'Bandingkan pencapaian nilai per tingkat kelas dan mata pelajaran.', {
        chartTitle: 'Rata-rata nilai tiap mata pelajaran', chart: [['Matematika', 78], ['Bahasa Inggris', 84], ['Basis Data', 88], ['Pemrograman Web', 91]],
    }),
    page('principal-announcements', 'principal', 'Manajemen Pengumuman', 'Akademik', 'table', 'Buat dan kelola pengumuman sekolah yang terlihat oleh siswa dan guru.', {
        columns: ['Judul pengumuman', 'Ditujukan kepada', 'Tanggal terbit', 'Status'],
        rows: [['Persiapan ujian tengah semester', 'Seluruh warga sekolah', '4 Nov 2026', 'Terbit'], ['Jadwal kegiatan literasi', 'Siswa kelas X–XI', '1 Nov 2026', 'Terbit'], ['Rapat evaluasi akademik', 'Guru dan staf', '28 Okt 2026', 'Draf']],
        actions: ['Tulis pengumuman'],
    }),
    page('principal-academic-reports', 'principal', 'Laporan Rekapitulasi Akademik', 'Laporan', 'report', 'Siapkan ringkasan performa akademik untuk periode yang dipilih.', {
        fields: [['Tahun ajaran', 'select', '2026/2027', ['2026/2027', '2025/2026']], ['Semester', 'select', 'Ganjil', ['Ganjil', 'Genap']], ['Tingkat', 'select', 'Semua tingkat', ['Semua tingkat', 'X', 'XI', 'XII']], ['Format laporan', 'select', 'PDF', ['PDF', 'Excel (.xlsx)']]],
        reportRows: [['Jumlah siswa aktif', '1.142'], ['Jumlah guru aktif', '96'], ['Jumlah rombongan belajar', '36'], ['Rata-rata nilai sekolah', '84,6'], ['Tingkat pengumpulan tugas', '91%']],
    }),
];
