let chart;

// ====== INI JS ASLI KAMU ======
function hitung() {
  let input = document.getElementById("dataInput").value;
  let data = input.split(",").map(x => parseFloat(x.trim())).filter(x => !isNaN(x));

  if (data.length === 0) {
    alert("Masukkan data yang valid!");
    return;
  }

  let total = data.reduce((a, b) => a + b, 0);
  let mean = (total / data.length).toFixed(2);

  let sorted = [...data].sort((a, b) => a - b);
  let mid = Math.floor(sorted.length / 2);
  let median = sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];

  let freq = {};
  sorted.forEach(n => freq[n] = (freq[n] || 0) + 1);
  let max = Math.max(...Object.values(freq));
  let modus = Object.keys(freq).filter(n => freq[n] == max).join(", ");

  document.getElementById("mean").innerText = "Mean = " + mean + " jam";
  document.getElementById("median").innerText = "Median = " + median + " jam";
  document.getElementById("modus").innerText = "Modus = " + modus + " jam";

  document.getElementById("penjelasan").innerHTML = `
    <b>Penjelasan:</b><br><br>
    Mean = ${mean} jam<br>
    Median = ${median} jam<br>
    Modus = ${modus} jam
  `;

  const audio = document.getElementById("bgAudio");
  audio.play();

  // 🔥 TAMBAHAN: manggil grafik tren
  tampilGrafik(sorted);
}

// ====== INI TAMBAHAN DOANG ======
function tampilGrafik(data) {
  const ctx = document.getElementById("chartStatistika");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => "Hari " + (i + 1)),
      datasets: [{
        label: "Durasi Penggunaan (jam)",
        data: data,
        borderColor: "#00e5ff",
        backgroundColor: "rgba(0,229,255,0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#00e5ff"
      }]
    },
    options: {
      plugins: {
        legend: { labels: { color: "#fff" } }
      },
      scales: {
        x: { ticks: { color: "#aaa" }, grid: { display: false } },
        y: { ticks: { color: "#aaa" }, grid: { color: "rgba(255,255,255,0.05)" } }
      }
    }
  });
}
