import { Tabs, Tab } from "@mui/material";
export default function TabSection({ tabValue , handleTabChange }) {
  return (
    <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
      <Tab label="30d" />
      <Tab label="1y" />
      <Tab label="All" />
    </Tabs>
  );
}
