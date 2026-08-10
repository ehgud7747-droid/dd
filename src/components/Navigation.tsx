import React, { useState } from 'react';
import { NavView, UserProfile } from '../types';

interface NavigationProps {
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
  user: UserProfile;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  setCurrentView,
  user,
  searchQuery,
  setSearchQuery,
}) => {
  const [hasUnreadNotif, setHasUnreadNotif] = useState(true);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const navItems = [
    { id: 'dashboard', label: '대시보드', icon: 'dashboard' },
    { id: 'competency-diagnosis', label: '역량 진단', icon: 'clinical_notes' },
    { id: 'project-timeline', label: '프로젝트 타임라인', icon: 'view_timeline' },
    { id: 'ai-report', label: 'AI 리포트', icon: 'smart_toy' },
  ] as const;

  return (
    <>
      {/* Fixed Left Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#031632] z-50 flex flex-col border-r border-[#c5c6ce]/10">
        {/* Brand Header */}
        <div 
          onClick={() => setCurrentView('dashboard')}
          className="h-20 flex items-center px-6 mb-4 cursor-pointer group"
        >
          <span className="material-symbols-outlined text-[#0453cd] mr-2 text-3xl group-hover:rotate-12 transition-transform">
            precision_manufacturing
          </span>
          <span className="font-semibold text-xl text-white tracking-tight font-sans">
            Spec-Chain
          </span>
          <span className="ml-2 font-code text-[10px] bg-[#1a2b48] text-[#8293b5] px-1.5 py-0.5 rounded border border-[#374765]/40">
            v2.1
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as NavView)}
                className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-[#0453cd] text-white shadow-[2px_0_0_0_#ffb77d] font-medium'
                    : 'text-[#374765] hover:bg-[#1a2b48] hover:text-white'
                }`}
              >
                <span className={`material-symbols-outlined mr-3 ${isActive ? 'text-white' : 'text-[#8293b5]'}`}>
                  {item.icon}
                </span>
                <span className="font-body-md text-sm font-sans">{item.label}</span>
              </button>
            );
          })}

          <div className="my-6 border-t border-[#374765]/30 pt-6">
            <button
              onClick={() => setCurrentView('settings')}
              className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 text-left ${
                currentView === 'settings'
                  ? 'bg-[#0453cd] text-white shadow-[2px_0_0_0_#ffb77d]'
                  : 'text-[#374765] hover:bg-[#1a2b48] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-[#8293b5]">
                settings
              </span>
              <span className="font-body-md text-sm font-sans">설정</span>
            </button>
          </div>
        </nav>

        {/* System Footer Tag */}
        <div className="p-4 bg-[#1a2b48]/60 border-t border-[#374765]/20">
          <div className="flex items-center justify-between font-code text-xs text-[#8293b5]">
            <span>ENGINEER_ID:</span>
            <span className="text-white font-semibold">{user.id}</span>
          </div>
        </div>
      </aside>

      {/* Top Header Bar */}
      <header className="fixed top-0 left-72 right-0 h-20 bg-[#f8f9ff]/80 backdrop-blur-xl z-40 border-b border-[#c5c6ce]/30 flex items-center justify-between px-10">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative flex items-center group">
            <span className="material-symbols-outlined absolute left-3 text-[#75777e] group-focus-within:text-[#0453cd] transition-colors">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="기술 사양서 또는 프로젝트 ID 검색..."
              className="w-full bg-[#eff4ff] border border-[#c5c6ce] px-10 py-2.5 rounded-lg focus:outline-none focus:border-[#0453cd] focus:ring-1 focus:ring-[#0453cd] font-body-sm text-sm transition-all shadow-sm placeholder-[#75777e]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#75777e] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-6">
          {/* Notifications Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setHasUnreadNotif(false);
              }}
              className="relative p-2 text-[#44474d] hover:text-[#0453cd] transition-colors rounded-lg hover:bg-[#e5eeff]"
              title="알림"
            >
              <span className="material-symbols-outlined">notifications</span>
              {hasUnreadNotif && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-[#c5c6ce]/40 z-50 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#c5c6ce]/20 pb-2">
                  <span className="font-label-caps font-bold text-xs text-[#0b1c30]">알림 센터</span>
                  <span className="font-code text-[10px] text-[#0453cd]">3건 새로운 소식</span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto font-body-sm text-xs">
                  <div className="p-2 bg-[#eff4ff] rounded border-l-2 border-[#0453cd]">
                    <div className="font-semibold text-[#0b1c30]">AI 매칭 추천</div>
                    <div className="text-[#44474d] mt-0.5">현대자동차 생산기술 채용 요건과 92% 일치합니다.</div>
                  </div>
                  <div className="p-2 bg-[#f8f9ff] rounded border-l-2 border-[#FF8C00]">
                    <div className="font-semibold text-[#0b1c30]">소프트 스킬 진단 권장</div>
                    <div className="text-[#44474d] mt-0.5">현장 커뮤니케이션 진단 완료 시 매칭율 +14% 상승.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-[1px] bg-[#c5c6ce]"></div>

          {/* User Profile Badge */}
          <div 
            onClick={() => setCurrentView('settings')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="flex flex-col items-end">
              <span className="font-label-caps text-[#0b1c30] text-xs font-semibold">{user.operatorId}</span>
              <span className="text-[10px] text-[#75777e] uppercase font-sans font-medium">{user.role}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#031632] flex items-center justify-center border-2 border-[#dce9ff] group-hover:border-[#0453cd] transition-all">
              <span className="material-symbols-outlined text-white text-[20px]">person</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
