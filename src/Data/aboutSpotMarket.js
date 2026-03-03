export const aboutSpotMarket = [
  {
    id: 1,
    header: 'What is crypto spot market data and how does it differ from derivatives and futures data?',
    content: 'Crypto spot market data captures live and historical information for immediate, on-chain-settled trades of digital assets, including trades, quotes, order book depth, OHLCV bars, and reference indices. It reflects the true buy/sell activity where assets exchange hands without leverage or expiry, making it the primary source for price discovery, liquidity assessment, and execution analytics. In contrast, derivatives and futures data represent contracts referencing an underlying spot price, shaped by funding rates, margining, leverage, and term structure effects like contango or backwardation. Derivatives incorporate metrics such as open interest, basis, mark price, funding and liquidation flows, which can diverge from spot during stress or promotions. For valuation, compliance, and risk models, spot market data provides a clean benchmark for realized prices, VWAP/TWAP calculations, and slippage analysis, while derivatives data is essential for hedging, implied pricing, and leverage dynamics but should be reconciled to credible spot indexes for accurate fair value.'
  },
  {
    id: 2,
    header:'What are the best sources and exchanges for accurate real-time crypto spot prices and volumes?',
    content: 'For the highest-fidelity crypto spot market data, ingest direct exchange WebSocket feeds for trades, quotes, and full order book depth, then normalize and time-align them. Whichever source you choose, prioritize nanosecond or millisecond timestamps, sequence numbers, robust outage status feeds, and NTP/GPS time sync to ensure accurate latency analysis, slippage measurement, and replayable market microstructure.',
  },
  {
    id: 3,
    header: 'What techniques identify and correct outliers, wash trading, and gaps in spot market datasets?',
    content: 'Data quality starts with schema validation, de-duplication by trade ID and sequence, and strict timestamp sanity checks. Outliers can be flagged with robust statistics such as median filters, rolling MAD/Hampel identifiers, z-score bands on log-returns, and cross-venue consensus checks; trades crossing far outside best bid/ask or violating tick-size/lot rules should be quarantined. Wash trading detection blends heuristics and ML: look for self-trade patterns, rapid back-and-forth prints at identical sizes/prices, abnormal volume bursts without corresponding order book liquidity, and VIP-tier-chasing behavior tied to fee schedules. Cross-validate trades with order book states (trade-throughs, negative spreads) and venue status feeds to exclude maintenance and misprints. Fill gaps using authoritative backfill endpoints, not naive interpolation; if forced, mark forward OHLCV while preserving missingness metadata. Reconcile aggregates with per-trade sums to catch truncation, and build venue-specific rulebooks for odd-lot handling, cancel/replace semantics, test prints, and off-book blocks.',
  },
  {
    id: 4,
    header: 'How do fees, maker/taker tiers, and rebates impact realized prices and volume metrics in spot data?',
    content: 'Spot market data typically reports gross trade prices and sizes, but realized execution quality depends on all-in costs after fees, rebates, and token-based discounts. Maker/taker schedules charge takers more for immediacy and often rebate makers; VIP tiers and exchange tokens can reduce or even invert fees, altering effective spreads and incentivizing liquidity-providing strategies. Zero-fee or rebate-heavy campaigns can inflate reported volumes, shift order book depth, and distort comparative venue analytics. For accurate PnL, compute fee-adjusted VWAP/TWAP and effective price per fill, accounting for tier at execution time, traded pair, and fee currency conversion to USD. Strategy backtests should model fee ladders, rebate accruals, and tier progression, as firms may target volumes to unlock lower fees, affecting routing. When benchmarking venues, compare net effective spreads, realized slippage, and queue priority, not just headline prices and raw volumes, and flag periods with fee holidays to avoid biased liquidity metrics.',
  },
  {
    id: 5,
    header: 'What are the key benefits and common assets of a spot market?',
    content: 'A spot market provides a transparent and straightforward environment for immediate asset ownership. Unlike complex derivatives, spot trading focuses on the "here and now" with the following distinct advantages and tradable assets: Direct Ownership, Price Transparency, No Expiry Dates, Lower Structural Risk',
  },
  {
    id: 6,
    header: 'CoinVerse is the trusted, industry leading source for crypto spot market data',
    content: "CoinVerse leads the cryptocurrency data market with industry leading, best in class crypto spot market data that powers confident decisions for retail and institutions alike. As the most trusted source for real-time and historical pricing, liquidity, and volume across global exchanges, CoinVerse delivers unmatched coverage, accuracy, and uptime. Our datasets are frequently referenced by mainstream media and integrated across top fintechs, wallets, and research platforms, reflecting the rigorous transparency and methodology that set the standard. From granular tick-level insights to robust APIs and enterprise SLAs, CoinVerse’s crypto spot market data equips teams to move faster with confidence, backed by 24/7 monitoring and quality controls.",
  },
]




// Key Benefits:
// Direct Ownership: When you buy on the spot market, you own the actual asset (e.g., the physical gold or the specific stocks).
// Price Transparency: Prices are determined in real-time by current supply and demand, making them easy to track without complex formulas.
// No Expiry Dates: Unlike futures contracts, spot positions do not expire, allowing you to hold an asset for as long as you want.
// Lower Structural Risk: Because spot trading typically doesn't use leverage, you cannot lose more than your initial investment.