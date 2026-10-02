
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

if ($('#login-form')) {
  $('#login-form').addEventListener('submit', event => {
    event.preventDefault();
    const profile = Store.get('profile', null);
    const email = String(new FormData(event.target).get('email')).trim().toLowerCase();

    if (!profile || profile.email !== email) {
      $('#login-status').textContent =
        'Profil demo dengan email ini belum ada di browser. Buat profil terlebih dahulu.';
      return;
    }

    if (Store.set('session', true)) location.href = window.resolvePath('account.html');
  });
}

function accountNav() {
  return `
    <nav class="account-nav" aria-label="Menu akun">
      <a href="${window.resolvePath('account.html')}" ${location.pathname.endsWith('account.html') ? 'aria-current="page"' : ''}>
        Profil saya
      </a>
      <a href="${window.resolvePath('orders.html')}" ${location.pathname.endsWith('orders.html') ? 'aria-current="page"' : ''}>
        Pesanan demo
      </a>
      <a href="${window.resolvePath('wishlist.html')}">Wishlist</a>
      <button id="logout" type="button">Keluar dari demo ?</button>
    </nav>`;
}

function bindLogout() {
  $('#logout')?.addEventListener('click', () => {
    if (Store.set('session', false)) location.href = window.resolvePath('login.html');
  });
}

if ($('#account-content')) {
  const profile = Store.get('profile', null);

  if (!profile || !Store.get('session', false)) {
    $('#account-content').innerHTML = `
      <div class="empty">
        <h2>WELCOME TO YOUR CORNER.</h2>
        <p>Masuk ke profil demo untuk mengubah nama dan email kamu.</p>
        <a class="btn acid" href="${window.resolvePath('login.html')}">Masuk ke demo ?</a>
        <a class="btn outline" href="${window.resolvePath('register.html')}">Buat profil</a>
      </div>`;
  } else {
    $('#account-content').innerHTML = `
      <div class="account-layout">
        ${accountNav()}
        <div class="panel">
          <h2>HEY, ${safe(profile.name.toUpperCase())}.</h2>
          <p class="form-note">
            Profil ini hanya ada di browser kamu. Gunakan data contoh untuk demo kelas.
          </p>
          <form id="profile-form" class="form-grid">
            <div class="field">
              <label for="profile-name">Nama</label>
              <input id="profile-name" name="name" required maxlength="60"
                value="${safe(profile.name)}" autocomplete="name">
            </div>
            <div class="field">
              <label for="profile-email">Email</label>
              <input id="profile-email" name="email" type="email" required maxlength="120"
                value="${safe(profile.email)}" autocomplete="email">
            </div>
            <div class="field wide">
              <button class="btn" type="submit">Simpan perubahan ?</button>
              <p id="profile-status" class="form-status" role="status"></p>
            </div>
          </form>
        </div>
      </div>`;

    bindLogout();

    $('#profile-form').addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.target);
      const name = String(data.get('name')).trim();

      if (!name) {
        toast('Nama tidak boleh kosong.');
        return;
      }

      if (
        Store.set('profile', {
          name,
          email: String(data.get('email')).trim().toLowerCase(),
        })
      ) {
        $('.panel h2').textContent = 'HEY, ' + name.toUpperCase() + '.';
        $('#profile-status').textContent = 'Profil demo berhasil diperbarui.';
      }
    });
  }
}

if ($('#orders-content')) {
  const stored = Store.get('orders', []);
  const orders = Array.isArray(stored) ? stored : [];

  $('#orders-content').innerHTML = `
    <div class="account-layout">
      ${accountNav()}
      <div>
        ${
          orders.length
            ? orders
                .map(
                  order => `
              <article class="panel" style="margin-bottom:20px">
                <div class="section-top">
                  <div>
                    <span class="eyebrow">${new Date(order.date).toLocaleDateString('id-ID')}</span>
                    <h3>${safe(order.id)}</h3>
                  </div>
                  <span class="status-pill">${safe(order.status)}</span>
                </div>
                <p>${order.items.reduce((sum, item) => sum + item.qty, 0)} item · ${money(order.total)}</p>
                <a class="text-link" style="display:inline-block;margin-top:20px"
                  href="${window.resolvePath('order-detail.html')}?id=${encodeURIComponent(order.id)}">
                  Detail pesanan ?
                </a>
              </article>`
                )
                .join('')
            : `<div class="empty">
                <h2>YOUR STORY STARTS HERE.</h2>
                <p>Pesanan demo di browser ini akan muncul setelah checkout.</p>
                <a href="${window.resolvePath('shop.html')}" class="btn acid">Jelajahi produk ?</a>
              </div>`
        }
      </div>
    </div>`;

  bindLogout();
}

