import { pageById, roles } from './pages/index.js';
import { renderPage, esc } from './components.js';
import { renderShell } from './shell.js';

const root = document.getElementById('app');
const defaultRole = 'student';
let toastInstance;

function activeRole() {
    const saved = localStorage.getItem('learnedc-role');
    return Object.hasOwn(roles, saved) ? saved : defaultRole;
}

function navigate(id) {
    if (!pageById.has(id) && id !== 'login') return;
    if (location.hash === `#/${id}`) render();
    else location.hash = `/${id}`;
}

function render() {
    const id = decodeURIComponent(location.hash.replace(/^#\/?/, '')) || 'login';
    const currentPage = pageById.get(id);
    if (!currentPage && id !== 'login') {
        navigate(activeRole() === 'student' ? roles.student.dashboard : roles[activeRole()].dashboard);
        return;
    }

    if (id === 'login') {
        root.innerHTML = renderPage({ id: 'login', type: 'login', title: 'Masuk' }, defaultRole);
        return;
    }

    const role = currentPage.role === 'global' ? activeRole() : currentPage.role;
    if (currentPage.role !== 'global' && role !== activeRole()) localStorage.setItem('learnedc-role', role);
    root.innerHTML = renderShell(currentPage, role, renderPage(currentPage, role));
    bindExamTimer(currentPage);
}

function showToast(message, tone = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const element = document.createElement('div');
    element.className = `toast align-items-center border-0 ${tone === 'error' ? 'text-bg-danger' : 'learnedc-toast'}`;
    element.setAttribute('role', 'status');
    element.innerHTML = `<div class="d-flex"><div class="toast-body"><i class="bi ${tone === 'error' ? 'bi-exclamation-circle' : 'bi-check-circle'} me-2"></i>${esc(message)}</div><button type="button" class="btn-close ${tone === 'error' ? 'btn-close-white' : ''} me-2 m-auto" data-bs-dismiss="toast" aria-label="Tutup"></button></div>`;
    container.append(element);
    toastInstance = bootstrap.Toast.getOrCreateInstance(element, { delay: 3200 });
    toastInstance.show();
    element.addEventListener('hidden.bs.toast', () => element.remove(), { once: true });
}

function confirmAction(title, message, label, callback) {
    const modal = document.getElementById('app-modal');
    if (!modal) return;
    document.getElementById('app-modal-title').textContent = title;
    document.getElementById('app-modal-body').textContent = message;
    const confirmButton = document.getElementById('app-modal-confirm');
    confirmButton.textContent = label;
    bootstrap.Modal.getOrCreateInstance(modal).show();
    confirmButton.onclick = () => {
        bootstrap.Modal.getOrCreateInstance(modal).hide();
        callback();
    };
}

function inputAction(title, fields, label, callback) {
    const modal = document.getElementById('app-modal');
    if (!modal) return;
    document.getElementById('app-modal-title').textContent = title;
    document.getElementById('app-modal-body').innerHTML = fields.map((field, index) => `
        <label class="form-label" for="modal-field-${index}">${esc(field.label)}</label>
        ${field.multiline
            ? `<textarea class="form-control mb-3" id="modal-field-${index}" rows="3" placeholder="${esc(field.placeholder || '')}"></textarea>`
            : `<input class="form-control mb-3" id="modal-field-${index}" type="text" placeholder="${esc(field.placeholder || '')}">`}`).join('');
    const confirmButton = document.getElementById('app-modal-confirm');
    confirmButton.textContent = label;
    bootstrap.Modal.getOrCreateInstance(modal).show();
    confirmButton.onclick = () => {
        const values = fields.map((_, index) => document.getElementById(`modal-field-${index}`).value.trim());
        if (values.some((value) => !value)) {
            showToast('Lengkapi semua kolom terlebih dahulu.', 'error');
            return;
        }
        bootstrap.Modal.getOrCreateInstance(modal).hide();
        callback(values);
    };
}

function saveTableRow(pageId, row) {
    const key = `learnedc-rows-${pageId}`;
    const additions = JSON.parse(localStorage.getItem(key) || '[]');
    additions.unshift(row);
    localStorage.setItem(key, JSON.stringify(additions));
}

function downloadCsv(filename, rows) {
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showToast('File contoh berhasil diunduh.');
}

function handleAction(button) {
    const action = button.dataset.action;
    if (!action) return;

    if (action === 'back') {
        if (history.length > 1) history.back();
        else navigate(roles[activeRole()].dashboard);
    } else if (action === 'logout') {
        confirmAction('Keluar dari learnEDC?', 'Anda akan kembali ke halaman masuk.', 'Keluar', () => {
            localStorage.removeItem('learnedc-role');
            navigate('login');
        });
    } else if (action === 'submit' || action === 'draft') {
        const form = button.closest('form');
        if (form && !form.reportValidity()) return;
        if (form?.id === 'login-form') {
            const role = document.getElementById('login-role').value;
            localStorage.setItem('learnedc-role', role);
            navigate(roles[role].dashboard);
            return;
        }
        if (form?.dataset.demoForm !== undefined) {
            form.dataset.saveMode = action;
            form.dataset.saveLabel = button.textContent.trim();
            form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
    } else if (action === 'finish-exam') {
        confirmAction('Akhiri ujian sekarang?', 'Jawaban yang sudah dikirim tidak dapat diubah. Pastikan Anda siap menyelesaikan ujian.', 'Akhiri ujian', () => {
            localStorage.removeItem('learnedc-exam-deadline');
            navigate('student-gradebook');
            showToast('Ujian berhasil diselesaikan. Jawaban Anda tersimpan.');
        });
    } else if (action === 'publish') {
        confirmAction('Kunci & terbitkan rapor?', 'Nilai semester akan dikunci dan rapor dapat diunduh oleh siswa.', 'Terbitkan rapor', () => showToast('Simulasi: rapor berhasil diterbitkan.'));
    } else if (action === 'reset-password') {
        confirmAction('Reset password pengguna?', 'Password demo akan dikembalikan ke password awal.', 'Reset password', () => showToast('Simulasi: password pengguna berhasil direset.'));
    } else if (action === 'account-toggle') {
        const isActive = button.textContent.toLowerCase().includes('nonaktif');
        confirmAction(isActive ? 'Nonaktifkan akun ini?' : 'Aktifkan akun ini?', 'Perubahan status akun hanya disimulasikan di tampilan ini.', isActive ? 'Nonaktifkan' : 'Aktifkan', () => {
            button.textContent = isActive ? 'Aktifkan akun' : 'Nonaktifkan akun';
            showToast(isActive ? 'Simulasi: akun dinonaktifkan.' : 'Simulasi: akun diaktifkan kembali.');
        });
    } else if (action === 'add-record') {
        const pageId = location.hash.slice(2);
        const pageTitle = document.querySelector('.page-heading h1')?.textContent || 'data';
        inputAction(`Tambah ${pageTitle.toLowerCase()}`, [{ label: 'Nama / judul', placeholder: 'Masukkan nama atau judul' }], 'Simpan', ([name]) => {
            const headings = [...document.querySelectorAll('.app-table thead th')].map((cell) => cell.textContent.trim());
            const row = headings.filter((heading) => heading !== 'Aksi').map((heading, index) => index === 0 ? name : heading.toLowerCase().includes('status') ? 'Draf' : '—');
            saveTableRow(pageId, row);
            render();
            showToast('Data contoh berhasil ditambahkan.');
        });
    } else if (action === 'announcement-compose') {
        inputAction('Tulis pengumuman sekolah', [
            { label: 'Judul pengumuman', placeholder: 'Contoh: Jadwal kegiatan sekolah' },
            { label: 'Isi pengumuman', placeholder: 'Tulis informasi untuk warga sekolah…', multiline: true },
        ], 'Simpan draf', ([title, description]) => {
            const date = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());
            saveTableRow('principal-announcements', [title, 'Seluruh warga sekolah', date, 'Draf']);
            localStorage.setItem('learnedc-last-announcement', description);
            render();
            showToast('Pengumuman berhasil disimpan sebagai draf.');
        });
    } else if (action === 'export') {
        const table = document.querySelector('.app-table');
        const rows = table
            ? [...table.querySelectorAll('tr')].map((row) => {
                const cells = [...row.querySelectorAll('th,td')];
                return cells.at(-1)?.innerText.trim() === 'Aksi' ? cells.slice(0, -1).map((cell) => cell.innerText.trim()) : cells.map((cell) => cell.innerText.trim());
            })
            : [['learnEDC', 'Laporan contoh'], ['Periode', '2026/2027 · Ganjil'], ['Status', 'Data dummy untuk pratinjau']];
        downloadCsv('learnEDC-laporan.csv', rows);
    } else if (action === 'report-download') {
        const format = document.querySelector('#report-field-3')?.value || 'PDF';
        if (format.toLowerCase().includes('excel')) {
            const rows = [['Indikator akademik', 'Hasil'], ...[...document.querySelectorAll('.report-row:not(.report-row-head)')].map((row) => [...row.children].map((cell) => cell.innerText.trim()))];
            downloadCsv('learnEDC-laporan-akademik.csv', rows);
        } else {
            window.print();
        }
    } else if (action === 'print-report') {
        window.print();
    } else if (action === 'import') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv,.xlsx,.xls';
        input.addEventListener('change', () => {
            const file = input.files?.[0];
            if (file) showToast(`${file.name} dipilih. Impor data tidak tersedia di demo front-end.`);
        });
        input.click();
    } else if (action === 'preview') {
        confirmAction('Pratinjau data', 'Ini adalah pratinjau menggunakan data dummy. Tidak ada perubahan data yang disimpan.', 'Mengerti', () => {});
    } else if (action === 'mark-read') {
        document.querySelectorAll('.notification-unread').forEach((item) => item.remove());
        showToast('Semua notifikasi ditandai sudah dibaca.');
    } else if (action === 'activate-exam') {
        confirmAction('Aktifkan ujian CBT?', 'Ujian akan tersedia sesuai jadwal yang sudah diatur.', 'Aktifkan ujian', () => {
            navigate('teacher-cbt-preview');
            showToast('Simulasi: ujian CBT berhasil diaktifkan.');
        });
    } else if (action === 'record-details') {
        const row = button.closest('tr');
        const details = [...(row?.querySelectorAll('td') || [])].slice(0, -1).map((cell) => cell.innerText.trim()).filter(Boolean);
        confirmAction('Detail data', details.join(' · ') || 'Tidak ada informasi tambahan untuk baris ini.', 'Tutup', () => {});
    } else if (action === 'mark-complete') {
        button.textContent = 'Materi selesai';
        button.disabled = true;
        button.classList.add('btn-success');
        showToast('Materi ditandai sudah selesai dipelajari.');
    } else if (action === 'toggle-password') {
        const password = document.getElementById('login-password');
        const icon = button.querySelector('i');
        password.type = password.type === 'password' ? 'text' : 'password';
        icon.className = `bi ${password.type === 'password' ? 'bi-eye' : 'bi-eye-slash'}`;
    } else if (action === 'video-play') {
        const playIcon = button.querySelector('i');
        const playing = playIcon.classList.contains('bi-play-fill');
        playIcon.className = `bi ${playing ? 'bi-pause-fill' : 'bi-play-fill'}`;
        document.querySelector('.video-decoration span').textContent = playing ? 'Video sedang diputar' : 'Video dijeda';
        showToast(playing ? 'Pratinjau video dimulai.' : 'Pratinjau video dijeda.');
    } else if (action === 'video-fullscreen') {
        const viewer = document.querySelector('.viewer-video');
        if (document.fullscreenElement) document.exitFullscreen();
        else viewer?.requestFullscreen?.();
    } else if (action === 'mark-question') {
        const active = Number(document.querySelector('.question-card:not(.d-none)')?.dataset.question || 0);
        const number = document.querySelector(`[data-question-jump="${active}"]`);
        number?.classList.toggle('marked');
        showToast('Status ragu-ragu diperbarui.');
    } else if (action === 'previous-question' || action === 'next-question') {
        moveQuestion(action === 'next-question' ? 1 : -1);
    } else {
        showToast('Aksi ini merupakan simulasi tampilan front-end.');
    }
}

function moveQuestion(delta, targetIndex) {
    const cards = [...document.querySelectorAll('.question-card')];
    if (!cards.length) return;
    const current = cards.findIndex((card) => !card.classList.contains('d-none'));
    const next = targetIndex ?? Math.max(0, Math.min(cards.length - 1, current + delta));
    cards[current]?.querySelector('input:checked')?.closest('.answer-option')?.classList.add('answered');
    cards[current]?.querySelector('textarea')?.classList.toggle('answered', Boolean(cards[current]?.querySelector('textarea').value.trim()));
    cards.forEach((card, index) => card.classList.toggle('d-none', index !== next));
    document.querySelectorAll('[data-question-jump]').forEach((button, index) => button.classList.toggle('active', index === next));
    document.getElementById('question-progress').textContent = `Soal ${next + 1} dari ${cards.length}`;
    document.getElementById('question-progress-bar').style.width = `${((next + 1) / cards.length) * 100}%`;
    const previous = document.querySelector('[data-action="previous-question"]');
    const nextButton = document.querySelector('[data-action="next-question"]');
    previous.disabled = next === 0;
    nextButton.disabled = next === cards.length - 1;
    nextButton.innerHTML = next === cards.length - 1 ? 'Semua soal <i class="bi bi-check2 ms-1"></i>' : 'Soal berikutnya <i class="bi bi-arrow-right ms-1"></i>';
}

function bindExamTimer(currentPage) {
    clearInterval(window.learnedcExamTimer);
    if (currentPage.type !== 'exam-take') return;
    let deadline = Number(localStorage.getItem('learnedc-exam-deadline'));
    if (!deadline || deadline < Date.now()) {
        deadline = Date.now() + 60 * 60 * 1000;
        localStorage.setItem('learnedc-exam-deadline', String(deadline));
    }
    const update = () => {
        const seconds = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
        const timer = document.querySelector('#exam-timer b');
        if (timer) timer.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
        if (seconds === 0) {
            clearInterval(window.learnedcExamTimer);
            showToast('Waktu ujian telah berakhir.', 'error');
            navigate('student-exam-confirm');
        }
    };
    update();
    window.learnedcExamTimer = setInterval(update, 1000);
}

root.addEventListener('click', (event) => {
    const target = event.target.closest('button, a, [data-question-jump], [data-viewer-tab], [data-sidebar-close]');
    if (!target) return;
    if (target.matches('[data-sidebar-toggle]')) {
        document.body.classList.toggle('sidebar-open');
        return;
    }
    if (target.matches('[data-sidebar-close]')) {
        document.body.classList.remove('sidebar-open');
        return;
    }
    if (target.matches('[data-viewer-tab]')) {
        document.querySelectorAll('[data-viewer-tab]').forEach((tab) => tab.classList.toggle('active', tab === target));
        document.querySelectorAll('[data-viewer-content]').forEach((content) => content.classList.toggle('d-none', content.dataset.viewerContent !== target.dataset.viewerTab));
        return;
    }
    if (target.matches('[data-question-jump]')) {
        moveQuestion(0, Number(target.dataset.questionJump));
        return;
    }
    if (target.dataset.page) {
        document.body.classList.remove('sidebar-open');
        navigate(target.dataset.page);
    }
    if (target.dataset.action) handleAction(target);
    if (target.matches('.filter-chip')) {
        document.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.toggle('active', chip === target));
        const filter = target.dataset.filter.toLowerCase();
        document.querySelectorAll('[data-row-search]').forEach((row) => {
            row.classList.toggle('d-none', Boolean(filter) && !row.dataset.rowSearch.includes(filter));
        });
    }
});

