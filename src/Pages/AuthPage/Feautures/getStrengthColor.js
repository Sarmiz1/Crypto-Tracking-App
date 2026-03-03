export const getStrengthColor = (passwordStrength) => {
    if (passwordStrength <= 25) return "error";
    if (passwordStrength <= 50) return "warning";
    if (passwordStrength <= 75) return "info";
    return "success";
  };