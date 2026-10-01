
const PRODUCTS = [
  {
    id: 'after-hours',
    name: 'After Hours Tee',
    category: 'tees',
    label: 'Oversized T-shirt',
    price: 189000,
    image: 'tee-night',
    color: 'Washed black',
    tag: 'BEST SELLER',
    fresh: true,
    description:
      'Buat ide-ide yang baru muncul setelah tengah malam. Kaos oversized dengan grafis orbit dan siluet santai.',
    material: 'Cotton combed 24s, 100% katun',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'after-hours',
  },
  {
    id: 'good-noise',
    name: 'Good Noise Tee',
    category: 'tees',
    label: 'Graphic T-shirt',
    price: 179000,
    image: 'tee-cream',
    color: 'Bone white',
    tag: 'NEW DROP',
    fresh: true,
    description:
      'Sedikit berisik, banyak karakter. Grafis ekspresif di atas warna bone white yang gampang dipadukan.',
    material: 'Cotton combed 24s, 100% katun',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'good-noise',
  },
  {
    id: 'off-duty',
    name: 'Off Duty Hoodie',
    category: 'hoodies',
    label: 'Heavyweight hoodie',
    price: 349000,
    image: 'hoodie-olive',
    color: 'Forest olive',
    tag: 'NEW DROP',
    fresh: true,
    description:
      'Hoodie tebal untuk menikmati hari tanpa agenda. Potongan boxy dengan kantong kanguru dan detail OFFBEAT.',
    material: 'Cotton fleece 330 gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'off-duty',
  },
  {
    id: 'daily-tote',
    name: 'Everyday Carry Tote',
    category: 'accessories',
    label: 'Canvas tote bag',
    price: 99000,
    image: 'tote',
    color: 'Natural canvas',
    tag: 'EVERYDAY ESSENTIAL',
    fresh: false,
    description:
      'Bawa buku, ide, dan barang-barang favoritmu. Tote kanvas dengan kompartemen utama yang lega.',
    material: 'Kanvas katun 12 oz',
    sizes: ['ONE SIZE'],
    collection: 'off-duty',
  },
  {
    id: 'static-tee',
    name: 'Static Club Tee',
    category: 'tees',
    label: 'Boxy T-shirt',
    price: 199000,
    image: 'tee-purple',
    color: 'Dusty lilac',
    tag: 'LIMITED RUN',
    fresh: true,
    description:
      'Warna lilac dengan grafis sinyal analog. Untuk kamu yang selalu punya frekuensi sendiri.',
    material: 'Cotton combed 20s, 100% katun',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'good-noise',
  },
  {
    id: 'midnight-hoodie',
    name: 'Midnight Club Hoodie',
    category: 'hoodies',
    label: 'Heavyweight hoodie',
    price: 369000,
    image: 'hoodie-black',
    color: 'Midnight black',
    tag: 'BEST SELLER',
    fresh: false,
    description:
      'Lapisan favorit untuk udara dingin dan perjalanan pulang yang panjang. Print orbit berwarna acid green.',
    material: 'Cotton fleece 330 gsm',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'after-hours',
  },
  {
    id: 'signal-cap',
    name: 'Lost Signal Cap',
    category: 'accessories',
    label: 'Six-panel cap',
    price: 129000,
    image: 'cap',
    color: 'Forest olive',
    tag: 'BACK IN STOCK',
    fresh: false,
    description:
      'Topi enam panel dengan bordir simbol orbit. Strap belakang dapat disesuaikan untuk pemakaian harian.',
    material: 'Cotton twill',
    sizes: ['ONE SIZE'],
    collection: 'off-duty',
  },
  {
    id: 'sun-tee',
    name: 'Outside Club Tee',
    category: 'tees',
    label: 'Graphic T-shirt',
    price: 189000,
    image: 'tee-sand',
    color: 'Warm sand',
    tag: 'NEW DROP',
    fresh: true,
    description:
      'Matikan notifikasi, nyalakan hari. Ilustrasi matahari orisinal pada kaos warna pasir yang hangat.',
    material: 'Cotton combed 24s, 100% katun',
    sizes: ['S', 'M', 'L', 'XL'],
    collection: 'off-duty',
  },
];

if ($('#catalog-products')) {
  function showCatalog() {
    const category =
      document.body.dataset.category || $('#category-filter')?.value || 'all';

    let list = PRODUCTS.filter(
      product => category === 'all' || product.category === category
    );

    const sort = $('#catalog-sort').value;
    if (sort === 'low')  list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    if (sort === 'az')   list.sort((a, b) => a.name.localeCompare(b.name));

    renderProducts('#catalog-products', list);
    $('#catalog-count').textContent = `${list.length} produk`;
  }

  $('#category-filter')?.addEventListener('change', showCatalog);
  $('#catalog-sort').addEventListener('change', showCatalog);
  showCatalog();
}

