# TB. Hasil Rezeki - Website Company Profile

Website single-page untuk toko bahan bangunan TB. Hasil Rezeki (Legok, Kabupaten Tangerang). Bukan e-commerce.

## Teknologi
HTML5, CSS3, Vanilla JavaScript, ikon inline gaya Lucide (tanpa dependency), Google Fonts (Manrope, DM Sans), Google Maps Embed. Tanpa backend dan tanpa build step.

## Struktur
```
index.html  404.html  robots.txt  sitemap.xml
css/style.css      js/script.js
assets/images/     ilustrasi sementara (SVG)
assets/logo/       logo horizontal (terang/gelap) dan ikon
assets/icons/      favicon
```

## Menjalankan lokal
Buka `index.html` di browser, atau jalankan server: `python3 -m http.server 8000` lalu buka http://localhost:8000

## Mengganti konten
Semua data ada di bagian atas `js/script.js`:
- **Nomor WA, pesan otomatis, alamat, koordinat peta:** objek `CONFIG`.
- **Produk:** array `PRODUCTS` (nama, deskripsi, ikon, file gambar).
- **Keunggulan:** array `WHY`. **Galeri:** array `GALLERY`.
- **Koordinat toko:** isi `CONFIG.mapCoords` dengan `"lat,lng"` setelah titik toko dipastikan.

## Mengganti gambar
Taruh foto asli (disarankan WebP, lebar 800-1600px) di `assets/images/`, lalu ubah nama file di `PRODUCTS`/`GALLERY`, dan atribut `src` gambar hero/toko di `index.html`. Hapus label "Ilustrasi sementara" pada `index.html` (figcaption) dan `GALLERY` setelah foto asli dipasang.

## SEO setelah domain tersedia
Ganti `https://example.com/` di `index.html` (canonical), `robots.txt`, dan `sitemap.xml`. Ganti `og:image` dengan URL absolut gambar JPG/PNG (disarankan 1200x630). Tambahkan jam operasional dan koordinat ke JSON-LD hanya jika datanya sudah pasti.

## Deployment
- **GitHub Pages:** push ke repo, Settings > Pages > Deploy from branch (root).
- **Netlify:** drag-and-drop folder, atau hubungkan repo (publish directory: `.`, tanpa build command).
- **Vercel:** import repo, framework "Other", tanpa build command.
Untuk domain khusus, atur di dashboard hosting lalu perbarui URL canonical dan sitemap.
