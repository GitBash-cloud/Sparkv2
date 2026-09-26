import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

export const AiPerformanceStatCard: React.FC = () => {
  return (
    <div className="mx-4 rounded-2xl border border-[#283243] bg-[#161C24] p-3.5 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2.5">
        <div className="w-9.5 h-9.5 rounded-full bg-[#00E676]/12 border border-[#00E676]/50 flex items-center justify-center shrink-0">
          <Sparkles className="w-4.5 h-4.5 text-[#00E676]" />
        </div>
        <div>
          <span className="text-[11px] text-[#959DAD] font-medium block">
            AI Accuracy (Last 30 Days)
          </span>
          <span className="text-sm text-white font-bold block">
            89.4% Win Rate (43/48)
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#00E676]/12 text-[#00E676]">
        <TrendingUp className="w-3 h-3" />
        <span className="text-[11px] font-bold">+38.4% ROI</span>
      </div>
    </div>
  );
};
