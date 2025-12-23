let chart;

function hitung() {
  let input = document.getElementById("dataInput").value;
  let data = input
    .split(",")
    .map(x => parseFloat(x.trim()))
    .filter(x => !isNaN(x));

  if (data.length === 0) {
    alert("Masukkan data yang valid!");
    return;
  }

  // ===== HITUNG =====
  let total = data.reduce((a, b) => a + b, 0);
  let mean = (total / data.length).toFixed(2);

  let sorted = [...data].sort((a, b) => a - b);
  let mid = Math.floor(sorted.length / 2);
  let median =
    sorted.length % 2 === 0
      ? ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2)
      : sorted[mid];

  let freq = {};
  sorted.forEach(n => (freq[n] = (freq[n] || 0) + 1));
  let max = Math.max(...Object.values(freq));
  let modus = Object.keys(freq)
    .filter(n => freq[n] == max)
    .join(", ");

  // ===== TAMPIL HASIL =====
  document.getElementById("mean").innerText =
    "Mean = " + mean + " jam";
  document.getElementById("median").innerText =
    "Median = " + median + " jam";
  document.getElementById("modus").innerText =
    "Modus = " + modus + " jam";

  // ===== PENJELASAN =====
  document.getElementById("penjelasan").innerHTML = `
    <b>Penjelasan:</b><br><br>

    <b>Mean (Rata-rata)</b><br>
    = (${sorted.join(" + ")}) ÷ ${sorted.length}<br>
    = ${total} ÷ ${sorted.length} = <b>${mean} jam</b><br><br>

    <b>Median (Nilai Tengah)</b><br>
    Data diurutkan: ${sorted.join(", ")}<br>
    Nilai tengahnya adalah <b>${median} jam</b><br><br>

    <b>Modus</b><br>
    Nilai yang paling sering muncul adalah <b>${modus} jam</b>
  `;

  tampilGrafik(sorted);

  // audio
  const audio = document.getElementById("bgAudio");
  audio.play();
}

function tampilGrafik(data) {
  const ctx = document.getElementById("chartStatistika");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => "Hari " + (i + 1)),
      datasets: [
        {
          label: "Durasi Penggunaan Aplikasi (jam)",
          data: data,
          borderColor: "#00e5ff",
          backgroundColor: "rgba(0,229,255,0.25)",
          tension: 0.45,
          fill: true,
          pointRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "white" }
        }
      },
      scales: {
        x: {
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.1)" }
        },
        y: {
          ticks: { color: "white" },
          grid: { color: "rgba(255,255,255,0.1)" }
        }
      }
    }
  });
}
