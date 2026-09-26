import { MarketAsset, TradingSignal } from '../types/trading';

export const INITIAL_ASSETS: MarketAsset[] = [
  // Crypto
  {
    id: 'btc_usdt',
    symbol: 'BTC/USDT',
    name: 'Bitcoin',
    price: '$64,850.20',
    changePercentage: '+3.42%',
    isBullish: true,
    sparklinePoints: [0.25, 0.38, 0.45, 0.42, 0.55, 0.68, 0.72, 0.80, 0.90, 0.96],
    assetType: 'Crypto',
    volume24h: '$38.4B',
    high24h: '$65,400.00',
    low24h: '$62,900.00',
    isOtc: false,
    otcPayout: '92%',
  },
  {
    id: 'eth_usdt',
    symbol: 'ETH/USDT',
    name: 'Ethereum',
    price: '$3,485.60',
    changePercentage: '+2.18%',
    isBullish: true,
    sparklinePoints: [0.3, 0.35, 0.4, 0.38, 0.5, 0.58, 0.62, 0.7, 0.78, 0.88],
    assetType: 'Crypto',
    volume24h: '$18.2B',
    high24h: '$3,520.00',
    low24h: '$3,390.00',
    isOtc: false,
    otcPayout: '92%',
  },
  {
    id: 'sol_usdt',
    symbol: 'SOL/USDT',
    name: 'Solana',
    price: '$152.40',
    changePercentage: '+5.82%',
    isBullish: true,
    sparklinePoints: [0.15, 0.28, 0.35, 0.48, 0.55, 0.68, 0.75, 0.82, 0.91, 1.0],
    assetType: 'Crypto',
    volume24h: '$4.9B',
    high24h: '$155.10',
    low24h: '$144.20',
    isOtc: false,
    otcPayout: '92%',
  },

  // Forex
  {
    id: 'eur_usd',
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    price: '1.08720',
    changePercentage: '+0.35%',
    isBullish: true,
    sparklinePoints: [0.4, 0.45, 0.42, 0.5, 0.55, 0.52, 0.6, 0.68, 0.72, 0.75],
    assetType: 'Forex',
    volume24h: '$124.5B',
    high24h: '1.08950',
    low24h: '1.08410',
    isOtc: false,
    otcPayout: '92%',
  },
  {
    id: 'gbp_usd',
    symbol: 'GBP/USD',
    name: 'British Pound / USD',
    price: '1.29850',
    changePercentage: '-0.28%',
    isBullish: false,
    sparklinePoints: [0.8, 0.75, 0.78, 0.65, 0.6, 0.55, 0.58, 0.45, 0.4, 0.35],
    assetType: 'Forex',
    volume24h: '$92.1B',
    high24h: '1.30400',
    low24h: '1.29650',
    isOtc: false,
    otcPayout: '92%',
  },
  {
    id: 'usd_jpy',
    symbol: 'USD/JPY',
    name: 'US Dollar / Yen',
    price: '154.620',
    changePercentage: '+0.45%',
    isBullish: true,
    sparklinePoints: [0.35, 0.4, 0.38, 0.45, 0.52, 0.6, 0.68, 0.72, 0.8, 0.85],
    assetType: 'Forex',
    volume24h: '$88.4B',
    high24h: '155.100',
    low24h: '154.020',
    isOtc: false,
    otcPayout: '92%',
  },

  // Indices
  {
    id: 'spx_500',
    symbol: 'SPX 500',
    name: 'S&P 500 Index',
    price: '5,648.40',
    changePercentage: '+0.72%',
    isBullish: true,
    sparklinePoints: [0.3, 0.42, 0.38, 0.52, 0.58, 0.65, 0.7, 0.78, 0.85, 0.92],
    assetType: 'Indices',
    volume24h: '$45.2B',
    high24h: '5,662.00',
    low24h: '5,618.00',
    isOtc: false,
    otcPayout: '92%',
  },
  {
    id: 'nasdaq_100',
    symbol: 'NAS 100',
    name: 'Nasdaq 100',
    price: '19,820.10',
    changePercentage: '+1.05%',
    isBullish: true,
    sparklinePoints: [0.2, 0.35, 0.4, 0.48, 0.6, 0.68, 0.72, 0.82, 0.9, 0.98],
    assetType: 'Indices',
    volume24h: '$38.9B',
    high24h: '19,890.00',
    low24h: '19,650.00',
    isOtc: false,
    otcPayout: '92%',
  },

  // Stocks
  {
    id: 'aapl_stock',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '$228.40',
    changePercentage: '+1.42%',
    isBullish: true,
    sparklinePoints: [0.35, 0.42, 0.4, 0.55, 0.62, 0.58, 0.72, 0.8, 0.88, 0.94],
    assetType: 'Stocks',
    volume24h: '$12.8B',
    high24h: '$230.10',
    low24h: '$225.80',
    isOtc: false,
    otcPayout: '92%',
  },
  {
    id: 'nvda_stock',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: '$124.60',
    changePercentage: '+4.15%',
    isBullish: true,
    sparklinePoints: [0.2, 0.32, 0.45, 0.4, 0.58, 0.68, 0.75, 0.85, 0.92, 1.0],
    assetType: 'Stocks',
    volume24h: '$26.4B',
    high24h: '$126.80',
    low24h: '$119.50',
    isOtc: false,
    otcPayout: '92%',
  },

  // OTC Assets (Quotex & Pocket Option)
  {
    id: 'eur_otc',
    symbol: 'EUR/USD (OTC)',
    name: 'Euro / USD OTC',
    price: '1.08642',
    changePercentage: '+0.84%',
    isBullish: true,
    sparklinePoints: [0.2, 0.35, 0.28, 0.45, 0.6, 0.55, 0.72, 0.68, 0.85, 1.0],
    assetType: 'OTC',
    volume24h: '$14.8M',
    high24h: '1.08910',
    low24h: '1.08420',
    isOtc: true,
    otcPayout: '94%',
  },
  {
    id: 'gbp_otc',
    symbol: 'GBP/JPY (OTC)',
    name: 'GBP / JPY OTC',
    price: '192.410',
    changePercentage: '-0.45%',
    isBullish: false,
    sparklinePoints: [0.85, 0.75, 0.80, 0.65, 0.60, 0.45, 0.52, 0.38, 0.32, 0.20],
    assetType: 'OTC',
    volume24h: '$11.2M',
    high24h: '193.150',
    low24h: '192.080',
    isOtc: true,
    otcPayout: '93%',
  },
  {
    id: 'usd_inr',
    symbol: 'USD/INR (OTC)',
    name: 'USD / INR OTC',
    price: '83.6520',
    changePercentage: '+1.12%',
    isBullish: true,
    sparklinePoints: [0.3, 0.38, 0.42, 0.39, 0.52, 0.58, 0.61, 0.70, 0.78, 0.88],
    assetType: 'OTC',
    volume24h: '$18.5M',
    high24h: '83.8200',
    low24h: '83.4100',
    isOtc: true,
    otcPayout: '95%',
  },
  {
    id: 'btc_otc',
    symbol: 'BTC/USD (OTC)',
    name: 'Bitcoin OTC',
    price: '$64,820.50',
    changePercentage: '+3.42%',
    isBullish: true,
    sparklinePoints: [0.25, 0.38, 0.45, 0.42, 0.55, 0.68, 0.72, 0.80, 0.90, 0.96],
    assetType: 'OTC',
    volume24h: '$32.4M',
    high24h: '$65,240.00',
    low24h: '$62,810.00',
    isOtc: true,
    otcPayout: '91%',
  },
];

