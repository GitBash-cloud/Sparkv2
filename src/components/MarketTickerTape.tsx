import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';
import { MarketAsset } from '../types/trading';
import { MiniSparkline } from './MiniSparkline';

interface MarketTickerTapeProps {
  assets: MarketAsset[];
  selectedAssetId?: string;
  onAssetClick: (asset: MarketAsset) => void;
  isRefreshing?: boolean;
  onRefreshClick?: () => void;
}

export const MarketTickerTape: React.FC<MarketTickerTapeProps> = ({
  assets,
  selectedAssetId,
  onAssetClick,
  isRefreshing = false,
  onRefreshClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'OTC', 'Crypto', 'Forex', 'Indices', 'Stocks'];

  const filteredAssets = useMemo(() => {
    if (selectedCategory === 'All') return assets;
    if (selectedCategory === 'OTC') return assets.filter((a) => a.isOtc);
    return assets.filter(
      (a) => a.assetType.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [assets, selectedCategory]);

  return (
    <div className="w-full">
      {/* Header Row with Title and Refresh Status */}
      <div className="px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <Activity className="w-4.5 h-4.5 text-[#00E676]" />
          <span className="text-[13px] text-white font-bold tracking-wider">MARKET OVERVIEW</span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#2B1D3A] border border-[#AB47BC]/50 text-[#CE93D8]">
            LIVE
          </span>
        </div>

        <button
          onClick={onRefreshClick}
          data-testid="market_refresh_indicator"
          disabled={isRefreshing}
          className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-[#1C2430] border border-[#283243] hover:border-[#3b4961] transition-colors cursor-pointer text-[#959DAD]"
        >
          {isRefreshing ? (
            <RefreshCw className="w-2.5 h-2.5 text-[#00E676] animate-spin" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
          )}
          <span className={`text-[10px] font-medium ${isRefreshing ? 'text-[#00E676]' : 'text-[#959DAD]'}`}>
            {isRefreshing ? 'Syncing...' : 'Sync'}
          </span>
        </button>
      </div>

      {/* Asset Category Filter Chips */}
      <div
        data-testid="ticker_category_filter_row"
        className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar px-4 py-1"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-testid={`ticker_filter_${cat}`}
              className={`text-xs px-2.5 py-1 rounded-md border font-medium shrink-0 transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-[#00875A] border-[#00E676] text-white font-bold'
                  : 'bg-[#1C2430] border-[#283243] text-[#959DAD] hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Horizontal Scrolling Asset Cards */}
      <div
        data-testid="market_overview_ticker_row"
        className="flex items-center space-x-3 overflow-x-auto no-scrollbar px-4 pt-2 pb-1"
      >
        {filteredAssets.map((asset) => {
          const isSelected = asset.id === selectedAssetId;
          const badgeBg = asset.isBullish ? 'bg-[#00E676]/12' : 'bg-[#FF1744]/12';
          const badgeColor = asset.isBullish ? 'text-[#00E676]' : 'text-[#FF1744]';

          return (
            <div
              key={asset.id}
              onClick={() => onAssetClick(asset)}
              data-testid={`ticker_card_${asset.symbol.replace(/\//g, '_').replace(/ /g, '_')}`}
              className={`min-w-[172px] w-[172px] rounded-2xl border p-3.5 shrink-0 transition-all cursor-pointer shadow-sm hover:scale-[1.02] ${
                isSelected
                  ? 'bg-[#1C2430] border-[#00E676] shadow-[0_0_12px_#00E67633]'
                  : 'bg-[#161C24] border-[#283243] hover:border-[#39475e]'
              }`}
            >
              {/* Asset Symbol and Type Badge */}
              <div className="flex items-start justify-between">
                <div className="min-w-0 pr-1">
                  <span className="text-[13px] text-white font-bold block truncate">
                    {asset.symbol}
                  </span>
                  <span className="text-[10px] text-[#959DAD] block truncate">
                    {asset.name}
                  </span>
                </div>

                {/* Change Badge */}
                <div className={`flex items-center space-x-0.5 px-1.5 py-0.5 rounded-md ${badgeBg} ${badgeColor} shrink-0`}>
                  {asset.isBullish ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  <span className="text-[10px] font-semibold">{asset.changePercentage}</span>
                </div>
              </div>

              {/* Price & Payout / Asset Type Badge */}
              <div className="flex items-center justify-between mt-2.5">
                <span className="text-[15px] text-white font-extrabold font-mono tracking-tight">
                  {asset.price}
                </span>

                {asset.isOtc ? (
                  <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-[#00E676]/12 border border-[#00E676]/40 text-[#00E676]">
                    {asset.otcPayout}
                  </span>
                ) : (
                  <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-[#0B0E14] border border-[#283243] text-[#636E80] uppercase">
                    {asset.assetType}
                  </span>
                )}
              </div>

              {/* Sparkline Graph */}
              <div className="w-full h-9 rounded-lg bg-[#0B0E14]/50 border border-[#283243]/30 px-1 py-0.5 mt-2.5 flex items-center justify-center overflow-hidden">
                <MiniSparkline points={asset.sparklinePoints} isBullish={asset.isBullish} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
