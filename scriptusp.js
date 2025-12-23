function hitung() {
      let input = document.getElementById("dataInput").value;
        let data = input.split(",").map(Number);

          // Mean
            let total = data.reduce((a, b) => a + b, 0);
              let mean = (total / data.length).toFixed(2);

                // Median
                  data.sort((a, b) => a - b);
                    let mid = Math.floor(data.length / 2);
                      let median = (data[mid - 1] + data[mid]) / 2;

                        // Modus
                          let frekuensi = {};
                            data.forEach(n => frekuensi[n] = (frekuensi[n] || 0) + 1);
                              let modus = Object.keys(frekuensi).reduce((a, b) =>
                                  frekuensi[a] > frekuensi[b] ? a : b
                                    );

                                      document.getElementById("mean").innerText = "Mean (Rata-rata): " + mean + " jam";
                                        document.getElementById("median").innerText = "Median: " + median + " jam";
                                          document.getElementById("modus").innerText = "Modus: " + modus + " jam";
                                          }

                                          function playAudio() {
                                            const audio = document.getElementById("aodusp.mp3");
                                              audio.play();
                                              }
}