import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

interface ScannerTabContentProps {
  onLaunchScanner: () => void;
}

export const ScannerTabContent: React.FC<ScannerTabContentProps> = ({ onLaunchScanner }) => {
  const [selectedMode, setSelectedMode] = useState<string>('Standard Forex');
  const modes = ['Standard Forex', 'OTC Binary (Quotex/PO)'];

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-6 text-center">
      {/* 1. Subtle Mode Toggle */}
      <div
        data-testid="scanner_screen_mode_toggle"
        className="w-full max-w-sm flex rounded-xl bg-[#0B0E14] border border-[#283243] p-1 gap-1 mb-8"
      >
        {modes.map((mode) => {
          const isSelected = selectedMode === mode;
          return (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              data-testid={`tab_scanner_mode_${mode}`}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#00875A] border border-[#00E676] text-white font-bold'
                  : 'text-[#959DAD] hover:text-white border border-transparent'
              }`}
            >
              {mode}
            </button>
          );
        })}
      </div>

      {/* Camera Icon Emblem */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00875A] to-[#00B8D9] flex items-center justify-center shadow-xl shadow-cyan-950/40 mb-6">
        <Camera className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-xl text-white font-bold mb-2">Scan Chart & Get AI Insights</h1>
      <p className="text-xs text-[#959DAD] leading-relaxed max-w-xs mb-8">
        Instant candlestick detection, support/resistance levels & automated SL/TP setup.
      </p>

      {/* Action Buttons */}
      <div className="w-full max-w-sm flex items-center space-x-2.5">
        <button
          onClick={onLaunchScanner}
          data-testid="scanner_tab_scan_chart_button"
          className="flex-1 h-12 rounded-xl bg-[#00875A] hover:bg-[#009b67] text-white font-bold text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-lg shadow-emerald-950/30"
        >
          <Camera className="w-4.5 h-4.5" />
          <span>Scan Chart Now</span>
        </button>

        <button
          onClick={onLaunchScanner}
          data-testid="scanner_tab_upload_icon_button"
          title="Upload Chart Screenshot"
          className="w-12 h-12 rounded-xl bg-[#222B38] border border-[#2E3B4D] hover:bg-[#2c384a] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <Upload className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