if ($('#order-detail-content')) {
  const id = new URLSearchParams(location.search).get('id');
  const orders = Store.get('orders', []);
  const order = Array.isArray(orders) ? orders.find(item => item.id === id) : null;

  if (!order) {
    $('#order-detail-content').innerHTML = `
      <div class="empty">
        <h2>PESANAN TIDAK DITEMUKAN.</h2>
        <p>Pilih pesanan yang sudah dibuat di browser ini.</p>
        <a class="btn" href="${window.resolvePath('orders.html')}">Lihat pesanan demo ?</a>
      </div>`;
  } else {
    $('#order-detail-content').innerHTML = `
      <div class="notice">
        Pesanan simulasi. Status ini tidak terhubung dengan kurir atau pembayaran sungguhan.
      </div>
      <div class="section-top">
        <div>
          <span class="eyebrow">${new Date(order.date).toLocaleDateString('id-ID')}</span>
          <h2>${safe(order.id)}</h2>
        </div>
        <span class="status-pill">${safe(order.status)}</span>
      </div>
      <div class="cart-layout">
        <div>
          <div class="panel">
            <h3>Item pesanan</h3>
            ${order.items
              .map(
                item => `
              <article class="cart-row">
                <img src="${window.resolvePath('images/')}${safe(item.image)}.png" alt="${safe(item.name)}">
                <div>
                  <h3>${safe(item.name)}</h3>
                  <p>Ukuran ${safe(item.size)} · ${item.qty} item</p>
                </div>
                <span class="price">${money(item.price * item.qty)}</span>
              </article>`
              )
              .join('')}
          </div>
          <ol class="timeline">
            <li><strong>Pesanan demo dibuat</strong><br>Data berhasil disimpan di browser.</li>
            <li><strong>Simulasi dikonfirmasi</strong><br>Tidak ada tahap pengiriman nyata.</li>
          </ol>
        </div>
        <aside class="stack">
          <div class="panel">
            <h3>Alamat demo</h3>
            <p>
              ${safe(order.customer.name)}<br>
              ${safe(order.customer.address)}<br>
              ${safe(order.customer.city)}, ${safe(order.customer.postal)}<br>
              ${safe(order.customer.phone)}
            </p>
          </div>
          <div class="panel">
            <h3>Ringkasan pembayaran</h3>
            <p>
              Metode: ${safe(order.payment)} (demo)<br>
              Pengiriman: ${order.shipping === 'express' ? 'Ekspres' : 'Reguler'}
            </p>
            <div class="summary-line">
              <span>Subtotal</span><span>${money(order.subtotal)}</span>
            </div>
            <div class="summary-line">
              <span>Ongkir</span><span>${money(order.delivery)}</span>
            </div>
            <div class="summary-line total">
              <span>Total</span><span>${money(order.total)}</span>
            </div>
          </div>
        </aside>
      </div>`;
  }
}

