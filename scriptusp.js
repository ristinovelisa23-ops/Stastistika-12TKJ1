function hitung() {
  let input = document.getElementById("dataInput").value;
  let data = input.split(",").map(x => parseFloat(x.trim())).filter(x => !isNaN(x));

  if (data.length === 0) {
    alert("Masukkan data yang valid!");
    return;
  }

  // Mean
  let total = data.reduce((a, b) => a + b, 0);
  let mean = (total / data.length).toFixed(2);

  // Median
  data.sort((a, b) => a - b);
  let mid = Math.floor(data.length / 2);
  let median;
  if (data.length % 2 === 0) {
    median = (data[mid - 1] + data[mid]) / 2;
  } else {
    median = data[mid];
  }

  // Modus
  let frekuensi = {};
  data.forEach(n => frekuensi[n] = (frekuensi[n] || 0) + 1);
  let max = Math.max(...Object.values(frekuensi));
  let modus = Object.keys(frekuensi).filter(n => frekuensi[n] === max).join(", ");

  document.getElementById("mean").innerText = "Mean: " + mean + " jam";
  document.getElementById("median").innerText = "Median: " + median + " jam";
  document.getElementById("modus").innerText = "Modus: " + modus + " jam";

  // PLAY AUDIO
  const audio = document.getElementById("bgAudio");
  audio.play();
}
