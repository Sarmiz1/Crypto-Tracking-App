import { Tabs, Tab } from "@mui/material";
export default function TabSection({ tab, setTab, darkMode }) {

  const tabLabels = [
    {label: "Overview", value: 0},
    {label: "Spot", value: 1},
    {label: "Derivatives", value: 2},
  ];

  return (
    <Tabs
      value={tab}
      onChange={(e, v) => setTab(v)}
      sx={{ mb: 4 }}
    >
      {tabLabels.map((t) => (
        <Tab key={t.value} label={t.label} sx={{
          color: darkMode ? 'white' : 'black'
        }}/>
      ))}
    </Tabs>
  )
}