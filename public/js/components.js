import { roles } from './pages/index.js';

const esc = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const icons = {
    'bi-people': 'bi-people-fill',
    'bi-mortarboard': 'bi-mortarboard-fill',
    'bi-person-workspace': 'bi-person-workspace',
    'bi-door-open': 'bi-door-open',
    'bi-clipboard-check': 'bi-clipboard-check',
    'bi-award': 'bi-award-fill',
};

function button(label, options = {}) {
    const icon = options.icon || (label.toLowerCase().includes('tambah') || label.toLowerCase().includes('tulis') ? 'bi-plus-lg'
        : label.toLowerCase().includes('unduh') || label.toLowerCase().includes('ekspor') ? 'bi-download'
            : label.toLowerCase().includes('impor') ? 'bi-upload'
                : label.toLowerCase().includes('kirim') ? 'bi-send' : '');
    const classes = options.primary ? 'btn btn-primary btn-sm' : 'btn btn-soft btn-sm';
    const dataPage = options.page ? ` data-page="${esc(options.page)}"` : '';
    const dataAction = options.action ? ` data-action="${esc(options.action)}"` : '';
    return `<button type="button" class="${classes}"${dataPage}${dataAction}>${icon ? `<i class="bi ${icon} me-1"></i>` : ''}${esc(label)}</button>`;
}

function actionsMarkup(labels = [], page) {
    return labels.map((label, index) => {
        const key = label.toLowerCase();
        let target = '';
        if (page.id === 'admin-users' && key.includes('tambah')) target = 'admin-user-form';
        else if (key.includes('tambah') && key.includes('materi')) target = 'teacher-material-form';
        else if (key.includes('tambah') && key.includes('tugas')) target = 'teacher-assignment-form';
        else if (key.includes('tambah') && key.includes('soal')) target = 'teacher-question-form';
        else if (key.includes('tambah') || key.includes('tetapkan wali')) return button(label, { action: 'add-record' });
        else if (key.includes('pengumuman') || key.includes('tulis')) return button(label, { action: 'announcement-compose', primary: true });
        else if (key.includes('pdf')) return button(label, { action: 'print-report' });
        else if (key.includes('unduh') || key.includes('ekspor')) return button(label, { action: 'export' });
        else if (key.includes('impor')) return button(label, { action: 'import' });
        else if (key.includes('edit') && page.id === 'admin-user-detail') target = 'admin-user-form';
        else if (key.includes('reset password')) return button(label, { action: 'reset-password' });
        else if (key.includes('nonaktif') || key.includes('suspend') || key.includes('blokir')) return button(label, { action: 'account-toggle' });
        else if (key.includes('materi')) target = 'teacher-materials';
        else if (key.includes('tugas')) target = 'student-assignments';
        else if (key.includes('daftar siswa') || key.includes('biodata')) target = 'homeroom-students';
        else if (key.includes('absensi')) target = 'homeroom-attendance';
        else if (key.includes('rekap nilai')) target = page.role === 'teacher' ? 'teacher-grade-summary' : 'homeroom-gradebook';
        else if (key.includes('nilai')) target = 'student-gradebook';
        else if (key.includes('preview')) return button(label, { action: 'preview' });
        else if (key.includes('jawaban terpilih')) target = 'teacher-submission-detail';
        else if (key.includes('beri nilai')) target = 'teacher-grade-feedback';
        else if (key.includes('buka kelas')) target = 'teacher-materials';
        else if (key.includes('kumpulkan tugas')) target = 'student-assignment-submit';
        else if (key.includes('mulai ujian')) target = 'student-exam-take';
        else if (key.includes('akhiri ujian')) target = 'student-exam-confirm';
        else if (key.includes('materi sebelumnya') || key.includes('materi berikutnya')) target = 'student-materials';
        else if (key.includes('tandai selesai')) return button(label, { action: 'mark-complete', primary: true });
        else if (key.includes('kelas')) target = 'student-subjects';
        else if (key.includes('kunci') || key.includes('terbitkan')) return button(label, { action: 'publish' });
        else if (key.includes('kirim')) return button(label, { action: 'submit', primary: true });
        return button(label, { page: target || page.id, primary: index === labels.length - 1 });
    }).join('');
}

function panelHeader(page, extra = '') {
    return `<div class="panel-header"><div><h2>${esc(page.title)}</h2><p>${esc(page.description)}</p></div>${extra}</div>`;
}

