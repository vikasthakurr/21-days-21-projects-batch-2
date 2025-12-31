document.getElementById("toggleSidebar").addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("show");
});

// chart js
const ctx = document.getElementById("utilChart");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["May", "June", "July", "Aug", "Sept", "Oct"],
    datasets: [
      {
        label: "OverAll Utilization",
        data: [62, 68, 78, 95, 48, 84],
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(15,100,255,0.09)",
        borderColor: "rgba(15,120,235,0.09)",
        pointRadius: 4,
      },
    ],
  },
  options: {
    responsiveness: true,
    plugins: { legend: { position: "top" } },
    scales: {
      y: {
        beginAtZero: false,
        min: 40,
        max: 100,
      },
    },
  },
});
