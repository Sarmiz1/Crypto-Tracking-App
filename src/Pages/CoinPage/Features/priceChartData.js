export const dataFunction = ({ chartData, isDark }) => {



  const data = {
    labels: chartData.map((coin) =>
      new Date(coin[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price",
        data: chartData.map((coin) => coin[1]),
        borderColor: isDark ? "#7dd3fc" : "#1976d2",
        backgroundColor: isDark
          ? "rgba(125,211,252,0.15)"
          : "rgba(25,118,210,0.15)",
        fill: true,
        tension: 0.35,
        pointRadius: 0
      }
    ]
  }
  return data
}