import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

export const ProfileTabContent: React.FC = () => {
  return (
    <div className="w-full px-4 pt-4 pb-12 space-y-4">
      <h1 className="text-xl text-white font-bold">Trader Profile</h1>

      <div className="w-full rounded-2xl border border-[#283243] bg-[#161C24] p-5 shadow-sm space-y-4">
        {/* User Badge */}
        <div className="flex items-center space-x-3">
          <div className="relative w-13 h-13 rounded-full overflow-hidden border-2 border-[#00E676]/40 bg-[#00E676]/12 flex items-center justify-center shrink-0">
            <img
              src="/trader_avatar_1789548821647.jpg"
              alt="Alex Mercer"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <Shield className="w-6 h-6 text-[#00E676] absolute" />
          </div>
          <div>
            <h2 className="text-base text-white font-bold">Alex Mercer</h2>
            <span className="text-xs text-[#00E676] font-semibold flex items-center space-x-1">
              <CheckCircle className="w-3.5 h-3.5 text-[#00E676]" />
              <span>AI Elite Plan • Active</span>
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#283243]/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#959DAD]">Auto SL/TP Sync</span>
            <span className="text-xs text-[#00E676] font-bold">Enabled</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-[#959DAD]">Broker Connection</span>
            <span className="text-xs text-white font-medium">Binance & MT5 Connected</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-[#959DAD]">OTC Engine Status</span>
            <span className="text-xs text-[#00B8D9] font-bold">Quotex & Pocket Option Synced</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-[#959DAD]">Account ID</span>
            <span className="text-xs text-[#636E80] font-mono">TSP-8942-ELITE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
