import React from 'react';
import { Sparkles, Camera, Upload } from 'lucide-react';

interface QuickActionBannerProps {
  onScanClick: () => void;
}

export const QuickActionBanner: React.FC<QuickActionBannerProps> = ({ onScanClick }) => {
  return (
    <div
      onClick={onScanClick}
      data-testid="quick_action_scanner_card"
      className="mx-4 rounded-2xl border border-[#00E676]/40 bg-gradient-to-r from-[#0F3227] via-[#132838] to-[#161C24] p-4.5 shadow-lg shadow-emerald-950/20 cursor-pointer transition-all hover:scale-[1.01]"
    >
      {/* AI Badge */}
      <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#00C853]/20 border border-[#00E676]/40 mb-2.5">
        <Sparkles className="w-3 h-3 text-[#00E676]" />
        <span className="text-[10px] text-[#00E676] font-bold tracking-wider">AI VISION SCANNER</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 pr-3">
          <h3 className="text-base text-white font-bold leading-snug">
            Scan Chart & Get AI Insights
          </h3>
          <p className="text-xs text-[#959DAD] leading-relaxed mt-1">
            Instant candlestick detection, support/resistance levels & automated SL/TP setup.
          </p>
        </div>

        {/* Glowing Circular Camera Badge */}
        <div className="w-13 h-13 rounded-full bg-gradient-radial from-[#00E676]/35 to-[#16232E] border-1.5 border-[#00E676]/70 flex items-center justify-center shrink-0 shadow-lg shadow-[#00E676]/20">
          <Camera className="w-6.5 h-6.5 text-[#00E676]" />
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center space-x-2.5 mt-3.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onScanClick();
          }}
          data-testid="scan_chart_cta_button"
          className="flex-1 h-10.5 rounded-xl bg-[#00875A] hover:bg-[#009b67] text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-md"
        >
          <Camera className="w-4 h-4" />
          <span>Scan Chart Now</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onScanClick();
          }}
          data-testid="upload_chart_cta_button"
          title="Upload Chart Screenshot"
          className="w-10.5 h-10.5 rounded-xl bg-[#222B38] border border-[#2E3B4D] hover:bg-[#2c384a] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <Upload className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
};
