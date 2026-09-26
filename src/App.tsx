import React, { useState, useCallback } from 'react';
import {
  DashboardTab,
  MarketAsset,
  TradingSignal,
  BrokerConfig,
  BROKERS,
  SIGNAL_TYPE_MAP,
} from './types/trading';
import {
  INITIAL_ASSETS,
  INITIAL_SIGNALS,
  getRefreshedAssets,
  getRefreshedSignals,
} from './data/mockData';
import { TopAppBar } from './components/TopAppBar';
import { OtcMarketModeBar } from './components/OtcMarketModeBar';
import { BrokerSelectorToggle } from './components/BrokerSelectorToggle';
import { BrokerWebViewCard } from './components/BrokerWebViewCard';
import { BrokerWebViewFullScreenDialog } from './components/BrokerWebViewFullScreenDialog';
import { MarketTickerTape } from './components/MarketTickerTape';
import { QuickActionBanner } from './components/QuickActionBanner';
import { AiPerformanceStatCard } from './components/AiPerformanceStatCard';
import { ActiveSignalsSection } from './components/ActiveSignalsSection';
import { ChartScannerDialog } from './components/ChartScannerDialog';
import { BottomNavBar } from './components/BottomNavBar';
import { ScannerTabContent } from './components/ScannerTabContent';
import { SignalsTabContent } from './components/SignalsTabContent';
import { AnalyticsTabContent } from './components/AnalyticsTabContent';
import { ProfileTabContent } from './components/ProfileTabContent';
import { ToastSnackbar } from './components/ToastSnackbar';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<DashboardTab>('dashboard');
  const [assetsList, setAssetsList] = useState<MarketAsset[]>(INITIAL_ASSETS);
  const [signalsList, setSignalsList] = useState<TradingSignal[]>(INITIAL_SIGNALS);
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(INITIAL_ASSETS[0] || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showScannerDialog, setShowScannerDialog] = useState<boolean>(false);
  const [notificationsCount, setNotificationsCount] = useState<number>(3);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isOtcModeEnabled, setIsOtcModeEnabled] = useState<boolean>(true);

  // Integrated Broker & WebView State
  const [activeBroker, setActiveBroker] = useState<BrokerConfig>(BROKERS.quotex);
  const [isWebViewVisible, setIsWebViewVisible] = useState<boolean>(false);
  const [isWebViewFullScreen, setIsWebViewFullScreen] = useState<boolean>(false);

  // Snackbar Toast
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const showSnackbar = useCallback((msg: string) => {
    setSnackbarMessage(msg);
  }, []);

  const handleRefreshData = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setAssetsList((prev) => {
        const refreshed = getRefreshedAssets(prev);
        if (selectedAsset) {
          const match = refreshed.find((a) => a.id === selectedAsset.id);
          if (match) setSelectedAsset(match);
        }
        return refreshed;
      });
      setSignalsList((prev) => getRefreshedSignals(prev));
      setIsRefreshing(false);
      showSnackbar('Market quotes and trading signals refreshed');
    }, 900);
  }, [selectedAsset, showSnackbar]);

  const handleToggleOtcMode = (enabled: boolean) => {
    setIsOtcModeEnabled(enabled);
    showSnackbar(
      enabled
        ? 'OTC Market Mode Activated (24/7 Quotex & Pocket Option Feeds)'
        : 'Standard Exchange Mode Active'
    );
  };

  const handleBrokerChanged = (broker: BrokerConfig) => {
    setActiveBroker(broker);
    showSnackbar(`Active Broker switched to ${broker.displayName} (${broker.tagline})`);
  };

  const handleAssetClick = (asset: MarketAsset) => {
    setSelectedAsset(asset);
    const info = asset.isOtc ? `Payout: ${asset.otcPayout}` : `24h Vol: ${asset.volume24h}`;
    showSnackbar(`Focused on ${asset.symbol}: ${asset.price} (${info})`);
  };

  const handleCopySignal = (signal: TradingSignal) => {
    const details = SIGNAL_TYPE_MAP[signal.type];
    const copyMsg = signal.isOtc
      ? `Copied ${signal.pair} ${details.binaryLabel} (${signal.expiryTime} @ ${signal.entryPrice}) - ${signal.smcRationale}`
      : `Copied ${signal.pair} ${details.label}: Entry ${signal.entryPrice} | SL ${signal.stopLoss || 'Dynamic'} | TP ${signal.takeProfit || 'Dynamic'}`;

    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(copyMsg);
      }
    } catch {
      // Fallback
    }
    showSnackbar(copyMsg);
  };

  const handleNotificationClick = () => {
    setNotificationsCount(0);
    showSnackbar('All notifications marked as read');
  };

  const handleApplySignal = (signal: TradingSignal) => {
    setSignalsList((prev) => [signal, ...prev]);
    const details = SIGNAL_TYPE_MAP[signal.type];
    const label = signal.isOtc
      ? `${signal.pair} ${details.binaryLabel}`
      : `${signal.pair} ${details.label}`;
    showSnackbar(`Deployed ${label} Signal to Active Feed!`);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col max-w-md mx-auto relative antialiased select-none pb-24 shadow-2xl">
      {/* Tab Router */}
      {currentTab === 'dashboard' && (
        <main className="flex-1 flex flex-col space-y-4">
          {/* 1. Top App Bar */}
          <TopAppBar
            unreadNotifications={notificationsCount}
            onProfileClick={() => setCurrentTab('profile')}
            onNotificationClick={handleNotificationClick}
          />

          {/* 2. OTC Market Mode Status Bar & Toggle */}
          <OtcMarketModeBar
            isOtcModeEnabled={isOtcModeEnabled}
            onToggleOtcMode={handleToggleOtcMode}
          />

          {/* 3. Broker Selector Toggle (Quotex vs Pocket Option) */}
          <BrokerSelectorToggle
            activeBroker={activeBroker}
            isWebViewVisible={isWebViewVisible}
            onBrokerChanged={handleBrokerChanged}
            onToggleWebView={() => setIsWebViewVisible((prev) => !prev)}
            onLaunchFullScreen={() => setIsWebViewFullScreen(true)}
          />

          {/* 3b. In-App Broker Web View Card Container (Collapsible) */}
          {isWebViewVisible && (
            <BrokerWebViewCard
              broker={activeBroker}
              onClose={() => setIsWebViewVisible(false)}
              onFullScreen={() => setIsWebViewFullScreen(true)}
            />
          )}

          {/* 4. Market Overview / Ticker Tape */}
          <MarketTickerTape
            assets={assetsList}
            selectedAssetId={selectedAsset?.id}
            onAssetClick={handleAssetClick}
            isRefreshing={isRefreshing}
            onRefreshClick={handleRefreshData}
          />

          {/* 5. Quick Action Banner */}
          <QuickActionBanner onScanClick={() => setShowScannerDialog(true)} />

          {/* 6. AI Performance Quick Stats Badge */}
          <AiPerformanceStatCard />

          {/* 7. Active AI Signals Section */}
          <ActiveSignalsSection
            signals={signalsList}
            selectedCategory={selectedCategory}
            onCategorySelected={setSelectedCategory}
            onCopySignal={handleCopySignal}
          />
        </main>
      )}

      {currentTab === 'scanner' && (
        <ScannerTabContent onLaunchScanner={() => setShowScannerDialog(true)} />
      )}

      {currentTab === 'signals' && (
        <SignalsTabContent
          signals={signalsList}
          selectedCategory={selectedCategory}
          isRefreshing={isRefreshing}
          onRefresh={handleRefreshData}
          onCategorySelected={setSelectedCategory}
          onCopySignal={handleCopySignal}
        />
      )}

      {currentTab === 'analytics' && <AnalyticsTabContent />}

      {currentTab === 'profile' && <ProfileTabContent />}

      {/* Modal Chart Scanner Dialog */}
      {showScannerDialog && (
        <ChartScannerDialog
          onDismiss={() => setShowScannerDialog(false)}
          onApplySignal={handleApplySignal}
        />
      )}

      {/* Modal Full Screen Broker WebView */}
      {isWebViewFullScreen && (
        <BrokerWebViewFullScreenDialog
          broker={activeBroker}
          onDismiss={() => setIsWebViewFullScreen(false)}
        />
      )}

      {/* Bottom Navigation Bar */}
      <BottomNavBar currentTab={currentTab} onTabSelected={setCurrentTab} />

      {/* Transient Toast Snackbar */}
      <ToastSnackbar
        message={snackbarMessage}
        onDismiss={() => setSnackbarMessage(null)}
      />
    </div>
  );
};

export default App;
