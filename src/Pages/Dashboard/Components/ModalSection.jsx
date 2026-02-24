import { Box, Typography, Modal, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalSection({ selectedCoin, setSelectedCoin }) {
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
            <Typography>Price: ${selectedCoin.price}</Typography>
            <Typography>Change: {selectedCoin.change}%</Typography>
            <Typography>Volume: {selectedCoin.volume}</Typography>

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