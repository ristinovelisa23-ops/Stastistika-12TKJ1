let chart; // biar grafik bisa di-update

function hitung() {
  let input = document.getElementById("dataInput").value;

  // Ambil & validasi data
  let data = input
    .split(",")
    .map(x => parseFloat(x.trim()))
    .filter(x => !isNaN(x));

  if (data.length === 0) {
    alert("Masukkan data yang valid!");
    return;
  }

  // ===== STATISTIKA =====
  let total = data.reduce((a, b) => a + b, 0);
  let mean = (total / data.length).toFixed(2);

  let sorted = [...data].sort((a, b) => a - b);
  let median;
  if (sorted.length % 2 === 0) {
    median = ((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2);
  } else {
    median = sorted[Math.floor(sorted.length / 2)];
  }

  // Modus
  let freq = {};
  sorted.forEach(n => freq[n] = (freq[n] || 0) + 1);
  let maxFreq = Math.max(...Object.values(freq));
  let modus = Object.keys(freq)
    .filter(k => freq[k] === maxFreq)
    .join(", ");

  // ===== TAMPILKAN HASIL =====
  document.getElementById("mean").innerText = mean + " jam";
  document.getElementById("median").innerText = median + " jam";
  document.getElementById("modus").innerText = modus + " jam";

  // ===== PENJELASAN (LENGKAP & AMAN) =====
  document.getElementById("penjelasan").innerHTML = `
    <b>Mean (Rata-rata)</b><br>
    = (${sorted.join(" + ")}) ÷ ${sorted.length}<br>
    = ${total} ÷ ${sorted.length} = <b>${mean} jam</b><br><br>

    <b>Median (Nilai Tengah)</b><br>
    Data diurutkan: ${sorted.join(", ")}<br>
    Karena jumlah data ${sorted.length}, nilai tengahnya adalah <b>${median} jam</b><br><br>

    <b>Modus</b><br>
    Nilai yang paling sering muncul adalah <b>${modus} jam</b>
  `;

  // ===== GRAFIK =====
  let labels = data.map((_, i) => "Data " + (i + 1));
  let meanLine = new Array(data.length).fill(mean);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Durasi Penggunaan Aplikasi (jam)",
          data: data,
          backgroundColor: "#22c1c3"
        },
        {
          label: "Rata-rata (Mean)",
          data: meanLine,
          type: "line",
          borderColor: "red",
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
