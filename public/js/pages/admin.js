import { page } from './shared.js';

export const adminPages = [
    page('admin-dashboard', 'admin', 'Dashboard Super Admin', 'Ringkasan', 'dashboard', 'Pantau data akademik dan aktivitas platform sekolah.', {
        stats: [['Pengguna aktif', '1.284', '12 akun baru bulan ini', 'bi-people'], ['Siswa', '1.142', '98% akun aktif', 'bi-mortarboard'], ['Guru', '96', '4 akun perlu ditinjau', 'bi-person-workspace'], ['Rombel', '36', 'Tahun ajaran 2026/2027', 'bi-door-open']],
        chartTitle: 'Ringkasan pengguna', chart: [['Siswa', 88], ['Guru', 62], ['Wali kelas', 36], ['Admin', 14]],
    }),
    page('admin-users', 'admin', 'Manajemen Data User', 'Data Master', 'table', 'Kelola akun admin, kepala sekolah, guru, wali kelas, dan siswa.', {
        columns: ['Nama pengguna', 'ID / NISN', 'Role', 'Kelas / Unit', 'Status'],
        rows: [
            ['Nadia Aulia Putri', '0064827310', 'Siswa', 'XI RPL 1', 'Aktif'],
            ['Andini Rahmawati', '198702122015032001', 'Guru', 'Produktif RPL', 'Aktif'],
            ['Bagus Pratama', '0064178234', 'Siswa', 'XI TKJ 2', 'Aktif'],
            ['Seno Wibowo', '198309102010011006', 'Guru', 'Produktif RPL', 'Aktif'],
            ['Maya Permata', '0072918371', 'Siswa', 'X RPL 1', 'Nonaktif'],
        ],
        actions: ['Tambah user', 'Impor data', 'Ekspor'],
        filters: ['Semua role', 'Siswa', 'Guru', 'Wali kelas', 'Kepala sekolah'],
    }),
    page('admin-user-form', 'admin', 'Tambah / Edit User', 'Data Master', 'form', 'Lengkapi identitas dan pengaturan akun pengguna.', {
        fields: [['Nama lengkap', 'text', 'Contoh: Nadia Aulia'], ['NISN / NIP', 'text', 'Masukkan nomor identitas'], ['Email', 'email', 'nama@sekolah.sch.id'], ['Nomor HP', 'tel', '08xx xxxx xxxx'], ['Role', 'select', 'Pilih role', ['Siswa', 'Guru', 'Wali kelas', 'Kepala sekolah', 'Admin']], ['Kelas / Unit', 'select', 'Pilih kelas atau unit', ['X RPL 1', 'XI RPL 1', 'XI TKJ 2', 'Kepala sekolah']], ['Status akun', 'select', 'Aktif', ['Aktif', 'Nonaktif', 'Suspend']]],
    }),
    page('admin-user-detail', 'admin', 'Detail User', 'Data Master', 'detail', 'Informasi akun dan status pengguna terpilih.', {
        details: [['Nama lengkap', 'Nadia Aulia Putri'], ['NISN', '0064827310'], ['Role', 'Siswa'], ['Kelas', 'XI RPL 1'], ['Email', 'nadia.aulia@sekolah.sch.id'], ['Status akun', 'Aktif'], ['Terdaftar sejak', '15 Juli 2024']],
        actions: ['Edit user', 'Reset password', 'Nonaktifkan akun'],
    }),
    page('admin-academic-year', 'admin', 'Tahun Ajaran & Semester', 'Data Master', 'table', 'Atur periode akademik aktif dan riwayat semester.', {
        columns: ['Tahun ajaran', 'Semester', 'Tanggal mulai', 'Tanggal selesai', 'Status'],
        rows: [['2026/2027', 'Ganjil', '13 Juli 2026', '19 Desember 2026', 'Aktif'], ['2025/2026', 'Genap', '5 Januari 2026', '20 Juni 2026', 'Selesai'], ['2025/2026', 'Ganjil', '14 Juli 2025', '20 Desember 2025', 'Selesai']],
        actions: ['Tambah periode'],
    }),
    page('admin-classes', 'admin', 'Data Kelas & Jurusan', 'Data Master', 'table', 'Kelola rombongan belajar, tingkat kelas, dan program keahlian.', {
        columns: ['Nama kelas', 'Tingkat', 'Jurusan', 'Wali kelas', 'Jumlah siswa'],
        rows: [['XI RPL 1', 'XI', 'Rekayasa Perangkat Lunak', 'Andini Rahmawati', '32'], ['XI TKJ 2', 'XI', 'Teknik Komputer Jaringan', 'Seno Wibowo', '30'], ['X RPL 1', 'X', 'Rekayasa Perangkat Lunak', 'Dimas Pratama', '34']],
        actions: ['Tambah kelas'],
        filters: ['Semua tingkat', 'X', 'XI', 'XII'],
    }),
    page('admin-subjects', 'admin', 'Manajemen Mata Pelajaran', 'Data Master', 'table', 'Atur kode mata pelajaran, nama, tingkat, jurusan, dan KKM.', {
        columns: ['Kode', 'Mata pelajaran', 'Tingkat', 'Jurusan', 'KKM'],
        rows: [['RPL-301', 'Pemrograman Web', 'XI', 'RPL', '78'], ['RPL-302', 'Basis Data', 'XI', 'RPL', '76'], ['ING-201', 'Bahasa Inggris', 'XI', 'Semua jurusan', '75'], ['MTK-101', 'Matematika', 'XI', 'Semua jurusan', '75']],
        actions: ['Tambah mata pelajaran'],
    }),
    page('admin-student-placement', 'admin', 'Plotting Pembagian Kelas Siswa', 'Plotting Akademik', 'form', 'Pindahkan atau tempatkan siswa ke rombongan belajar yang sesuai.', {
        fields: [['Tahun ajaran', 'select', '2026/2027', ['2026/2027', '2025/2026']], ['Tingkat', 'select', 'XI', ['X', 'XI', 'XII']], ['Kelas tujuan', 'select', 'XI RPL 1', ['XI RPL 1', 'XI TKJ 2', 'XI RPL 2']], ['Cari siswa', 'search', 'Cari berdasarkan nama atau NISN'], ['Pilih siswa', 'multiselect', 'Pilih siswa untuk ditambahkan', ['Nadia Aulia Putri — 0064827310', 'Bagus Pratama — 0064178234', 'Siti Amalia — 0064928712']]],
        actions: ['Tempatkan siswa'],
    }),
    page('admin-teaching-assignments', 'admin', 'Plotting Jadwal & Penugasan Guru', 'Plotting Akademik', 'table', 'Atur kelas dan mata pelajaran yang diampu oleh setiap guru.', {
        columns: ['Guru', 'Mata pelajaran', 'Kelas', 'Hari / waktu', 'Tahun ajaran'],
        rows: [['Andini Rahmawati', 'Pemrograman Web', 'XI RPL 1', 'Senin · 08.00', '2026/2027'], ['Seno Wibowo', 'Basis Data', 'XI RPL 1', 'Rabu · 13.00', '2026/2027'], ['Dimas Pratama', 'Bahasa Inggris', 'XI RPL 1', 'Selasa · 10.15', '2026/2027']],
        actions: ['Tambah penugasan'],
    }),
    page('admin-homeroom-placement', 'admin', 'Plotting Wali Kelas', 'Plotting Akademik', 'table', 'Tetapkan guru wali kelas pada setiap rombongan belajar.', {
        columns: ['Kelas', 'Tingkat', 'Jurusan', 'Wali kelas', 'Tahun ajaran'],
        rows: [['XI RPL 1', 'XI', 'RPL', 'Andini Rahmawati', '2026/2027'], ['XI TKJ 2', 'XI', 'TKJ', 'Seno Wibowo', '2026/2027'], ['X RPL 1', 'X', 'RPL', 'Dimas Pratama', '2026/2027']],
        actions: ['Tetapkan wali kelas'],
    }),
];
