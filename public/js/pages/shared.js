export function page(id, role, title, section, type, description, extra = {}) {
    return { id, role, title, section, type, description, ...extra };
}

export const commonProfilePages = [
    page('profile', 'global', 'Profil Pengguna', 'Akun', 'profile', 'Lihat informasi akun dan aktivitas belajar Anda.'),
    page('edit-profile', 'global', 'Edit Profil', 'Akun', 'form', 'Perbarui informasi kontak dan foto profil.', {
        fields: [
            ['Nama lengkap', 'text', 'Nadia Aulia Putri'],
            ['NISN / NIP', 'text', '0064827310'],
            ['Email', 'email', 'nadia.aulia@sekolah.sch.id'],
            ['Nomor WhatsApp', 'tel', '0812 3456 7890'],
            ['Kelas / Jabatan', 'text', 'XI RPL 1'],
            ['Foto profil', 'file', 'Pilih foto profil'],
        ],
    }),
    page('change-password', 'global', 'Ganti Password', 'Akun', 'form', 'Gunakan password yang kuat dan jangan membagikannya kepada siapa pun.', {
        fields: [
            ['Password saat ini', 'password', 'Masukkan password saat ini'],
            ['Password baru', 'password', 'Minimal 8 karakter'],
            ['Konfirmasi password baru', 'password', 'Ulangi password baru'],
        ],
    }),
    page('notifications', 'global', 'Pusat Notifikasi', 'Akun', 'notifications', 'Semua pengumuman, tugas baru, dan pembaruan nilai dalam satu tempat.'),
];
