
// =====================================
// PENGATURAN WHATSAPP
// =====================================

const NOMOR_WA = "6281234567890";


// =====================================
// DATA KATALOG PRODUK
// =====================================

const katalog = [

    {
        nama: "Cup",
        icon: "🥤",
        produk: [
            {
                nama: "Cup Printing 22oz",
                gambar: "images/cup.jpg",
                deskripsi: "Cup printing untuk kebutuhan usaha minuman.",
                harga: [
                    { jumlah: 100, harga: 70000 },
                    { jumlah: 500, harga: 300000 },
                    { jumlah: 1000, harga: 490000 }
                ]
            }
        ]
    },

    {
        nama: "Plastik",
        icon: "🛍️",
        produk: [
            {
                nama: "Plastik Custom",
                gambar: "images/plastik.jpg",
                deskripsi: "Plastik custom dengan desain sesuai kebutuhan.",
                harga: [
                    { jumlah: 100, harga: 50000 },
                    { jumlah: 500, harga: 200000 },
                    { jumlah: 1000, harga: 350000 }
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
                gambar: "images/kemasan.jpg",
                deskripsi: "Kemasan untuk menunjang kebutuhan bisnis.",
                harga: [
                    { jumlah: 100, harga: 60000 },
                    { jumlah: 500, harga: 275000 },
                    { jumlah: 1000, harga: 500000 }
                ]
            }
        ]
    }

];


// =====================================
// DATA TESTIMONI
// =====================================

const testimoni = [
    {
        nama: "Pelanggan A",
        bintang: 5,
        pesan: "Pelayanan cepat dan hasil produk sangat memuaskan."
    },
    {
        nama: "Pelanggan B",
        bintang: 5,
        pesan: "Kualitas produk bagus dan pengiriman tepat waktu."
    },
    {
        nama: "Pelanggan C",
        bintang: 5,
        pesan: "Harga bersaing dan mudah melakukan pemesanan."
    }
];


// =====================================
// DATA PORTOFOLIO
// =====================================

const portfolio = [
    {
        nama: "Plastik Custom",
        gambar: "images/plastik.jpg",
        deskripsi: "Hasil cetak plastik custom untuk pelanggan."
    },
    {
        nama: "Cup Printing",
        gambar: "images/cup.jpg",
        deskripsi: "Hasil pekerjaan cetak cup."
    },
    {
        nama: "Kemasan Produk",
        gambar: "images/kemasan.jpg",
        deskripsi: "Produksi kemasan untuk kebutuhan bisnis."
    }
];


// =====================================
// VARIABEL HALAMAN
// =====================================

let kategoriAktif = null;
let halamanAsalDetail = "home";


// =====================================
// FORMAT RUPIAH
// =====================================

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}


// =====================================
// MEMBUAT SLUG KATEGORI
// =====================================

function slugKategori(nama) {
    return nama
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}


// =====================================
// MEMBUAT URL KATEGORI
// =====================================

function urlKategori(index) {
    const url = new URL(window.location.href);

    url.searchParams.set(
        "kategori",
        slugKategori(katalog[index].nama)
    );

    url.hash = "";

    return url.toString();
}


// =====================================
// MENAMPILKAN HALAMAN
// =====================================

function bukaHalaman(id) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    window.scrollTo(0, 0);

    // Membersihkan URL kategori saat kembali ke halaman utama
    if (id === "home") {
        history.pushState({}, "", window.location.pathname);

        document.getElementById("searchInput").value = "";

        document.getElementById("kategoriArea").classList.remove("hidden");
        document.getElementById("hasilSearchArea").classList.add("hidden");
    }
}


// =====================================
// MENAMPILKAN KATEGORI
// =====================================

function tampilKategori() {
    const container = document.getElementById("kategoriList");

    container.innerHTML = "";

    katalog.forEach((kategori, index) => {
        container.innerHTML += `
            <a
                href="${urlKategori(index)}"
                class="kategori-card"
                onclick="event.preventDefault(); bukaKategori(${index});"
            >
                <div class="kategori-icon">${kategori.icon}</div>
                <h3>${kategori.nama}</h3>
            </a>
        `;
    });
}


// =====================================
// MEMBUKA KATEGORI
// =====================================

