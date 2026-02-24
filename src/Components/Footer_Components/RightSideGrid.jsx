import { Grid } from "@mui/material";
import FooterColumn from "./FooterColumn";

export default function RightSideGrid({ textColor, subTextColor }) {
  const columns = [
    {
      title: "Products",
      links: ["Academy", "NFT", "Portfolio", "Watchlist", "Crypto API"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Privacy Policy", "Terms of Use"],
    },
    {
      title: "Support",
      links: ["Request Form", "FAQ", "Glossary", "Contact Support"],
    },
    {
      title: "Socials",
      links: ["X (Twitter)", "Instagram", "Telegram", "LinkedIn"],
    },
    // You can add more columns here and it will still wrap correctly
  ];

  return (
    <Grid
      container
      spacing={4}
      justifyContent={{ xs: "center", md: "flex-end" }}
    >
      {columns.map((col, index) => (
        <Grid key={index} xs={6} sm={6} md={3}>
          <FooterColumn
            title={col.title}
            links={col.links}
            textColor={textColor}
            subTextColor={subTextColor}
          />
        </Grid>
      ))}
    </Grid>
  );
}