if ($('#cart-content')) {
  function showCart() {
    const cart = cartItems();

    if (!cart.length) {
      $('#cart-content').innerHTML = `
        <div class="empty">
          <h2>BAG KAMU MASIH KOSONG.</h2>
          <p>Waktunya menemukan sesuatu yang terasa kamu banget.</p>
          <a href="${window.resolvePath('shop.html')}" class="btn acid">Explore the good stuff ?</a>
        </div>`;
      return;
    }

    $('#cart-content').innerHTML = `
      <div class="cart-layout">
        <div>
          ${cart
            .map((item, index) => {
              const product = productById(item.id);
              return `
                <article class="cart-row">
                  <a href="${window.resolvePath('product.html')}?id=${product.id}">
                    <img src="${window.resolvePath('images/')}${product.image}.png" alt="${product.name}">
                  </a>
                  <div>
                    <h3><a href="${window.resolvePath('product.html')}?id=${product.id}">${product.name}</a></h3>
                    <p>${product.color} / ${item.size}</p>
                    <div class="quantity">
                      <button data-qty="${index}" data-delta="-1"
                        aria-label="Kurangi ${product.name}" ${item.qty === 1 ? 'disabled' : ''}>-</button>
                      <span>${item.qty}</span>
                      <button data-qty="${index}" data-delta="1"
                        aria-label="Tambah ${product.name}" ${item.qty === 10 ? 'disabled' : ''}>+</button>
                    </div>
                  </div>
                  <div>
                    <span class="price">${money(product.price * item.qty)}</span>
                    <button class="remove" data-remove="${index}"
                      aria-label="Hapus ${product.name}">Hapus</button>
                  </div>
                </article>`;
            })
            .join('')}
          <p class="form-note">Maksimal 10 item untuk setiap kombinasi produk dan ukuran.</p>
          <a href="${window.resolvePath('shop.html')}" class="text-link">? Lanjut belanja</a>
        </div>
        <aside class="panel summary">
          <h2>YOUR BAG, SUMMED UP.</h2>
          ${summaryHTML(cart)}
          <p class="form-note">
            Ongkir di atas menggunakan pengiriman reguler. Pilihan ekspres tersedia saat checkout.
          </p>
          <a class="btn acid full" href="${window.resolvePath('checkout.html')}">LANJUT CHECKOUT ?</a>
          <p class="form-note">Simulasi belanja. Tidak ada pembayaran sungguhan.</p>
        </aside>
      </div>`;
  }

  $('#cart-content').addEventListener('click', event => {
    const quantity = event.target.closest('[data-qty]');
    const remove = event.target.closest('[data-remove]');
    if (!quantity && !remove) return;

    const cart = cartItems();

    if (remove) {
      cart.splice(Number(remove.dataset.remove), 1);
    } else {
      const row = cart[Number(quantity.dataset.qty)];
      if (!row) return;
      row.qty = Math.max(1, Math.min(10, row.qty + Number(quantity.dataset.delta)));
    }

    if (Store.set('cart', cart)) {
      showCart();
      updateCartCount();
    }
  });

  document.addEventListener('cart-change', showCart);
  showCart();
}

if ($('#checkout-form')) {
  const form = $('#checkout-form');

  function refreshCheckout() {
    const cart = cartItems();

    if (!cart.length) {
      $('#checkout-layout').hidden = true;
      $('#checkout-empty').hidden = false;
      return;
    }

    $('#checkout-layout').hidden = false;
    $('#checkout-empty').hidden = true;
    $('#checkout-summary').innerHTML =
      cart
        .map(
          item => `
        <div class="summary-line">
          <span>${productById(item.id).name}<br>
            <small>${item.size} · ${item.qty}</small>
          </span>
          <span>${money(productById(item.id).price * item.qty)}</span>
        </div>`
        )
        .join('') + summaryHTML(cart, $('#shipping-method').value);
  }

  const profile = Store.get('profile', null);
  if (profile) {
    form.elements.name.value = profile.name || '';
    form.elements.email.value = profile.email || '';
  }

  $('#shipping-method').addEventListener('change', refreshCheckout);
  document.addEventListener('cart-change', refreshCheckout);
  refreshCheckout();

  let submitting = false;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (submitting) return;

    const cart = cartItems();
    if (!cart.length) { refreshCheckout(); return; }

    const data = new FormData(form);
    const name    = String(data.get('name')).trim();
    const address = String(data.get('address')).trim();
    const city    = String(data.get('city')).trim();

    if (!name || !address || !city) {
      toast('Nama, alamat, dan kota tidak boleh hanya berisi spasi.');
      return;
    }

    submitting = true;
    const shipping = data.get('shipping');
    const created = new Date();

    const order = {
      id: 'OB-' + created.getTime().toString(36).toUpperCase(),
      date: created.toISOString(),
      customer: {
        name,
        email:  String(data.get('email')).trim(),
        phone:  data.get('phone'),
        address,
        city,
        postal: data.get('postal'),
      },
      items: cart.map(item => ({
        ...item,
        name:  productById(item.id).name,
        price: productById(item.id).price,
        image: productById(item.id).image,
      })),
      shipping,
      payment: data.get('payment'),
      ...totals(cart, shipping),
      status: 'Dikonfirmasi (demo)',
    };

    const orders = Store.get('orders', []);
    if (!Store.set('orders', [order, ...(Array.isArray(orders) ? orders : [])])) {
      submitting = false;
      return;
    }

    Store.set('cart', []);
    updateCartCount();
    location.href = window.resolvePath('order-success.html') + '?id=' + encodeURIComponent(order.id);
  });
}

