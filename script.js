
// ======================================
// KONFIGURASI UNIVERSAL
// ======================================

const NOMOR_WA = "62895388390106";


// ======================================
// DATA KATALOG DAN HARGA
// hargaPerPcs = harga satuan berdasarkan
// jumlah minimum pembelian
// ======================================

const katalog = [

    {
        nama: "Plastik Beras",
        icon: "🛍️",

        produk: [

            {
                nama: "Plastik Custom",
                gambar: "https://placehold.co/600x400",

                hargaPerPcs: [
                    { min: 50, harga: 700 },
                    { min: 100, harga: 600 },
                    { min: 200, harga: 550 },
                    { min: 500, harga: 500 }
                ]
            },

            {
                nama: "Plastik Polos",
                gambar: "https://placehold.co/600x400",

                hargaPerPcs: [
                    { min: 50, harga: 200 },
                    { min: 100, harga: 180 },
                    { min: 200, harga: 170 }
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

                hargaPerPcs: [
                    { min: 50, harga: 700 },
                    { min: 100, harga: 650 },
                    { min: 200, harga: 600 }
                ]
            },

            {
                nama: "Cup 16 Oz",
                gambar: "https://placehold.co/600x400",

                hargaPerPcs: [
                    { min: 50, harga: 600 },
                    { min: 100, harga: 550 },
                    { min: 200, harga: 500 }
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

                hargaPerPcs: [
                    { min: 50, harga: 1000 },
                    { min: 100, harga: 900 }
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
// FORMAT SLUG KATEGORI UNTUK URL
// ======================================

function slugKategori(nama) {

    return nama
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

}


function urlKategori(index) {

    const url = new URL(window.location.href);

    url.searchParams.set(
        "kategori",
        slugKategori(katalog[index].nama)
    );

    url.hash = "";

    return url.toString();

}


// ======================================
// MENCARI HARGA BERDASARKAN JUMLAH
// ======================================

function cariHarga(produk, jumlah) {

    const daftarHarga = produk.hargaPerPcs;

    // Urutkan berdasarkan jumlah minimum
    const hargaUrut = [...daftarHarga].sort(
        (a, b) => a.min - b.min
    );

    // Cari harga yang berlaku untuk jumlah tersebut
    let hargaTerpilih = null;

    for (const item of hargaUrut) {

        if (jumlah >= item.min) {
            hargaTerpilih = item;
        }

    }

    return hargaTerpilih;

}


// ======================================
// MEMBUAT KETERANGAN RENTANG HARGA
// ======================================

function rentangHarga(produk, index) {

    const daftar = [...produk.hargaPerPcs].sort(
        (a, b) => a.min - b.min
    );

    const item = daftar[index];
    const berikutnya = daftar[index + 1];

    if (berikutnya) {

        return `${item.min}–${berikutnya.min - 1} pcs`;

    }

    return `${item.min} pcs ke atas`;

}


// ======================================
// MENAMPILKAN KATEGORI
// ======================================

function tampilKategori() {

    const container = document.getElementById("kategoriList");

    container.innerHTML = "";

    katalog.forEach((kategori, index) => {

        container.innerHTML += `
            <div class="kategori"
                 onclick="bukaKategori(${index})">

                <div class="icon">${kategori.icon}</div>

                <h3>${kategori.nama}</h3>

            </div>
        `;

    });

}


// ======================================
// MEMBUKA KATEGORI
// ======================================

function bukaKategori(index, ubahURL = true) {

    const kategori = katalog[index];

    if (!kategori) return;

    if (ubahURL) {

        history.pushState(
            { halaman: "kategori", index: index },
            "",
            urlKategori(index)
        );

    }

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

    const hargaTermurah = Math.min(
        ...produk.hargaPerPcs.map(item => item.harga)
    );

    return `
        <div class="produk"
             onclick="bukaProduk(${indexKategori}, ${indexProduk})">

            <img src="${produk.gambar}" alt="${produk.nama}">

            <div class="produk-info">

                <h4>${produk.nama}</h4>

                <div class="harga">
                    Mulai ${formatRupiah(hargaTermurah)} / pcs
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

    if (!produk) return;

    halamanAsalDetail =
        document.getElementById("kategoriPage").classList.contains("active")
        ? "kategoriPage"
        : "home";

    document.getElementById("home").classList.remove("active");
    document.getElementById("kategoriPage").classList.remove("active");

    document.getElementById("detailPage").classList.add("active");

    const container = document.getElementById("detailProduk");

    let daftarHarga = "";

    produk.hargaPerPcs
        .slice()
        .sort((a, b) => a.min - b.min)
        .forEach((item, index, daftar) => {

            daftarHarga += `
                <div class="baris-harga">
                    <span>${rentangHarga(produk, index)}</span>
                    <strong>${formatRupiah(item.harga)} / pcs</strong>
                </div>
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

                <h3>Daftar Harga</h3>

                <div class="daftar-harga">
                    ${daftarHarga}
                </div>

                <label class="label-harga" for="jumlahBeli">
                    Jumlah Pembelian
                </label>

                <input
                    class="pilihan-harga"
                    type="number"
                    id="jumlahBeli"
                    min="${Math.min(...produk.hargaPerPcs.map(item => item.min))}"
                    step="1"
                    value="${Math.min(...produk.hargaPerPcs.map(item => item.min))}"
                    oninput="ubahHarga(${indexKategori}, ${indexProduk})"
                >

                <div class="total-harga">

                    <p>Harga per pcs</p>

                    <h3 id="hargaSatuan"></h3>

                    <p>Harga Total</p>

                    <h2 id="hargaTotal"></h2>

                    <p id="keteranganHarga"></p>

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
// MENGUBAH HARGA OTOMATIS
// ======================================

function ubahHarga(indexKategori, indexProduk) {

    const produk = katalog[indexKategori].produk[indexProduk];

    const input = document.getElementById("jumlahBeli");

    const jumlah = Number(input.value);

    const jumlahMinimum = Math.min(
        ...produk.hargaPerPcs.map(item => item.min)
    );

    const hargaSatuanElement = document.getElementById("hargaSatuan");
    const hargaTotalElement = document.getElementById("hargaTotal");
    const keteranganElement = document.getElementById("keteranganHarga");

    if (
        !Number.isInteger(jumlah) ||
        jumlah < jumlahMinimum
    ) {

        hargaSatuanElement.textContent = "-";
        hargaTotalElement.textContent = "-";

        keteranganElement.textContent =
            `Minimum pembelian ${jumlahMinimum} pcs.`;

        return;

    }

    const dataHarga = cariHarga(produk, jumlah);

    if (!dataHarga) return;

    const total = jumlah * dataHarga.harga;

    hargaSatuanElement.textContent =
        formatRupiah(dataHarga.harga);

    hargaTotalElement.textContent =
        formatRupiah(total);

    keteranganElement.textContent =
        `Harga berlaku untuk pembelian ${jumlah} pcs.`;

}


// ======================================
// KIRIM PESAN WHATSAPP
// ======================================

function kirimWhatsApp(indexKategori, indexProduk) {

    const kategori = katalog[indexKategori];
    const produk = kategori.produk[indexProduk];

    const jumlah = Number(
        document.getElementById("jumlahBeli").value
    );

    const jumlahMinimum = Math.min(
        ...produk.hargaPerPcs.map(item => item.min)
    );

    if (
        !Number.isInteger(jumlah) ||
        jumlah < jumlahMinimum
    ) {

        alert(`Minimum pembelian ${jumlahMinimum} pcs.`);

        return;

    }

    const pilihan = cariHarga(produk, jumlah);

    const hargaSatuan = pilihan.harga;
    const total = jumlah * hargaSatuan;

    const pesan =

`Halo, saya ingin memesan produk.

Produk: ${produk.nama}
Kategori: ${kategori.nama}

Jumlah: ${jumlah} pcs
Harga per pcs: ${formatRupiah(hargaSatuan)}
Harga Total: ${formatRupiah(total)}

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

    const url = new URL(window.location.href);

    url.searchParams.delete("kategori");

    history.pushState({}, "", url.toString());

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
// MEMBUKA KATEGORI DARI URL
// ======================================

function bukaKategoriDariURL() {

    const parameter = new URLSearchParams(window.location.search);

    const slug = parameter.get("kategori");

    if (!slug) return;

    const index = katalog.findIndex(
        kategori => slugKategori(kategori.nama) === slug
    );

    if (index !== -1) {

        bukaKategori(index, false);

    }

}


// ======================================
// NAVIGASI BROWSER BACK / FORWARD
// ======================================

window.addEventListener("popstate", function () {

    const parameter = new URLSearchParams(window.location.search);

    const slug = parameter.get("kategori");

    if (slug) {

        const index = katalog.findIndex(
            kategori => slugKategori(kategori.nama) === slug
        );

        if (index !== -1) {

            bukaKategori(index, false);

        }

    } else {

        document.getElementById("kategoriPage").classList.remove("active");
        document.getElementById("detailPage").classList.remove("active");

        document.getElementById("home").classList.add("active");

        window.scrollTo(0, 0);

    }

});


// ======================================
// JALANKAN
// ======================================

tampilKategori();

bukaKategoriDariURL();