function dash(page, role) {
    const colors = ['navy', 'blue', 'pink', 'mint'];
    const metrics = (page.stats || []).map(([title, value, note, icon], index) => `
        <article class="metric-card"><div class="metric-top"><span class="metric-icon metric-${colors[index % colors.length]}"><i class="bi ${icons[icon] || icon}"></i></span><span class="metric-menu"><i class="bi bi-three-dots"></i></span></div><div class="metric-value">${esc(value)}</div><div class="metric-label">${esc(title)}</div><div class="metric-note"><i class="bi bi-arrow-up-right"></i>${esc(note)}</div></article>`).join('');
    const bars = (page.chart || []).map(([label, amount], index) => `
        <div class="chart-row"><span class="chart-label">${esc(label)}</span><div class="chart-track"><span class="chart-fill chart-color-${index % 4}" style="width:${Math.max(4, Number(amount))}%"></span></div><b>${esc(amount)}${page.id === 'principal-dashboard' ? '' : '%'}</b></div>`).join('');
    const dashboardLinks = role === 'student'
        ? [['student-subjects', 'Lanjutkan belajar', 'Pilih mata pelajaran dan lihat progresmu.', 'bi-journals', 'blue'], ['student-assignments', 'Tugas menunggu', 'Ada 3 tugas yang perlu diselesaikan.', 'bi-clipboard-check', 'pink'], ['student-exams', 'Ujian mendatang', 'Persiapkan diri untuk ujian berikutnya.', 'bi-patch-question', 'mint']]
        : role === 'admin'
            ? [['admin-users', 'Data pengguna', 'Kelola akun siswa, guru, dan staf sekolah.', 'bi-people', 'blue'], ['admin-classes', 'Kelas & jurusan', 'Atur rombongan belajar dan program keahlian.', 'bi-door-open', 'pink'], ['admin-teaching-assignments', 'Plotting guru', 'Atur penugasan guru dan jadwal mengajar.', 'bi-person-workspace', 'mint']]
            : role === 'principal'
                ? [['principal-teacher-monitoring', 'Keaktifan guru', 'Pantau publikasi dan kegiatan pengajaran.', 'bi-person-check', 'blue'], ['principal-student-monitoring', 'Keaktifan siswa', 'Lihat partisipasi siswa dalam belajar.', 'bi-people', 'pink'], ['principal-academic-reports', 'Laporan akademik', 'Siapkan rekap akademik untuk sekolah.', 'bi-file-earmark-bar-graph', 'mint']]
                : role === 'homeroom'
                    ? [['homeroom-students', 'Siswa bimbingan', 'Lihat biodata dan perkembangan siswa kelas.', 'bi-people', 'blue'], ['homeroom-attendance', 'Rekap absensi', 'Tinjau ringkasan kehadiran kelas.', 'bi-calendar2-check', 'pink'], ['homeroom-gradebook', 'Rekap nilai', 'Pantau nilai seluruh mata pelajaran.', 'bi-journal-text', 'mint']]
                    : [['teacher-materials', 'Kelola materi', 'Publikasikan materi untuk kelas yang Anda ajar.', 'bi-journal-bookmark', 'blue'], ['teacher-submissions', 'Periksa pengumpulan', 'Ada kiriman siswa yang menunggu penilaian.', 'bi-inbox', 'pink'], ['teacher-cbt-settings', 'Buat ujian CBT', 'Siapkan ujian dan bank soal kelas.', 'bi-patch-question', 'mint']];
    return `
        <section class="welcome-banner"><div class="welcome-decor welcome-decor-one"></div><div class="welcome-decor welcome-decor-two"></div><div class="welcome-content"><span class="welcome-pill"><i class="bi bi-sparkle"></i> TAHUN AJARAN 2026/2027 · GANJIL</span><h2>${role === 'student' ? 'Setiap langkah belajar membawamu lebih dekat ke cita-cita.' : 'Semua aktivitas belajar, dalam satu ruang.'}</h2><p>${esc(page.description)}</p>${role === 'student' ? '<a href="#/student-subjects" class="welcome-cta">Jelajahi kelas <i class="bi bi-arrow-right"></i></a>' : ''}</div><div class="welcome-illustration"><img src="/images/learnedc-logo.png" alt="Logo learnEDC"></div><span class="floating-sparkle sparkle-a">✦</span><span class="floating-sparkle sparkle-b">✧</span></section>
        <div class="metrics-grid">${metrics}</div>
        <div class="dashboard-grid"><section class="content-panel chart-panel">${panelHeader({ title: page.chartTitle || 'Ringkasan aktivitas', description: 'Data semester ganjil · 2026/2027' }, '<span class="panel-period">Semester ini <i class="bi bi-chevron-down"></i></span>')}<div class="chart-summary"><strong>${role === 'principal' ? '84,6' : role === 'student' ? '72%' : 'Aktif'}</strong><span>${role === 'principal' ? 'rata-rata nilai sekolah' : role === 'student' ? 'progres belajar keseluruhan' : 'progres semester berjalan'}</span></div><div class="bar-chart">${bars}</div><div class="chart-footnote"><i class="bi bi-info-circle"></i> Pembaruan data terakhir hari ini · 10.30</div></section><section class="content-panel quick-panel">${panelHeader({ title: role === 'student' ? 'Yang perlu kamu lakukan' : 'Pintasan menu', description: 'Akses cepat ke aktivitasmu' })}<div class="quick-link-list">${dashboardLinks.map(([id, title, caption, icon, color]) => `<a class="quick-link" href="#/${id}"><span class="quick-icon ${color}"><i class="bi ${icon}"></i></span><span><b>${esc(title)}</b><small>${esc(caption)}</small></span><i class="bi bi-arrow-up-right quick-arrow"></i></a>`).join('')}</div></section></div>
        <section class="content-panel activity-panel">${panelHeader({ title: role === 'student' ? 'Aktivitas belajar' : 'Aktivitas terbaru', description: 'Ringkasan informasi terbaru di learnEDC' }, `<a href="#/${role === 'student' ? 'student-assignments' : 'notifications'}" class="text-link">Lihat semua <i class="bi bi-arrow-right"></i></a>`)}<div class="activity-list"><div class="activity-item"><span class="activity-dot pink-dot"><i class="bi bi-clipboard-check"></i></span><span><b>${role === 'student' ? 'Tugas baru: Membuat halaman profil responsif' : 'Aktivitas pembelajaran terbaru diperbarui'}</b><small>${role === 'student' ? 'Pemrograman Web · Tenggat 6 November' : 'XI RPL 1 · 4 November 2026'}</small></span><time>Hari ini</time></div><div class="activity-item"><span class="activity-dot blue-dot"><i class="bi bi-megaphone"></i></span><span><b>Persiapan ujian tengah semester</b><small>Pengumuman sekolah · Admin Sekolah</small></span><time>Hari ini</time></div></div></section>`;
}

function detailPage(page) {
    const details = page.details || [];
    return `<section class="content-panel detail-panel">${panelHeader(page, actionsMarkup(page.actions, page))}<div class="detail-grid">${details.map(([label, value], index) => `<div class="detail-item"><span>${esc(label)}</span><b>${index === details.length - 1 && String(value).toLowerCase().includes('aktif') ? `<span class="status-chip status-active"><i class="bi bi-check-circle"></i>${esc(value)}</span>` : esc(value)}</b></div>`).join('')}</div>${page.instructions ? `<div class="instructions-box"><h3><i class="bi bi-info-circle me-2"></i>Informasi & instruksi</h3><p>${esc(page.instructions)}</p></div>` : ''}</section>`;
}

