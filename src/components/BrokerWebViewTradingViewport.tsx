import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { BrokerConfig } from '../types/trading';

interface BrokerWebViewTradingViewportProps {
  broker: BrokerConfig;
  isReloading: boolean;
  onReloadFinished: () => void;
  heightClass?: string;
}

export const BrokerWebViewTradingViewport: React.FC<BrokerWebViewTradingViewportProps> = ({
  broker,
  isReloading,
  onReloadFinished,
  heightClass = 'h-[350px]',
}) => {
  const isQuotex = broker.id === 'quotex';
  const [currentPrice, setCurrentPrice] = useState<number>(1.08642);
  const [investmentAmount, setInvestmentAmount] = useState<number>(50);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1M');
  const [executionToastMessage, setExecutionToastMessage] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(1.0);

  const [pricePoints, setPricePoints] = useState<number[]>(() => {
    const initial: number[] = [];
    let p = 1.0855;
    for (let i = 0; i < 40; i++) {
      p += (Math.random() - 0.49) * 0.00015;
      initial.push(p);
    }
    return initial;
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Reload simulation
  useEffect(() => {
    if (isReloading) {
      setLoadingProgress(0.2);
      const timer1 = setTimeout(() => {
        setLoadingProgress(0.6);
      }, 250);
      const timer2 = setTimeout(() => {
        setLoadingProgress(1.0);
        onReloadFinished();
      }, 500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isReloading, onReloadFinished]);

  // Real-time ticking price engine (800ms updates)
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.488) * 0.00014;
      setCurrentPrice((prev) => {
        const next = Math.min(1.091, Math.max(1.082, prev + delta));
        setPricePoints((points) => {
          const updated = [...points];
          if (updated.length >= 40) updated.shift();
          updated.push(next);
          return updated;
        });
        return next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [broker.id]);

  // Toast message auto-dismiss
  useEffect(() => {
    if (executionToastMessage) {
      const timer = setTimeout(() => {
        setExecutionToastMessage(null);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [executionToastMessage]);

  // Draw chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    if (pricePoints.length < 2) {
      ctx.restore();
      return;
    }

    const min = Math.min(...pricePoints);
    const max = Math.max(...pricePoints);
    const range = max - min > 0.0001 ? max - min : 0.0001;

    // Horizontal grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const stepX = width / (pricePoints.length - 1);
    const pointsY = pricePoints.map((p) => {
      const norm = (p - min) / range;
      return height - norm * (height * 0.7) - height * 0.15;
    });

    // Stroke path and fill path
    ctx.beginPath();
    ctx.moveTo(0, pointsY[0]);
    for (let i = 1; i < pricePoints.length; i++) {
      ctx.lineTo(i * stepX, pointsY[i]);
    }

    // Gradient fill under curve
    const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
    fillGradient.addColorStop(0, `${broker.primaryColor}38`);
    fillGradient.addColorStop(1, 'transparent');

    const fillPath = new Path2D();
    fillPath.moveTo(0, pointsY[0]);
    for (let i = 1; i < pricePoints.length; i++) {
      fillPath.lineTo(i * stepX, pointsY[i]);
    }
    fillPath.lineTo((pricePoints.length - 1) * stepX, height);
    fillPath.lineTo(0, height);
    fillPath.closePath();
    ctx.fillStyle = fillGradient;
    ctx.fill(fillPath);

    // Draw main stroke line
    ctx.strokeStyle = broker.primaryColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Draw active live tick glow dot
    const lastX = (pricePoints.length - 1) * stepX;
    const lastY = pointsY[pointsY.length - 1];

    ctx.beginPath();
    ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
    ctx.fillStyle = broker.primaryColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }, [pricePoints, broker.primaryColor]);

  const expectedReturn = (investmentAmount * 1.94).toFixed(2);

  const handleCallOrder = () => {
    const formatted = currentPrice.toFixed(5);
    const msg = isQuotex
      ? `⚡ QUOTEX CALL Order: $${investmentAmount} @ ${formatted} (Return: $${expectedReturn})`
      : `⚡ POCKET OPTION HIGHER: $${investmentAmount} @ ${formatted} (Return: $${expectedReturn})`;
    setExecutionToastMessage(msg);
  };

  const handlePutOrder = () => {
    const formatted = currentPrice.toFixed(5);
    const msg = isQuotex
      ? `⚡ QUOTEX PUT Order: $${investmentAmount} @ ${formatted} (Return: $${expectedReturn})`
      : `⚡ POCKET OPTION LOWER: $${investmentAmount} @ ${formatted} (Return: $${expectedReturn})`;
    setExecutionToastMessage(msg);
  };

  return (
    <div className={`w-full ${heightClass} flex flex-col bg-[#0B0E14] relative overflow-hidden select-none`}>
      {/* Top Loading Progress Bar */}
      {isReloading && (
        <div className="w-full h-[2.5px] bg-[#0B0E14] overflow-hidden">
          <div
            className="h-full transition-all duration-200"
            style={{
              width: `${loadingProgress * 100}%`,
              backgroundColor: broker.primaryColor,
            }}
          />
        </div>
      )}

      {/* Asset & Payout Header Bar */}
      <div className="w-full bg-[#111722] border-b border-[#283243] px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
          <span className="text-xs text-white font-bold">
            {isQuotex ? 'QUOTEX OTC • EUR/USD' : 'POCKET OPTION • EUR/USD OTC'}
          </span>
          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#00E676]/15 border border-[#00E676]/40 text-[#00E676]">
            94% PAYOUT
          </span>
        </div>

        {/* Timeframe Selector Pills */}
        <div className="flex items-center space-x-1">
          {['5s', '1M', '5M'].map((tf) => {
            const isSelected = selectedTimeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`text-[10px] px-1.5 py-0.5 rounded transition-colors cursor-pointer border ${
                  isSelected
                    ? 'text-white font-bold'
                    : 'text-[#959DAD] font-medium border-transparent bg-[#1C2430]'
                }`}
                style={{
                  backgroundColor: isSelected ? `${broker.primaryColor}38` : undefined,
                  borderColor: isSelected ? broker.primaryColor : 'transparent',
                }}
              >
                {tf}
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Canvas Chart Area */}
      <div className="relative flex-1 w-full p-1 min-h-[140px]">
        {/* Price HUD Overlay */}
        <div className="absolute top-2 left-2 z-10 pointer-events-none">
          <span className="text-[9px] text-[#959DAD] font-semibold tracking-wider block">
            LIVE OTC FEED
          </span>
          <span className="text-base sm:text-lg text-white font-extrabold font-mono">
            {currentPrice.toFixed(5)}
          </span>
        </div>

        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Live Order Execution Feedback Toast */}
        {executionToastMessage && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-4">
            <div
              className="bg-[#161C24]/95 border rounded-xl px-4 py-2 text-white text-xs font-bold shadow-2xl backdrop-blur-md animate-fade-in"
              style={{ borderColor: broker.primaryColor }}
            >
              {executionToastMessage}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Digital Options Trading Action Bar */}
      <div className="w-full bg-[#161C24] border-t border-[#283243] p-2 flex items-center gap-2">
        {/* Investment Amount Controller */}
        <button
          onClick={() => setInvestmentAmount((prev) => (prev >= 200 ? 25 : prev + 25))}
          className="flex flex-col items-center justify-center px-3 py-1 rounded-lg bg-[#0B0E14] border border-[#283243] hover:border-[#38455d] transition-colors cursor-pointer min-w-[70px]"
        >
          <span className="text-[8px] text-[#959DAD] font-bold">INVEST</span>
          <span className="text-xs text-white font-extrabold">${investmentAmount}.00</span>
        </button>

        {/* CALL / HIGHER Button */}
        <button
          onClick={handleCallOrder}
          data-testid="broker_order_call_button"
          className="flex-1 h-11 rounded-lg bg-gradient-to-r from-[#00C853] to-[#00875A] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-white shadow-md"
        >
          <TrendingUp className="w-4 h-4 text-white" />
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-extrabold leading-tight">
              {isQuotex ? 'UP (CALL)' : 'HIGHER'}
            </span>
            <span className="text-[9px] text-white/85 font-medium leading-tight">
              +94% (${expectedReturn})
            </span>
          </div>
        </button>

        {/* PUT / LOWER Button */}
        <button
          onClick={handlePutOrder}
          data-testid="broker_order_put_button"
          className="flex-1 h-11 rounded-lg bg-gradient-to-r from-[#FF5630] to-[#DE350B] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-white shadow-md"
        >
          <TrendingDown className="w-4 h-4 text-white" />
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-extrabold leading-tight">
              {isQuotex ? 'DOWN (PUT)' : 'LOWER'}
            </span>
            <span className="text-[9px] text-white/85 font-medium leading-tight">
              +94% (${expectedReturn})
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
