import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  X,
  CheckCircle2,
  Sparkles,
  Brain,
  Upload,
  RotateCw,
} from 'lucide-react';
import { ScannerMode, TradingSignal } from '../types/trading';

interface ChartScannerDialogProps {
  onDismiss: () => void;
  onApplySignal: (signal: TradingSignal) => void;
}

export const ChartScannerDialog: React.FC<ChartScannerDialogProps> = ({
  onDismiss,
  onApplySignal,
}) => {
  const [selectedMode, setSelectedMode] = useState<ScannerMode>('forex');
  const [selectedExpiry, setSelectedExpiry] = useState<string>('1 Min');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  // Viewfinder Candlestick canvas with animated laser
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let laserYRatio = 0.1;
    let laserDirection = 1;

    const candleHeights = [
      [0.4, 0.6], [0.45, 0.7], [0.35, 0.55], [0.5, 0.8],
      [0.48, 0.65], [0.6, 0.85], [0.58, 0.78], [0.7, 0.9],
      [0.65, 0.82], [0.72, 0.95], [0.8, 0.98], [0.75, 0.92],
    ];

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        const y = height * (i / 5);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw candlesticks
      const candleCount = candleHeights.length;
      const spacing = width / (candleCount + 1);

      candleHeights.forEach(([lowRatio, highRatio], i) => {
        const cx = (i + 1) * spacing;
        const topY = height * (1 - highRatio);
        const bottomY = height * (1 - lowRatio);
        const isGreen = i % 3 !== 1;
        const color = isGreen ? '#00E676' : '#FF1744';

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, topY - 8);
        ctx.lineTo(cx, bottomY + 8);
        ctx.stroke();

        // Body
        ctx.fillStyle = color;
        ctx.fillRect(cx - 5, topY, 10, Math.max(4, bottomY - topY));
      });

      // Update and draw scanning laser
      laserYRatio += 0.012 * laserDirection;
      if (laserYRatio >= 0.92) laserDirection = -1;
      if (laserYRatio <= 0.08) laserDirection = 1;

      const laserY = height * laserYRatio;
      const laserGradient = ctx.createLinearGradient(0, laserY, width, laserY);
      laserGradient.addColorStop(0, 'transparent');
      laserGradient.addColorStop(0.2, '#00B8D9');
      laserGradient.addColorStop(0.5, '#00E676');
      laserGradient.addColorStop(0.8, '#00B8D9');
      laserGradient.addColorStop(1, 'transparent');

      ctx.strokeStyle = laserGradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, laserY);
      ctx.lineTo(width, laserY);
      ctx.stroke();

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleDeploySignal = () => {
    const timestampId = Date.now();
    if (selectedMode === 'forex') {
      const generatedSignal: TradingSignal = {
        id: `sig_forex_${timestampId}`,
        pair: 'EUR/USD',
        type: 'BUY',
        timeframe: '1H',
        entryPrice: '1.08450',
        stopLoss: '1.08120',
        takeProfit: '1.09250',
        riskRewardRatio: '1:2.52',
        confidencePercentage: 94,
        smcRationale: 'Bull Flag Breakout',
        timestamp: 'Just now',
        aiRationale:
          'Technical AI diagnosis identified clean ascending channel breakout with 1.08450 demand zone confirmation.',
        isOtc: false,
        category: 'Forex',
        expiryTime: '1H Horizon',
      };
      onApplySignal(generatedSignal);
    } else {
      const generatedSignal: TradingSignal = {
        id: `sig_otc_${timestampId}`,
        pair: 'EUR/USD (OTC)',
        type: 'CALL',
        timeframe: 'M1',
        expiryTime: `${selectedExpiry} Expiry`,
        entryPrice: '1.08640',
        confidencePercentage: 95,
        smcRationale: 'Order Block Rejection',
        timestamp: 'Just now',
        aiRationale:
          'Quotex/PO OTC feed retested bullish Order Block at key discount level with Fair Value Gap (FVG) mitigation.',
        payoutPercentage: '94%',
        isOtc: true,
        category: 'OTC',
      };
      onApplySignal(generatedSignal);
    }
    onDismiss();
  };

  return (
    <div
      data-testid="chart_scanner_dialog"
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm overflow-y-auto"
      onClick={onDismiss}
    >
      <div
        className="w-full max-w-[480px] rounded-2xl border border-[#283243] bg-[#161C24] p-5 shadow-2xl my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row with Close Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8.5 h-8.5 rounded-full bg-[#00E676]/12 border border-[#00E676] flex items-center justify-center shrink-0">
              <Camera className="w-4.5 h-4.5 text-[#00E676]" />
            </div>
            <div>
              <h2 className="text-[15px] text-white font-bold leading-tight">
                Scan Chart & Get AI Insights
              </h2>
              <p className="text-[11px] text-[#959DAD] truncate max-w-[260px] sm:max-w-none">
                Instant candlestick detection, support/resistance levels & automated SL/TP setup.
              </p>
            </div>
          </div>

          <button
            onClick={onDismiss}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#959DAD] hover:text-white hover:bg-[#1C2430] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Subtle Mode Toggle */}
        <div
          data-testid="scanner_mode_toggle"
          className="mt-3.5 flex rounded-xl bg-[#0B0E14] border border-[#283243] p-1 gap-1"
        >
          <button
            onClick={() => {
              setSelectedMode('forex');
              triggerScan();
            }}
            data-testid="scanner_mode_FOREX"
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMode === 'forex'
                ? 'bg-[#00875A] border border-[#00E676] text-white'
                : 'text-[#959DAD] hover:text-white border border-transparent'
            }`}
          >
            Standard Forex
          </button>
          <button
            onClick={() => {
              setSelectedMode('otc_binary');
              triggerScan();
            }}
            data-testid="scanner_mode_OTC_BINARY"
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMode === 'otc_binary'
                ? 'bg-[#00875A] border border-[#00E676] text-white'
                : 'text-[#959DAD] hover:text-white border border-transparent'
            }`}
          >
            OTC Binary (Quotex/PO)
          </button>
        </div>

        {/* 2. Viewfinder Area */}
        <div className="relative mt-3.5 w-full h-[160px] rounded-xl bg-[#0B0E14] border border-[#1E2838] overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Watermark Tag */}
          <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/75 backdrop-blur-sm text-[10px] text-white font-bold">
            {selectedMode === 'forex' ? 'EUR/USD • 1H' : 'EUR/USD (OTC) • M1'}
          </div>

          {/* Detection Banner */}
          <div className="absolute bottom-2 left-2 flex items-center space-x-1.5 px-2 py-1 rounded-md bg-[#00E676]/12 border border-[#00E676]/50 text-[#00E676]">
            <CheckCircle2 className="w-3 h-3" />
            <span className="text-[11px] font-bold">
              {selectedMode === 'forex'
                ? 'Bull Flag Breakout + S/R Retest Detected'
                : 'Order Block Rejection + FVG Fill Detected'}
            </span>
          </div>
        </div>

        {/* 3. Dual Analysis Engine Display */}
        <div className="mt-3.5 p-3 rounded-xl bg-[#19212C] border border-[#283243]">
          {selectedMode === 'forex' ? (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00B8D9]" />
                  <span className="text-xs text-white font-bold">Technical Forex Diagnosis</span>
                </div>
                <span className="text-[11px] text-[#00B8D9] font-bold">93.8% Win Rate</span>
              </div>

              {/* Traditional Grid */}
              <div className="rounded-lg bg-[#0B0E14] border border-[#283243]/60 p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[8px] text-[#636E80] font-bold block">SIGNAL</span>
                  <span className="text-xs text-[#00E676] font-extrabold block mt-0.5">BUY / LONG</span>
                </div>
                <div className="w-[1px] h-6 bg-[#283243]" />
                <div className="text-center">
                  <span className="text-[8px] text-[#636E80] font-bold block">ENTRY</span>
                  <span className="text-xs text-white font-bold block mt-0.5">1.08450</span>
                </div>
                <div className="w-[1px] h-6 bg-[#283243]" />
                <div className="text-center">
                  <span className="text-[8px] text-[#FF1744] font-bold block">STOP LOSS</span>
                  <span className="text-xs text-[#FF1744] font-bold block mt-0.5">1.08120</span>
                </div>
                <div className="w-[1px] h-6 bg-[#283243]" />
                <div className="text-right">
                  <span className="text-[8px] text-[#00E676] font-bold block">TAKE PROFIT</span>
                  <span className="text-xs text-[#00E676] font-bold block mt-0.5">1.09250</span>
                </div>
              </div>

              {/* R:R Ratio */}
              <div className="flex items-center justify-between mt-2 text-[11px]">
                <div className="flex items-center space-x-1">
                  <span className="text-[#959DAD]">Risk-to-Reward Ratio:</span>
                  <span className="text-[#FFAB00] font-bold">1:2.52</span>
                </div>
                <span className="text-[#636E80]">Timeframe: 1H Chart</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-1.5">
                  <Brain className="w-3.5 h-3.5 text-[#00B8D9]" />
                  <span className="text-xs text-white font-bold">
                    SMC Binary Diagnosis (Quotex/PO)
                  </span>
                </div>
                <span className="text-[11px] text-[#00B8D9] font-bold">95.4% Win Probability</span>
              </div>

              {/* Expiry Selector */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-[#959DAD] font-medium">Contract Expiry:</span>
                <div className="flex items-center space-x-1.5">
                  {['1 Min', '3 Min', '5 Min'].map((exp) => (
                    <button
                      key={exp}
                      onClick={() => setSelectedExpiry(exp)}
                      data-testid={`expiry_selector_${exp}`}
                      className={`text-[10px] px-2 py-0.5 rounded-md border font-bold cursor-pointer transition-colors ${
                        selectedExpiry === exp
                          ? 'bg-[#00875A] border-[#00E676] text-white'
                          : 'bg-[#0B0E14] border-[#283243] text-[#959DAD] hover:text-white'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Binary Parameters */}
              <div className="rounded-lg bg-[#0B0E14] border border-[#283243]/60 p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[8px] text-[#636E80] font-bold block">DIRECTION</span>
                  <span className="text-xs text-[#00E676] font-extrabold block mt-0.5">CALL (UP)</span>
                </div>
                <div className="w-[1px] h-6 bg-[#283243]" />
                <div className="text-center">
                  <span className="text-[8px] text-[#FFAB00] font-bold block">EXPIRY</span>
                  <span className="text-xs text-white font-bold block mt-0.5">{selectedExpiry} Expiry</span>
                </div>
                <div className="w-[1px] h-6 bg-[#283243]" />
                <div className="text-center">
                  <span className="text-[8px] text-[#636E80] font-bold block">STRIKE ENTRY</span>
                  <span className="text-xs text-white font-bold block mt-0.5">1.08640</span>
                </div>
                <div className="w-[1px] h-6 bg-[#283243]" />
                <div className="text-right">
                  <span className="text-[8px] text-[#636E80] font-bold block">EST. PAYOUT</span>
                  <span className="text-xs text-[#00E676] font-bold block mt-0.5">+94% Yield</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 text-[10px]">
                <div className="flex items-center space-x-1">
                  <span className="text-[#959DAD]">SMC Rationale:</span>
                  <span className="text-[#00B8D9] font-bold">Order Block Rejection</span>
                </div>
                <span className="text-[#636E80]">Feed: Pocket Option / Quotex</span>
              </div>
            </div>
          )}
        </div>

        {/* 4. Primary Scan Button + Upload Icon */}
        <div className="mt-3.5 flex items-center space-x-2.5">
          <button
            onClick={triggerScan}
            disabled={isScanning}
            data-testid="scan_chart_now_primary_button"
            className="flex-1 h-11 rounded-xl bg-[#00875A] hover:bg-[#009b67] text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-md"
          >
            {isScanning ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-white" />
                <span>Scanning Candlesticks...</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" />
                <span>Scan Chart Now</span>
              </>
            )}
          </button>

          <button
            onClick={triggerScan}
            data-testid="upload_chart_icon_button"
            title="Upload Chart Screenshot"
            className="w-11 h-11 rounded-xl bg-[#222B38] border border-[#2E3B4D] hover:bg-[#2c384a] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <Upload className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* 5. Deploy / Cancel Actions */}
        <div className="mt-2.5 flex items-center space-x-2.5">
          <button
            onClick={onDismiss}
            className="flex-1 h-10.5 rounded-xl border border-[#283243] hover:bg-[#1C2430] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleDeploySignal}
            data-testid="deploy_scanned_signal_button"
            className={`flex-[1.8] h-10.5 rounded-xl text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-md ${
              selectedMode === 'forex'
                ? 'bg-[#1E3A5F] hover:bg-[#274b7a]'
                : 'bg-[#00875A] hover:bg-[#009b67]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{selectedMode === 'forex' ? 'Deploy Forex Signal' : 'Deploy OTC Signal'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