root.addEventListener('change', (event) => {
    const target = event.target;
    if (target.id === 'role-switcher') {
        localStorage.setItem('learnedc-role', target.value);
        navigate(roles[target.value].dashboard);
    }
    if (target.matches('.table-filter')) {
        const filter = target.value.toLowerCase();
        document.querySelectorAll('[data-row-search]').forEach((row) => row.classList.toggle('d-none', Boolean(filter) && !row.dataset.rowSearch.includes(filter)));
    }
    if (target.type === 'file' && target.files?.length) {
        const text = target.closest('.upload-control')?.querySelector('b');
        if (text) text.textContent = target.files[0].name;
    }
    if (target.matches('.answer-option input')) {
        target.closest('.question-card')?.querySelectorAll('.answer-option').forEach((option) => option.classList.toggle('selected', option.contains(target)));
        document.querySelector(`[data-question-jump="${target.name.replace('question-', '')}"]`)?.classList.add('answered');
    }
});

root.addEventListener('input', (event) => {
    if (event.target.matches('.table-search input')) {
        const query = event.target.value.trim().toLowerCase();
        document.querySelectorAll('[data-row-search]').forEach((row) => row.classList.toggle('d-none', !row.dataset.rowSearch.includes(query)));
    }
    if (event.target.matches('.top-search input')) {
        const query = event.target.value.trim().toLowerCase();
        const match = [...document.querySelectorAll('.sidebar-link')].find((link) => link.innerText.toLowerCase().includes(query) && link.getAttribute('href')?.startsWith('#/'));
        if (event.key === 'Enter' && match) navigate(match.getAttribute('href').slice(2));
    }
});