function bukaKategori(index, ubahURL = true) {

    kategoriAktif = index;

    if (ubahURL) {
        history.pushState(
            { halaman: "kategori", index: index },
            "",
            urlKategori(index)
        );
    }

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("kategoriPage").classList.add("active");

    document.getElementById("namaKategori").textContent =
        katalog[index].nama;

    tampilProduk(index);

    window.scrollTo(0, 0);
}


// =====================================
// MENAMPILKAN PRODUK
// =====================================

function tampilProduk(index) {
    const container = document.getElementById("produkList");

    container.innerHTML = "";

    katalog[index].produk.forEach((produk, indexProduk) => {
        container.innerHTML += buatKartuProduk(
            produk,
            index,
            indexProduk
        );
    });
}


// =====================================
// MEMBUAT KARTU PRODUK
// =====================================

function buatKartuProduk(produk, indexKategori, indexProduk) {

    const hargaMulai = Math.min(
        ...produk.harga.map(item => item.harga)
    );

    return `
        <div
            class="produk"
            onclick="bukaProduk(${indexKategori}, ${indexProduk})"
        >
            <img src="${produk.gambar}" alt="${produk.nama}">

            <div class="produk-info">
                <h3>${produk.nama}</h3>
                <p>Mulai ${formatRupiah(hargaMulai)}</p>
            </div>
        </div>
    `;
}


// =====================================
// MEMBUKA DETAIL PRODUK
// =====================================

function bukaProduk(indexKategori, indexProduk) {

    const halamanKategori =
        document.getElementById("kategoriPage").classList.contains("active");

    halamanAsalDetail = halamanKategori
        ? "kategoriPage"
        : "home";

    const produk = katalog[indexKategori].produk[indexProduk];

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("detailPage").classList.add("active");

    let pilihanHarga = "";

    produk.harga.forEach((item, index) => {
        pilihanHarga += `
            <option value="${index}">
                ${item.jumlah} pcs - ${formatRupiah(item.harga)}
            </option>
        `;
    });

    document.getElementById("detailProduk").innerHTML = `
        <div class="detail-card">

            <img
                class="detail-gambar"
                src="${produk.gambar}"
                alt="${produk.nama}"
            >

            <div class="detail-info">

                <h2>${produk.nama}</h2>

                <p>${produk.deskripsi || ""}</p>

                <label>Pilih Paket Harga</label>

                <select
                    id="pilihanHarga"
                    class="pilihan-harga"
                    onchange="ubahHarga(${indexKategori}, ${indexProduk})"
                >
                    ${pilihanHarga}
                </select>

                <div class="total-harga">
                    <p>Total Harga:</p>
                    <h3 id="totalHarga"></h3>

                    <p>Harga per pcs:</p>
                    <strong id="hargaPerPcs"></strong>
                </div>

                <button
                    class="tombol-wa"
                    onclick="kirimWhatsApp(${indexKategori}, ${indexProduk})"
                >
                    Pesan Melalui WhatsApp
                </button>

            </div>

        </div>
    `;

    ubahHarga(indexKategori, indexProduk);

    window.scrollTo(0, 0);
}


// =====================================
// MENGHITUNG HARGA
// =====================================

function ubahHarga(indexKategori, indexProduk) {

    const produk = katalog[indexKategori].produk[indexProduk];

    const indexPilihan = Number(
        document.getElementById("pilihanHarga").value
    );

    const pilihan = produk.harga[indexPilihan];

    const hargaPerPcs = pilihan.harga / pilihan.jumlah;

    document.getElementById("totalHarga").textContent =
        formatRupiah(pilihan.harga);

    document.getElementById("hargaPerPcs").textContent =
        formatRupiah(hargaPerPcs);
}


// =====================================
// PEMESANAN WHATSAPP
// =====================================

