export type SignalType = 'BUY' | 'SELL' | 'CALL' | 'PUT';

export interface SignalTypeDetails {
  label: string;
  binaryLabel: string;
  isBullish: boolean;
}

export const SIGNAL_TYPE_MAP: Record<SignalType, SignalTypeDetails> = {
  BUY: { label: 'BUY / LONG', binaryLabel: 'CALL (UP)', isBullish: true },
  SELL: { label: 'SELL / SHORT', binaryLabel: 'PUT (DOWN)', isBullish: false },
  CALL: { label: 'CALL (UP)', binaryLabel: 'CALL (UP)', isBullish: true },
  PUT: { label: 'PUT (DOWN)', binaryLabel: 'PUT (DOWN)', isBullish: false },
};

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  price: string;
  changePercentage: string;
  isBullish: boolean;
  sparklinePoints: number[];
  assetType: string;
  volume24h: string;
  high24h: string;
  low24h: string;
  isOtc: boolean;
  otcPayout: string;
}

export interface TradingSignal {
  id: string;
  pair: string;
  type: SignalType;
  timeframe: string;
  entryPrice: string;
  stopLoss?: string;
  takeProfit?: string;
  riskRewardRatio?: string;
  expiryTime?: string;
  confidencePercentage: number;
  smcRationale: string;
  timestamp: string;
  aiRationale: string;
  payoutPercentage?: string;
  isOtc: boolean;
  category: string;
}

export type DashboardTab = 'dashboard' | 'scanner' | 'signals' | 'analytics' | 'profile';

export type BrokerId = 'quotex' | 'pocket_option';

export interface BrokerConfig {
  id: BrokerId;
  displayName: string;
  shortName: string;
  tagline: string;
  defaultUrl: string;
  latency: string;
  primaryColor: string;
  accentColor: string;
  badgeText: string;
}

export const BROKERS: Record<BrokerId, BrokerConfig> = {
  quotex: {
    id: 'quotex',
    displayName: 'Quotex',
    shortName: 'QX',
    tagline: 'Smart Binary & Digital Options',
    defaultUrl: 'https://qxbroker.com',
    latency: '12ms',
    primaryColor: '#00A3FF',
    accentColor: '#00E676',
    badgeText: 'QX PRO',
  },
  pocket_option: {
    id: 'pocket_option',
    displayName: 'Pocket Option',
    shortName: 'PO',
    tagline: 'Quick Trading & High Yields',
    defaultUrl: 'https://pocketoption.com',
    latency: '16ms',
    primaryColor: '#2979FF',
    accentColor: '#FFB800',
    badgeText: 'PO LIVE',
  },
};

export type ScannerMode = 'forex' | 'otc_binary';
