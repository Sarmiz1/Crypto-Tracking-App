import { Box, Typography, Modal, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatLargeDigits } from "../../../utils/formatLargeDigits";
import currencyFormat from "../../../utils/currencyFormat";
import { useContext } from "react";
import { appContext } from "../../../Context/AppContextProvider";
import { symbol } from "zod";

export default function ModalSection({ selectedCoin, setSelectedCoin }) {

  const { currency } = useContext(appContext)
  const { symbol: currencySymbol } = currency || {}

  return (
    <Modal open={Boolean(selectedCoin)} onClose={() => setSelectedCoin(null)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 3,
          width: { xs: "90%", sm: 400 },
          outline: "none",
        }}
      >
        {selectedCoin && (
          <>
            <Typography variant="h6" mb={2}>
              {selectedCoin.name}
            </Typography>
            <Typography>Price: {currencyFormat(selectedCoin.current_price, {
              decimals: 2, symbol: currencySymbol
            })}</Typography>
            <Typography>Change: {formatLargeDigits(selectedCoin.price_change_24h, '', 2)}%</Typography>
            <Typography>Volume: {formatLargeDigits(selectedCoin.total_volume, '', 2)}</Typography>

            <Button
              startIcon={<CloseIcon />}
              sx={{ mt: 2 }}
              onClick={() => setSelectedCoin(null)}
            >
              Close
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
}