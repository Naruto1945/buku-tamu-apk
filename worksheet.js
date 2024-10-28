// Element-elemen DOM
const addressSelect = document.getElementById("address");
const customAddressInput = document.getElementById("custom-address");
const dataForm = document.getElementById("data-form");
const resetBtn = document.getElementById("reset-btn");
const exportBtn = document.getElementById("export-btn");
const logoutBtn = document.getElementById("logout-btn");

// Fungsi untuk toggle input custom address
function toggleCustomAddress() {
  if (addressSelect.value === "Lainnya") {
    customAddressInput.style.display = "block";
  } else {
    customAddressInput.style.display = "none";
    customAddressInput.value = ""; // reset custom address
  }
}

// Fungsi untuk menyimpan data
function saveData(event) {
  event.preventDefault();

  const name = document.getElementById("name").value || "Tidak Diberikan";
  const address =
    addressSelect.value === "Lainnya"
      ? customAddressInput.value || "Tidak Diberikan"
      : addressSelect.value || "Tidak Diberikan";
  const amount = parseFloat(document.getElementById("amount").value) || 0;
  const rice = parseFloat(document.getElementById("rice").value) || 0;
  const others = document.getElementById("others").value || "Tidak Diberikan";

  // Data yang akan disimpan
  const data = { name, address, amount, rice, others };

  // Ambil data dari Local Storage, tambahkan data baru, dan simpan kembali
  const guestsData = JSON.parse(localStorage.getItem("worksheetData")) || [];
  guestsData.push(data);
  localStorage.setItem("worksheetData", JSON.stringify(guestsData));

  // Tampilkan alert setelah data berhasil disimpan
  alert("Data berhasil disimpan!");

  // Update total dan reset form
  updateTotals();
  dataForm.reset();
  toggleCustomAddress();
}

// Fungsi untuk menghitung total dan memperbarui tampilan
function updateTotals() {
  const guestsData = JSON.parse(localStorage.getItem("worksheetData")) || [];

  // Hitung total
  const totalGuests = guestsData.length;
  const totalAmount = guestsData.reduce((sum, guest) => sum + guest.amount, 0);
  const totalRice = guestsData.reduce((sum, guest) => sum + guest.rice, 0);
  const totalGifts = guestsData.filter(
    (guest) => guest.others !== "Tidak Diberikan"
  ).length;

  // Update tampilan total
  document.getElementById("total-guests").textContent = totalGuests;
  document.getElementById("total-amount").textContent = totalAmount;
  document.getElementById("total-rice").textContent = totalRice;
  document.getElementById("total-gifts").textContent = totalGifts;
}

// Fungsi untuk reset data di localStorage dan tampilan
function resetData() {
  if (confirm("Apakah Anda yakin ingin mereset semua data?")) {
    localStorage.removeItem("worksheetData");
    updateTotals();
    alert("Data berhasil direset!");
  }
}

// Fungsi untuk ekspor data ke Excel
function exportData() {
  const guestsData = JSON.parse(localStorage.getItem("worksheetData")) || [];

  if (guestsData.length === 0) {
    alert("Tidak ada data untuk diekspor!");
    return;
  }

  const worksheetData = guestsData.map((guest) => ({
    Nama: guest.name,
    Alamat: guest.address,
    "Jumlah Uang (Rp)": guest.amount,
    "Jumlah Beras (Kg)": guest.rice,
    Sumbangan: guest.others,
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(wb, ws, "Data Tamu");
  XLSX.writeFile(wb, "Data_Tamu.xlsx");
}

// Fungsi untuk logout (hanya mengarahkan ke halaman utama)
function logout() {
  if (confirm("Apakah Anda yakin ingin logout?")) {
    window.location.href = "index.html"; // Redirect ke halaman utama
  }
}

// Event listeners
dataForm.addEventListener("submit", saveData);
resetBtn.addEventListener("click", resetData);
exportBtn.addEventListener("click", exportData);
logoutBtn.addEventListener("click", logout);

// Memperbarui total saat halaman dimuat
updateTotals();