if ($('#success-content')) {
  const id = new URLSearchParams(location.search).get('id');
  const orders = Store.get('orders', []);
  const order = Array.isArray(orders) ? orders.find(item => item.id === id) : null;

  $('#success-content').innerHTML = order
    ? `
      <div class="success-mark">?</div>
      <span class="eyebrow">YOU'RE PART OF THE CLUB</span>
      <h1>GOOD CHOICE.<br>GREAT ENERGY.</h1>
      <p style="margin:24px 0">
        Pesanan demo <strong>${safe(order.id)}</strong> berhasil dibuat.<br>
        Terima kasih, ${safe(order.customer.name)}!
      </p>
      <div class="panel" style="text-align:left">
        ${summaryHTML(order.items, order.shipping)}
        <p class="form-note">
          Tidak ada uang ditagih, email dikirim, atau barang dikirimkan.
          Pesanan tersimpan di browser ini.
        </p>
      </div>
      <a class="btn acid" href="${window.resolvePath('order-detail.html')}?id=${encodeURIComponent(order.id)}">
        LIHAT PESANAN ?
      </a>
      <a class="btn outline" href="${window.resolvePath('shop.html')}">Lanjut belanja</a>`
    : `
      <div class="empty">
        <h1>BELUM ADA PESANAN.</h1>
        <p>Selesaikan checkout untuk melihat konfirmasi di sini.</p>
        <a class="btn acid" href="${window.resolvePath('shop.html')}">Mulai belanja ?</a>
      </div>`;
}

if ($('#wishlist-products')) {
  function showWishlist() {
    const list = PRODUCTS.filter(product => wishlistIds().includes(product.id));
    $('#wishlist-count').textContent = `${list.length} produk disimpan`;

    if (list.length) {
      renderProducts('#wishlist-products', list);
    } else {
      $('#wishlist-products').innerHTML = `
        <div class="empty">
          <h2>YOUR NEXT FAVORITE IS OUT THERE.</h2>
          <p>Klik ikon hati pada produk untuk menyimpannya di sini.</p>
          <a class="btn acid" href="${window.resolvePath('shop.html')}">Temukan favoritmu ↗</a>
        </div>`;
    }
  }

  document.addEventListener('wishlist-change', showWishlist);
  showWishlist();
}

if ($('#size-table-body')) {
  const chart = {
    tees:    [['S', 52, 68, 21], ['M', 55, 71, 22], ['L', 58, 74, 23], ['XL', 61, 77, 24]],
    hoodies: [['S', 56, 66, 56], ['M', 59, 69, 58], ['L', 62, 72, 60], ['XL', 65, 75, 62]],
  };

  function showSizes(category) {
    $$('[data-size-chart]').forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.sizeChart === category))
    );
    $('#size-chart-caption').textContent =
      `Ukuran ${category === 'tees' ? 'kaos' : 'hoodie'} dalam sentimeter (cm)`;
    $('#size-table-body').innerHTML = chart[category]
      .map(row =>
        '<tr>' +
        row
          .map((cell, i) => `<${i ? 'td' : 'th'} ${i ? '' : 'scope="row"'}>${cell}</${i ? 'td' : 'th'}>`)
          .join('') +
        '</tr>'
      )
      .join('');
  }

  $$('[data-size-chart]').forEach(button =>
    button.addEventListener('click', () => showSizes(button.dataset.sizeChart))
  );
  showSizes('tees');
}

