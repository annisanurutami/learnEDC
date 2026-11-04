import { commonProfilePages } from './shared.js';
import { adminPages } from './admin.js';
import { principalPages } from './principal.js';
import { homeroomPages } from './homeroom.js';
import { teacherPages } from './teacher.js';
import { studentPages } from './student.js';

export const allPages = [
    ...commonProfilePages,
    ...adminPages,
    ...principalPages,
    ...homeroomPages,
    ...teacherPages,
    ...studentPages,
];

export const pageById = new Map(allPages.map((item) => [item.id, item]));

export const roles = {
    admin: { label: 'Super Admin', initials: 'SA', dashboard: 'admin-dashboard', name: 'Arif Setiawan', unit: 'Administrator IT' },
    principal: { label: 'Kepala Sekolah', initials: 'KS', dashboard: 'principal-dashboard', name: 'Dr. Ratna Kusuma', unit: 'Kepala Sekolah' },
    homeroom: { label: 'Wali Kelas', initials: 'WK', dashboard: 'homeroom-dashboard', name: 'Andini Rahmawati', unit: 'Wali Kelas · XI RPL 1' },
    teacher: { label: 'Guru Mata Pelajaran', initials: 'GR', dashboard: 'teacher-dashboard', name: 'Andini Rahmawati', unit: 'Guru · Pemrograman Web' },
    student: { label: 'Siswa', initials: 'NA', dashboard: 'student-dashboard', name: 'Nadia Aulia Putri', unit: 'Siswa · XI RPL 1' },
};

