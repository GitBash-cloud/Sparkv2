import React from 'react';
import { RefreshCw } from 'lucide-react';
import { TradingSignal } from '../types/trading';
import { ActiveSignalsSection } from './ActiveSignalsSection';

interface SignalsTabContentProps {
  signals: TradingSignal[];
  selectedCategory: string;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onCategorySelected: (cat: string) => void;
  onCopySignal: (signal: TradingSignal) => void;
}

export const SignalsTabContent: React.FC<SignalsTabContentProps> = ({
  signals,
  selectedCategory,
  isRefreshing = false,
  onRefresh,
  onCategorySelected,
  onCopySignal,
}) => {
  return (
    <div className="w-full pb-8">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl text-white font-bold">AI Trading Signals</h1>
          <p className="text-xs text-[#959DAD]">
            Real-time algorithmic trade setups (Pull to refresh)
          </p>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="w-9 h-9 rounded-xl bg-[#161C24] border border-[#283243] flex items-center justify-center text-[#959DAD] hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#00E676]' : ''}`} />
          </button>
        )}
      </div>

      <ActiveSignalsSection
        signals={signals}
        selectedCategory={selectedCategory}
        onCategorySelected={onCategorySelected}
        onCopySignal={onCopySignal}
      />
    </div>
  );
};