export const INITIAL_SIGNALS: TradingSignal[] = [
  // OTC Signal 1: Binary Options with CALL (UP) and Expiry
  {
    id: 'sig_otc_1',
    pair: 'EUR/USD (OTC)',
    type: 'CALL',
    timeframe: 'M1',
    expiryTime: '1 Min Expiry',
    entryPrice: '1.08642',
    confidencePercentage: 94,
    smcRationale: 'Order Block Rejection',
    timestamp: 'Just now',
    aiRationale: 'Bullish Order Block (OB) mitigation at discount pricing on Quotex OTC feed. Impulsive green tick rejection confirms upward momentum.',
    payoutPercentage: '94%',
    isOtc: true,
    category: 'OTC',
  },

  // Crypto Signal 1: Traditional SL / TP
  {
    id: 'sig_crypto_1',
    pair: 'BTC/USDT',
    type: 'BUY',
    timeframe: '1H',
    entryPrice: '$64,300.00',
    stopLoss: '$63,100.00',
    takeProfit: '$67,200.00',
    riskRewardRatio: '1:2.42',
    confidencePercentage: 93,
    smcRationale: 'Bullish Liquidity Grab',
    timestamp: '3m ago',
    aiRationale: 'Clean breakout of horizontal resistance on the 1H chart with rising spot volume. Stop loss placed tightly below swing low.',
    isOtc: false,
    category: 'Crypto',
  },

  // OTC Signal 2: Binary Options with PUT (DOWN) and Expiry
  {
    id: 'sig_otc_2',
    pair: 'GBP/JPY (OTC)',
    type: 'PUT',
    timeframe: 'M1',
    expiryTime: '1 Min Expiry',
    entryPrice: '192.410',
    confidencePercentage: 92,
    smcRationale: 'FVG Fill + CHoCH',
    timestamp: '5m ago',
    aiRationale: 'Premium Fair Value Gap (FVG) filled followed by Change of Character on Pocket Option OTC feed. Bearish displacement candle confirms downward binary flow.',
    payoutPercentage: '93%',
    isOtc: true,
    category: 'OTC',
  },

  // Forex Signal 1: Traditional SL / TP
  {
    id: 'sig_forex_1',
    pair: 'EUR/USD',
    type: 'BUY',
    timeframe: '4H',
    entryPrice: '1.08450',
    stopLoss: '1.08050',
    takeProfit: '1.09650',
    riskRewardRatio: '1:3.00',
    confidencePercentage: 90,
    smcRationale: 'Demand Zone Tap',
    timestamp: '8m ago',
    aiRationale: 'Institutions absorbed liquidity at daily 0.618 Fibonacci level. Expecting bullish trend continuation into previous weekly highs.',
    isOtc: false,
    category: 'Forex',
  },

  // OTC Signal 3: Binary Options with CALL (UP) and Expiry
  {
    id: 'sig_otc_3',
    pair: 'USD/INR (OTC)',
    type: 'CALL',
    timeframe: 'M5',
    expiryTime: '5 Min Expiry',
    entryPrice: '83.6520',
    confidencePercentage: 96,
    smcRationale: 'Liquidity Sweep + BOS',
    timestamp: '12m ago',
    aiRationale: 'Sell-side liquidity swept beneath local range floor followed by aggressive Break of Structure (BOS) into high-demand institutional pool.',
    payoutPercentage: '95%',
    isOtc: true,
    category: 'OTC',
  },

  // Indices Signal 1: Traditional SL / TP
  {
    id: 'sig_indices_1',
    pair: 'SPX 500',
    type: 'BUY',
    timeframe: '1H',
    entryPrice: '5,635.00',
    stopLoss: '5,605.00',
    takeProfit: '5,710.00',
    riskRewardRatio: '1:2.50',
    confidencePercentage: 89,
    smcRationale: 'Bull Flag Breakout',
    timestamp: '15m ago',
    aiRationale: 'S&P 500 consolidated above the 20-period EMA, completing an ascending wedge continuation with solid breadth expansion.',
    isOtc: false,
    category: 'Indices',
  },

  // Stocks Signal 1: Traditional SL / TP
  {
    id: 'sig_stocks_1',
    pair: 'NVDA',
    type: 'BUY',
    timeframe: '1D',
    entryPrice: '$122.50',
    stopLoss: '$116.80',
    takeProfit: '$138.00',
    riskRewardRatio: '1:2.72',
    confidencePercentage: 91,
    smcRationale: 'Institutional Accumulation',
    timestamp: '22m ago',
    aiRationale: 'Strong volume accumulation on the daily chart with bullish RSI divergence. Clear path to test prior all-time resistance.',
    isOtc: false,
    category: 'Stocks',
  },
];

