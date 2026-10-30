/* TB. Hasil Rezeki - script utama. Edit CONFIG dan data di bagian atas untuk mengganti konten. */
(function () {
  'use strict';

  /* ===== KONFIGURASI ===== */
  const CONFIG = {
    waNumber: '6285284455799',
    waMessage: 'Halo TB. Hasil Rezeki, saya ingin bertanya mengenai produk dan kebutuhan bahan bangunan.',
    address: 'Legok, Jl. Raya Pagedangan, Babakan, Kec. Legok, Kabupaten Tangerang, Banten 15330',
    // Isi dengan "lat,lng" (mis. "-6.2345,106.5678") setelah titik toko terkonfirmasi. null = pakai pencarian alamat.
    mapCoords: null
  };

  /* ===== DATA ===== */
  const IMG = 'assets/images/';
  const PRODUCTS = [
    { name: 'Semen', icon: 'package', img: 'semen.jpg', desc: 'Berbagai jenis semen untuk pondasi, plesteran, dan pengecoran.' },
    { name: 'Besi', icon: 'layers', img: 'besi.jpg', desc: 'Besi beton dan material rangka untuk struktur bangunan.' },
    { name: 'Cat', icon: 'paint', img: 'cat.jpg', desc: 'Cat dan perlengkapan pengecatan untuk dinding dan kayu.' },
    { name: 'Pipa', icon: 'pipe', img: 'pipa.jpg', desc: 'Pipa dan sambungan untuk instalasi air dan saluran.' },
    { name: 'Perkakas', icon: 'wrench', img: 'perkakas.jpg', desc: 'Peralatan tangan dan perlengkapan kerja bangunan.' },
    { name: 'Pasir dan Batu', icon: 'mountain', img: 'pasir dan batu.jpg', desc: 'Pasir, batu, dan agregat untuk campuran beton.' },
    { name: 'Keramik', icon: 'grid', img: 'keramik.jpg', desc: 'Keramik lantai dan dinding untuk hunian.' },
    { name: 'Kayu', icon: 'tree', img: 'kayu.jpg', desc: 'Kayu untuk rangka, kusen, dan kebutuhan finishing.' },
    { name: 'Atap dan Genteng', icon: 'home', img: 'asbes dan genteng.jpg', desc: 'Material penutup atap dan kelengkapannya.' },
    { name: 'Sanitasi', icon: 'drop', img: 'sanitasi.jpg', desc: 'Perlengkapan kamar mandi dan sanitasi rumah.' },
    { name: 'Material Lainnya', icon: 'boxes', img: 'Material Lainnya.jpg', desc: 'Kebutuhan bangunan lain. Tanyakan langsung ke kami.' }
  ];
  const WHY = [
    { icon: 'boxes', t: 'Produk Beragam', d: 'Sebelas kategori material tersedia untuk berbagai kebutuhan proyek.' },
    { icon: 'smile', t: 'Pelayanan Ramah', d: 'Kami siap membantu Anda menentukan material yang sesuai.' },
    { icon: 'shield', t: 'Memperhatikan Kualitas', d: 'Kami berupaya menyediakan material yang layak untuk bangunan Anda.' },
    { icon: 'phone', t: 'Mudah Dihubungi', d: 'Tanya ketersediaan dan konsultasi langsung lewat WhatsApp.' }
  ];
  const GALLERY = [
    { img: 'galeri-1.svg', alt: 'Ilustrasi susunan bata merah', cap: 'Material bangunan', cls: 'tall' },
    { img: 'galeri-2.svg', alt: 'Ilustrasi derek di lokasi proyek', cap: 'Aktivitas pembangunan', cls: 'wide' },
    { img: 'galeri-3.svg', alt: 'Ilustrasi tumpukan semen', cap: 'Stok material', cls: '' },
    { img: 'galeri-5.svg', alt: 'Ilustrasi helm proyek', cap: 'Perlengkapan kerja', cls: '' },
    { img: 'galeri-4.svg', alt: 'Ilustrasi tampak depan toko', cap: 'Eksterior toko', cls: 'wide' },
    { img: 'galeri-6.svg', alt: 'Ilustrasi peralatan konstruksi', cap: 'Peralatan konstruksi', cls: 'wide' },
    { img: 'toko.svg', alt: 'Ilustrasi suasana toko bahan bangunan', cap: 'Suasana toko', cls: 'wide' }
  ];

  /* ===== IKON (gaya Lucide, inline agar tanpa request tambahan) ===== */
  const ICONS = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
    up: '<path d="m18 15-6-6-6 6"/>', left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    package: '<path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    layers: '<path d="m12.8 2.2a2 2 0 0 0-1.6 0L2.6 6.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.6 0l8.6-3.9a1 1 0 0 0 0-1.8Z"/><path d="m22 17.7-9.2 4.1a2 2 0 0 1-1.6 0L2 17.7M22 12.7l-9.2 4.1a2 2 0 0 1-1.6 0L2 12.7"/>',
    paint: '<path d="M4 3h13v6H4zM17 6h3v5H11v4"/><path d="M9 15h4v6H9z"/>',
    pipe: '<path d="M3 8h8a2 2 0 0 1 2 2v8M13 18h8M3 5v6M21 15v6"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9Z"/>',
    mountain: '<path d="m8 3 4 8 5-5 5 15H2Z"/>',
    grid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18M12 3v18"/>',
    tree: '<path d="m12 2-6 8h3l-5 7h16l-5-7h3Z"/><path d="M12 17v5"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    drop: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    boxes: '<path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'
  };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const icon = n => '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[n] || '') + '</svg>';
  const hydrateIcons = root => $$('[data-icon]', root).forEach(el => { if (!el.firstChild) el.innerHTML = icon(el.dataset.icon); });

  document.documentElement.classList.add('js');

  /* ===== RENDER ===== */
  $('#productGrid').innerHTML = PRODUCTS.map(p =>
    `<article class="card rv"><div class="card__img"><img src="${IMG + p.img}" alt="Ilustrasi kategori ${p.name}" width="800" height="600" loading="lazy"><span class="card__ico" data-icon="${p.icon}"></span></div><div class="card__body"><h3>${p.name}</h3><p>${p.desc}</p></div></article>`).join('');
  $('#whyGrid').innerHTML = WHY.map(w =>
    `<div class="why__i rv"><span data-icon="${w.icon}"></span><h3>${w.t}</h3><p>${w.d}</p></div>`).join('');
  $('#galleryGrid').innerHTML = GALLERY.map((g, i) =>
    `<button type="button" class="rv ${g.cls}" data-i="${i}" aria-label="Perbesar gambar: ${g.cap}"><img src="${IMG + g.img}" alt="${g.alt}" width="800" height="600" loading="lazy"><span>${g.cap}</span></button>`).join('');
  hydrateIcons();

  /* ===== WHATSAPP & PETA ===== */
  $$('[data-wa]').forEach(a => {
    const msg = a.dataset.msg || CONFIG.waMessage;
    a.href = 'https://wa.me/' + CONFIG.waNumber + '?text=' + encodeURIComponent(msg);
    a.target = '_blank'; a.rel = 'noopener';
  });
  const q = encodeURIComponent(CONFIG.mapCoords || CONFIG.address);
  $('#mapFrame').src = 'https://www.google.com/maps?q=' + q + '&output=embed';
  $('#mapOpen').href = 'https://www.google.com/maps/search/?api=1&query=' + q;
  $('#mapDir').href = 'https://www.google.com/maps/dir/?api=1&destination=' + q;
  $('#year').textContent = new Date().getFullYear();

  /* ===== NAVBAR ===== */
  const nav = $('#nav'), menu = $('#menu'), tgl = $('#navToggle');
  const setMenu = open => {
    menu.classList.toggle('open', open);
    tgl.setAttribute('aria-expanded', open);
    tgl.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    tgl.innerHTML = '<i data-icon="' + (open ? 'x' : 'menu') + '"></i>'; hydrateIcons(tgl);
  };
  tgl.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); tgl.focus(); } });

  const toTop = $('#toTop');
  const onScroll = () => { nav.classList.toggle('scrolled', scrollY > 10); toTop.classList.toggle('show', scrollY > 600); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ===== ACTIVE NAV & REVEAL ===== */
  const links = $$('.nav__menu a[href^="#"]:not(.btn)');
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(l => { const on = l.hash === '#' + e.target.id; l.classList.toggle('active', on); on ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current'); });
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => spy.observe(s));
    const rv = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { threshold: .12 });
    $$('.rv').forEach(el => rv.observe(el));
  } else $$('.rv').forEach(el => el.classList.add('in'));

  /* ===== LIGHTBOX ===== */
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let cur = 0, opener = null;
  const show = i => { cur = (i + GALLERY.length) % GALLERY.length; const g = GALLERY[cur]; lbImg.src = IMG + g.img; lbImg.alt = g.alt; lbCap.textContent = g.cap + ' (ilustrasi sementara)'; };
  const open = i => { opener = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('.lb__x').focus(); };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; opener && opener.focus(); };
  $('#galleryGrid').addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) open(+b.dataset.i); });
  lb.addEventListener('click', e => {
    const a = e.target.closest('[data-lb]');
    if (a) { a.dataset.lb === 'close' ? close() : show(cur + (a.dataset.lb === 'next' ? 1 : -1)); }
    else if (e.target === lb) close();
  });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(cur + 1);
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'Tab') { const f = $$('button', lb), i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus(); }
  });

  /* ===== FALLBACK GAMBAR ===== */
  addEventListener('error', e => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = 1; t.src = 'assets/logo/logo-icon.svg'; t.style.objectFit = 'contain'; t.style.padding = '12%'; }
  }, true);
})();
