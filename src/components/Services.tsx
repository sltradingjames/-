import React, { useState } from 'react';
import { ServiceCategory } from '../types';
import { 
  Search, 
  ShieldCheck, 
  Activity, 
  Bath, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  FileCheck2,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  Factory,
  Wrench
} from 'lucide-react';

interface ServicesProps {
  hotlinePhone: string;
  onSelectCategoryFilter: (category: ServiceCategory) => void;
}

interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tags: string[];
  description: string;
  points: string[];
  process: string[];
  equipment: string;
  recommendedFor: string;
}

export const Services: React.FC<ServicesProps> = ({
  hotlinePhone,
  onSelectCategoryFilter,
}) => {
  const [expandedId, setExpandedId] = useState<ServiceCategory | null>('leak_detection');

  const servicesData: ServiceDetail[] = [
    {
      id: 'leak_detection',
      title: '미세누수 정밀탐지',
      subtitle: '못 찾는 누수는 0원! 청음식·가스식 최첨단 비파괴 탐지',
      icon: <Search className="w-6 h-6 text-blue-600" />,
      tags: ['아파트 누수', '온수·난방배관', '가스식 탐지', '청음식 탐지'],
      description: '배관을 무작정 깨지 않습니다. 5% 수소 혼합가스 탐지와 고성능 정밀 청음기를 동원하여 미세한 누수 포인트를 핀포인트로 적출합니다.',
      points: [
        '누수 원인 미규명 시 탐지비용 0원 원칙',
        '온수·직수·난방배관 정밀 디지털 공압 검사',
        '타일/바닥재 손상 최소화(20cm 국소 굴착)',
        '일상생활배상책임보험 청구서류 100% 무료 대행',
      ],
      process: [
        '1. 현장 청음 및 계량기 간이 테스트',
        '2. 배관 라인별 공압·수압 테스트',
        '3. 수소 혼합가스 주입 및 경로 추적',
        '4. 청음식 탐지기로 최종 핀포인트 확정',
        '5. 최소 절개 보수 및 2차 수압 재검사',
      ],
      equipment: '정밀 청음식 탐지기, 수소 혼합가스 탐지기, 디지털 수압 테스터',
      recommendedFor: '아랫집 천장 젖음, 벽지 곰팡이, 보일러 물보충 에러, 계량기 계속 회전',
    },
    {
      id: 'waterproofing',
      title: '지붕, 옥상 및 외벽 종합방수',
      subtitle: '노후 방수 전면 연삭 철거 & 3중 복합 탄성 우레탄 시공',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      tags: ['지붕·옥상 방수', '외벽 발수코팅', '인젝션 그라우팅', '3년 책임보증'],
      description: '비만 오면 새는 건물 옥상과 외벽, 들뜬 낡은 페인트를 연삭기로 완전히 갈아내고 크랙 V커팅 실링 후 하도-중도(2mm)-상도로 이어지는 원칙 시공을 약속합니다.',
      points: [
        '바닥 전면 연삭(면처리)으로 바탕 접착력 극대화',
        '고탄성 우레탄 실란트 균열부 V-커팅 보강',
        '자외선 및 기후 변화에 강한 친환경 상도 코팅',
        '공사 후 3년 정식 무상 하자이행보증서 발행',
      ],
      process: [
        '1. 기존 들뜬 방수층 기계 연삭 및 청소',
        '2. 크랙부 V-커팅 및 탄성 우레탄 실링',
        '3. 고침투 프라이머 하도 도포 (바탕안정화)',
        '4. 2액형 탄성 우레탄 중도 2mm 균일 도포',
        '5. UV차단 탑코트 상도 마감 & 하자보증서 발급',
      ],
      equipment: '바닥 연삭기, 고압 에어리스 스프레이, 우레탄 고속 교반기',
      recommendedFor: '상가빌딩 옥상, 빌라 옥상 누수, 비올 때 천장 낙수, 외벽 창틀 빗물유입',
    },
    {
      id: 'pipe_cleaning',
      title: '공장 지붕 및 행거도어 보수 공사 및 방수공사',
      subtitle: '노후 샌드위치 판넬 지붕 방수 · 대형 행거도어 롤러/레일 보수 교체',
      icon: <Factory className="w-6 h-6 text-amber-600" />,
      tags: ['공장 지붕방수', '행거도어 보수', '샌드위치판넬', '공단 긴급출동'],
      description: '울산·온산·매곡 공단 등 산업체 맞춤 시공! 노후 샌드위치 판넬 지붕의 볼트 부식 및 이음새 빗물 누수 원천 차단부터, 롤러 마모 및 탈선으로 개폐가 불가능한 대형 공장 행거도어 수리까지 공장 가동 중단 없이 신속하게 원스톱 책임 시공합니다.',
      points: [
        '지붕 볼트캡 방수재 전면 시공 & 용마루·판넬 조인트 3중 방수 실링',
        '부식된 공장 빗물받이(물홈통/선홈통) 보수 및 대용량 드레인 교체',
        '공장 대형 행거도어 상·하부 고하중 베어링 롤러 및 레일 정밀 교정',
        '고소작업차(스카이) 직영 투입 및 산업현장 안전관리 기준 준수',
      ],
      process: [
        '1. 고소작업차 투입 판넬 부식도 및 행거도어 구동부 정밀 진단',
        '2. 지붕 노후 고정볼트 방수캡 전면 교체 및 녹 제거·방청 프라이머 도포',
        '3. 판넬 조인트·용마루 특수 복합 방수 시트 및 고탄성 우레탄 실링',
        '4. 행거도어 가이드 레일 수평 정밀 교정 및 산업용 고하중 롤러 교체',
        '5. 슬라이딩 개폐 원활도 점검 및 인공 살수 누수 테스트 후 준공',
      ],
      equipment: '고소작업차(스카이), 특수 판넬 방수 실란트, 산업용 레이저 수평계',
      recommendedFor: '공장 지붕 빗물 누수, 물홈통 넘침, 공장 출입구 행거도어 탈선 및 개폐 불량, 노후 창고 판넬 보수',
    },
    {
      id: 'bathroom',
      title: '욕실/화장실 철거 및 방수 리모델링',
      subtitle: '유가 배수구 결함 해결 · 3중 고탄성 도막방수 & 논슬립 타일',
      icon: <Bath className="w-6 h-6 text-cyan-600" />,
      tags: ['욕실 누수', '유가 배수구', '3중 도막방수', '타일 리모델링'],
      description: '화장실 바닥 유가와 타일 틈새로 스며드는 누수는 덧방 공사로는 잡히지 않습니다. 바닥 슬래브까지 전면 철거 후 고탄성 도막방수와 정밀 마감 공정을 거쳐 안전하게 마감합니다.',
      points: [
        '바닥 슬래브 노출 철거 및 배수 배관 레벨 재설정',
        '1차 액체방수 + 2차/3차 아덱스(ARDEX) 고탄성 도막방수',
        '정밀 도막방수 시공으로 누수 원인 완벽 차단 후 타일 마감',
        '안전 논슬립 타일 및 위생 도기 깔끔한 세팅',
      ],
      process: [
        '1. 기존 타일 및 방수층 바닥 콘크리트까지 철거',
        '2. 하수 배관 유가 주변 취약부 보강 작업',
        '3. 1차 시멘트 액체방수 & 균열 보강 테이프',
        '4. 2·3차 고탄성 도막방수(ARDEX) 2회 도포',
        '5. 타일 및 위생 도기 깔끔한 세팅 마감',
      ],
      equipment: '집진 습식 타일 절단기, 아덱스 고탄성 방수재, 수평 레벨기',
      recommendedFor: '샤워 후 아래층 화장실 천장 낙수, 욕실 입구 마루 변색 및 곰팡이',
    },
    {
      id: 'pipe_repair',
      title: '신규 배관공사 및 배관 보수·교체',
      subtitle: '급수·오배수 신규 배관 신설 · 노후관 교체 · 수압 개선 및 가압펌프',
      icon: <Wrench className="w-6 h-6 text-blue-600" />,
      tags: ['신규배관 신설', '노후관 교체공사', '공장·상가 배관보수', '가압펌프 시공'],
      description: '주택, 상가, 공장의 노후 급수 및 오배수 배관을 내구성 높은 정품 PB(에이콘)·스텐 배관으로 신규 신설 및 교체 시공합니다. 잦은 누수와 녹물을 원천 차단하고 관로 신설 및 맞춤형 보수 공사를 책임 시공합니다.',
      points: [
        '주택·상가·공장 신규 배관 설계 및 관로 신설 시공',
        '녹물 및 잦은 누수 유발 노후 배관 전면 보수·교체 (KC 인증 정품 PB/스텐 자재)',
        '난방 분배기 교체 및 고층 저수압 세대 저소음 인버터 가압펌프 시공',
        '배관 신설 및 보수 후 정밀 디지털 수압 테스트로 무결성 검증',
      ],
      process: [
        '1. 현장 배관 관로 진단 및 최적의 동선 설계',
        '2. 노후 파손 배관 안전 철거 및 배수 처리',
        '3. KC인증 PB/스테인리스 신규 배관 신설 및 피팅 체결',
        '4. 고압 수압 테스트를 통한 누설 무결성 정밀 검증',
        '5. 고단열 보온재 마감 및 깔끔한 미장·마감 복구',
      ],
      equipment: '전동 배관 압착기, 디지털 수압 테스터, 관로 내시경, 배관 융착기',
      recommendedFor: '신축/리모델링 배관 신설, 노후 배관 녹물 및 잦은 누수, 배관 노선 변경, 수압 개선 필요 현장',
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>CORE SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            울산누수종합방수설비 <span className="text-blue-600">5대 전문 공사분야</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            하청 없는 전문 엔지니어링 책임 시공. 
            정밀 계측 장비와 오랜 현장 노하우로 재발 없는 확실한 결과를 보장합니다.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((svc) => {
            const isExpanded = expandedId === svc.id;

            return (
              <div
                key={svc.id}
                className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md ${
                  isExpanded
                    ? 'border-blue-500 ring-2 ring-blue-500/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      {svc.icon}
                    </div>
                    {/* Quiet Metadata tags */}
                    <div className="flex flex-wrap gap-1 text-[11px] font-medium text-slate-500 justify-end">
                      {svc.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-1">
                    {svc.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mb-3">
                    {svc.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {svc.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 mb-4">
                    {svc.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Technical Process */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-blue-100 bg-blue-50/50 -mx-6 px-6 pb-2 text-left rounded-b-xl animate-in fade-in-50 duration-200">
                      <div className="mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block mb-1.5">
                          표준 정밀 시공 프로세스
                        </span>
                        <div className="space-y-1.5">
                          {svc.process.map((step, idx) => (
                            <div key={idx} className="text-xs text-slate-700 font-medium">
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-blue-200/60 text-xs">
                        <span className="font-bold text-slate-800">투입 첨단장비: </span>
                        <span className="text-slate-600">{svc.equipment}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex items-center justify-between gap-2">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? '공정 접기' : '시공공정 상세'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCategoryFilter(svc.id)}
                      className="text-xs font-bold text-blue-700 hover:text-blue-800 py-1.5 px-2.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      시공사례 보기
                    </button>
                    <a
                      href={`tel:${hotlinePhone}`}
                      className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>전화상담</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                아파트·빌라 누수 피해, 일상생활배상책임보험(일배책) 서류 100% 무료 지원
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                누수 소견서, 공사 전·후 비교 사진, 자재 및 인건비 상세 견적서 등 보험사 청구에 필요한 서류를 신속하게 원스톱 발급해 드립니다.
              </p>
            </div>
          </div>
          <a
            href={`tel:${hotlinePhone}`}
            className="shrink-0 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>보험 상담 전화문의</span>
          </a>
        </div>

      </div>
    </section>
  );
};
