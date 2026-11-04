import { navigation, roles } from './pages/index.js';

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

export function renderShell(currentPage, role, content) {
    const roleInfo = roles[role];
    const sections = navigation[role] ?? navigation.student;
    const profile = JSON.parse(localStorage.getItem('learnedc-profile') || '{}');
    const displayName = profile.name || roleInfo.name;
    const navMarkup = sections.map(([title, links]) => `
        <div class="sidebar-section">
            <div class="sidebar-heading">${escapeHtml(title)}</div>
            ${links.map(([id, label, icon]) => `
                <a class="sidebar-link${currentPage.id === id ? ' active' : ''}" href="#/${id}">
                    <i class="bi ${icon}" aria-hidden="true"></i><span>${escapeHtml(label)}</span>
                    ${id === 'notifications' ? '<span class="nav-unread" aria-label="2 notifikasi belum dibaca"></span>' : ''}
                </a>`).join('')}
        </div>`).join('');
    const roleOptions = Object.entries(roles).map(([id, item]) =>
        `<option value="${id}"${role === id ? ' selected' : ''}>${escapeHtml(item.label)}</option>`).join('');

    return `
        <div class="app-layout">
            <div class="sidebar-backdrop" data-sidebar-close></div>
            <aside class="app-sidebar" id="app-sidebar">
                <a class="brand-lockup" href="#/${roleInfo.dashboard}" aria-label="learnEDC beranda">
                    <img src="/images/learnedc-logo.png" alt="" width="44" height="44">
                    <span><b>learn<span class="brand-edc">EDC</span></b><small>RUANG BELAJAR DIGITAL</small></span>
                </a>
                <div class="role-picker-wrap">
                    <label class="form-label" for="role-switcher">TAMPILAN ROLE</label>
                    <select class="form-select form-select-sm" id="role-switcher" aria-label="Pilih tampilan role">${roleOptions}</select>
                </div>
                <nav class="sidebar-nav" aria-label="Navigasi ${escapeHtml(roleInfo.label)}">${navMarkup}</nav>
                <div class="sidebar-bottom">
                    <a class="sidebar-link" href="#/profile"><i class="bi bi-person-circle"></i><span>Profil pengguna</span></a>
                    <button class="sidebar-link sidebar-logout" type="button" data-action="logout"><i class="bi bi-box-arrow-left"></i><span>Keluar</span></button>
                    <div class="sidebar-version"><span>learnEDC</span><span>FRONT-END DEMO · 2026</span></div>
                </div>
            </aside>
            <div class="app-frame">
                <header class="app-topbar">
                    <button class="mobile-menu-button" type="button" aria-label="Buka navigasi" data-sidebar-toggle><i class="bi bi-list"></i></button>
                    <div class="topbar-title"><span>Selamat datang, ${escapeHtml(displayName.split(' ')[0])}!</span><i class="bi bi-stars"></i></div>
                    <label class="top-search">
                        <i class="bi bi-search" aria-hidden="true"></i>
                        <input type="search" class="form-control" placeholder="Cari menu atau halaman..." aria-label="Cari menu">
                        <kbd>⌘ K</kbd>
                    </label>
                    <a class="topbar-icon" href="#/notifications" aria-label="Buka notifikasi"><i class="bi bi-bell"></i><span></span></a>
                    <a class="topbar-profile" href="#/profile" aria-label="Buka profil"><span class="mini-avatar">${escapeHtml(roleInfo.initials)}</span><span class="topbar-profile-copy"><b>${escapeHtml(displayName)}</b><small>${escapeHtml(roleInfo.unit)}</small></span><i class="bi bi-chevron-down"></i></a>
                </header>
                <main class="app-content" id="main-content">
                    <div class="page-breadcrumb"><a href="#/${roleInfo.dashboard}">Beranda</a><i class="bi bi-chevron-right"></i><span>${escapeHtml(currentPage.section)}</span><i class="bi bi-chevron-right"></i><b>${escapeHtml(currentPage.title)}</b></div>
                    <section class="page-heading"><div><div class="page-eyebrow">${escapeHtml(roleInfo.label)} <span>·</span> learnEDC</div><h1>${escapeHtml(currentPage.title)}</h1><p>${escapeHtml(currentPage.description)}</p></div><div class="page-heading-actions">${currentPage.type !== 'dashboard' ? `<button type="button" class="btn btn-soft btn-sm" data-action="back"><i class="bi bi-arrow-left me-1"></i>Kembali</button>` : ''}</div></section>
                    ${content}
                    <footer class="app-footer"><span>© 2026 learnEDC · Platform Pembelajaran Digital</span><span>Belajar hari ini, tumbuh setiap hari <i class="bi bi-heart-fill"></i></span></footer>
                </main>
            </div>
        </div>`;
}
