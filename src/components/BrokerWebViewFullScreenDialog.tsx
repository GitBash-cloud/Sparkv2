import React, { useState, useEffect } from 'react';
import { BrokerConfig } from '../types/trading';
import { BrokerWebViewControlBar } from './BrokerWebViewControlBar';
import { BrokerWebViewTradingViewport } from './BrokerWebViewTradingViewport';

interface BrokerWebViewFullScreenDialogProps {
  broker: BrokerConfig;
  onDismiss: () => void;
}

export const BrokerWebViewFullScreenDialog: React.FC<BrokerWebViewFullScreenDialogProps> = ({
  broker,
  onDismiss,
}) => {
  const [isReloading, setIsReloading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  return (
    <div
      data-testid="broker_webview_fullscreen_dialog"
      className="fixed inset-0 z-50 bg-[#0B0E14] flex flex-col animate-fade-in"
    >
      <BrokerWebViewControlBar
        broker={broker}
        isFullScreen={true}
        isReloading={isReloading}
        onRefresh={() => setIsReloading(true)}
        onClose={onDismiss}
        onToggleFullScreen={onDismiss}
      />

      <div className="flex-1 w-full bg-[#0B0E14] relative">
        <BrokerWebViewTradingViewport
          broker={broker}
          isReloading={isReloading}
          onReloadFinished={() => setIsReloading(false)}
          heightClass="h-full min-h-[500px]"
        />
      </div>
    </div>
  );
};
