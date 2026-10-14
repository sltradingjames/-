import { AppState } from '../types';
import {
  initialCompanyInfo,
  initialInquiries,
  initialProjects,
  initialSeoSettings,
  initialThemeSettings,
} from '../data/initialData';

const STORAGE_KEY = 'ulsan_leak_app_state_v1';

export const loadAppState = (): AppState => {
  if (typeof window === 'undefined') {
    return {
      company: initialCompanyInfo,
      theme: initialThemeSettings,
      seo: initialSeoSettings,
      projects: initialProjects,
      inquiries: initialInquiries,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        company: initialCompanyInfo,
        theme: initialThemeSettings,
        seo: initialSeoSettings,
        projects: initialProjects,
        inquiries: initialInquiries,
      };
    }
    const parsed = JSON.parse(raw);
    const loadedCompany = { ...initialCompanyInfo, ...(parsed.company || {}) };
    loadedCompany.hotlinePhone = '010-4862-1915';
    loadedCompany.serviceAreas = '울산 및 경주 전 지역';
    if (!loadedCompany.siteName || loadedCompany.siteName === '울산누수종합방수설') {
      loadedCompany.siteName = '울산누수종합방수설비';
    }
    if (!loadedCompany.naverBlogUrl || !loadedCompany.naverBlogUrl.includes('wjdgml2301')) {
      loadedCompany.naverBlogUrl = 'https://blog.naver.com/wjdgml2301';
    }
    if (!loadedCompany.ownerName || loadedCompany.ownerName.includes('배관기능장') || loadedCompany.ownerName === '김성호') {
      loadedCompany.ownerName = '이상춘';
    }
    if (!loadedCompany.businessNumber || loadedCompany.businessNumber === '610-81-74892') {
      loadedCompany.businessNumber = '310-11-64135';
    }
    if (!loadedCompany.address || loadedCompany.address.includes('남구 문수로') || loadedCompany.address.includes('옥동')) {
      loadedCompany.address = '울산광역시 북구 호계7길 3-1';
    }
    if (!loadedCompany.email || loadedCompany.email === 'ulsan_leak_pro@naver.com') {
      loadedCompany.email = 'wjdgml2301@naver.com';
    }
    if (loadedCompany.businessHours?.includes('24시간')) {
      loadedCompany.businessHours = '연중무휴 상담 가능 (친절 유선상담)';
    }
    if (!loadedCompany.slogan || loadedCompany.slogan.includes('못 찾는 누수') || loadedCompany.slogan?.includes('24시간') || loadedCompany.slogan?.includes('30분')) {
      loadedCompany.slogan = '울산·경주 전 지역 신속 출동! 주택보수, 상가보수, 공장보수, 배관공사 전문시공';
    }
    if (loadedCompany.subSlogan?.includes('배관기능장')) {
      loadedCompany.subSlogan = '정밀 탐지 장비 보유 · 100% 원인 규명 보증 · 믿을 수 있는 책임 시공';
    }
    const loadedTheme = { ...initialThemeSettings, ...(parsed.theme || {}) };
    if (loadedTheme.heroBadgeText?.includes('배관기능장') || loadedTheme.heroBadgeText?.includes('23년 경력')) {
      loadedTheme.heroBadgeText = '울산·경주 누수 및 방수 설비 전문업체';
    }
    if (loadedTheme.bannerNotice?.includes('24시간')) {
      loadedTheme.bannerNotice = '⚡ [안내] 울산 및 경주 전 지역 누수탐지 및 종합방수 신속 출동 및 친절 상담 중입니다.';
    }
    const rawProjects = Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : initialProjects;
    const loadedProjects = rawProjects.map((p: any) => {
      if (p.id === 'proj-1' && (p.title?.includes('남구 옥동') || p.title?.includes('온수배관') || !p.title?.includes('싱글') || !p.beforeImages || p.beforeImage?.includes('roof-shingle') || p.details?.includes('고압 청소한 후') || p.date !== '2026년 9월' || !p.tags?.includes('상가 옥상방수'))) {
        return initialProjects.find((ip) => ip.id === 'proj-1') || p;
      }
      if (p.id === 'proj-2' && (p.title?.includes('우레탄') || p.title?.includes('성남동') || !p.title?.includes('급배수') || !p.beforeImages || p.date !== '' || p.beforeImage?.includes('unsplash') || !p.details?.includes('매립 수전') || p.warranty !== '1년 책임 하자보증')) {
        return initialProjects.find((ip) => ip.id === 'proj-2') || p;
      }
      if (p.id === 'proj-3' && (p.title?.includes('신축빌라') || p.title?.includes('매곡동') || !p.beforeImages || p.date !== '' || !p.details?.includes('욕조') || !p.details?.includes('돔천장') || !p.tags?.includes('화장실 방수') || !p.tags?.includes('욕실 방수'))) {
        return initialProjects.find((ip) => ip.id === 'proj-3') || p;
      }
      if (p.id === 'proj-4' && (p.title?.includes('폐수배관') || p.title?.includes('초고압세척') || p.title?.includes('온산공단') || !p.title?.includes('경주') || !p.beforeImages || p.date !== '' || p.beforeImage?.includes('unsplash') || !p.details?.includes('슬라이딩 쪽문') || p.warranty !== '1년 책임 하자보증')) {
        return initialProjects.find((ip) => ip.id === 'proj-4') || p;
      }
      if (p.id === 'proj-5' && (p.title?.includes('동구') || p.title?.includes('서부동') || p.title?.includes('현대아파트') || !p.title?.includes('야음동') || !p.beforeImages || p.date !== '' || p.beforeImage?.includes('unsplash') || !p.details?.includes('PB배관'))) {
        return initialProjects.find((ip) => ip.id === 'proj-5') || p;
      }
      if (p.id === 'proj-6' && (p.title?.includes('삼산동') || p.title?.includes('오수관로') || p.title?.includes('워터젯') || !p.title?.includes('판넬') || !p.beforeImages || p.date !== '' || p.beforeImage?.includes('unsplash') || !p.details?.includes('슬라이딩 도어') || p.warranty !== '1년 책임 하자보증')) {
        return initialProjects.find((ip) => ip.id === 'proj-6') || p;
      }
      return p;
    });

    const rawInquiries = Array.isArray(parsed.inquiries) && parsed.inquiries.length > 0 ? parsed.inquiries : initialInquiries;
    const loadedInquiries = rawInquiries.map((iq: any) => {
      if (iq.id === 'inq-104' && (iq.symptom?.includes('폐수배관') || iq.symptom?.includes('정화조'))) {
        return initialInquiries.find((ii) => ii.id === 'inq-104') || iq;
      }
      return iq;
    });

    return {
      company: loadedCompany,
      theme: loadedTheme,
      seo: { ...initialSeoSettings, ...(parsed.seo || {}) },
      projects: loadedProjects,
      inquiries: loadedInquiries,
    };
  } catch (err) {
    console.error('Failed to parse state from localStorage, falling back to defaults:', err);
    return {
      company: initialCompanyInfo,
      theme: initialThemeSettings,
      seo: initialSeoSettings,
      projects: initialProjects,
      inquiries: initialInquiries,
    };
  }
};

export const saveAppState = (state: AppState): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
};

export const resetAppStateToDefault = (): AppState => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return {
    company: initialCompanyInfo,
    theme: initialThemeSettings,
    seo: initialSeoSettings,
    projects: initialProjects,
    inquiries: initialInquiries,
  };
};
