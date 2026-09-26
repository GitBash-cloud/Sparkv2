import React from 'react';
import { Brain, Zap } from 'lucide-react';

interface OtcMarketModeBarProps {
  isOtcModeEnabled: boolean;
  onToggleOtcMode: (enabled: boolean) => void;
}

export const OtcMarketModeBar: React.FC<OtcMarketModeBarProps> = ({
  isOtcModeEnabled,
  onToggleOtcMode,
}) => {
  return (
    <div
      data-testid="otc_market_mode_card"
      className={`mx-4 rounded-2xl border transition-all duration-300 p-3.5 ${
        isOtcModeEnabled
          ? 'border-[#00E676]/50 bg-gradient-to-r from-[#10261E] via-[#161C24] to-[#182230]'
          : 'border-[#283243] bg-[#161C24]'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              isOtcModeEnabled ? 'bg-[#00E676] shadow-[0_0_8px_#00E676]' : 'bg-gray-500'
            }`}
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[13px] text-white font-extrabold tracking-wide">OTC MARKET MODE</span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                  isOtcModeEnabled
                    ? 'bg-[#00E676]/15 border-[#00E676]/40 text-[#00E676]'
                    : 'bg-[#232B36] border-[#283243] text-[#959DAD]'
                }`}
              >
                {isOtcModeEnabled ? 'ACTIVE 24/7' : 'OFF'}
              </span>
            </div>
            <p
              className={`text-[11px] font-medium transition-colors ${
                isOtcModeEnabled ? 'text-[#00B8D9]' : 'text-[#959DAD]'
              }`}
            >
              {isOtcModeEnabled
                ? 'Quotex & Pocket Option • 92%-98% Payouts'
                : 'Standard Exchange Hours Mode'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={isOtcModeEnabled}
          data-testid="otc_market_mode_toggle"
          onClick={() => onToggleOtcMode(!isOtcModeEnabled)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isOtcModeEnabled ? 'bg-[#00875A]' : 'bg-[#0B0E14] border-[#283243]'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isOtcModeEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {isOtcModeEnabled && (
        <div className="mt-2.5 pt-2.5 border-t border-[#283243]/50 flex items-center space-x-2">
          {/* Tag 1: SMC Precision */}
          <div className="flex items-center space-x-1 px-2 py-1 rounded-md bg-[#1C2735] border border-[#2C3E55] text-[#00B8D9]">
            <Brain className="w-3 h-3 text-[#00B8D9]" />
            <span className="text-[10px] font-bold">SMC Algorithmic Precision</span>
          </div>

          {/* Tag 2: 1M/5M Binary Expiry */}
          <div className="flex items-center space-x-1 px-2 py-1 rounded-md bg-[#2B2213] border border-[#FFAB00]/30 text-[#FFAB00]">
            <Zap className="w-3 h-3 text-[#FFAB00]" />
            <span className="text-[10px] font-bold">1M / 5M Binary Expiry</span>
          </div>
        </div>
      )}
    </div>
  );
};
