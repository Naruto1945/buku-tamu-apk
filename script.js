// Ambil elemen dari DOM
const loginBtn = document.getElementById("login-btn");
const createAccountBtn = document.getElementById("create-account-btn");
const backToLoginBtn = document.getElementById("back-to-login-btn");
const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");
const forgotPassword = document.getElementById("forgot-password");

// Fungsi untuk menyimpan akun baru ke Local Storage
function saveAccount(email, password) {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  accounts.push({ email, password });
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Fungsi untuk menangani pembuatan akun baru
function createAccount() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  // Cek jika email sudah terdaftar
  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const existingAccount = accounts.find((account) => account.email === email);

  if (existingAccount) {
    alert("Email sudah terdaftar! Silakan gunakan email lain.");
  } else {
    saveAccount(email, password);
    alert("Akun berhasil dibuat! Silakan login.");
    toggleForms();
  }
}

// Fungsi untuk menangani login
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const account = accounts.find(
    (account) => account.email === email && account.password === password
  );

  if (account) {
    alert("Login berhasil! Selamat datang!");
    // Redirect ke halaman worksheet
    window.location.href = "worksheet.html"; // Tambahkan baris ini
  } else {
    alert("Email atau password salah!");
  }
}

// Fungsi untuk mengubah tampilan form
function toggleForms() {
  signupForm.style.display =
    signupForm.style.display === "none" ? "block" : "none";
  loginForm.style.display =
    loginForm.style.display === "none" ? "block" : "none";
}

// Fungsi untuk menangani forgot password
function handleForgotPassword() {
  alert("Silakan masukkan email untuk mereset password Anda.");
}

// Event Listeners
loginBtn.addEventListener("click", login);
createAccountBtn.addEventListener("click", toggleForms);
backToLoginBtn.addEventListener("click", toggleForms);
forgotPassword.addEventListener("click", handleForgotPassword);

// Event Listener untuk form pembuatan akun
document.getElementById("signup-btn").addEventListener("click", (e) => {
  e.preventDefault(); // Mencegah pengiriman form
  createAccount();
});

if (account) {
  alert("Login berhasil! Selamat datang!");
  window.location.href = "worksheet.html"; // Redirect to worksheet page
}
