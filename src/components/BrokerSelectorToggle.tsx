import React from 'react';
import { Gauge, Check, Eye, EyeOff, Maximize2 } from 'lucide-react';
import { BrokerConfig, BrokerId, BROKERS } from '../types/trading';

interface BrokerSelectorToggleProps {
  activeBroker: BrokerConfig;
  isWebViewVisible: boolean;
  onBrokerChanged: (broker: BrokerConfig) => void;
  onToggleWebView: () => void;
  onLaunchFullScreen: () => void;
}

export const BrokerSelectorToggle: React.FC<BrokerSelectorToggleProps> = ({
  activeBroker,
  isWebViewVisible,
  onBrokerChanged,
  onToggleWebView,
  onLaunchFullScreen,
}) => {
  const brokersList: BrokerId[] = ['quotex', 'pocket_option'];

  return (
    <div
      data-testid="broker_selector_container"
      className="mx-4 rounded-2xl border border-[#283243] bg-[#161C24] p-3.5 shadow-md"
      style={{
        borderImage: `linear-gradient(to right, ${activeBroker.primaryColor}99, #283243) 1`,
      }}
    >
      {/* Top Label & Server Health */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
          <span className="text-[11px] text-white font-bold tracking-wider">
            INTEGRATED BROKER TERMINAL
          </span>
        </div>

        {/* Latency Badge */}
        <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded-md bg-[#0B0E14] border border-[#283243]">
          <Gauge className="w-3 h-3" style={{ color: activeBroker.accentColor }} />
          <span className="text-[10px] font-bold" style={{ color: activeBroker.accentColor }}>
            {activeBroker.latency}
          </span>
        </div>
      </div>

      {/* Dual Broker Switcher Bar */}
      <div className="flex rounded-xl bg-[#0B0E14] border border-[#283243] p-1 gap-1.5 mb-2.5">
        {brokersList.map((brokerId) => {
          const broker = BROKERS[brokerId];
          const isSelected = activeBroker.id === brokerId;

          return (
            <button
              key={broker.id}
              onClick={() => onBrokerChanged(broker)}
              data-testid={`broker_button_${broker.id}`}
              className={`flex-1 flex items-center justify-center py-2 px-2.5 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? broker.id === 'quotex'
                    ? 'bg-[#0F263B] border-[#00A3FF]'
                    : 'bg-[#132047] border-[#2979FF]'
                  : 'bg-transparent border-transparent hover:bg-[#1C2430]/50'
              }`}
            >
              {/* Broker Monogram Badge */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center mr-2 shadow-sm"
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${broker.primaryColor}, ${broker.accentColor})`
                    : 'linear-gradient(135deg, #283243, #1E2633)',
                }}
              >
                <span className="text-[9px] font-extrabold text-white">{broker.shortName}</span>
              </div>

              <span
                className={`text-[13px] ${
                  isSelected ? 'text-white font-bold' : 'text-[#959DAD] font-medium'
                }`}
              >
                {broker.displayName}
              </span>

              {isSelected && (
                <Check
                  className="w-3.5 h-3.5 ml-1.5"
                  style={{ color: broker.accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Broker Status & Actions Row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#959DAD] font-normal truncate max-w-[140px] sm:max-w-none">
          {activeBroker.tagline}
        </span>

        <div className="flex items-center space-x-2">
          {/* Toggle Terminal Button */}
          <button
            onClick={onToggleWebView}
            data-testid="toggle_broker_webview_button"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer"
            style={{
              backgroundColor: isWebViewVisible ? `${activeBroker.primaryColor}33` : '#1C2430',
              borderColor: isWebViewVisible ? activeBroker.primaryColor : '#283243',
              color: isWebViewVisible ? activeBroker.primaryColor : '#FFFFFF',
            }}
          >
            {isWebViewVisible ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            <span>{isWebViewVisible ? 'Hide Terminal' : 'Show Terminal'}</span>
          </button>

          {/* Full Screen Button */}
          <button
            onClick={onLaunchFullScreen}
            data-testid="fullscreen_broker_webview_button"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-[#283243] bg-[#1C2430] hover:bg-[#283243] text-[11px] font-semibold transition-colors cursor-pointer"
            style={{ color: activeBroker.primaryColor }}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