function formPage(page) {
    const fields = page.fields || [];
    const controls = fields.map(([label, type, value, options = []], index) => {
        const id = `field-${page.id}-${index}`;
        const required = ['text', 'email', 'password', 'number', 'datetime-local', 'select', 'multiselect'].includes(type)
            || (type === 'file' && label.toLowerCase().includes('jawaban'))
            || (type === 'textarea' && !label.toLowerCase().includes('catatan'));
        const requiredMark = required ? ' <span class="required-mark">*</span>' : '';
        const requiredAttribute = required ? ' required' : '';
        if (type === 'textarea') return `<div class="col-12"><label class="form-label" for="${id}">${esc(label)}${requiredMark}</label><textarea class="form-control" id="${id}" name="${esc(label)}" rows="4" placeholder="${esc(value)}"${requiredAttribute}></textarea></div>`;
        if (type === 'select' || type === 'multiselect') return `<div class="col-md-6"><label class="form-label" for="${id}">${esc(label)}${requiredMark}</label><select class="form-select" id="${id}" name="${esc(label)}" ${type === 'multiselect' ? 'multiple size="3"' : ''}${requiredAttribute}><option value="">${esc(value)}</option>${options.map((option) => `<option>${esc(option)}</option>`).join('')}</select></div>`;
        if (type === 'checkbox') return `<div class="col-12"><label class="form-check custom-check"><input class="form-check-input" type="checkbox" id="${id}" name="${esc(label)}"><span class="form-check-label">${esc(value)}</span></label></div>`;
        if (type === 'file') return `<div class="col-md-6"><label class="form-label" for="${id}">${esc(label)}${requiredMark}</label><div class="upload-control"><i class="bi bi-cloud-arrow-up"></i><div><b>${esc(value)}</b><small>Format yang didukung sesuai kebutuhan tugas</small></div><input class="form-control" id="${id}" type="file" name="${esc(label)}"${requiredAttribute}></div></div>`;
        return `<div class="col-md-6"><label class="form-label" for="${id}">${esc(label)}${requiredMark}</label><input class="form-control" id="${id}" type="${esc(type)}" name="${esc(label)}" placeholder="${esc(value)}"${requiredAttribute} ${type === 'number' ? 'min="0" max="100"' : ''}></div>`;
    }).join('');
    const labels = page.actions || ['Simpan perubahan'];
    const formButtons = labels.map((label, index) => button(label, { action: label.toLowerCase().includes('aktifkan ujian') ? 'activate-exam' : index === labels.length - 1 ? 'submit' : 'draft', primary: index === labels.length - 1 })).join('');
    return `<section class="content-panel form-panel">${panelHeader(page)}<form class="app-form" data-demo-form><div class="row g-3">${controls}</div><div class="form-footer"><span><i class="bi bi-lock me-1"></i>Data hanya disimpan sebagai simulasi tampilan</span><div>${formButtons}</div></div></form></section>`;
}

function tablePage(page) {
    const columns = page.columns || ['Nama', 'Keterangan', 'Tanggal', 'Status'];
    const additions = JSON.parse(localStorage.getItem(`learnedc-rows-${page.id}`) || '[]');
    const data = [...(page.rows || []), ...additions];
    const filters = page.filters || [];
    const filterMarkup = filters.length ? `<select class="form-select form-select-sm table-filter" aria-label="Filter data"><option value="">${esc(filters[0])}</option>${filters.slice(1).map((filter) => `<option>${esc(filter)}</option>`).join('')}</select>` : '';
    const header = columns.map((col) => `<th scope="col">${esc(col)}</th>`).join('');
    const body = data.map((row, rowIndex) => `<tr data-row-search="${esc(row.join(' ').toLowerCase())}">${row.map((cell, cellIndex) => `<td>${cellIndex === 0 && ['admin-users', 'homeroom-students', 'teacher-submissions', 'student-submission-history'].includes(page.id) ? `<a class="table-primary-link" href="#/${page.id === 'admin-users' ? 'admin-user-detail' : page.id === 'homeroom-students' ? 'homeroom-student-detail' : page.id === 'teacher-submissions' ? 'teacher-submission-detail' : 'student-assignment-detail'}">${esc(cell)}</a>` : statusCell(cell)}</td>`).join('')}<td class="table-actions-cell"><button type="button" class="table-action" data-action="record-details" data-row-action="${rowIndex}" aria-label="Lihat detail baris ${rowIndex + 1}"><i class="bi bi-three-dots"></i></button></td></tr>`).join('');
    return `<section class="content-panel table-panel">${panelHeader(page, `<div class="table-actions">${filterMarkup}${actionsMarkup(page.actions, page)}</div>`)}<label class="table-search"><i class="bi bi-search"></i><input type="search" class="form-control" placeholder="Cari data..." aria-label="Cari data pada tabel"></label><div class="table-responsive"><table class="table app-table"><thead><tr>${header}<th scope="col" class="table-action-heading">Aksi</th></tr></thead><tbody>${body || `<tr><td colspan="${columns.length + 1}" class="empty-state">Belum ada data untuk ditampilkan.</td></tr>`}</tbody></table></div><div class="table-pagination"><span>Menampilkan <b>${data.length ? 1 : 0}–${data.length}</b> dari <b>${data.length}</b> data</span><div><button type="button" class="pagination-button" disabled aria-label="Halaman sebelumnya"><i class="bi bi-chevron-left"></i></button><button type="button" class="pagination-button active">1</button><button type="button" class="pagination-button" disabled aria-label="Halaman berikutnya"><i class="bi bi-chevron-right"></i></button></div></div></section>`;
}