export const navigation = {
    admin: [
        ['Ringkasan', [['admin-dashboard', 'Dashboard', 'bi-grid-1x2']]],
        ['Data master', [['admin-users', 'Manajemen user', 'bi-people'], ['admin-user-form', 'Tambah / edit user', 'bi-person-plus'], ['admin-user-detail', 'Detail user', 'bi-person-vcard'], ['admin-academic-year', 'Tahun ajaran', 'bi-calendar3'], ['admin-classes', 'Kelas & jurusan', 'bi-door-open'], ['admin-subjects', 'Mata pelajaran', 'bi-journal-bookmark']]],
        ['Plotting akademik', [['admin-student-placement', 'Pembagian kelas', 'bi-diagram-3'], ['admin-teaching-assignments', 'Penugasan guru', 'bi-person-workspace'], ['admin-homeroom-placement', 'Plotting wali kelas', 'bi-person-badge']]],
        ['Akun', [['profile', 'Profil pengguna', 'bi-person-circle'], ['notifications', 'Notifikasi', 'bi-bell'], ['change-password', 'Ganti password', 'bi-shield-lock']]],
    ],
    principal: [
        ['Ringkasan', [['principal-dashboard', 'Dashboard', 'bi-grid-1x2']]],
        ['Monitoring', [['principal-teacher-monitoring', 'Keaktifan guru', 'bi-person-check'], ['principal-student-monitoring', 'Keaktifan siswa', 'bi-people']]],
        ['Akademik', [['principal-grade-chart', 'Grafik nilai', 'bi-graph-up'], ['principal-announcements', 'Pengumuman', 'bi-megaphone'], ['principal-academic-reports', 'Laporan akademik', 'bi-file-earmark-bar-graph']]],
        ['Akun', [['profile', 'Profil pengguna', 'bi-person-circle'], ['notifications', 'Notifikasi', 'bi-bell'], ['change-password', 'Ganti password', 'bi-shield-lock']]],
    ],
    homeroom: [
        ['Ringkasan', [['homeroom-dashboard', 'Dashboard', 'bi-grid-1x2'], ['homeroom-class', 'Kelas bimbingan saya', 'bi-door-open']]],
        ['Siswa & akademik', [['homeroom-students', 'Daftar siswa', 'bi-people'], ['homeroom-student-detail', 'Biodata siswa', 'bi-person-vcard'], ['homeroom-attendance', 'Rekap absensi', 'bi-calendar2-check'], ['homeroom-gradebook', 'Rekapitulasi nilai', 'bi-journal-text']]],
        ['Rapor', [['homeroom-notes', 'Catatan wali kelas', 'bi-pencil-square'], ['homeroom-report-card', 'Preview & terbitkan rapor', 'bi-award']]],
        ['Akun', [['profile', 'Profil pengguna', 'bi-person-circle'], ['notifications', 'Notifikasi', 'bi-bell'], ['change-password', 'Ganti password', 'bi-shield-lock']]],
    ],
    teacher: [
        ['Ringkasan', [['teacher-dashboard', 'Dashboard', 'bi-grid-1x2'], ['teacher-class-subject', 'Kelas & mata pelajaran', 'bi-door-open']]],
        ['Pembelajaran', [['teacher-materials', 'Manajemen materi', 'bi-journal-bookmark'], ['teacher-material-form', 'Tambah / edit materi', 'bi-file-earmark-plus'], ['teacher-assignments', 'Manajemen tugas', 'bi-clipboard-check'], ['teacher-assignment-form', 'Tambah / edit tugas', 'bi-file-earmark-plus']]],
        ['Evaluasi', [['teacher-submissions', 'Pengumpulan tugas', 'bi-inbox'], ['teacher-submission-detail', 'Detail jawaban siswa', 'bi-file-earmark-person'], ['teacher-grade-feedback', 'Penilaian & feedback', 'bi-pencil-square']]],
        ['Ujian CBT', [['teacher-question-bank', 'Bank soal', 'bi-patch-question'], ['teacher-question-form', 'Tambah / edit soal', 'bi-plus-square'], ['teacher-cbt-settings', 'Pengaturan ujian', 'bi-sliders'], ['teacher-cbt-preview', 'Preview ujian', 'bi-eye'], ['teacher-essay-grading', 'Periksa jawaban esai', 'bi-card-checklist']]],
        ['Laporan', [['teacher-grade-summary', 'Rekapitulasi nilai', 'bi-file-earmark-spreadsheet']]],
        ['Akun', [['profile', 'Profil pengguna', 'bi-person-circle'], ['notifications', 'Notifikasi', 'bi-bell'], ['change-password', 'Ganti password', 'bi-shield-lock']]],
    ],
    student: [
        ['Ringkasan', [['student-dashboard', 'Dashboard siswa', 'bi-grid-1x2']]],
        ['Ruang belajar', [['student-subjects', 'Mata pelajaran', 'bi-journals'], ['student-subject-detail', 'Detail mata pelajaran', 'bi-journal-bookmark'], ['student-materials', 'Materi belajar', 'bi-collection-play'], ['student-material-viewer', 'Viewer materi', 'bi-play-btn']]],
        ['Tugas & ujian', [['student-assignments', 'Daftar tugas', 'bi-clipboard-check'], ['student-assignment-detail', 'Detail tugas', 'bi-card-text'], ['student-assignment-submit', 'Pengumpulan tugas', 'bi-cloud-arrow-up'], ['student-submission-history', 'Riwayat pengumpulan', 'bi-clock-history'], ['student-exams', 'Daftar ujian', 'bi-patch-question'], ['student-exam-room', 'Ruang ujian CBT', 'bi-door-open'], ['student-exam-take', 'Pengerjaan ujian', 'bi-pencil-square'], ['student-exam-confirm', 'Konfirmasi ujian', 'bi-check2-circle']]],
        ['Akademik', [['student-gradebook', 'Buku nilai', 'bi-journal-text'], ['student-grade-detail', 'Detail nilai & feedback', 'bi-chat-square-text'], ['student-report-card', 'Download E-Rapor', 'bi-award']]],
        ['Akun', [['profile', 'Profil pengguna', 'bi-person-circle'], ['notifications', 'Notifikasi', 'bi-bell'], ['change-password', 'Ganti password', 'bi-shield-lock']]],
    ],
};

export function getRolePages(role) {
    return allPages.filter((item) => item.role === role || item.role === 'global');
}
