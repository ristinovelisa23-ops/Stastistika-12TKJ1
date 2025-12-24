/* ================= GLOBAL STATE ================= */
let level = 1;
let angka = [];
let dragItem = null;
let timer = 30;
let intervalTimer = null;

/* ================= ELEMENT ================= */
const areaAngka = document.getElementById("areaAngka");
const cekBtn = document.getElementById("cekBtn");
const hasil = document.getElementById("hasil");

const opening = document.getElementById("opening");
const countdown = document.getElementById("countdown");
const gameScreen = document.getElementById("gameScreen");
const desc = document.getElementById("desc");

/* ================= AUDIO ================= */
const bgMusic = new Audio("aodgame.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;

const sfxBenar = new Audio("benar.mp3");
const sfxSalah = new Audio("wrong.mp3");
const sfxPop = new Audio("pop.mp3");
const sfxGameOver = new Audio("gameover.mp3");

[bgMusic, sfxBenar, sfxSalah, sfxPop, sfxGameOver].forEach(a => a.load());

/* ================= START BUTTON DI TENGAH ================= */
const startBtnContainer = document.createElement("div");
startBtnContainer.style.display = "flex";
startBtnContainer.style.justifyContent = "center";
startBtnContainer.style.alignItems = "center";
startBtnContainer.style.height = "100px";
startBtnContainer.style.marginTop = "24px";

const startBtn = document.createElement("button");
startBtn.textContent = "START";
startBtn.style.padding = "12px 32px";
startBtn.style.fontSize = "18px";
startBtn.style.cursor = "pointer";
startBtn.style.borderRadius = "10px";
startBtn.style.border = "none";
startBtn.style.backgroundColor = "#333";
startBtn.style.color = "#f0f0f0";
startBtn.style.fontWeight = "700";

startBtnContainer.appendChild(startBtn);
opening.appendChild(startBtnContainer);

startBtn.addEventListener("click", () => {
  bgMusic.play().catch(() => {});
  startBtnContainer.style.display = "none";
  mulaiCountdown();
});

/* ================= DISPLAY LEVEL & TIMER ================= */
const gameTitle = document.querySelector("h1");
gameTitle.style.marginBottom = "12px";

const statusContainer = document.createElement("div");
statusContainer.style.display = "flex";
statusContainer.style.justifyContent = "space-between";
statusContainer.style.alignItems = "center";
statusContainer.style.marginTop = "12px";
gameTitle.insertAdjacentElement("afterend", statusContainer);

const levelDisplay = document.createElement("div");
levelDisplay.style.fontSize = "16px";
levelDisplay.style.fontWeight = "700";
levelDisplay.style.color = "#f0f0f0";
statusContainer.appendChild(levelDisplay);

const timerDisplay = document.createElement("div");
timerDisplay.style.fontSize = "16px";
timerDisplay.style.fontWeight = "700";
timerDisplay.style.color = "#f0f0f0";
statusContainer.appendChild(timerDisplay);

/* ================= URUTKAN DISPLAY ================= */
const urutkanDisplay = document.createElement("div");
urutkanDisplay.style.fontSize = "14px";
urutkanDisplay.style.fontWeight = "400";
urutkanDisplay.style.color = "#fff";
urutkanDisplay.style.marginTop = "16px";
urutkanDisplay.style.marginBottom = "24px";
urutkanDisplay.style.textAlign = "center";
gameScreen.insertBefore(urutkanDisplay, areaAngka);

/* ================= POPUP ================= */
const popup = document.createElement("div");
popup.style.position = "fixed";
popup.style.top = "0";
popup.style.left = "0";
popup.style.width = "100%";
popup.style.height = "100%";
popup.style.backgroundColor = "rgba(0,0,0,0.5)";
popup.style.display = "none";
popup.style.justifyContent = "center";
popup.style.alignItems = "center";
popup.style.zIndex = "1000";

const popupContent = document.createElement("div");
popupContent.style.backgroundColor = "#222";
popupContent.style.padding = "28px 40px";
popupContent.style.borderRadius = "16px";
popupContent.style.textAlign = "center";
popupContent.style.color = "#f0f0f0";
popupContent.style.fontSize = "20px";
popupContent.style.fontWeight = "700";
popupContent.style.display = "flex";
popupContent.style.flexDirection = "column";
popupContent.style.alignItems = "center";
popupContent.style.gap = "18px";

const popupMessage = document.createElement("div");
popupContent.appendChild(popupMessage);

const btnContainer = document.createElement("div");
btnContainer.style.display = "flex";
btnContainer.style.gap = "16px";

const btnLanjut = document.createElement("button");
btnLanjut.textContent = "Lanjut";
btnLanjut.style.padding = "10px 24px";
btnLanjut.style.border = "none";
btnLanjut.style.borderRadius = "8px";
btnLanjut.style.cursor = "pointer";
btnLanjut.style.backgroundColor = "#333";
btnLanjut.style.color = "#f0f0f0";
btnLanjut.style.fontWeight = "600";

const btnKeluar = document.createElement("button");
btnKeluar.textContent = "Keluar";
btnKeluar.style.padding = "10px 24px";
btnKeluar.style.border = "none";
btnKeluar.style.borderRadius = "8px";
btnKeluar.style.cursor = "pointer";
btnKeluar.style.backgroundColor = "#333";
btnKeluar.style.color = "#f0f0f0";
btnKeluar.style.fontWeight = "600";

btnContainer.appendChild(btnLanjut);
btnContainer.appendChild(btnKeluar);
popupContent.appendChild(btnContainer);
popup.appendChild(popupContent);
document.body.appendChild(popup);

function showPopup(message, callbackLanjut, callbackKeluar) {
  popupMessage.textContent = message;
  popup.style.display = "flex";
  sfxPop.play().catch(() => {});
  btnLanjut.onclick = () => {
    popup.style.display = "none";
    if (callbackLanjut) callbackLanjut();
  };
  btnKeluar.onclick = () => {
    popup.style.display = "none";
    if (callbackKeluar) callbackKeluar();
  };
}

/* ================= GENERATE & TAMPILKAN ANGKA ================= */
function generateAngka() {
  const jumlah = Math.min(7 + Math.floor(Math.random() * 6), 15);
  let min = Math.max(1, level * 10);
  let max = Math.min(100, min + 30);
  let pool = [];
  for (let i = min; i <= max; i++) pool.push(i);
  pool.sort(() => Math.random() - 0.5);
  return pool.slice(0, jumlah);
}

function tampilkanAngka() {
  areaAngka.innerHTML = "";
  angka.forEach(n => {
    const div = document.createElement("div");
    div.className = "angka";
    div.textContent = n;
    div.draggable = true;

    div.addEventListener("dragstart", () => { dragItem = div; });
    div.addEventListener("dragover", e => e.preventDefault());
    div.addEventListener("drop", () => {
      if (dragItem !== div) {
        const temp = div.textContent;
        div.textContent = dragItem.textContent;
        dragItem.textContent = temp;
      }
    });

    areaAngka.appendChild(div);
  });
}

/* ================= MULAI LEVEL ================= */
function mulaiLevel() {
  timer = 30;
  if (intervalTimer) clearInterval(intervalTimer);
  intervalTimer = setInterval(() => {
    timer--;
    timerDisplay.textContent = `⏱ ${timer}s`;
    if (timer <= 0) {
      clearInterval(intervalTimer);
      sfxGameOver.play().catch(() => {});
      showPopup("⏰ Waktu habis!", mulaiLevel, () => resetGame());
    }
  }, 1000);

  angka = generateAngka();
  tampilkanAngka();
  levelDisplay.textContent = `Level ${level}`;
  urutkanDisplay.textContent = "Urutkan dari kecil ke besar";
  timerDisplay.textContent = `⏱ ${timer}s`;
  hasil.textContent = "";

  cekBtn.onclick = () => {
    const urutanUser = [...document.querySelectorAll(".angka")].map(el => Number(el.textContent));
    const benar = [...urutanUser].sort((a,b)=>a-b).every((v,i)=>v===urutanUser[i]);
    if (benar) {
      sfxBenar.play().catch(() => {});
      hasil.textContent = "🔥 BENAR! Level naik!";
      level++;
      clearInterval(intervalTimer);
      setTimeout(mulaiLevel, 800);
    } else {
      hasil.textContent = "❌ Salah, coba geser lagi.";
      sfxSalah.play().catch(() => {});
    }
  };

  // tampilkan tombol X di pojok kanan atas pas game aktif
  closeBtn.style.display = "block";
}

/* ================= COUNTDOWN ================= */
const hitung = ["READY?", "3", "2", "1", "GO!"];
let index = 0;
function mulaiCountdown() {
  countdown.textContent = hitung[index];
  index++;
  if (index < hitung.length) {
    setTimeout(mulaiCountdown, 800);
  } else {
    setTimeout(() => {
      opening.style.display = "none";
      gameScreen.style.display = "block";
      mulaiLevel();
    }, 800);
  }
}

/* ================= RESET GAME ================= */
function resetGame() {
  clearInterval(intervalTimer);
  intervalTimer = null;
  bgMusic.pause();
  bgMusic.currentTime = 0;

  areaAngka.innerHTML = "";
  hasil.textContent = "";
  countdown.textContent = "";
  urutkanDisplay.textContent = "";

  gameScreen.style.display = "none";
  opening.style.display = "block";
  level = 1;
  startBtnContainer.style.display = "flex";

  closeBtn.style.display = "none";
}

/* ================= TOMBOL X ================= */
const closeBtn = document.createElement("button");
closeBtn.id = "closeBtn";
closeBtn.textContent = "X";
closeBtn.style.display = "none"; // sembunyi dulu
document.querySelector(".container").appendChild(closeBtn);

closeBtn.addEventListener("click", () => {
  clearInterval(intervalTimer);
  intervalTimer = null;

  showPopup(
    "Apa mau keluar?",
    () => {
      // Lanjut: start level baru tapi level tetap
      mulaiLevel(); 
    },
    () => {
      // Keluar: reset total ke menu start
      resetGame();
    }
  );
});