if ($('#product-detail')) {
  const product = productById(
    new URLSearchParams(location.search).get('id') || 'after-hours'
  );

  if (!product) {
    $('#product-detail').innerHTML = `
      <div class="empty">
        <h1>PRODUK TIDAK DITEMUKAN.</h1>
        <p>Coba cari produk lain di katalog.</p>
        <a class="btn" href="${window.resolvePath('shop.html')}">Kembali ke katalog</a>
      </div>`;
  } else {
    document.title = product.name + ' — OFFBEAT';
    $('#product-breadcrumb').textContent = product.name;

    $('#product-detail').innerHTML = `
      <div class="product-detail-image">
        <img src="${window.resolvePath('images/')}${product.image}.png"
          alt="${safe(product.name + ' warna ' + product.color)}"
          width="480" height="540">
      </div>
      <div class="product-info">
        <span class="eyebrow">${product.tag} / KOLEKSI OFFBEAT</span>
        <h1>${product.name.toUpperCase()}</h1>
        <div class="detail-price">${money(product.price)}</div>
        <p>${product.description}</p>
        <span class="detail-label">WARNA: ${product.color}</span>
        <form id="add-product">
          <fieldset class="sizes">
            <legend class="detail-label">PILIH UKURAN</legend>
            ${product.sizes
              .map(
                (size, index) => `
              <label class="size-option">
                <input type="radio" name="size" value="${size}" ${index === 0 ? 'checked' : ''}>
                <span>${size}</span>
              </label>`
              )
              .join('')}
          </fieldset>
          <a href="${window.resolvePath('size-guide.html')}" class="text-link" style="display:inline-block;margin-top:14px">
            Lihat panduan ukuran
          </a>
          <div class="buy-row">
            <label class="sr-only" for="product-qty">Jumlah</label>
            <input id="product-qty" name="qty" type="number" min="1" max="10" value="1" required>
            <button class="btn acid" type="submit">TAMBAH KE KERANJANG</button>
          </div>
        </form>
        <button class="btn outline full" style="margin-top:10px"
          id="detail-wishlist" type="button">Simpan ke wishlist</button>
        <div class="detail-notes">
          <p>
            ${product.material}<br>
            Ilustrasi produk merupakan mockup desain.<br>
            Gratis ongkir reguler untuk belanja mulai Rp500.000.
          </p>
        </div>
        <div class="accordions">
          <details>
            <summary>Detail produk dan perawatan</summary>
            <p>
              Cuci dengan air dingin, balik pakaian sebelum mencuci, hindari pemutih,
              dan jangan setrika langsung di atas grafis.
              ${
                product.category === 'accessories'
                  ? 'Bersihkan noda aksesori dengan kain lembap.'
                  : 'Potongan santai; cek ukuran dalam sentimeter sebelum memilih.'
              }
            </p>
          </details>
          <details>
            <summary>Pengiriman &amp; penukaran</summary>
            <p>
              Pengiriman reguler sekitar 3–5 hari kerja. Baca
              <a href="${window.resolvePath('shipping.html')}">panduan pengiriman</a> dan
              <a href="${window.resolvePath('faq.html')}">syarat penukaran</a>.
              Seluruh transaksi di proyek ini adalah simulasi.
            </p>
          </details>
        </div>
      </div>`;

    $('#add-product').addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.target);
      addToCart(product.id, data.get('size'), Number(data.get('qty')));
    });

    const wish = $('#detail-wishlist');
    wish.dataset.wishlist = product.id;

    function syncWish() {
      const active = wishlistIds().includes(product.id);
      wish.textContent = active ? 'Sudah disimpan' : 'Simpan ke wishlist';
      wish.setAttribute('aria-pressed', String(active));
    }

    document.addEventListener('wishlist-change', syncWish);
    syncWish();

    renderProducts(
      '#related-products',
      PRODUCTS.filter(item => item.id !== product.id).slice(0, 4)
    );
  }
}

if ($('#search-form')) {
  const input = $('#search-input');
  input.value = new URLSearchParams(location.search).get('q') || '';

  function search() {
    const query = input.value.trim().toLowerCase();
    const list = PRODUCTS.filter(product =>
      (product.name + ' ' + product.category + ' ' + product.color + ' ' + product.label)
        .toLowerCase()
        .includes(query)
    );

    renderProducts('#search-products', list);
    $('#search-count').textContent = query
      ? `${list.length} hasil untuk "${input.value.trim()}"`
      : 'Jelajahi semua produk atau ketik kata kunci.';
  }

  $('#search-form').addEventListener('submit', event => {
    event.preventDefault();
    const url = new URL(location.href);
    url.searchParams.set('q', input.value.trim());
    history.replaceState({}, '', url);
    search();
  });

  input.addEventListener('input', search);
  search();
}

if ($('#register-form')) {
  $('#register-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = String(data.get('name')).trim();

    if (!name) {
      toast('Masukkan nama yang valid.');
      return;
    }

    const profile = {
      name,
      email: String(data.get('email')).trim().toLowerCase(),
    };

    const current = Store.get('profile', null);
    if (current) {
      $('#register-status').textContent =
        'Browser ini sudah memiliki profil demo. Masuk menggunakan email profil tersebut, atau ubah profil melalui halaman akun.';
      return;
    }

    if (Store.set('profile', profile) && Store.set('session', true)) {
      location.href = window.resolvePath('account.html');
    }
  });
}