export function getRefreshedAssets(baseAssets: MarketAsset[]): MarketAsset[] {
  return baseAssets.map((asset) => {
    if (asset.id.includes('eur')) {
      const base = asset.isOtc ? 1.0860 : 1.0870;
      const newPrice = base + (Math.random() - 0.48) * 0.0025;
      const change = 0.84 + (Math.random() - 0.45) * 0.3;
      const newPoints = [...asset.sparklinePoints];
      if (newPoints.length > 0) newPoints.shift();
      const lastPoint = newPoints[newPoints.length - 1] ?? 0.5;
      const nextPoint = Math.min(1.0, Math.max(0.1, lastPoint + (Math.random() - 0.45) * 0.15));
      newPoints.push(nextPoint);

      return {
        ...asset,
        price: newPrice.toFixed(5),
        changePercentage: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        isBullish: change >= 0,
        sparklinePoints: newPoints,
      };
    } else if (asset.id.includes('btc')) {
      const newPrice = 64800.0 + (Math.random() - 0.45) * 350.0;
      const change = 3.20 + (Math.random() - 0.4) * 0.8;
      const newPoints = [...asset.sparklinePoints];
      if (newPoints.length > 0) newPoints.shift();
      const lastPoint = newPoints[newPoints.length - 1] ?? 0.5;
      const nextPoint = Math.min(1.0, Math.max(0.1, lastPoint + (Math.random() - 0.45) * 0.15));
      newPoints.push(nextPoint);

      return {
        ...asset,
        price: `$${newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        changePercentage: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        isBullish: change >= 0,
        sparklinePoints: newPoints,
      };
    } else if (asset.id.includes('gbp')) {
      const isJpy = asset.id.includes('jpy');
      const base = isJpy ? 192.40 : 1.2980;
      const newPrice = base + (Math.random() - 0.5) * (isJpy ? 0.35 : 0.003);
      const change = -0.45 + (Math.random() - 0.5) * 0.25;
      const newPoints = [...asset.sparklinePoints];
      if (newPoints.length > 0) newPoints.shift();
      const lastPoint = newPoints[newPoints.length - 1] ?? 0.5;
      const nextPoint = Math.min(1.0, Math.max(0.1, lastPoint + (Math.random() - 0.5) * 0.15));
      newPoints.push(nextPoint);

      return {
        ...asset,
        price: isJpy ? newPrice.toFixed(3) : newPrice.toFixed(5),
        changePercentage: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        isBullish: change >= 0,
        sparklinePoints: newPoints,
      };
    } else {
      const delta = (Math.random() - 0.48) * 0.05;
      const newPoints = [...asset.sparklinePoints];
      if (newPoints.length > 0) newPoints.shift();
      const lastPoint = newPoints[newPoints.length - 1] ?? 0.5;
      newPoints.push(Math.min(1.0, Math.max(0.1, lastPoint + delta)));
      return {
        ...asset,
        sparklinePoints: newPoints,
      };
    }
  });
}

export function getRefreshedSignals(baseSignals: TradingSignal[]): TradingSignal[] {
  return baseSignals.map((signal, index) => {
    let newTimestamp = 'Just now';
    if (index === 1) newTimestamp = '1m ago';
    else if (index === 2) newTimestamp = '4m ago';
    else if (index === 3) newTimestamp = '9m ago';
    else if (index > 3) newTimestamp = `${(index + 1) * 4}m ago`;

    const confDelta = index % 2 === 0 ? 1 : -1;
    const newConf = Math.min(98, Math.max(88, signal.confidencePercentage + confDelta));

    return {
      ...signal,
      timestamp: newTimestamp,
      confidencePercentage: newConf,
    };
  });
}
