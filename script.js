
// DATA KATALOG

const katalog = [

    {
        nama: "Plastik",
        icon: "🛍️",
        produk: [
            {
                nama: "Plastik Custom",
                harga: "Rp250 - Rp500",
                gambar: "https://placehold.co/300x200"
            },
            {
                nama: "Plastik Polos",
                harga: "Rp100",
                gambar: "https://placehold.co/300x200"
            }
        ]
    },

    {
        nama: "Cup",
        icon: "🥤",
        produk: [
            {
                nama: "Cup 22 Oz",
                harga: "Rp700",
                gambar: "https://placehold.co/300x200"
            },
            {
                nama: "Cup 16 Oz",
                harga: "Rp600",
                gambar: "https://placehold.co/300x200"
            }
        ]
    },

    {
        nama: "Kemasan",
        icon: "📦",
        produk: [
            {
                nama: "Kemasan Produk",
                harga: "Hubungi Kami",
                gambar: "https://placehold.co/300x200"
            }
        ]
    }

];


// MENAMPILKAN KATEGORI

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


// MEMBUKA KATEGORI

function bukaKategori(index) {

    const kategori = katalog[index];

    document.getElementById("home").classList.remove("active");
    document.getElementById("kategoriPage").classList.add("active");

    document.getElementById("namaKategori").textContent = kategori.nama;

    const container = document.getElementById("produkList");

    container.innerHTML = "";

    kategori.produk.forEach(produk => {

        container.innerHTML += buatKartuProduk(produk);

    });

    window.scrollTo(0, 0);

}


// TEMPLATE PRODUK

function buatKartuProduk(produk) {

    return `
        <div class="produk">

            <img src="${produk.gambar}" alt="${produk.nama}">

            <div class="produk-info">
                <h4>${produk.nama}</h4>
                <div class="harga">${produk.harga}</div>
            </div>

        </div>
    `;

}


// FITUR SEARCH

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

        kategori.produk.forEach(produk => {

            if (
                produk.nama.toLowerCase().includes(keyword) ||
                kategori.nama.toLowerCase().includes(keyword)
            ) {

                hasil.push({
                    ...produk,
                    kategoriIndex: indexKategori
                });

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

    hasilSearch.innerHTML = hasil
        .map(produk => buatKartuProduk(produk))
        .join("");

}


// KEMBALI

function kembali() {

    document.getElementById("kategoriPage").classList.remove("active");
    document.getElementById("home").classList.add("active");

    window.scrollTo(0, 0);

}


// JALANKAN

tampilKategori();