root.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document.querySelector('.top-search input')?.focus();
    }
    if (event.target.matches('.top-search input') && event.key === 'Enter') {
        const query = event.target.value.trim().toLowerCase();
        const match = [...document.querySelectorAll('.sidebar-link')].find((link) => link.innerText.toLowerCase().includes(query));
        if (match) navigate(match.getAttribute('href').slice(2));
    }
});

root.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target.id === 'login-form') {
        const role = document.getElementById('login-role').value;
        if (!Object.hasOwn(roles, role)) return showToast('Pilih role yang tersedia.', 'error');
        localStorage.setItem('learnedc-role', role);
        navigate(roles[role].dashboard);
        return;
    }
    const name = event.target.querySelector('[name="Nama lengkap"]')?.value?.trim();
    const email = event.target.querySelector('[name="Email"]')?.value?.trim();
    const phone = event.target.querySelector('[name="Nomor WhatsApp"]')?.value?.trim();
    if (name || email || phone) {
        const profile = JSON.parse(localStorage.getItem('learnedc-profile') || '{}');
        localStorage.setItem('learnedc-profile', JSON.stringify({ ...profile, ...(name ? { name } : {}), ...(email ? { email } : {}), ...(phone ? { phone } : {}) }));
    }
    const currentId = location.hash.slice(2);
    const fields = Object.fromEntries(new FormData(event.target).entries());
    for (const [key, value] of Object.entries(fields)) {
        if (value instanceof File) fields[key] = value.name;
    }
    if (currentId === 'admin-user-form') {
        saveTableRow('admin-users', [fields['Nama lengkap'] || 'Pengguna baru', fields['NISN / NIP'] || '—', fields.Role || 'Siswa', fields['Kelas / Unit'] || '—', fields['Status akun'] || 'Aktif']);
        navigate('admin-users');
        showToast('Pengguna baru ditambahkan ke daftar.');
    } else if (currentId === 'teacher-material-form') {
        const status = event.target.dataset.saveMode === 'draft' ? 'Draf' : 'Terbit';
        saveTableRow('teacher-materials', [fields['Judul materi'] || 'Materi baru', fields['Pertemuan / topik'] || 'Pertemuan baru', fields.Kelas || 'XI RPL 1', fields['Jadwal publikasi'] || 'Segera', fields['Berkas materi'] || (status === 'Draf' ? 'Draf' : '—')]);
        navigate('teacher-materials');
        showToast(`Materi disimpan sebagai ${status.toLowerCase()}.`);
    } else if (currentId === 'teacher-assignment-form') {
        saveTableRow('teacher-assignments', [fields['Judul tugas'] || 'Tugas baru', fields.Kelas || 'XI RPL 1', fields['Batas pengumpulan'] || 'Belum ditentukan', '0 / 32', 'Aktif']);
        navigate('teacher-assignments');
        showToast('Tugas baru berhasil ditambahkan.');
    } else if (currentId === 'teacher-question-form') {
        saveTableRow('teacher-question-bank', [fields.Pertanyaan || 'Soal baru', fields['Mata pelajaran'] || 'Pemrograman Web', fields['Tipe soal'] || 'Pilihan ganda', 'Baru', 'Aktif']);
        navigate('teacher-question-bank');
        showToast('Soal berhasil ditambahkan ke bank soal.');
    } else if (currentId === 'student-assignment-submit' && event.target.dataset.saveLabel?.toLowerCase().includes('kirim')) {
        saveTableRow('student-submission-history', [fields.Tugas || 'Tugas', 'Pemrograman Web', new Date().toLocaleString('id-ID'), 'Menunggu penilaian', '—']);
        navigate('student-submission-history');
        showToast('Tugas berhasil dikirim dalam simulasi ini.');
    } else {
        showToast(event.target.dataset.saveMode === 'draft' ? 'Draf berhasil disimpan.' : 'Perubahan berhasil disimpan dalam simulasi ini.');
    }
});

window.addEventListener('hashchange', render);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && location.hash === '#/student-exam-take') {
        showToast('Peringatan: tetap berada di halaman ujian selama pengerjaan.', 'error');
    }
});
render();
