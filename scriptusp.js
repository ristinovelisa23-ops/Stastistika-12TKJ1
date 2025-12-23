let chart; // untuk grafik (biar bisa di-refresh)

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

  // Mean
  let total = data.reduce((a, b) => a + b, 0);
  let mean = (total / data.length).toFixed(2);

  // Median
  let sorted = [...data].sort((a, b) => a - b);
  let mid = Math.floor(sorted.length / 2);
  let median = sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];

  // Modus
  let freq = {};
  sorted.forEach(n => freq[n] = (freq[n] || 0) + 1);
  let max = Math.max(...Object.values(freq));
  let modus = Object.keys(freq).filter(n => freq[n] == max).join(", ");

  // Tampilkan hasil
  document.getElementById("mean").innerText = "Mean = " + mean + " jam";
  document.getElementById("median").innerText = "Median = " + median + " jam";
  document.getElementById("modus").innerText = "Modus = " + modus + " jam";

  // Penjelasan
  document.getElementById("penjelasan").innerHTML = `
    <b>Penjelasan:</b><br><br>

    <b>Mean (Rata-rata)</b><br>
    = (${sorted.join(" + ")}) ÷ ${sorted.length}<br>
    = ${total} ÷ ${sorted.length} = <b>${mean} jam</b><br><br>

    <b>Median (Nilai Tengah)</b><br>
    Data diurutkan: ${sorted.join(", ")}<br>
    Karena jumlah data ${sorted.length}, nilai tengahnya adalah <b>${median} jam</b><br><br>

    <b>Modus</b><br>
    Nilai yang paling sering muncul adalah <b>${modus} jam</b>
  `;

  // Play audio
  const audio = document.getElementById("bgAudio");
  audio.play();

  // TAMPILKAN GRAFIK 🔥
  tampilGrafik(sorted, mean);
}

// ===== FUNGSI GRAFIK =====
function tampilGrafik(data, mean) {
  const ctx = document.getElementById("chartStatistika").getContext("2d");

  if (chart) chart.destroy(); // hapus grafik lama

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((_, i) => "Data " + (i + 1)),
      datasets: [
        {
          label: "Durasi Penggunaan Aplikasi (jam)",
          data: data,
          backgroundColor: "rgba(0, 191, 255, 0.7)"
        },
        {
          type: "line",
          label: "Rata-rata (Mean)",
          data: Array(data.length).fill(mean),
          borderColor: "red",
          borderWidth: 2,
          fill: false
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
          ticks: { color: "white" }
        },
        y: {
          ticks: { color: "white" }
        }
      }
    }
  });
}
