import React from 'react';
import { CompanyInfo, ThemeSettings } from '../types';
import { getThemeStyles } from '../utils/theme';
import { 
  PhoneCall, 
  FileText, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Award,
  Zap,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface HeroProps {
  company: CompanyInfo;
  theme: ThemeSettings;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ company, theme, onNavigateSection }) => {
  const themeStyles = getThemeStyles(theme.colorTheme);

  return (
    <section id="hero" className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Graphic & Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Guarantees & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Quiet Meta Tag */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-300">
              <span className="flex items-center gap-1.5 bg-blue-900/60 border border-blue-700/60 px-3 py-1 rounded-full text-blue-200">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                {theme.heroBadgeText ? theme.heroBadgeText.replace('23년 경력', '전문업체') : '울산·경주 누수 및 방수 설비 전문업체'}
              </span>
              <span className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                울산 및 경주 전 지역 출동
              </span>
            </div>

            {/* Main Slogan */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight leading-[1.2] text-white">
              {company.slogan.split('!')[0]}!
              <span className="block mt-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                {(() => {
                  const subPart = company.slogan.split('!')[1]?.trim() || '주택보수, 상가보수, 공장보수, 배관공사 전문시공';
                  if (subPart.includes('주택보수')) {
                    return (
                      <>
                        <span className="block leading-tight">주택보수, 상가보수, 공장보수,</span>
                        <span className="block mt-1 sm:mt-2 leading-tight">배관공사 전문시공</span>
                      </>
                    );
                  }
                  const parts = subPart.split(',').map((p) => p.trim()).filter(Boolean);
                  if (parts.length >= 2) {
                    return (
                      <>
                        <span className="block leading-tight">{parts[0]},</span>
                        <span className="block mt-1 sm:mt-2 leading-tight">{parts.slice(1).join(', ')}</span>
                      </>
                    );
                  }
                  return <span className="block leading-tight">{subPart}</span>;
                })()}
              </span>
            </h1>

            {/* Sub Slogan */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {company.subSlogan}
            </p>

            {/* 3 Core Trust Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">원인 미규명 0원</h4>
                  <p className="text-xs text-slate-400 mt-0.5">누수 못 찾으면 비용 청구 일절 없음</p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">최대 3년 하자보수</h4>
                  <p className="text-xs text-slate-400 mt-0.5">기본 1년 최대 3년 책임 보증</p>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">보험 서류 완벽대행</h4>
                  <p className="text-xs text-slate-400 mt-0.5">일상생활배상책임 견적·소견서 무료</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-4">
              <a
                href={`tel:${company.hotlinePhone}`}
                className="flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <PhoneCall className="w-5 h-5 stroke-[2.5]" />
                <span>전화 상담 바로연결 ({company.hotlinePhone})</span>
              </a>

              <a
                href={company.naverBlogUrl || 'https://blog.naver.com/wjdgml2301'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#03C75A] hover:bg-[#02b150] text-white font-extrabold rounded-xl text-base shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/50 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span className="w-5 h-5 rounded bg-white text-[#03C75A] font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                  N
                </span>
                <span>블로그 시공일지 바로가기</span>
                <ExternalLink className="w-4 h-4 text-emerald-100" />
              </a>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Direct Callout Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-7 space-y-6">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    신속 출동 및 유선 상담 안내
                  </span>
                </div>
                <span className="text-xs text-slate-400">울산·경주 직통</span>
              </div>

              {/* Direct Problem Fast Check */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  지금 어떤 누수·방수 문제이신가요?
                </h3>
                <p className="text-xs text-slate-400">
                  문제를 누르시면 해당 공사 분야 설명으로 바로 이동합니다.
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => onNavigateSection('services')}
                    className="p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-left border border-slate-700/60 transition-colors group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400">
                      💧 천장·바닥 미세누수
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">아랫집 물샘 · 수도계량기 회전</div>
                  </button>

                  <button
                    onClick={() => onNavigateSection('services')}
                    className="p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-left border border-slate-700/60 transition-colors group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400">
                      🏢 옥상·외벽 빗물누수
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">노후 우레탄 · 크랙 인젝션</div>
                  </button>

                  <button
                    onClick={() => onNavigateSection('services')}
                    className="p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-left border border-slate-700/60 transition-colors group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400">
                      🚿 욕실·화장실 바닥누수
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">유가 배수구 · 타일 방수탈락</div>
                  </button>

                  <button
                    onClick={() => onNavigateSection('services')}
                    className="p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-left border border-slate-700/60 transition-colors group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400">
                      🌪️ 하수구·오수관로 막힘
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">250bar 초고압 세척 · 내시경</div>
                  </button>
                </div>
              </div>

              {/* Bottom Quick Call */}
              <a
                href={`tel:${company.hotlinePhone}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>전화 상담 및 방문 예약: {company.hotlinePhone}</span>
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
