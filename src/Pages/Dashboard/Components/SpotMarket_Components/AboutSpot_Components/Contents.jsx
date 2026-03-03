import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandCircleDownSharpIcon from "@mui/icons-material/ExpandCircleDownSharp";
import { useState } from "react";
import { aboutSpotMarket } from "../../../../../Data/aboutSpotMarket";

export const Contents = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : null);

    if (isExpanded) {
      setTimeout(() => {
        const element = document.getElementById(`panel${panel}-header`);

        element?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 350); // match accordion transition duration
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {aboutSpotMarket?.map((content) => (
        <Accordion
          key={content.id}
          expanded={expanded === content.id}
          onChange={handleChange(content.id)}
          disableGutters
          elevation={0}
          sx={{
            transition: "all 0.3s ease",
            "&:before": { display: "none" },
          }}
          TransitionProps={{
            timeout: 400,
          }}
        >
          <AccordionSummary
            id={`panel${content.id}-header`}
            aria-controls={`panel${content.id}-content`}
            expandIcon={<ExpandCircleDownSharpIcon />}
            sx={{
              "& .MuiAccordionSummary-expandIconWrapper": {
                transition: "transform 0.3s ease",
              },
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "rotate(180deg)",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "18px" }}>
              {content.header}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              transition: "opacity 0.3s ease",
            }}
          >
            <Typography>{content.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
