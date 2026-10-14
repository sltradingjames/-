export type ServiceCategory = 
  | 'leak_detection' // 미세누수 정밀탐지
  | 'waterproofing'  // 지붕, 옥상 및 외벽 종합방수
  | 'pipe_cleaning'  // 공장 지붕 및 행거도어 보수 공사 및 방수공사
  | 'bathroom'       // 욕실 리모델링 & 타일방수
  | 'pipe_repair';   // 신규배관공사 및 보수·교체

export type InquiryStatus = '대기' | '상담완료' | '방문진단예정' | '시공완료' | '취소';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  district: string; // 울산 남구, 중구, 북구, 동구, 울주군
  buildingType: string; // 아파트, 빌라/다세대, 상가빌딩, 단독주택, 공장/산업체
  serviceCategory: ServiceCategory;
  symptom: string;
  preferredDate?: string;
  photos?: string[];
  status: InquiryStatus;
  createdAt: string;
  adminNote?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: ServiceCategory;
  location: string; // e.g. 울산 남구 옥동 OO아파트
  date: string;
  period: string; // e.g. 1일 완료 (당일 긴급보수)
  warranty: string; // e.g. 2년 무상 보증
  beforeImage: string;
  afterImage: string;
  beforeImages?: string[];
  afterImages?: string[];
  equipmentUsed: string[];
  summary: string;
  details: string;
  tags: string[];
  isPublished: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  model: string;
  origin: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  category: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CompanyInfo {
  siteName: string;
  slogan: string;
  subSlogan: string;
  hotlinePhone: string;     // 010-4862-1915
  officePhone: string;      // 052-258-0482
  ownerName: string;
  businessNumber: string;
  address: string;
  serviceAreas: string;     // 울산 전지역 (남구/중구/북구/동구/울주군)
  businessHours: string;    // 365일 24시간 긴급출동 연중무휴
  email: string;
  naverBlogUrl: string;
  kakaoTalkUrl: string;
  youtubeUrl: string;
}

export type BrandColorTheme = 'ocean_blue' | 'safety_orange' | 'tech_navy' | 'emerald_teal';

export interface ThemeSettings {
  colorTheme: BrandColorTheme;
  darkMode: boolean;
  bannerNotice: string;
  showBannerNotice: boolean;
  heroBadgeText: string;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
  keywords: string;
}

export interface AppState {
  company: CompanyInfo;
  theme: ThemeSettings;
  seo: SeoSettings;
  projects: ProjectItem[];
  inquiries: Inquiry[];
}
