import CustomPageHeader from "../CustomPageHeader";
export const Header = ({mode }) => {
  return (
    <CustomPageHeader mode={mode} header="Crypto Market Overview">
      Stay updated on the latest cryptocurrency market trends, including Bitcoin
      dominance, altcoin season, ETF net flows, and real-time market sentiment,
      all conveniently accessible in one place on CoinVerse.
    </CustomPageHeader>
  );
};
