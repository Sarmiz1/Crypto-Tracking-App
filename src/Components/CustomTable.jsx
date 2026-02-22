import { Table, TableContainer,  Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomTableHead from "./CustomTable_Components/CustomTableHead";
import CustomTableBody from "./CustomTable_Components/CustomTableBody";

export default function CustomTable({ coins }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const stickyBg = theme.palette.background.paper;

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 600,
        overflow: "auto",
        borderRadius: 3,
        background: isDark
          ? "rgba(255,255,255,0.05)"
          : "rgba(0,0,0,0.03)",
        backdropFilter: "blur(10px)"
      }}
    >
      <Table stickyHeader sx={{ minWidth: 1000 }}>
        <CustomTableHead stickyBg={stickyBg} />
        <CustomTableBody stickyBg={stickyBg} coins={coins}/>
      </Table>
    </TableContainer>
  );
}