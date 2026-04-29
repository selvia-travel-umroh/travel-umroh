// script.js

let dataPendaftaran = [];

/* HITUNG TOTAL */
function hitungTotal(){

  let paket =
    Number(
      document.getElementById("paketSelect").value
    );

  let jamaah =
    Number(
      document.getElementById("jamaah").value
    );

  let kamar =
    Number(
      document.getElementById("kamar").value
    );

  let total =
    (paket * jamaah) + kamar;

  if(!total){
    total = 0;
  }

  document.getElementById("totalHarga")
  .innerText =
  "Rp " + total.toLocaleString();

}

/* COUNTDOWN */
function countdown(){

  let tanggal =
    document.getElementById("tanggal").value;

  if(!tanggal){

    document.getElementById("countdown")
    .innerText =
    "Pilih Tanggal";

    return;
  }

  let target =
    new Date(tanggal);

  let sekarang =
    new Date();

  let selisih =
    target - sekarang;

  let hari =
    Math.floor(
      selisih / (1000 * 60 * 60 * 24)
    );

  if(hari < 0){
    hari = 0;
  }

  document.getElementById("countdown")
  .innerText =
  hari + " Hari Lagi";

}

/* EVENT */
document.getElementById("paketSelect")
.addEventListener("change", hitungTotal);

document.getElementById("jamaah")
.addEventListener("input", hitungTotal);

document.getElementById("kamar")
.addEventListener("change", hitungTotal);

document.getElementById("tanggal")
.addEventListener("change", countdown);

/* DAFTAR */
function daftar(){

  let nama =
    document.getElementById("nama").value;

  let umur =
    document.getElementById("umur").value;

  let paketText =
    document.getElementById("paketSelect")
    .options[
      document.getElementById("paketSelect")
      .selectedIndex
    ].text;

  let paketHarga =
    Number(
      document.getElementById("paketSelect")
      .value
    );

  let tanggal =
    document.getElementById("tanggal").value;

  let jamaah =
    Number(
      document.getElementById("jamaah").value
    );

  let kamar =
    document.getElementById("kamar")
    .options[
      document.getElementById("kamar")
      .selectedIndex
    ].text;

  let kamarHarga =
    Number(
      document.getElementById("kamar").value
    );

  let pembayaran =
    document.getElementById("pembayaran")
    .value;

  let total =
    (paketHarga * jamaah)
    + kamarHarga;

  if(
    !nama ||
    !umur ||
    !paketHarga ||
    !tanggal ||
    !jamaah ||
    !pembayaran
  ){

    alert(
      "Lengkapi data terlebih dahulu!"
    );

    return;
  }

  if(umur < 12){

    alert(
      "Umur jamaah minimal 12 tahun!"
    );

    return;
  }

  dataPendaftaran.push({

    nama,
    umur,
    paketText,
    tanggal,
    jamaah,
    kamar,
    pembayaran,
    total

  });

  alert(
    "Pendaftaran berhasil!"
  );

  renderData();

}

/* RENDER */
function renderData(){

  let html = "";

  let totalPendapatan = 0;

  let totalSemuaJamaah = 0;

  dataPendaftaran.forEach((d,index)=>{

    totalPendapatan += Number(d.total);

    totalSemuaJamaah += Number(d.jamaah);

    html += `

    <div class="riwayat-card">

      <h3>${d.nama}</h3>

      <p>Umur : ${d.umur} Tahun</p>

      <p>${d.paketText}</p>

      <p>Tanggal :
      ${d.tanggal}</p>

      <p>Jumlah Jamaah :
      ${d.jamaah}</p>

      <p>Tipe Kamar :
      ${d.kamar}</p>

      <p>Pembayaran :
      ${d.pembayaran}</p>

      <h4>
        Rp ${Number(d.total)
        .toLocaleString()}
      </h4>

      <button
      onclick="hapus(${index})">

      Cancel

      </button>

    </div>

    `;

  });

  document.getElementById("listRiwayat")
  .innerHTML = html;

  document.getElementById("totalJamaah")
  .innerText =
  totalSemuaJamaah;

  document.getElementById("totalDaftar")
  .innerText =
  dataPendaftaran.length;

  document.getElementById("pendapatan")
  .innerText =
  "Rp " +
  totalPendapatan.toLocaleString();

}

/* HAPUS */
function hapus(index){

  dataPendaftaran.splice(index,1);

  renderData();

}