if ($('#faq-search')) {
  $('#faq-search').addEventListener('input', event => {
    const query = event.target.value.toLowerCase().trim();
    let count = 0;

    $$('#faq-list details').forEach(detail => {
      detail.hidden = !detail.textContent.toLowerCase().includes(query);
      if (!detail.hidden) count++;
    });

    $('#faq-count').textContent = count
      ? `${count} jawaban tersedia`
      : 'Belum ada jawaban yang cocok. Coba kata lain atau hubungi kami.';
  });
}

if ($('#contact-form')) {
  $('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    $('#contact-status').textContent =
      `Terima kasih, ${data.get('name').trim()}. Pesan demo tentang "${data.get('topic')}" berhasil divalidasi. Tidak ada pesan yang dikirim ke pihak lain.`;
    $('#contact-status').classList.add('success');
    event.target.reset();
  });
}


'use strict';
const PAGE_FOLDERS = {
  "index.html": "html",
  "new-arrivals.html": "html",
  "collections.html": "html",
  "lookbook.html": "html",
  "about.html": "html",
  "shop.html": "html",
  "tees.html": "html",
  "hoodies.html": "html",
  "accessories.html": "html",
  "product.html": "html",
  "search.html": "html",
  "wishlist.html": "html",
  "size-guide.html": "html",
  "faq.html": "html",
  "contact.html": "html",
  "cart.html": "html",
  "checkout.html": "html",
  "shipping.html": "html",
  "payment.html": "html",
  "order-success.html": "html",
  "login.html": "html",
  "register.html": "html",
  "account.html": "html",
  "orders.html": "html",
  "order-detail.html": "html"
};

window.resolvePath = function(path) {
  if (path.startsWith('images/')) return '../' + path;
  const parts = path.split('?');
  const base = parts[0];
  if (PAGE_FOLDERS[base]) {
    return '../' + PAGE_FOLDERS[base] + '/' + path;
  }
  return path;
};


const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const money = value =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

const safe = value =>
  String(value ?? '').replace(
    /[&<>"']/g,
    char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])
  );


const Store = {
  get(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem('offbeat:' + key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem('offbeat:' + key, JSON.stringify(value));
      return true;
    } catch {
      toast('Penyimpanan browser tidak tersedia. Izinkan penyimpanan untuk melanjutkan.');
      return false;
    }
  },
};


const productById = id => PRODUCTS.find(product => product.id === id);

function cartItems() {
  const rows = Store.get('cart', []);
  return Array.isArray(rows)
    ? rows.filter(
        row =>
          row &&
          productById(row.id)?.sizes.includes(row.size) &&
          Number.isInteger(row.qty) &&
          row.qty > 0 &&
          row.qty <= 10
      )
    : [];
}

function wishlistIds() {
  const ids = Store.get('wishlist', []);
  return Array.isArray(ids) ? ids.filter(id => productById(id)) : [];
}

function totals(cart = cartItems(), shipping = 'regular') {
  const subtotal = cart.reduce((sum, item) => sum + productById(item.id).price * item.qty, 0);
  const delivery =
    subtotal === 0 ? 0 : shipping === 'express' ? 30000 : subtotal >= 500000 ? 0 : 18000;
  return { subtotal, delivery, total: subtotal + delivery };
}

function addToCart(id, size, qty) {
  const product = productById(id);
  if (!product || !product.sizes.includes(size) || !Number.isInteger(qty) || qty < 1 || qty > 10)
    return false;

  const cart = cartItems();
  const existing = cart.find(item => item.id === id && item.size === size);

  if (existing && existing.qty + qty > 10) {
    toast('Maksimal 10 item per produk dan ukuran.');
    return false;
  }

  if (existing) existing.qty += qty;
  else cart.push({ id, size, qty });

  if (!Store.set('cart', cart)) return false;

  updateCartCount();
  toast('Ditambahkan ke keranjang. Good choice!');
  return true;
}


function toast(message) {
  const box = $('#toast');
  if (!box) return;
  box.textContent = message;
  box.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (box.hidden = true), 3800);
}

