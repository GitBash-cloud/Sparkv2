import React from 'react';
import { LayoutDashboard, Camera, Zap, BarChart2, User } from 'lucide-react';
import { DashboardTab } from '../types/trading';

interface BottomNavBarProps {
  currentTab: DashboardTab;
  onTabSelected: (tab: DashboardTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onTabSelected }) => {
  const tabs: { id: DashboardTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scanner', label: 'AI Scanner', icon: Camera },
    { id: 'signals', label: 'Signals', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      data-testid="bottom_navigation_bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#161C24] border-t border-[#283243] rounded-t-2xl shadow-xl safe-bottom max-w-md mx-auto"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isSelected = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabSelected(tab.id)}
              data-testid={`nav_tab_${tab.id}`}
              className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group focus:outline-none"
            >
              <div
                className={`flex items-center justify-center px-3 py-1 rounded-xl transition-all ${
                  isSelected ? 'bg-[#00875A]/20' : 'bg-transparent'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isSelected ? 'text-[#00E676]' : 'text-[#959DAD] group-hover:text-white'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] mt-0.5 font-medium transition-colors ${
                  isSelected ? 'text-white font-bold' : 'text-[#959DAD]'
                }`}
              >
                {tab.label}
              </span>
              {isSelected && <span className="w-1 h-1 rounded-full bg-[#00E676] mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
