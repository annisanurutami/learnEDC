import { page } from './shared.js';

export const homeroomPages = [
    page('homeroom-dashboard', 'homeroom', 'Dashboard Wali Kelas', 'Ringkasan', 'dashboard', 'Pantau keadaan kelas dan perkembangan belajar siswa bimbingan.', {
        stats: [['Siswa bimbingan', '32', 'XI RPL 1', 'bi-people'], ['Kehadiran hari ini', '94%', '2 siswa tidak hadir', 'bi-calendar2-check'], ['Nilai belum lengkap', '4', 'Dari 6 mata pelajaran', 'bi-journal-text'], ['Rapor terbit', '0', 'Semester ganjil 2026/2027', 'bi-award']],
        chartTitle: 'Kelengkapan nilai per mata pelajaran', chart: [['Pemrograman Web', 91], ['Basis Data', 82], ['Bahasa Inggris', 100], ['Matematika', 76]],
    }),
    page('homeroom-class', 'homeroom', 'Kelas Bimbingan Saya', 'Kelas Saya', 'detail', 'Informasi kelas dan pintasan ke data akademik rombongan belajar.', {
        details: [['Nama kelas', 'XI RPL 1'], ['Tahun ajaran', '2026/2027 · Ganjil'], ['Jumlah siswa', '32 siswa'], ['Wali kelas', 'Andini Rahmawati, S.Kom.'], ['Jurusan', 'Rekayasa Perangkat Lunak'], ['Ruang kelas', 'Ruang 11 · Gedung B']],
        actions: ['Daftar siswa', 'Rekap absensi', 'Rekap nilai'],
    }),
    page('homeroom-students', 'homeroom', 'Daftar Siswa Bimbingan', 'Kelas Saya', 'table', 'Cari siswa, tinjau profil singkat, dan lihat status akademik kelas.', {
        columns: ['Nama siswa', 'NISN', 'Jenis kelamin', 'Kehadiran', 'Rata-rata nilai'],
        rows: [['Nadia Aulia Putri', '0064827310', 'Perempuan', 'Hadir', '88,4'], ['Bagus Pratama', '0064178234', 'Laki-laki', 'Hadir', '82,7'], ['Siti Amalia', '0064928712', 'Perempuan', 'Izin', '79,1'], ['Rizky Ramadhan', '0064830162', 'Laki-laki', 'Hadir', '85,2']],
        actions: ['Ekspor daftar'],
    }),
    page('homeroom-student-detail', 'homeroom', 'Detail Biodata Siswa', 'Kelas Saya', 'detail', 'Biodata, kontak wali, absensi, dan ringkasan hasil belajar siswa.', {
        details: [['Nama lengkap', 'Nadia Aulia Putri'], ['NISN', '0064827310'], ['Kelas', 'XI RPL 1'], ['Tanggal lahir', '12 Mei 2010'], ['Email', 'nadia.aulia@sekolah.sch.id'], ['Nama orang tua / wali', 'Ibu Ratna Puspita'], ['Kontak wali', '0812 9876 5432'], ['Kehadiran semester', '97% · 2 izin, 0 alfa']],
        actions: ['Kembali ke daftar siswa', 'Lihat rekap nilai'],
    }),
    page('homeroom-attendance', 'homeroom', 'Rekapitulasi Absensi Siswa', 'Akademik', 'table', 'Pantau kehadiran kelas berdasarkan periode, status, dan nama siswa.', {
        columns: ['Nama siswa', 'Hadir', 'Izin', 'Sakit', 'Alfa', 'Persentase'],
        rows: [['Nadia Aulia Putri', '86', '2', '1', '0', '97%'], ['Bagus Pratama', '83', '1', '3', '2', '93%'], ['Siti Amalia', '79', '4', '3', '3', '88%'], ['Rizky Ramadhan', '85', '1', '2', '1', '96%']],
        filters: ['Semua status', 'Hadir', 'Izin', 'Sakit', 'Alfa'],
        actions: ['Unduh rekap'],
    }),
    page('homeroom-gradebook', 'homeroom', 'Rekapitulasi Nilai Mata Pelajaran', 'Akademik', 'grades', 'Rekap nilai seluruh mata pelajaran untuk semester yang dipilih.', {
        columns: ['Nama siswa', 'Pemrograman Web', 'Basis Data', 'B. Inggris', 'Matematika', 'Rata-rata'],
        rows: [['Nadia Aulia Putri', '91', '88', '86', '84', '87,3'], ['Bagus Pratama', '84', '80', '83', '78', '81,3'], ['Siti Amalia', '82', '76', '85', '74', '79,3'], ['Rizky Ramadhan', '89', '86', '84', '81', '85,0']],
        actions: ['Ekspor nilai'],
    }),
    page('homeroom-notes', 'homeroom', 'Catatan Wali Kelas', 'Rapor', 'form', 'Tuliskan catatan perkembangan karakter dan saran belajar siswa.', {
        fields: [['Tahun ajaran', 'select', '2026/2027 · Ganjil', ['2026/2027 · Ganjil', '2025/2026 · Genap']], ['Pilih siswa', 'select', 'Nadia Aulia Putri', ['Nadia Aulia Putri', 'Bagus Pratama', 'Siti Amalia', 'Rizky Ramadhan']], ['Catatan perkembangan', 'textarea', 'Nadia menunjukkan semangat belajar yang baik dan aktif berkolaborasi dengan teman.'], ['Saran untuk semester berikutnya', 'textarea', 'Terus pertahankan konsistensi belajar dan kembangkan kemampuan berpikir kritis.']],
    }),
    page('homeroom-report-card', 'homeroom', 'Preview & Terbitkan E-Rapor', 'Rapor', 'report-card', 'Periksa kelengkapan nilai, pratinjau rapor, lalu terbitkan untuk siswa.', {
        reportRows: [['Nadia Aulia Putri · XI RPL 1', '87,3 · Baik', 'Lengkap'], ['Bagus Pratama · XI RPL 1', '81,3 · Baik', 'Lengkap'], ['Siti Amalia · XI RPL 1', '79,3 · Cukup', 'Lengkap'], ['Rizky Ramadhan · XI RPL 1', '85,0 · Baik', 'Lengkap']],
        actions: ['Preview rapor', 'Unduh PDF', 'Kunci & terbitkan rapor'],
    }),
];
