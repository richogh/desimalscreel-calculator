
// ======================================
// KONFIGURASI UNIVERSAL
// ======================================

const NOMOR_WA = "62895388390106";


// ======================================
// DATA KATALOG
// ======================================

const katalog = [

    {
        nama: "Plastik Beras",
        icon: "🛍️",

        produk: [

            {
                nama: "Plastik Custom",
                gambar: "https://placehold.co/600x400",
                harga: [
                    { jumlah: 50, harga: 35000 },
                    { jumlah: 100, harga: 60000 },
                    { jumlah: 200, harga: 110000 },
                    { jumlah: 500, harga: 250000 }
                ]
            },

            {
                nama: "Plastik Polos",
                gambar: "https://placehold.co/600x400",
                harga: [
                    { jumlah: 50, harga: 10000 },
                    { jumlah: 100, harga: 18000 },
                    { jumlah: 200, harga: 34000 }
                ]
            }

        ]
    },


    {
        nama: "Cup",
        icon: "🥤",

        produk: [

            {
                nama: "Cup 22 Oz",
                gambar: "https://placehold.co/600x400",
                harga: [
                    { jumlah: 50, harga: 35000 },
                    { jumlah: 100, harga: 65000 },
                    { jumlah: 200, harga: 120000 }
                ]
            },

            {
                nama: "Cup 16 Oz",
                gambar: "https://placehold.co/600x400",
                harga: [
                    { jumlah: 50, harga: 30000 },
                    { jumlah: 100, harga: 55000 },
                    { jumlah: 200, harga: 100000 }
                ]
            }

        ]
    },


    {
        nama: "Kemasan",
        icon: "📦",

        produk: [

            {
                nama: "Kemasan Produk",
                gambar: "https://placehold.co/600x400",
                harga: [
                    { jumlah: 50, harga: 50000 },
                    { jumlah: 100, harga: 90000 }
                ]
            }

        ]
    }

];


// ======================================
// VARIABEL NAVIGASI
// ======================================

let halamanAsalDetail = "kategoriPage";


// ======================================
// FORMAT RUPIAH
// ======================================

function formatRupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);

}


// ======================================
// MENAMPILKAN KATEGORI
// ======================================

function tampilKategori() {

    const container = document.getElementById("kategoriList");

    container.innerHTML = "";

    katalog.forEach((kategori, index) => {

        container.innerHTML += `
            <div class="kategori" onclick="bukaKategori(${index})">

                <div class="icon">${kategori.icon}</div>

                <h3>${kategori.nama}</h3>

            </div>
        `;

    });

}


// ======================================
// MEMBUKA KATEGORI
// ======================================

function bukaKategori(index) {

    const kategori = katalog[index];

    document.getElementById("home").classList.remove("active");
    document.getElementById("detailPage").classList.remove("active");

    document.getElementById("kategoriPage").classList.add("active");

    document.getElementById("namaKategori").textContent = kategori.nama;

    const container = document.getElementById("produkList");

    container.innerHTML = "";

    kategori.produk.forEach((produk, indexProduk) => {

        container.innerHTML += buatKartuProduk(
            produk,
            index,
            indexProduk
        );

    });

    window.scrollTo(0, 0);

}


// ======================================
// TEMPLATE KARTU PRODUK
// ======================================

function buatKartuProduk(produk, indexKategori, indexProduk) {

    return `
        <div class="produk"
             onclick="bukaProduk(${indexKategori}, ${indexProduk})">

            <img src="${produk.gambar}" alt="${produk.nama}">

            <div class="produk-info">

                <h4>${produk.nama}</h4>

                <div class="harga">
                    Mulai ${formatRupiah(
                        Math.min(...produk.harga.map(item => item.harga))
                    )}
                </div>

            </div>

        </div>
    `;

}


// ======================================
// MEMBUKA DETAIL PRODUK
// ======================================

