import React, { useState } from 'react';
import {
  Zap,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Brain,
  Clock,
  Shield,
  Target,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from 'lucide-react';
import { TradingSignal, SIGNAL_TYPE_MAP } from '../types/trading';

interface ActiveSignalsSectionProps {
  signals: TradingSignal[];
  selectedCategory: string;
  onCategorySelected: (cat: string) => void;
  onCopySignal: (signal: TradingSignal) => void;
}

export const ActiveSignalsSection: React.FC<ActiveSignalsSectionProps> = ({
  signals,
  selectedCategory,
  onCategorySelected,
  onCopySignal,
}) => {
  const categories = ['All', 'OTC', 'Crypto', 'Forex', 'Indices', 'Stocks'];

  const filteredSignals = signals.filter((signal) => {
    if (selectedCategory.toLowerCase() === 'all') return true;
    if (selectedCategory.toLowerCase() === 'otc') {
      return signal.isOtc || signal.category.toLowerCase() === 'otc';
    }
    return signal.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <section className="w-full">
      {/* Header Row */}
      <div className="px-4 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <Zap className="w-5 h-5 text-[#FFAB00]" />
          <span className="text-[13px] text-white font-bold tracking-wider">ACTIVE SIGNALS</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00E676]/12 border border-[#00E676]/40 text-[#00E676]">
            {signals.length} Live
          </span>
        </div>

        <span className="text-[11px] text-[#959DAD] font-medium">Auto-Synced</span>
      </div>

      {/* Category Filter Chips */}
      <div
        data-testid="signal_category_filter_row"
        className="flex items-center space-x-2 overflow-x-auto no-scrollbar px-4 py-1.5"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => onCategorySelected(cat)}
              data-testid={`filter_chip_${cat}`}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium shrink-0 transition-colors cursor-pointer ${
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

      {/* Signals List */}
      <div className="px-4 mt-2 space-y-3.5">
        {filteredSignals.length === 0 ? (
          <div className="w-full rounded-xl bg-[#161C24] border border-[#283243] p-6 text-center text-xs text-[#959DAD]">
            No signals found in '{selectedCategory}'. Check other categories.
          </div>
        ) : (
          filteredSignals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} onCopy={() => onCopySignal(signal)} />
          ))
        )}
      </div>
    </section>
  );
};

interface SignalCardProps {
  signal: TradingSignal;
  onCopy: () => void;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal, onCopy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const typeDetails = SIGNAL_TYPE_MAP[signal.type] || {
    label: signal.type,
    binaryLabel: signal.type,
    isBullish: true,
  };
  const isBullish = typeDetails.isBullish;
  const actionText = signal.isOtc ? typeDetails.binaryLabel : typeDetails.label;
  const actionColor = isBullish ? '#00E676' : '#FF1744';
  const actionBg = isBullish ? 'bg-[#00E676]/12' : 'bg-[#FF1744]/12';

