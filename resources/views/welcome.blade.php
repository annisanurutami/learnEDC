<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#172d52">
    <meta name="description" content="learnEDC — platform pembelajaran digital sekolah">
    <title>learnEDC — E-Learning Sekolah</title>
    <link rel="icon" href="{{ asset('images/learnedc-logo.png') }}" type="image/png">
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css" rel="stylesheet">
    <link href="{{ asset('css/learnedc.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app" aria-live="polite">
        <div class="app-loading">
            <img src="{{ asset('images/learnedc-logo.png') }}" alt="" width="58" height="58">
            <span>Menyiapkan ruang belajar...</span>
        </div>
    </div>
    <div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-3"></div>
    <div class="modal fade" id="app-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header border-0 pb-0">
                    <h2 class="modal-title fs-5" id="app-modal-title">Konfirmasi</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button>
                </div>
                <div class="modal-body pt-2" id="app-modal-body"></div>
                <div class="modal-footer border-0 pt-0">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-primary" id="app-modal-confirm">Ya, lanjutkan</button>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="{{ asset('js/app.js') }}"></script>
</body>
</html>