function bukaProduk(indexKategori, indexProduk) {

    const kategori = katalog[indexKategori];
    const produk = kategori.produk[indexProduk];

    halamanAsalDetail =
        document.getElementById("kategoriPage").classList.contains("active")
        ? "kategoriPage"
        : "home";

    document.getElementById("home").classList.remove("active");
    document.getElementById("kategoriPage").classList.remove("active");

    document.getElementById("detailPage").classList.add("active");

    const container = document.getElementById("detailProduk");

    let pilihanHarga = "";

    produk.harga.forEach((item, index) => {

        pilihanHarga += `
            <option value="${index}">
                ${item.jumlah} pcs - ${formatRupiah(item.harga)}
            </option>
        `;

    });


    container.innerHTML = `

        <div class="detail-card">

            <img
                class="detail-gambar"
                src="${produk.gambar}"
                alt="${produk.nama}"
            >

            <div class="detail-info">

                <h2>${produk.nama}</h2>

                <div class="detail-kategori">
                    Kategori: ${kategori.nama}
                </div>

                <label class="label-harga">
                    Pilih Jumlah Pembelian
                </label>

                <select
                    class="pilihan-harga"
                    id="pilihanHarga"
                    onchange="ubahHarga(${indexKategori}, ${indexProduk})"
                >
                    ${pilihanHarga}
                </select>

                <div class="total-harga">

                    <p>Harga Total</p>

                    <h2 id="hargaTotal"></h2>

                    <p id="hargaSatuan"></p>

                </div>

                <button
                    class="tombol-wa"
                    onclick="kirimWhatsApp(${indexKategori}, ${indexProduk})"
                >
                    Kirim Pesanan via WhatsApp
                </button>

            </div>

        </div>

    `;

    ubahHarga(indexKategori, indexProduk);

    window.scrollTo(0, 0);

}


// ======================================
// MENGUBAH PILIHAN HARGA
// ======================================

function ubahHarga(indexKategori, indexProduk) {

    const produk = katalog[indexKategori].produk[indexProduk];

    const pilihan = document.getElementById("pilihanHarga");

    const index = Number(pilihan.value);

    const dataHarga = produk.harga[index];

    const hargaSatuan = dataHarga.harga / dataHarga.jumlah;

    document.getElementById("hargaTotal").textContent =
        formatRupiah(dataHarga.harga);

    document.getElementById("hargaSatuan").textContent =
        `Harga per pcs: ${formatRupiah(hargaSatuan)}`;

}


// ======================================
// KIRIM PESAN WHATSAPP
// ======================================

function kirimWhatsApp(indexKategori, indexProduk) {

    const kategori = katalog[indexKategori];
    const produk = kategori.produk[indexProduk];

    const index = Number(
        document.getElementById("pilihanHarga").value
    );

    const pilihan = produk.harga[index];

    const hargaSatuan = pilihan.harga / pilihan.jumlah;

    const pesan =

`Halo, saya ingin memesan produk.

Produk: ${produk.nama}
Kategori: ${kategori.nama}

Jumlah: ${pilihan.jumlah} pcs
Harga Total: ${formatRupiah(pilihan.harga)}
Harga per pcs: ${formatRupiah(hargaSatuan)}

Mohon informasi lebih lanjut. Terima kasih.`;

    const url =
        `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");

}


// ======================================
// FITUR SEARCH
// ======================================

function cariProduk() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    const kategoriList = document.getElementById("kategoriList");
    const hasilSearch = document.getElementById("hasilSearch");

    const judul = document.getElementById("judulHome");

    if (keyword === "") {

        kategoriList.style.display = "grid";
        hasilSearch.innerHTML = "";

        judul.textContent = "Kategori Produk";

        return;

    }

    kategoriList.style.display = "none";

    judul.textContent = "Hasil Pencarian";

    let hasil = [];

    katalog.forEach((kategori, indexKategori) => {

        kategori.produk.forEach((produk, indexProduk) => {

            if (
                produk.nama.toLowerCase().includes(keyword) ||
                kategori.nama.toLowerCase().includes(keyword)
            ) {

                hasil.push(
                    buatKartuProduk(
                        produk,
                        indexKategori,
                        indexProduk
                    )
                );

            }

        });

    });

    if (hasil.length === 0) {

        hasilSearch.innerHTML = `
            <div class="kosong">
                Produk tidak ditemukan.
            </div>
        `;

        return;

    }

    hasilSearch.innerHTML = hasil.join("");

}


// ======================================
// KEMBALI DARI KATEGORI
// ======================================

function kembali() {

    document.getElementById("kategoriPage").classList.remove("active");

    document.getElementById("home").classList.add("active");

    window.scrollTo(0, 0);

}


// ======================================
// KEMBALI DARI DETAIL PRODUK
// ======================================

function kembaliDetail() {

    document.getElementById("detailPage").classList.remove("active");

    document.getElementById(halamanAsalDetail).classList.add("active");

    window.scrollTo(0, 0);

}


// ======================================
// JALANKAN
// ======================================

tampilKategori();