function icon(name) {
  const paths = {
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
    user: '<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
    heart:
      '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
}


function renderShell() {
  const nav = [
    ['shop.html', 'SHOP ALL'],
    ['new-arrivals.html', 'NEW DROP ↗'],
    ['collections.html', 'COLLECTIONS'],
    ['lookbook.html', 'LOOKBOOK'],
  ];
  const current = location.pathname.split('/').pop() || 'index.html';

  $('#site-header').innerHTML = `
    <div class="announcement">
      INDEPENDENT MINDS. EVERYDAY UNIFORMS.
      <span>GRATIS ONGKIR MULAI 500K ↗</span>
    </div>
    <header class="header">
      <nav class="nav" aria-label="Navigasi utama">
        <a class="logo" href="${window.resolvePath('index.html')}" aria-label="OFFBEAT beranda">OFFBEAT<sup>®</sup></a>
        <button class="menu-toggle" aria-label="Buka menu" aria-expanded="false" aria-controls="main-nav">☰</button>
        <div class="nav-links" id="main-nav">
          ${nav
            .map(
              ([url, label]) =>
                `<a href="${window.resolvePath(url)}" ${current === url ? 'aria-current="page"' : ''}>${label}</a>`
            )
            .join('')}
        </div>
        <div class="nav-actions">
          <a class="icon-link" href="${window.resolvePath('search.html')}" aria-label="Cari produk">${icon('search')}</a>
          <a class="icon-link account-link" href="${window.resolvePath('account.html')}" aria-label="Akun saya">${icon('user')}</a>
          <a class="icon-link" href="${window.resolvePath('wishlist.html')}" aria-label="Wishlist">${icon('heart')}</a>
          <a class="icon-link" href="${window.resolvePath('cart.html')}" aria-label="Keranjang">
            ${icon('bag')}<span class="action-label">BAG</span> (<span data-cart-count>0</span>)
          </a>
        </div>
      </nav>
    </header>`;

  $('#site-footer').innerHTML = `
    <section class="newsletter">
      <div class="container newsletter-inner">
        <div>
          <span class="eyebrow">MASUK KE FREKUENSI KAMI</span>
          <h2>GOOD THINGS. NO SPAM.</h2>
          <p>Kabar koleksi baru dan cerita di baliknya.</p>
        </div>
        <form class="newsletter-form" id="newsletter-form">
          <label for="newsletter-email" class="sr-only">Alamat email newsletter demo</label>
          <input id="newsletter-email" type="email" required placeholder="Alamat email kamu"
            maxlength="120" autocomplete="email">
          <button class="btn" type="submit" aria-label="Daftar newsletter demo">I'M IN ↗</button>
        </form>
      </div>
      <p class="container form-status" id="newsletter-status" role="status"></p>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${window.resolvePath('index.html')}" class="logo">OFFBEAT<sup>®</sup></a>
            <p>Wear your own frequency.<br>Streetwear untuk kamu yang punya cara sendiri.</p>
          </div>
          <div>
            <h3>THE GOOD STUFF</h3>
            <a href="${window.resolvePath('shop.html')}">Semua produk</a>
            <a href="${window.resolvePath('tees.html')}">Graphic tees</a>
            <a href="${window.resolvePath('hoodies.html')}">Hoodies</a>
            <a href="${window.resolvePath('accessories.html')}">Accessories</a>
            <a href="${window.resolvePath('collections.html')}">Koleksi</a>
          </div>
          <div>
            <h3>NEED A HAND?</h3>
            <a href="${window.resolvePath('size-guide.html')}">Panduan ukuran</a>
            <a href="${window.resolvePath('shipping.html')}">Pengiriman</a>
            <a href="${window.resolvePath('payment.html')}">Pembayaran</a>
            <a href="${window.resolvePath('faq.html')}">FAQ</a>
            <a href="${window.resolvePath('contact.html')}">Hubungi kami</a>
          </div>
          <div>
            <h3>OUR LITTLE WORLD</h3>
            <a href="${window.resolvePath('about.html')}">Tentang OFFBEAT</a>
            <a href="${window.resolvePath('lookbook.html')}">Lookbook</a>
            <a href="${window.resolvePath('account.html')}">Akun saya</a>
            <a href="${window.resolvePath('orders.html')}">Pesanan saya</a>
            <a href="${window.resolvePath('wishlist.html')}">Wishlist</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 OFFBEAT. A student-made independent label.</span>
          <span>Proyek kuliah · Transaksi &amp; akun merupakan simulasi</span>
          <span>MADE WITH GOOD ENERGY ↗</span>
        </div>
      </div>
    </footer>`;

  $('.menu-toggle').addEventListener('click', event => {
    const expanded = event.currentTarget.getAttribute('aria-expanded') !== 'true';
    event.currentTarget.setAttribute('aria-expanded', String(expanded));
    $('#main-nav').classList.toggle('open', expanded);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      $('#main-nav').classList.remove('open');
      $('.menu-toggle').setAttribute('aria-expanded', 'false');
    }
  });

  $('#newsletter-form').addEventListener('submit', event => {
    event.preventDefault();
    $('#newsletter-status').textContent =
      'Terima kasih! Pendaftaran newsletter demo berhasil. Tidak ada email yang dikirim.';
    event.target.reset();
  });

  updateCartCount();
}