  const handleCopyClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid={`signal_card_${signal.id}`}
      className="w-full rounded-2xl border border-[#283243] bg-[#161C24] p-4 shadow-sm hover:border-[#38465d] transition-all"
    >
      {/* 1. Header: Pair, Timeframe, Category Badge & Confidence Accuracy */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-base text-white font-extrabold tracking-tight">
            {signal.pair}
          </span>

          {/* Timeframe badge */}
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0B0E14] border border-[#283243] text-[#959DAD]">
            {signal.timeframe}
          </span>

          {/* OTC vs Asset Category Badge */}
          {signal.isOtc ? (
            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#2A1C3D] border border-[#9C27B0]/60 text-[#CE93D8]">
              OTC
            </span>
          ) : (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#0B0E14] border border-[#283243] text-[#00B8D9] uppercase">
              {signal.category}
            </span>
          )}
        </div>

        {/* Confidence Score Pill */}
        <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#00B8D9]/15 border border-[#00B8D9]/50 text-[#00B8D9]">
          <Sparkles className="w-2.5 h-2.5" />
          <span className="text-[11px] font-bold">{signal.confidencePercentage}% Accuracy</span>
        </div>
      </div>

      {/* 2. Trade Direction & Rationale Badge */}
      <div className="flex items-center justify-between mt-2.5">
        <div
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border ${actionBg}`}
          style={{ borderColor: `${actionColor}70` }}
        >
          {isBullish ? (
            <TrendingUp className="w-4 h-4" style={{ color: actionColor }} />
          ) : (
            <TrendingDown className="w-4 h-4" style={{ color: actionColor }} />
          )}
          <span className="text-xs font-extrabold tracking-wide" style={{ color: actionColor }}>
            {actionText}
          </span>
        </div>

        {/* Rationale / Risk-Reward Badge */}
        {signal.isOtc ? (
          <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#1E2838] border border-[#2C3E55] text-[#00B8D9]">
            <Brain className="w-3 h-3 text-[#00B8D9]" />
            <span className="text-[11px] font-bold">{signal.smcRationale}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#0B0E14] border border-[#283243]">
            <span className="text-[11px] text-[#636E80] font-medium">R:R</span>
            <span className="text-[11px] text-[#FFAB00] font-bold">
              {signal.riskRewardRatio || '1:2.5'}
            </span>
          </div>
        )}
      </div>

      {/* 3. Parameters Grid */}
      <div className="mt-3 rounded-xl bg-[#0B0E14] border border-[#283243]/70 px-3.5 py-2.5 flex items-center justify-between">
        {signal.isOtc ? (
          <>
            {/* Strike Entry */}
            <div>
              <span className="text-[9px] text-[#636E80] font-bold tracking-wider block">
                STRIKE / ENTRY
              </span>
              <span className="text-xs text-white font-bold block mt-0.5">{signal.entryPrice}</span>
            </div>

            <div className="w-[1px] h-6 bg-[#283243]" />

            {/* Expiry Time */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Clock className="w-2.5 h-2.5 text-[#FFAB00]" />
                <span className="text-[9px] text-[#FFAB00] font-bold tracking-wider">
                  EXPIRY TIME
                </span>
              </div>
              <span className="text-xs text-white font-bold block mt-0.5">{signal.expiryTime}</span>
            </div>

            <div className="w-[1px] h-6 bg-[#283243]" />

            {/* Est. Payout */}
            <div className="text-right">
              <span className="text-[9px] text-[#636E80] font-bold tracking-wider block">
                EST. PAYOUT
              </span>
              <span className="text-xs text-[#00E676] font-bold block mt-0.5">
                {signal.payoutPercentage || '94%'} Return
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Entry Price */}
            <div>
              <span className="text-[9px] text-[#636E80] font-bold tracking-wider block">ENTRY</span>
              <span className="text-xs text-white font-bold block mt-0.5">{signal.entryPrice}</span>
            </div>

            <div className="w-[1px] h-6 bg-[#283243]" />

            {/* Stop Loss */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Shield className="w-2.5 h-2.5 text-[#FF1744]" />
                <span className="text-[9px] text-[#FF1744] font-bold tracking-wider">
                  STOP LOSS
                </span>
              </div>
              <span className="text-xs text-[#FF1744] font-bold block mt-0.5">
                {signal.stopLoss || 'Dynamic'}
              </span>
            </div>

            <div className="w-[1px] h-6 bg-[#283243]" />

            {/* Take Profit */}
            <div className="text-right">
              <div className="flex items-center justify-end space-x-1">
                <Target className="w-2.5 h-2.5 text-[#00E676]" />
                <span className="text-[9px] text-[#00E676] font-bold tracking-wider">
                  TAKE PROFIT
                </span>
              </div>
              <span className="text-xs text-[#00E676] font-bold block mt-0.5">
                {signal.takeProfit || 'Dynamic'}
              </span>
            </div>
          </>
        )}
      </div>

      {/* 4. Expandable Analysis / Thesis Section */}
      {isExpanded && (
        <div className="mt-3 p-3 rounded-xl bg-[#19222E] border border-[#263548] animate-fade-in">
          <div className="flex items-center space-x-1.5 mb-1.5">
            <Brain className="w-3.5 h-3.5 text-[#00B8D9]" />
            <span className="text-xs text-[#00B8D9] font-bold">
              {signal.isOtc
                ? 'Smart Money Concept (SMC) OTC Thesis'
                : 'Algorithmic Analysis & Strategy'}
            </span>
          </div>
          <p className="text-xs text-[#959DAD] leading-relaxed mb-2">{signal.aiRationale}</p>
          <span className="text-[10px] text-[#636E80] block">
            {signal.isOtc
              ? 'Execution: Quotex / Pocket Option 60s - 300s Turbo Mode'
              : 'Execution: Standard Market Order with SL & TP Protection'}
          </span>
        </div>
      )}

      {/* 5. Footer Actions: Toggle Analysis & Copy Signal */}
      <div className="flex items-center justify-between mt-3 pt-1">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-[11px] text-[#00B8D9] font-semibold hover:underline cursor-pointer"
        >
          <span>{isExpanded ? 'Hide Analysis' : 'View Analysis'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <button
          onClick={handleCopyClick}
          data-testid={`copy_signal_${signal.id}`}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#1C2430] border border-[#283243] hover:bg-[#253040] transition-colors cursor-pointer text-white"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#00E676]" /> : <Copy className="w-3.5 h-3.5" />}
          <span className="text-[11px] font-bold">{copied ? 'Copied!' : 'Copy Setup'}</span>
        </button>
      </div>
    </div>
  );
};
