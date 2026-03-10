export const optionsFunction = ( isDark ) => {
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.08)"
        },
        ticks: {
          color: isDark ? "#cbd5f5" : "#555"
        }
      },
      y: {
        grid: {
          color: isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.08)"
        },
        ticks: {
          color: isDark ? "#cbd5f5" : "#555"
        }
      }
    }
  };

  return options
}