function updateCartCount() {
  $$('[data-cart-count]').forEach(
    el => (el.textContent = cartItems().reduce((sum, item) => sum + item.qty, 0))
  );
}

function productCard(product) {
  const liked = wishlistIds().includes(product.id);
  return `
    <article class="product-card">
      <a class="product-image" href="${window.resolvePath('product.html')}?id=${product.id}">
        <img src="${window.resolvePath('images/')}${product.image}.svg"
          alt="${safe(product.name + ' warna ' + product.color)}"
          loading="lazy" width="480" height="540">
        <span class="product-badge">${product.tag}</span>
      </a>
      <button class="heart" data-wishlist="${product.id}"
        aria-label="${liked ? 'Hapus' : 'Simpan'} ${safe(product.name)} ${liked ? 'dari' : 'ke'} wishlist"
        aria-pressed="${liked}">${liked ? '♥' : '♡'}</button>
      <div class="product-meta">
        <div>
          <h3><a href="${window.resolvePath('product.html')}?id=${product.id}">${product.name}</a></h3>
          <p>${product.label} · ${product.color}</p>
        </div>
        <span class="price">${money(product.price)}</span>
      </div>
      <div class="swatches" aria-hidden="true"><i></i><i></i><i></i></div>
    </article>`;
}


function renderProducts(target, products) {
  const el = typeof target === 'string' ? $(target) : target;
  if (!el) return;
  el.innerHTML = products.length
    ? products.map(productCard).join('')
    : `<div class="empty">
        <h2>BELUM KETEMU.</h2>
        <p>Coba kata kunci atau kategori lainnya.</p>
        <a class="btn outline" href="${window.resolvePath('shop.html')}">Lihat semua produk ↗</a>
      </div>`;
}


function summaryHTML(cart, shipping = 'regular') {
  const sum = totals(cart, shipping);
  return `
    <div class="summary-line">
      <span>Subtotal</span><span>${money(sum.subtotal)}</span>
    </div>
    <div class="summary-line">
      <span>Pengiriman ${shipping === 'express' ? 'ekspres' : 'reguler'}</span>
      <span>${sum.delivery ? money(sum.delivery) : 'Gratis'}</span>
    </div>
    <div class="summary-line total">
      <span>Total</span><span>${money(sum.total)}</span>
    </div>`;
}


renderShell();


document.addEventListener('click', event => {
  const button = event.target.closest('[data-wishlist]');
  if (!button) return;

  const id = button.dataset.wishlist;
  if (!productById(id)) return;

  const current = wishlistIds();
  const liked = current.includes(id);

  if (!Store.set('wishlist', liked ? current.filter(item => item !== id) : [...current, id]))
    return;

  $$(`[data-wishlist="${id}"]`).forEach(el => {
    el.setAttribute('aria-pressed', String(!liked));
    el.setAttribute(
      'aria-label',
      `${liked ? 'Simpan' : 'Hapus'} ${productById(id).name} ${liked ? 'ke' : 'dari'} wishlist`
    );
    el.textContent = liked ? '♡' : '♥';
  });

  toast(liked ? 'Produk dihapus dari wishlist.' : 'Produk disimpan ke wishlist.');
  document.dispatchEvent(new Event('wishlist-change'));
});


window.addEventListener('storage', () => {
  updateCartCount();
  document.dispatchEvent(new Event('wishlist-change'));
  document.dispatchEvent(new Event('cart-change'));
});



