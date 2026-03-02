import { Tabs, Tab } from "@mui/material";

export default function TabSection({ tab, setTab, darkMode, setActiveLink }) {

  const tabLabels = [
    { label: "Overview", value: 0 },
    { label: "Spot", value: 1 },
    { label: "Derivatives", value: 2 },
  ];

  const handleTabChange = (event, newValue) => {
    setTab(newValue);

    switch (newValue) {
      case 0:
        setActiveLink("Market Overview");
        break;
      case 1:
        setActiveLink("Spot Market");
        break;
      case 2:
        setActiveLink("Derivatives");
        break;
      default:
        break;
    }
  };

  return (
    <Tabs
      value={tab}
      onChange={handleTabChange}
      sx={{ mb: 4 }}
    >
      {tabLabels.map((t) => (
        <Tab
          key={t.value}
          label={t.label}
          value={t.value}
          sx={{
            color: darkMode ? "white" : "black",
          }}
        />
      ))}
    </Tabs>
  );
}