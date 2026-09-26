import React from 'react';

export const AnalyticsTabContent: React.FC = () => {
  return (
    <div className="w-full px-4 pt-4 pb-12 space-y-4">
      <div>
        <h1 className="text-xl text-white font-bold">Performance & Analytics</h1>
        <p className="text-xs text-[#959DAD]">Verified algorithmic signal performance</p>
      </div>

      {/* Main Win Rate Card */}
      <div className="w-full rounded-2xl border border-[#283243] bg-[#161C24] p-5 shadow-sm">
        <span className="text-xs text-[#959DAD] block">Overall OTC Win Rate</span>
        <span className="text-3xl text-[#00E676] font-bold block mt-1">92.4%</span>

        <div className="mt-4 pt-4 border-t border-[#283243]/60 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#959DAD] block">OTC Trades</span>
            <span className="text-[15px] text-white font-bold block mt-0.5">142 Live</span>
          </div>

          <div>
            <span className="text-[11px] text-[#959DAD] block">Avg Return</span>
            <span className="text-[15px] text-[#00B8D9] font-bold block mt-0.5">94.2%</span>
          </div>

          <div>
            <span className="text-[11px] text-[#959DAD] block">Net Profit</span>
            <span className="text-[15px] text-[#00E676] font-bold block mt-0.5">+$18,450</span>
          </div>
        </div>
      </div>

      {/* Additional Analytics Breakdown Card */}
      <div className="w-full rounded-2xl border border-[#283243] bg-[#161C24] p-5 space-y-3">
        <h2 className="text-xs text-[#959DAD] font-bold tracking-wider uppercase">
          Signal Category Breakdown
        </h2>

        <div className="space-y-2.5">
          {[
            { name: 'OTC Binary Options (QX / PO)', rate: '94.8%', count: '78 setups', color: 'bg-[#00E676]' },
            { name: 'Crypto Perpetuals (BTC / ETH)', rate: '88.5%', count: '32 setups', color: 'bg-[#00B8D9]' },
            { name: 'Forex Spot (EUR / GBP)', rate: '91.2%', count: '22 setups', color: 'bg-[#FFAB00]' },
            { name: 'Indices (SPX / NAS)', rate: '86.4%', count: '10 setups', color: 'bg-[#7958FF]' },
          ].map((item) => (
            <div key={item.name} className="p-2.5 rounded-xl bg-[#0B0E14] border border-[#283243]/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-white font-bold block">{item.name}</span>
                <span className="text-[10px] text-[#959DAD]">{item.count}</span>
              </div>
              <span className="text-xs font-extrabold text-[#00E676]">{item.rate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
