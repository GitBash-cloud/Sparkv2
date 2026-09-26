import React from 'react';
import { Lock, RotateCw, ExternalLink, Maximize2, Minimize2, X } from 'lucide-react';
import { BrokerConfig } from '../types/trading';

interface BrokerWebViewControlBarProps {
  broker: BrokerConfig;
  isFullScreen: boolean;
  isReloading: boolean;
  onRefresh: () => void;
  onClose: () => void;
  onToggleFullScreen: () => void;
}

export const BrokerWebViewControlBar: React.FC<BrokerWebViewControlBarProps> = ({
  broker,
  isFullScreen,
  isReloading,
  onRefresh,
  onClose,
  onToggleFullScreen,
}) => {
  const handleOpenExternal = () => {
    try {
      window.open(broker.defaultUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // In constrained environments
    }
  };

  return (
    <div className="w-full bg-[#161C24] border-b border-[#283243] px-3 py-2 flex items-center justify-between">
      {/* Left: SSL Lock + Web URL Address Bar */}
      <div className="flex items-center space-x-2.5 flex-1 min-w-0 mr-2">
        <div
          className="w-6.5 h-6.5 rounded-full flex items-center justify-center border shrink-0"
          style={{
            backgroundColor: `${broker.primaryColor}33`,
            borderColor: broker.primaryColor,
          }}
        >
          <span className="text-[10px] font-bold" style={{ color: broker.primaryColor }}>
            {broker.shortName}
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex items-center space-x-1">
            <Lock className="w-3 h-3 text-[#00E676] shrink-0" />
            <span className="text-xs text-white font-bold truncate">
              {broker.displayName} In-App Web Desk
            </span>
          </div>
          <span className="text-[10px] text-[#959DAD] truncate block">
            {broker.defaultUrl.replace('https://', '')}/trade/live
          </span>
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center space-x-1 shrink-0">
        {/* Reload */}
        <button
          onClick={onRefresh}
          title="Reload Page"
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#1C2430] text-[#959DAD] hover:text-white transition-colors cursor-pointer"
        >
          <RotateCw className={`w-4 h-4 ${isReloading ? 'animate-spin text-[#00A3FF]' : ''}`} />
        </button>

        {/* External Browser */}
        <button
          onClick={handleOpenExternal}
          title="Open in External Browser"
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#1C2430] transition-colors cursor-pointer"
          style={{ color: broker.primaryColor }}
        >
          <ExternalLink className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullScreen}
          title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#1C2430] transition-colors cursor-pointer"
          style={{ color: broker.primaryColor }}
        >
          {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close"
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#1C2430] text-[#959DAD] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
};