function statusCell(value) {
    const text = String(value);
    const lower = text.toLowerCase();
    const tone = lower.includes('aktif') || lower.includes('hadir') || lower.includes('lengkap') || lower.includes('terbit') || lower.includes('selesai dinilai') ? 'green'
        : lower.includes('tunggu') || lower.includes('baru') || lower.includes('draf') || lower.includes('izin') ? 'amber'
            : lower.includes('terlambat') || lower.includes('perhatian') || lower.includes('alfa') || lower.includes('nonaktif') ? 'pink' : '';
    return tone ? `<span class="status-chip status-${tone}"><span></span>${esc(text)}</span>` : esc(text);
}

function gradeTable(page) {
    const columns = page.columns || [];
    const rows = page.rows || [];
    return `<section class="content-panel table-panel">${panelHeader(page, actionsMarkup(page.actions, page))}<div class="grade-summary-strip"><span><i class="bi bi-journal-check"></i> ${rows.length ? rows.length : 0} data siswa ditampilkan</span><span><i class="bi bi-calendar3"></i> Semester Ganjil 2026/2027</span></div><div class="table-responsive"><table class="table app-table grade-table"><thead><tr>${columns.map((col) => `<th>${esc(col)}</th>`).join('')}</tr></thead><tbody>${rows.map((row, ri) => `<tr>${row.map((cell, ci) => `<td>${ci === 0 ? `<a class="table-primary-link" href="#/${page.role === 'student' ? 'student-grade-detail' : 'homeroom-student-detail'}">${esc(cell)}</a>` : ci === row.length - 1 ? `<b class="grade-emphasis">${esc(cell)}</b>` : `<span class="grade-value">${esc(cell)}</span>`}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="table-pagination"><span>Nilai diperbarui otomatis setelah penilaian guru.</span>${button('Unduh Excel', { action: 'export' })}</div></section>`;
}

function analyticsPage(page) {
    const values = page.chart || [];
    const average = values.length ? (values.reduce((sum, item) => sum + Number(item[1]), 0) / values.length).toFixed(1) : '0';
    return `<section class="content-panel analytics-panel">${panelHeader(page, '<span class="panel-period">Semester Ganjil 2026/2027 <i class="bi bi-chevron-down"></i></span>')}<div class="analytics-highlight"><span><i class="bi bi-graph-up-arrow"></i></span><div><b>${average}</b><small>Rata-rata nilai keseluruhan</small></div><span class="analytics-trend"><i class="bi bi-arrow-up-right"></i> 2,4 poin dari semester lalu</span></div><div class="analytics-bars">${values.map(([label, amount], index) => `<div class="analytics-row"><div><span>${esc(label)}</span><b>${esc(amount)}</b></div><div class="chart-track"><span class="chart-fill chart-color-${index % 4}" style="width:${Math.max(4, Number(amount))}%"></span></div></div>`).join('')}</div><div class="analytics-foot"><span><i class="bi bi-info-circle"></i> Data nilai ditampilkan sebagai ringkasan dummy.</span>${button('Unduh laporan', { action: 'export' })}</div></section>`;
}

function reportPage(page) {
    return `<div class="report-layout"><section class="content-panel report-filter">${panelHeader(page)}<form class="app-form" data-demo-form><div class="row g-3">${(page.fields || []).map(([label, type, value, options = []], index) => `<div class="col-12"><label class="form-label" for="report-field-${index}">${esc(label)}</label>${type === 'select' ? `<select class="form-select" id="report-field-${index}"><option>${esc(value)}</option>${options.slice(1).map((option) => `<option>${esc(option)}</option>`).join('')}</select>` : `<input class="form-control" type="${esc(type)}" id="report-field-${index}" placeholder="${esc(value)}">`}</div>`).join('')}</div><div class="mt-4">${button('Tampilkan laporan', { action: 'preview', primary: true })}</div></form></section><section class="content-panel report-results">${panelHeader({ title: 'Ringkasan laporan', description: 'Periode tahun ajaran 2026/2027 · Ganjil' }, button('Unduh laporan', { action: 'report-download' }))}<div class="report-row report-row-head"><span>Indikator akademik</span><span>Hasil</span></div>${(page.reportRows || []).map(([label, value]) => `<div class="report-row"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}<div class="report-note"><i class="bi bi-info-circle"></i> Ringkasan ini menggunakan data dummy untuk pratinjau.</div></section></div>`;
}

function reportCard(page) {
    return `<section class="content-panel table-panel">${panelHeader(page, actionsMarkup(page.actions, page))}<div class="report-banner"><span class="report-banner-icon"><i class="bi bi-award"></i></span><span><b>Rapor Semester Ganjil 2026/2027</b><small>XI RPL 1 · 32 siswa · Wali kelas: Andini Rahmawati</small></span><span class="status-chip status-amber">Belum diterbitkan</span></div><div class="table-responsive"><table class="table app-table"><thead><tr><th>Siswa</th><th>Rata-rata nilai</th><th>Kelengkapan</th><th>Preview</th></tr></thead><tbody>${(page.reportRows || []).map(([name, grade, status]) => `<tr><td><a class="table-primary-link" href="#/homeroom-student-detail">${esc(name)}</a></td><td>${esc(grade)}</td><td>${statusCell(status)}</td><td><button class="btn btn-soft btn-sm" type="button" data-action="preview"><i class="bi bi-eye me-1"></i>Lihat rapor</button></td></tr>`).join('')}</tbody></table></div><div class="publish-notice"><i class="bi bi-shield-check"></i><span>Setelah rapor diterbitkan, nilai semester dikunci dan rapor dapat diunduh oleh siswa.</span></div></section>`;
}

function notificationsPage() {
    const items = [
        ['bi-clipboard-check', 'pink', 'Tugas baru: Membuat halaman profil responsif', 'Andini Rahmawati · Pemrograman Web · Tenggat 6 November 2026', '10 menit yang lalu'],
        ['bi-megaphone', 'blue', 'Persiapan ujian tengah semester', 'Admin Sekolah · Ujian dimulai pada 17 November 2026', '2 jam yang lalu'],
        ['bi-award', 'mint', 'Nilai tugas HTML semantik telah diterbitkan', 'Andini Rahmawati · Nilai Anda 92', 'Kemarin'],
        ['bi-journal-bookmark', 'lilac', 'Materi baru tersedia: Pengenalan HTML Semantik', 'Andini Rahmawati · Pemrograman Web', '2 hari yang lalu'],
    ];
    return `<section class="content-panel notifications-panel"><div class="notifications-toolbar"><span><b>4 notifikasi</b> · Menampilkan pemberitahuan terbaru</span><button class="text-button" type="button" data-action="mark-read"><i class="bi bi-check2-all me-1"></i>Tandai semua dibaca</button></div><div class="notification-list">${items.map(([icon, color, title, detail, time]) => `<article class="notification-item"><span class="notification-avatar ${color}"><i class="bi ${icon}"></i></span><div><b>${esc(title)}</b><p>${esc(detail)}</p><small>${esc(time)}</small></div><span class="notification-unread"></span></article>`).join('')}</div></section>`;
}

function profilePage(page, role) {
    const info = roles[role];
    const profile = JSON.parse(localStorage.getItem('learnedc-profile') || '{}');
    const name = profile.name || info.name;
    return `<section class="profile-layout"><div class="content-panel profile-card"><div class="profile-cover"></div><div class="profile-details"><span class="profile-avatar-large">${esc(info.initials)}</span><h2>${esc(name)}</h2><p>${esc(info.unit)}</p><span class="profile-status"><i class="bi bi-patch-check-fill"></i> Akun aktif</span><div class="profile-action">${button('Edit profil', { page: 'edit-profile', primary: true })}${button('Ganti password', { page: 'change-password' })}</div></div></div><section class="content-panel profile-info">${panelHeader({ title: 'Informasi akun', description: 'Informasi profil dan kontak yang terhubung' })}<div class="detail-grid">${[['Nama lengkap', name], ['NISN / NIP', role === 'student' ? '0064827310' : '198702122015032001'], ['Email', profile.email || 'nadia.aulia@sekolah.sch.id'], ['Nomor WhatsApp', profile.phone || '0812 3456 7890'], ['Role', info.label], ['Kelas / unit', info.unit]].map(([label, value]) => `<div class="detail-item"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}</div></section></section>`;
}

function loginPage() {
    return `<div class="login-layout"><section class="login-visual"><a class="login-brand" href="#/login"><img src="/images/learnedc-logo.png" alt="Logo learnEDC"><span>learn<span>EDC</span></span></a><div class="login-visual-copy"><span class="welcome-pill"><i class="bi bi-stars"></i> RUANG BELAJAR DIGITAL</span><h1>Belajar lebih mudah.<br><span>Bertumbuh bersama.</span></h1><p>Satu ruang untuk materi, tugas, kelas, dan setiap langkah perjalanan akademikmu.</p><div class="login-art"><div class="login-orbit orbit-one"></div><div class="login-orbit orbit-two"></div><img src="/images/learnedc-logo.png" alt=""></div></div><div class="login-visual-footer"><span>© 2026 learnEDC</span><span>Belajar hari ini, tumbuh setiap hari <i class="bi bi-heart-fill"></i></span></div></section><section class="login-main"><div class="login-form-wrap"><div class="login-mobile-brand"><img src="/images/learnedc-logo.png" alt=""> <b>learn<span>EDC</span></b></div><span class="login-eyebrow">SELAMAT DATANG KEMBALI</span><h2>Masuk ke akunmu</h2><p>Pilih role demo dan masuk untuk menjelajahi tampilan learnEDC.</p><form id="login-form"><label class="form-label" for="login-role">Masuk sebagai</label><select class="form-select" id="login-role">${Object.entries(roles).map(([id, info]) => `<option value="${id}"${id === 'student' ? ' selected' : ''}>${esc(info.label)}</option>`).join('')}</select><label class="form-label mt-3" for="login-identity">NISN / NIP</label><div class="input-icon-wrap"><i class="bi bi-person"></i><input class="form-control" id="login-identity" autocomplete="username" value="0064827310" required></div><label class="form-label mt-3" for="login-password">Password</label><div class="input-icon-wrap"><i class="bi bi-lock"></i><input class="form-control" type="password" id="login-password" autocomplete="current-password" value="belajar123" required><button type="button" class="password-toggle" data-action="toggle-password" aria-label="Tampilkan password"><i class="bi bi-eye"></i></button></div><div class="login-options"><label class="form-check"><input class="form-check-input" type="checkbox" checked><span class="form-check-label">Ingat saya</span></label><a href="#/change-password">Lupa password?</a></div><button class="btn btn-primary w-100 login-submit" type="submit">Masuk ke learnEDC <i class="bi bi-arrow-right"></i></button><div class="demo-hint"><i class="bi bi-info-circle"></i><span>Demo tampilan front-end. Pilih role di atas untuk mencoba dashboard yang berbeda.</span></div></form></div><div class="login-main-footer">Dengan masuk, Anda menyetujui kebijakan penggunaan platform sekolah.</div></section></div>`;
}

function viewerPage(page) {
    return `<section class="viewer-layout"><div class="content-panel viewer-main"><div class="viewer-toolbar"><div><span class="viewer-kicker">PEMBELAJARAN · PERTEMUAN 4</span><h2>Pengenalan HTML Semantik</h2></div><div class="viewer-toggle"><button class="active" type="button" data-viewer-tab="video"><i class="bi bi-play-btn"></i> Video</button><button type="button" data-viewer-tab="pdf"><i class="bi bi-file-earmark-pdf"></i> Materi PDF</button></div></div><div class="viewer-video" data-viewer-content="video"><div class="video-decoration"><i class="bi bi-play-circle-fill"></i><span>Video pembelajaran</span><small>Pengenalan HTML Semantik · 12:08</small></div><div class="video-controls"><button type="button" data-action="video-play" aria-label="Putar video"><i class="bi bi-play-fill"></i></button><span>0:00</span><div class="video-track"><span></span></div><span>12:08</span><button type="button" data-action="video-fullscreen" aria-label="Layar penuh"><i class="bi bi-fullscreen"></i></button></div></div><div class="pdf-preview d-none" data-viewer-content="pdf"><div class="pdf-toolbar"><span>HTML_semantik.pdf</span><span>Halaman 1 dari 4</span><button type="button" class="btn btn-light btn-sm" data-action="export"><i class="bi bi-download me-1"></i>Unduh</button></div><div class="pdf-paper"><span class="pdf-chip">PEMROGRAMAN WEB · PERTEMUAN 4</span><h3>Pengenalan HTML Semantik</h3><p>HTML semantik memberikan makna yang lebih jelas terhadap struktur halaman web. Elemen semantik membantu browser dan pembaca layar memahami isi dokumen.</p><h4>Mengapa HTML semantik penting?</h4><p>Struktur yang bermakna meningkatkan aksesibilitas, keterbacaan kode, dan kemudahan optimasi mesin pencari.</p><div class="pdf-code">&lt;header&gt; Bagian kepala halaman &lt;/header&gt;<br>&lt;main&gt; Konten utama &lt;/main&gt;<br>&lt;footer&gt; Informasi penutup &lt;/footer&gt;</div><p>Gunakan elemen sesuai fungsi konten, dan pastikan hierarki heading tersusun secara logis.</p></div></div><div class="viewer-footer"><span><i class="bi bi-info-circle"></i> Tandai materi selesai setelah mempelajarinya.</span>${actionsMarkup(page.actions, page)}</div></div><aside class="content-panel viewer-sidebar">${panelHeader({ title: 'Informasi materi', description: 'Pemrograman Web · XI RPL 1' })}<div class="detail-list">${(page.details || []).map(([label, value]) => `<div><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}</div><div class="teacher-note"><i class="bi bi-chat-square-text"></i><span><b>Catatan guru</b><small>Pelajari contoh kode sebelum mengerjakan tugas.</small></span></div><a class="viewer-assignment-link" href="#/student-assignments">Lihat tugas terkait <i class="bi bi-arrow-right"></i></a></aside></section>`;
}

function courseList(page) {
    const subjects = [['Pemrograman Web', 'Produktif RPL', 'Andini Rahmawati, S.Kom.', '78', 'blue', 'bi-code-slash'], ['Basis Data', 'Produktif RPL', 'Seno Wibowo, S.Kom.', '71', 'pink', 'bi-database'], ['Bahasa Inggris', 'Bahasa', 'Dimas Pratama, S.Pd.', '84', 'mint', 'bi-globe2'], ['Matematika', 'Sains', 'Maya Permata, S.Pd.', '65', 'lilac', 'bi-calculator'], ['Pendidikan Pancasila', 'Umum', 'Ratna Kusuma, M.Pd.', '90', 'pink', 'bi-people'], ['Produk Kreatif & Kewirausahaan', 'Produktif RPL', 'Dewi Lestari, S.Pd.', '58', 'blue', 'bi-lightbulb']];
    return `<div class="course-card-grid">${subjects.map(([title, category, teacher, progress, color, icon]) => `<a class="content-panel subject-card" href="#/student-subject-detail"><span class="subject-icon ${color}"><i class="bi ${icon}"></i></span><span class="subject-category">${esc(category)}</span><h2>${esc(title)}</h2><p><i class="bi bi-person"></i> ${esc(teacher)}</p><div class="progress-label"><span>Progres belajar</span><b>${progress}%</b></div><div class="progress"><div class="progress-bar progress-${color}" style="width:${progress}%"></div></div><span class="subject-open">Buka kelas <i class="bi bi-arrow-up-right"></i></span></a>`).join('')}</div>`;
}

function materialList(page) {
    return `<section class="content-panel table-panel">${panelHeader(page, '<a href="#/student-subjects" class="text-link">Pemrograman Web <i class="bi bi-chevron-down"></i></a>')}<div class="material-list">${(page.rows || []).map(([meet, title, kind, date, status]) => `<a href="#/student-material-viewer" class="material-row"><span class="material-file ${status === 'Selesai' ? 'mint' : 'blue'}"><i class="bi ${kind.includes('Video') ? 'bi-play-btn' : 'bi-file-earmark-pdf'}"></i></span><span class="material-title"><small>${esc(meet)}</small><b>${esc(title)}</b><span>${esc(kind)} · Diterbitkan ${esc(date)}</span></span>${statusCell(status)}<i class="bi bi-chevron-right material-chevron"></i></a>`).join('')}</div></section>`;
}

function studentAssignments(page, exams = false) {
    const columns = exams ? ['Nama ujian', 'Mata pelajaran', 'Jadwal', 'Status'] : ['Nama tugas', 'Mata pelajaran', 'Tenggat pengumpulan', 'Status'];
    const rows = page.rows || [];
    return `<section class="content-panel table-panel">${panelHeader(page, '<a href="#/student-submission-history" class="text-link">Riwayat pengumpulan <i class="bi bi-arrow-right"></i></a>')}<div class="assignment-filter">${(page.filters || []).map((filter, index) => `<button type="button" class="filter-chip${index === 0 ? ' active' : ''}" data-filter="${index === 0 ? '' : esc(filter)}">${esc(filter)}${index === 0 ? '<span>4</span>' : ''}</button>`).join('')}</div><div class="table-responsive"><table class="table app-table"><thead><tr>${columns.map((column) => `<th>${esc(column)}</th>`).join('')}<th>Aksi</th></tr></thead><tbody>${rows.map((row, index) => `<tr data-row-search="${esc(row.join(' ').toLowerCase())}">${row.map((cell, ci) => `<td>${ci === 0 ? `<a class="table-primary-link" href="#/${exams ? 'student-exam-room' : 'student-assignment-detail'}">${esc(cell)}</a>` : statusCell(cell)}</td>`).join('')}<td><a class="table-action-link" href="#/${exams ? (row.at(-1) === 'Selesai' ? 'student-gradebook' : 'student-exam-room') : 'student-assignment-detail'}">${exams ? (row.at(-1) === 'Selesai' ? 'Lihat nilai' : 'Ruang ujian') : (index === 0 ? 'Kerjakan' : 'Detail')} <i class="bi bi-arrow-up-right"></i></a></td></tr>`).join('')}</tbody></table></div></section>`;
}

function assignmentDetail(page) {
    return `<div class="detail-layout"><section class="content-panel detail-panel">${panelHeader(page)}<div class="detail-grid">${(page.details || []).map(([label, value]) => `<div class="detail-item"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}</div><div class="instructions-box"><h3><i class="bi bi-card-text me-2"></i>Instruksi pengerjaan</h3><p>${esc(page.instructions)}</p></div><div class="assignment-detail-actions">${actionsMarkup(page.actions, page)}</div></section><aside class="content-panel assignment-tip"><span class="tip-icon"><i class="bi bi-lightbulb"></i></span><h3>Tips mengerjakan</h3><p>Baca seluruh instruksi sebelum mulai. Pastikan berkas jawaban menggunakan format yang sesuai.</p><a href="#/student-materials">Lihat materi terkait <i class="bi bi-arrow-right"></i></a></aside></div>`;
}

function submissions(page) {
    return tablePage(page);
}

function examRoom(page) {
    return `<section class="content-panel exam-room-panel"><div class="exam-room-banner"><span class="exam-room-icon"><i class="bi bi-patch-question"></i></span><span class="status-chip status-green"><span></span>Ujian akan datang</span></div><h2>Ujian Harian · HTML & CSS</h2><p class="exam-room-subtitle">Pemrograman Web · Kelas XI RPL 1</p><div class="exam-info-grid">${(page.details || []).map(([label, value]) => `<div class="exam-info-item"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}</div><div class="instructions-box"><h3><i class="bi bi-exclamation-circle me-2"></i>Petunjuk ujian</h3><p>${esc(page.instructions)}</p><ul><li>Kerjakan ujian secara mandiri dan jujur.</li><li>Periksa koneksi sebelum memulai. Timer tidak dapat dijeda.</li><li>Jawaban tersimpan otomatis selama ujian berlangsung.</li></ul></div><div class="exam-room-actions">${actionsMarkup(page.actions, page)}</div></section>`;
}

function examTake(page) {
    const questions = page.questions || [];
    return `<section class="exam-layout"><div class="exam-main"><div class="exam-topline"><span class="exam-label"><i class="bi bi-patch-question"></i> UJIAN HARIAN · HTML & CSS</span><span class="exam-timer" id="exam-timer" data-minutes="60"><i class="bi bi-stopwatch"></i><b>60:00</b></span></div><div class="exam-progress"><div><span>Progres ujian</span><b id="question-progress">Soal 1 dari ${questions.length}</b></div><div class="progress"><div class="progress-bar" id="question-progress-bar" style="width:${100 / questions.length}%"></div></div></div>${questions.map(([question, answers], index) => `<article class="question-card${index === 0 ? '' : ' d-none'}" data-question="${index}"><div class="question-heading"><span>SOAL ${String(index + 1).padStart(2, '0')}</span><span class="question-type">${answers.length ? 'Pilihan ganda · 5 poin' : 'Esai · 15 poin'}</span></div><h2>${esc(question)}</h2>${answers.length ? `<div class="answer-options">${answers.map((answer, answerIndex) => `<label class="answer-option"><input type="radio" name="question-${index}" value="${answerIndex}"><span class="answer-letter">${String.fromCharCode(65 + answerIndex)}</span><span>${esc(answer)}</span></label>`).join('')}</div>` : '<textarea class="form-control essay-answer" rows="5" placeholder="Tuliskan jawaban Anda…"></textarea>'}</article>`).join('')}<div class="exam-navigation"><button class="btn btn-soft btn-sm" type="button" data-action="previous-question" disabled><i class="bi bi-arrow-left me-1"></i>Sebelumnya</button><button class="btn btn-soft btn-sm" type="button" data-action="mark-question"><i class="bi bi-flag me-1"></i>Ragu-ragu</button><button class="btn btn-primary btn-sm" type="button" data-action="next-question">Soal berikutnya <i class="bi bi-arrow-right ms-1"></i></button></div></div><aside class="content-panel exam-question-map"><h3>Daftar soal</h3><p>Pilih nomor soal untuk berpindah.</p><div class="question-map">${questions.map((_, index) => `<button type="button" class="question-number${index === 0 ? ' active' : ''}" data-question-jump="${index}">${index + 1}</button>`).join('')}</div><div class="exam-map-legend"><span><i></i>Belum dijawab</span><span><i></i>Sudah dijawab</span><span><i></i>Ragu-ragu</span></div><button class="btn btn-outline-primary btn-sm w-100 mt-4" type="button" data-page="student-exam-confirm">Selesai ujian</button></aside></section>`;
}

function confirmExam(page) {
    return `<section class="content-panel exam-confirm-panel"><span class="confirm-icon"><i class="bi bi-check2-circle"></i></span><h2>Periksa kembali jawabanmu</h2><p>Pastikan jawaban sudah tersimpan sebelum mengakhiri ujian.</p><div class="confirm-summary">${(page.details || []).map(([label, value], index) => `<div><span>${esc(label)}</span><b class="${index === 2 ? 'text-warning' : ''}">${esc(value)}</b></div>`).join('')}</div><div class="confirm-warning"><i class="bi bi-exclamation-triangle"></i><span>Setelah ujian diakhiri, jawaban tidak dapat diubah kembali.</span></div><div class="exam-room-actions">${(page.actions || []).map((label) => button(label, { page: label.toLowerCase().includes('kembali') ? 'student-exam-take' : '', action: label.toLowerCase().includes('akhiri') ? 'finish-exam' : '', primary: label.toLowerCase().includes('akhiri') })).join('')}</div></section>`;
}

function gradeDetail(page) {
    return `<section class="content-panel detail-panel">${panelHeader(page, '<a class="text-link" href="#/student-gradebook"><i class="bi bi-arrow-left"></i> Kembali ke buku nilai</a>')}<div class="grade-detail-score"><span>Nilai tugas</span><b>92<small>/100</small></b><span class="grade-badge">Sangat baik</span></div><div class="detail-grid">${(page.details || []).map(([label, value]) => `<div class="detail-item"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}</div><div class="feedback-box"><span class="feedback-icon"><i class="bi bi-chat-square-quote"></i></span><div><b>Feedback dari guru</b><p>${esc(page.instructions)}</p><small><i class="bi bi-person-circle me-1"></i>Andini Rahmawati · 3 November 2026</small></div></div></section>`;
}

function studentReport(page) {
    return `<section class="content-panel report-card-list">${panelHeader(page)}<div class="report-welcome"><span><i class="bi bi-award"></i></span><div><b>Rapor hasil belajarmu</b><p>Dokumen rapor resmi tersedia setelah wali kelas menerbitkannya.</p></div></div>${(page.reportRows || []).map(([period, classroom, status]) => `<article class="report-item"><span class="report-item-icon"><i class="bi bi-file-earmark-pdf"></i></span><span><b>${esc(period)}</b><small>${esc(classroom)} · Rapor semester</small></span>${status.includes('Tersedia') ? `<span class="status-chip status-green"><span></span>Tersedia</span>${button('Unduh PDF', { action: 'export' })}` : `<span class="status-chip status-amber"><span></span>Belum terbit</span>`}</article>`).join('')}</section>`;
}

function submissionDetail(page) {
    return `<div class="detail-layout"><section class="content-panel detail-panel">${panelHeader(page, actionsMarkup(page.actions, page))}<div class="detail-grid">${(page.details || []).map(([label, value]) => `<div class="detail-item"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}</div><div class="submission-file"><span><i class="bi bi-file-earmark-zip"></i></span><span><b>halaman-profil-nadia.zip</b><small>ZIP · 2.4 MB · Dikirim 4 November 2026</small></span>${button('Unduh lampiran', { action: 'export' })}</div><a class="btn btn-primary btn-sm mt-4" href="#/teacher-grade-feedback"><i class="bi bi-pencil-square me-1"></i>Mulai penilaian</a></section><aside class="content-panel assignment-tip"><span class="tip-icon"><i class="bi bi-lightbulb"></i></span><h3>Panduan penilaian</h3><p>Nilai jawaban secara objektif, berikan feedback yang jelas dan membangun, lalu simpan hasil penilaian.</p></aside></div>`;
}

function examPreview(page) {
    return `<section class="content-panel detail-panel">${panelHeader(page, button('Mulai preview', { action: 'preview', primary: true }))}<div class="detail-grid">${(page.details || []).map(([label, value]) => `<div class="detail-item"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}</div><div class="instructions-box"><h3><i class="bi bi-eye me-2"></i>Pratinjau peserta</h3><p>Peserta melihat instruksi ujian, informasi durasi, dan indikator soal sebelum mulai mengerjakan.</p><a href="#/student-exam-room" class="btn btn-soft btn-sm mt-2">Lihat ruang ujian siswa <i class="bi bi-arrow-up-right ms-1"></i></a></div></section>`;
}

function essayGrading(page) {
    return tablePage(page);
}

function notificationsOrPlaceholder(page) {
    return `<section class="content-panel empty-panel"><span><i class="bi bi-layout-text-window-reverse"></i></span><h2>${esc(page.title)}</h2><p>Informasi dan pengaturan untuk ${esc(page.title.toLowerCase())} akan ditampilkan di sini.</p></section>`;
}

export function renderPage(page, role) {
    switch (page.type) {
        case 'dashboard': return dash(page, role);
        case 'profile': return profilePage(page, role);
        case 'form': return formPage(page);
        case 'table': return tablePage(page);
        case 'detail': return detailPage(page);
        case 'grades': return gradeTable(page);
        case 'analytics': return analyticsPage(page);
        case 'report': return reportPage(page);
        case 'report-card': return reportCard(page);
        case 'notifications': return notificationsPage();
        case 'viewer': return viewerPage(page);
        case 'course-list': return courseList(page);
        case 'course-detail': return detailPage(page);
        case 'materials': return materialList(page);
        case 'student-assignments': return studentAssignments(page);
        case 'exam-list': return studentAssignments(page, true);
        case 'assignment-detail': return assignmentDetail(page);
        case 'submission-detail': return submissionDetail(page);
        case 'exam-room': return examRoom(page);
        case 'exam-take': return examTake(page);
        case 'exam-confirm': return confirmExam(page);
        case 'grade-detail': return gradeDetail(page);
        case 'student-report': return studentReport(page);
        case 'exam-preview': return examPreview(page);
        case 'grading': return essayGrading(page);
        case 'login': return loginPage();
        default: return notificationsOrPlaceholder(page);
    }
}

export { esc, actionsMarkup, button };