function kirimWhatsApp(indexKategori, indexProduk) {

    const kategori = katalog[indexKategori];
    const produk = kategori.produk[indexProduk];

    const indexPilihan = Number(
        document.getElementById("pilihanHarga").value
    );

    const pilihan = produk.harga[indexPilihan];

    const hargaPerPcs = pilihan.harga / pilihan.jumlah;

    const pesan = `
Halo, saya tertarik dengan produk berikut.

Kategori: ${kategori.nama}
Produk: ${produk.nama}
Jumlah: ${pilihan.jumlah} pcs
Total Harga: ${formatRupiah(pilihan.harga)}
Harga per pcs: ${formatRupiah(hargaPerPcs)}

Mohon informasi lebih lanjut.
    `.trim();

    const url =
        `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
}


// =====================================
// PENCARIAN PRODUK
// =====================================

function cariProduk() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const kategoriArea = document.getElementById("kategoriArea");
    const hasilArea = document.getElementById("hasilSearchArea");
    const hasilContainer = document.getElementById("hasilSearch");

    if (keyword === "") {
        kategoriArea.classList.remove("hidden");
        hasilArea.classList.add("hidden");
        return;
    }

    kategoriArea.classList.add("hidden");
    hasilArea.classList.remove("hidden");

    hasilContainer.innerHTML = "";

    katalog.forEach((kategori, indexKategori) => {

        kategori.produk.forEach((produk, indexProduk) => {

            const cocokKategori =
                kategori.nama.toLowerCase().includes(keyword);

            const cocokProduk =
                produk.nama.toLowerCase().includes(keyword);

            if (cocokKategori || cocokProduk) {

                hasilContainer.innerHTML += buatKartuProduk(
                    produk,
                    indexKategori,
                    indexProduk
                );

            }

        });

    });

    if (hasilContainer.innerHTML === "") {
        hasilContainer.innerHTML = `
            <p class="kosong">Produk tidak ditemukan.</p>
        `;
    }
}


// =====================================
// KEMBALI KE HALAMAN UTAMA
// =====================================

function kembaliHome() {
    bukaHalaman("home");
}


// =====================================
// KEMBALI DARI DETAIL PRODUK
// =====================================

function kembaliDetail() {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document
        .getElementById(halamanAsalDetail)
        .classList.add("active");

    window.scrollTo(0, 0);
}


// =====================================
// SALIN LINK KATEGORI
// =====================================

function salinLinkKategori() {

    if (kategoriAktif === null) return;

    const link = urlKategori(kategoriAktif);

    navigator.clipboard.writeText(link)
        .then(() => {
            alert("Link kategori berhasil disalin!");
        })
        .catch(() => {
            prompt("Salin link berikut:", link);
        });
}


// =====================================
// MENAMPILKAN TESTIMONI
// =====================================

function tampilTestimoni() {

    const container = document.getElementById("testimoniList");

    container.innerHTML = "";

    testimoni.forEach(item => {

        container.innerHTML += `
            <div class="testimoni-card">

                <div class="bintang">
                    ${"★".repeat(item.bintang)}
                </div>

                <h3>${item.nama}</h3>

                <p>${item.pesan}</p>

            </div>
        `;

    });
}


// =====================================
// MENAMPILKAN PORTOFOLIO
// =====================================

function tampilPortfolio() {

    const container = document.getElementById("portfolioList");

    container.innerHTML = "";

    portfolio.forEach(item => {

        container.innerHTML += `
            <div class="portfolio-card">

                <img
                    src="${item.gambar}"
                    alt="${item.nama}"
                >

                <div class="portfolio-info">

                    <h3>${item.nama}</h3>

                    <p>${item.deskripsi}</p>

                </div>

            </div>
        `;

    });
}


// =====================================
// TOMBOL WHATSAPP MENGAMBANG
// =====================================

function aturWhatsAppBubble() {

    const tombol = document.getElementById("waBubble");

    tombol.href = `https://wa.me/${NOMOR_WA}`;
}


// =====================================
// MEMBUKA KATEGORI DARI URL
// =====================================

function bukaKategoriDariURL() {

    const parameter = new URLSearchParams(
        window.location.search
    );

    const slug = parameter.get("kategori");

    if (!slug) {
        bukaHalaman("home");
        return;
    }

    const index = katalog.findIndex(
        kategori => slugKategori(kategori.nama) === slug
    );

    if (index !== -1) {
        bukaKategori(index, false);
    } else {
        bukaHalaman("home");
    }
}


// =====================================
// MENANGANI TOMBOL BACK BROWSER
// =====================================

window.addEventListener("popstate", () => {
    bukaKategoriDariURL();
});


// =====================================
// INISIALISASI
// =====================================

tampilKategori();
tampilTestimoni();
tampilPortfolio();
aturWhatsAppBubble();

bukaKategoriDariURL();
