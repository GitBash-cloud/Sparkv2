import React from 'react';
import { Sparkles, Bell } from 'lucide-react';

interface TopAppBarProps {
  unreadNotifications: number;
  onProfileClick: () => void;
  onNotificationClick: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  unreadNotifications,
  onProfileClick,
  onNotificationClick,
}) => {
  return (
    <header className="w-full px-4 pt-3 pb-2 flex items-center justify-between">
      {/* Left: Profile Avatar with Status Indicator */}
      <button
        onClick={onProfileClick}
        data-testid="top_bar_profile_button"
        className="relative group cursor-pointer focus:outline-none"
        aria-label="Profile"
      >
        <div className="w-11 h-11 rounded-full border-1.5 border-[#283243] bg-[#1F2633] overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
          <img
            src="/trader_avatar_1789548821647.jpg"
            alt="User Profile Avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image not loaded
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        {/* Online / Active AI Sync indicator dot */}
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00E676] border-2 border-[#0B0E14]" />
      </button>

      {/* Center: Logo / Brand Name "TradeSpark" */}
      <div data-testid="app_brand_header" className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00875A] to-[#00B8D9] flex items-center justify-center shadow-lg shadow-emerald-950/40">
          <Sparkles className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <div className="flex items-center text-lg leading-tight font-bold tracking-wide">
            <span className="text-white">Trade</span>
            <span className="text-[#00E676] font-extrabold ml-1">Spark</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
            <span className="text-[10px] text-[#00E676] font-semibold tracking-wider">OTC • SMC Engine Active</span>
          </div>
        </div>
      </div>

      {/* Right: Notification Bell with Badge */}
      <button
        onClick={onNotificationClick}
        data-testid="notification_bell_button"
        className="relative w-11 h-11 rounded-xl bg-[#161C24] border border-[#283243] flex items-center justify-center hover:bg-[#1C2430] transition-colors cursor-pointer text-white"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadNotifications > 0 && (
          <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#DE350B] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
            {unreadNotifications}
          </span>
        )}
      </button>
    </header>
  );
};
