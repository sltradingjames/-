import React from 'react';
import { CompanyInfo } from '../types';
import { 
  Wrench, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Mail, 
  ExternalLink, 
  ShieldCheck,
  Award
} from 'lucide-react';

interface FooterProps {
  company: CompanyInfo;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ company, onNavigateSection, onOpenAdminLogin }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pb-20 sm:pb-8">
      {/* Upper Footer: Core Value & Quick Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white">{company.siteName}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              울산 및 경주 전 지역 출동! 못 찾는 누수는 0원 보증.
              숙련된 기술과 첨단 정밀 탐지장비로 미세누수부터 옥상방수, 배관세척까지 완벽하게 해결합니다.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>정밀 탐지 · 책임 시공 · 최장 3년 하자보수 보증</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              바로가기 서비스
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigateSection('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  · 5대 전문 공사분야 안내
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('projects')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  · 울산·경주 시공 전후 갤러리
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  · 일배책 보험 청구 & 자주묻는질문(FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Official Social Links & Channels */}
          <div>
            <div>
              <a
                href={company.naverBlogUrl || 'https://blog.naver.com/wjdgml2301'}
                target="_blank"
                rel="noopener noreferrer"
                className="group block space-y-3 bg-slate-900 hover:bg-slate-800/80 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all text-slate-300 hover:text-white"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-md bg-[#03C75A] text-white font-black text-[10px] flex items-center justify-center">N</span>
                    <span>네이버 공식 블로그</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div>
                  <div className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                    현장 시공일지 보기
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  울산 및 경주 누수탐지·공장보수·방수 실제 시공사례와 사진 확인
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 group-hover:text-emerald-300">blog.naver.com/wjdgml2301</span>
                  <span className="text-emerald-400 font-semibold group-hover:underline">바로가기 →</span>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Dispatch Box */}
          <div className="space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-slate-300">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>직통 상담 센터</span>
            </h4>
            <div>
              <div className="text-lg font-black text-white">{company.hotlinePhone}</div>
            </div>
            <p className="text-[11px] text-slate-400">
              울산 및 경주 전 지역 신속 출동 및 친절 상담
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">{company.businessHours}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Footer: Company Credentials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 text-slate-500 text-[11px] leading-relaxed">
          <p>
            <strong>상호:</strong> {company.siteName} &nbsp;|&nbsp; 
            <strong>대표자:</strong> {company.ownerName} &nbsp;|&nbsp; 
            <strong>사업자등록번호:</strong> {company.businessNumber}
          </p>
          <p>
            <strong>주소:</strong> {company.address} &nbsp;|&nbsp; 
            <strong>대표이메일:</strong> {company.email}
          </p>
          <p>
            <strong>출장가능지역:</strong> {company.serviceAreas}
          </p>
          <p className="text-slate-600 pt-1">
            © {new Date().getFullYear()} {company.siteName}. All Rights Reserved. 본 사이트의 모든 시공 컨텐츠는 저작권법의 보호를 받습니다.
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px] shrink-0">
          <button
            onClick={onOpenAdminLogin}
            className="text-slate-500 hover:text-slate-300 transition-colors underline cursor-pointer"
          >
            관리자 대시보드 로그인
          </button>
        </div>
      </div>
    </footer>
  );
};
