import Typography  from "@mui/material/Typography";

export default function TextContainer() {

  return(
    <>
      {/* ========================
              HEADING
          ======================== */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 2,
          textAlign: { xs: "left", md: "left" },
        }}
      >
        Stay on top of crypto. All the time, any time.
      </Typography>

      {/* ========================
              DESCRIPTION
          ======================== */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: 500,
          mb: 3,
          textAlign: { xs: "left", md: "left" },
        }}
      >
        Please keep me updated by email with the latest crypto news, research
        findings, reward programs, event updates, coin listings, and more
        information from CoinVerse.
      </Typography>
    </>
  )
}