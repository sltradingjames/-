import React, { useState } from 'react';
import { CompanyInfo, ThemeSettings } from '../types';
import { getThemeStyles } from '../utils/theme';
import { 
  PhoneCall, 
  Wrench, 
  ShieldCheck, 
  Lock, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  company: CompanyInfo;
  theme: ThemeSettings;
  isAdminLoggedIn: boolean;
  isAdminView: boolean;
  onOpenAdminLogin: () => void;
  onToggleAdminView: () => void;
  onLogoutAdmin: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  company,
  theme,
  isAdminLoggedIn,
  isAdminView,
  onOpenAdminLogin,
  onToggleAdminView,
  onLogoutAdmin,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const themeStyles = getThemeStyles(theme.colorTheme);

  const navItems = [
    { label: '공사분야', id: 'services' },
    { label: '시공히스토리', id: 'projects' },
    { label: '자주묻는질문', id: 'faq' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (isAdminView) {
      onToggleAdminView();
      setTimeout(() => {
        onNavigateSection(id);
      }, 100);
    } else {
      onNavigateSection(id);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors shadow-xs">
      {/* Top Banner Notice */}
      {theme.showBannerNotice && theme.bannerNotice && (
        <div className="bg-slate-900 text-white text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="truncate">{theme.bannerNotice}</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 shrink-0 text-slate-300">
              <span className="hover:text-white transition-colors">울산 및 경주 전 지역 출동</span>
              <span className="text-slate-600">|</span>
              <a href={`tel:${company.hotlinePhone}`} className="text-amber-400 font-semibold hover:underline">
                직통전화 {company.hotlinePhone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`w-11 h-11 rounded-xl ${themeStyles.primaryBg} text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105`}>
              <Wrench className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  {company.siteName}
                </span>
                <span className="hidden md:inline-flex items-center text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  전문 시공팀 직영
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                누수탐지 · 종합방수 · 공장지붕/행거도어 보수 · 배관설비 전문
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Area: Hotline & Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${company.hotlinePhone}`}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <div className="text-left hidden sm:block leading-tight">
                <span className="text-[10px] block opacity-85">친절 유선상담</span>
                <span className="font-extrabold">{company.hotlinePhone}</span>
              </div>
              <span className="sm:hidden font-bold">전화상담</span>
            </a>

            {/* Admin Switcher */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onToggleAdminView}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                    isAdminView
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {isAdminView ? '웹사이트 보기' : '관리자 대시보드'}
                </button>
                <button
                  onClick={onLogoutAdmin}
                  title="관리자 로그아웃"
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 text-xs"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                title="관리자 로그인 (기본 비밀번호: admin1914)"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden md:inline">관리자</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex items-center justify-between w-full text-left px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            <div className="pt-4 border-t border-slate-100 mt-2 space-y-3">
              <a
                href={`tel:${company.officePhone}`}
                className="flex items-center justify-between w-full p-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700"
              >
                <span>일반 사무실 유선전화</span>
                <span className="font-bold text-slate-900">{company.officePhone}</span>
              </a>

              <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-500">
                <span>{company.serviceAreas}</span>
                <span>{company.businessHours}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
