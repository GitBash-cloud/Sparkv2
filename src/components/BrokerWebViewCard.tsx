import React, { useState } from 'react';
import { BrokerConfig } from '../types/trading';
import { BrokerWebViewControlBar } from './BrokerWebViewControlBar';
import { BrokerWebViewTradingViewport } from './BrokerWebViewTradingViewport';

interface BrokerWebViewCardProps {
  broker: BrokerConfig;
  onClose: () => void;
  onFullScreen: () => void;
}

export const BrokerWebViewCard: React.FC<BrokerWebViewCardProps> = ({
  broker,
  onClose,
  onFullScreen,
}) => {
  const [isReloading, setIsReloading] = useState(false);

  return (
    <div
      data-testid="broker_webview_embedded_card"
      className="mx-4 rounded-2xl border border-[#283243] bg-[#161C24] overflow-hidden shadow-lg transition-all"
      style={{
        boxShadow: `0 4px 20px -2px ${broker.primaryColor}22`,
      }}
    >
      <BrokerWebViewControlBar
        broker = {broker}
        isFullScreen={false}
        isReloading={isReloading}
        onRefresh={() => setIsReloading(true)}
        onClose={onClose}
        onToggleFullScreen={onFullScreen}
      />

      <BrokerWebViewTradingViewport
        broker={broker}
        isReloading={isReloading}
        onReloadFinished={() => setIsReloading(false)}
        heightClass="h-[340px]"
      />
    </div>
  );
};
