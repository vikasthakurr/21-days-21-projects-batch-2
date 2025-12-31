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

//report chart

const barCtx = document.getElementById("reportBar");
new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Payments", "Analytics", "Infra", "AI", "CRM"],
    datasets: [
      {
        label: "Project Efficiency (%)",
        data: [60, 89, 88, 87, 76],
        backgroundColor: "rgba(13,110,253,0.6)",
        borderRadius: 6,
      },
    ],
  },
  options: {
    responsiveness: true,
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  },
});

//pie chart
const pieCtx = document.getElementById("reportPie");
new Chart(pieCtx, {
  type: "doughnut",
  data: {
    labels: ["Front-end", "Backend", "Data science", "QA", "Devops"],
    datasets: [
      {
        data: [20, 30, 40, 24, 10],
        backgroundColor: [
          "rgba(13,110,253,0.8)",
          "rgba(25,135,84,0.8)",
          "rgba(255,193,7,0.8)",
          "rgba(220,53,69,0.8)",
          "rgba(102,16,242,0.8)",
        ],
      },
    ],
  },
  options: {
    plugins: { legend: { position: "bottom" } },
  },
});
