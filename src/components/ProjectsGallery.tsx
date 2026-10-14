import React, { useState } from 'react';
import { ProjectItem, ServiceCategory } from '../types';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  X, 
  SlidersHorizontal, 
  ArrowLeftRight, 
  Wrench, 
  FileText,
  ChevronRight,
  PhoneCall
} from 'lucide-react';

interface ProjectsGalleryProps {
  projects: ProjectItem[];
  hotlinePhone: string;
  activeCategoryFilter: ServiceCategory | 'all';
  onFilterChange: (cat: ServiceCategory | 'all') => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  projects,
  hotlinePhone,
  activeCategoryFilter,
  onFilterChange,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const [selectedBeforeIdx, setSelectedBeforeIdx] = useState<number>(0);
  const [selectedAfterIdx, setSelectedAfterIdx] = useState<number>(0);
  const [comparisonMode, setComparisonMode] = useState<'side_by_side' | 'slider'>('side_by_side');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const openModal = (item: ProjectItem) => {
    setModalProject(item);
    setSelectedBeforeIdx(0);
    setSelectedAfterIdx(0);
    setSliderPosition(50);
  };

  // Available tags
  const tagsList = [
    { id: 'all', label: '전체 보기' },
    { id: '난방 누수', label: '난방 누수' },
    { id: '아파트 누수', label: '아파트 누수' },
    { id: '상가 옥상방수', label: '상가 방수' },
    { id: '화장실 방수', label: '욕실 방수' },
    { id: '공장', label: '공장 도어/보수' },
  ];

  // Filtering
  const filteredProjects = projects.filter((p) => {
    if (!p.isPublished) return false;
    if (activeCategoryFilter !== 'all' && p.category !== activeCategoryFilter) return false;
    if (selectedTag !== 'all') {
      const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase();
      const normSelected = normalize(selectedTag);
      
      const matchTag = p.tags.some((t) => {
        const normT = normalize(t);
        return normT.includes(normSelected) || normSelected.includes(normT);
      });

      // Explicit category / topic matching for seamless navigation
      const matchSpecial =
        ((normSelected.includes('화장실') || normSelected.includes('욕실')) &&
          (p.category === 'bathroom' || p.id === 'proj-3' || normalize(p.title).includes('화장실') || normalize(p.title).includes('욕실'))) ||
        (normSelected.includes('난방') && (p.id === 'proj-5' || normalize(p.title).includes('난방'))) ||
        (normSelected.includes('아파트') && (normalize(p.title).includes('아파트') || normalize(p.location).includes('아파트'))) ||
        (normSelected.includes('상가') && (p.id === 'proj-1' || p.id === 'proj-2' || normalize(p.title).includes('상가'))) ||
        (normSelected.includes('공장') && (p.category === 'pipe_cleaning' || p.id === 'proj-4' || p.id === 'proj-6' || normalize(p.title).includes('공장')));

      if (!matchTag && !matchSpecial) return false;
    }
    return true;
  });

  return (
    <section id="projects" className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-100/80 border border-blue-200 px-3 py-1 rounded-full mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PROJECT PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              울산·경주 지역 <span className="text-blue-600">실제 시공 사례 & 히스토리</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              울산과 경주 지역 아파트, 상가, 빌라, 공장 현장에서 발생한 실제 누수·방수 문제 해결 기록입니다.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium shrink-0">
            총 <span className="font-bold text-slate-900">{filteredProjects.length}</span>개의 대표 시공 사례
          </div>
        </div>

        {/* Filter Controls Bar (Interactive buttons/segmented controls) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-400 px-3 py-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>태그 필터:</span>
          </div>
          {tagsList.map((tag) => {
            const isActive = selectedTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => {
                  setSelectedTag(tag.id);
                  if (activeCategoryFilter !== 'all') {
                    onFilterChange('all');
                  }
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tag.label}
              </button>
            );
          })}

          {activeCategoryFilter !== 'all' && (
            <button
              onClick={() => onFilterChange('all')}
              className="ml-auto text-xs font-semibold text-blue-600 hover:text-blue-800 underline px-2 cursor-pointer"
            >
              카테고리 필터 초기화
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 font-medium">선택하신 조건의 시공 사례가 없습니다.</p>
            <button
              onClick={() => {
                setSelectedTag('all');
                onFilterChange('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              전체 사례 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Before / After Preview Image Box */}
                <div 
                  onClick={() => openModal(item)}
                  className="relative h-52 bg-slate-900 cursor-pointer overflow-hidden"
                >
                  <div className="grid grid-cols-2 h-full">
                    {/* Before Half */}
                    <div className="relative h-full overflow-hidden border-r border-white/20">
                      <img
                        src={item.beforeImage}
                        alt="시공 전"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                        BEFORE
                      </span>
                    </div>

                    {/* After Half */}
                    <div className="relative h-full overflow-hidden">
                      <img
                        src={item.afterImage}
                        alt="시공 후"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 bg-emerald-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                        AFTER
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>

                  {item.beforeImages && item.beforeImages.length > 1 && (
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-slate-950/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white/20">
                      <span>전 3장 · 후 3장</span>
                    </div>
                  )}

                  <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <ArrowLeftRight className="w-3 h-3 text-amber-400" />
                    <span>비교 모달 보기</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet Text Metadata - Zero-pill discipline */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
                      <span className="flex items-center gap-1 text-blue-700 font-bold">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location.split(' ')[0]} {item.location.split(' ')[1]}
                      </span>
                      {item.date ? (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.date}
                          </span>
                        </>
                      ) : null}
                    </div>

                    <h3 
                      onClick={() => openModal(item)}
                      className="text-base font-black text-slate-900 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors leading-snug mb-2"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {item.summary}
                    </p>
                  </div>

                  {/* Card Bottom Specs */}
                  <div>
                    <div className="py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold">{item.warranty}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {item.period}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => openModal(item)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>자세히 보기</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Before / After Detail Modal */}
      {modalProject && (() => {
        const beforeList = modalProject.beforeImages && modalProject.beforeImages.length > 0
          ? modalProject.beforeImages
          : [modalProject.beforeImage];
        const afterList = modalProject.afterImages && modalProject.afterImages.length > 0
          ? modalProject.afterImages
          : [modalProject.afterImage];
        const currentBefore = beforeList[selectedBeforeIdx] || beforeList[0];
        const currentAfter = afterList[selectedAfterIdx] || afterList[0];

        const getBeforeCaption = (idx: number) => {
          if (modalProject.id === 'proj-1') {
            const list = [
              '전 1. 지붕 아스팔트 싱글 노후·풍화 및 파손 부위',
              '전 2. 싱글 들뜸 및 누수 발생 균열 틈새 상세',
              '전 3. 누수로 인한 실내 천장 도배지 오염 및 곰팡이 피해',
            ];
            return list[idx] || `시공 전 현장 사진 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-2') {
            const list = [
              '전 1. 신축 상가 오픈 전 바닥 상태 확인 및 급·배수 배관 라인 마킹 현장',
              '전 2. 배관 매립을 위해 콘크리트 바닥 정밀 커팅 및 철근·바닥면 파쇄 굴착',
              '전 3. 샤워실 공간 조적벽 구획 및 바닥 미장 후 1차~2차 액체방수 도포',
            ];
            return list[idx] || `시공 전 현장 사진 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-3') {
            const list = [
              '전 1. 아랫집 천장 누수 피해 발생 현장 및 욕실 상태 점검',
              '전 2. 보양 작업 선행 후 노후 욕조 철거 및 타일 정밀 커팅',
              '전 3. 문제 타일 철거 후 바닥 슬래브 노출 및 방수 전 이물질 청소',
            ];
            return list[idx] || `시공 전 현장 사진 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-4') {
            const list = [
              '전 1. 오랜 세월 용접 고정되어 부식 및 작동 고장난 노후 철문 철거',
              '전 2. 공장 출입구 규격에 맞춘 샌드위치 판넬 정밀 계산 및 재단',
              '전 3. 고강도 알루미늄 프레임 가공 조립 및 단열 고무가스켓 결합',
            ];
            return list[idx] || `시공 전 현장 사진 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-5') {
            const list = [
              '전 1. 아랫집 및 옆집 안방·거실 천장 벽지 심각한 누수 피해 상황',
              '전 2. 보일러실 및 난방 분배기 전 구간 동배관 라인 확인 점검',
              '전 3. 안방 침대 하부 청음식 탐지기로 누수음 포착 및 굴착 개시',
            ];
            return list[idx] || `시공 전 현장 사진 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-6') {
            const list = [
              '전 1. 공장 3층 맞춤 사무실 신규 제작 전 텅 빈 현장 공간 및 설치 위치 실측',
              '전 2. 샌드위치 판넬 및 각관 자재 3층 양중 운반 및 규격 정밀 체크',
              '전 3. 기준틀 각관 프레임 수평·수직 레이저 측정 및 기초 뼈대 골조 조립',
            ];
            return list[idx] || `시공 전 현장 사진 #${idx + 1}`;
          }
          return `누수 발생 및 손상 부위 #${idx + 1}`;
        };

        const getAfterCaption = (idx: number) => {
          if (modalProject.id === 'proj-1') {
            const list = [
              '후 1. 3단계 싱글방수 및 외부도장 작업 완료',
              '후 2. 고소작업차 활용 외벽·지붕 완공 전경',
              '후 3. 방수 완공 후 건물 전체 신축급 화사한 전경',
            ];
            return list[idx] || `시공 후 완벽 보수 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-2') {
            const list = [
              '후 1. 가벽 내부 보강을 거쳐 오차 없이 설치 완료된 고급 매립형 세면대 수전',
              '후 2. 3차 방수 양생 및 타일·유가·매립 샤워수전까지 완벽 마감된 샤워실',
              '후 3. 샤워시설용 대용량 전기온수기 안착 및 감압변·안전밸브 정밀 세팅 완공',
            ];
            return list[idx] || `시공 후 완벽 보수 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-3') {
            const list = [
              '후 1. 1차·2차·3차 3중 방수 시공 완료 후 바닥 타일 재시공 마감',
              '후 2. 욕실 바닥 타일 정밀 시공 및 기존 도기 깔끔 재설치',
              '후 3. 아랫집 누수 완벽 차단 확인 후 모던 평형 돔천장 교체 시공 완료',
            ];
            return list[idx] || `시공 후 완벽 보수 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-4') {
            const list = [
              '후 1. 스카이 고소작업차 투입 대형 양개 행거도어 및 상부 롤러 안착',
              '후 2. 구조물 배관 간섭을 해결한 상부 주행 레일 3M 추가 연장 및 수평 레벨링',
              '후 3. 맞춤형 슬라이딩 쪽문(소도어) 매립 결합 및 우천 빗물 유입 완벽 차단 마감',
            ];
            return list[idx] || `시공 후 완벽 보수 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-5') {
            const list = [
              '후 1. 찍힘 파손된 메인 난방 동배관 누수 지점 노출 및 정밀 절단',
              '후 2. PB·서스 혼합 배관 결합 수선 및 비눗물 거품 기밀 검사',
              '후 3. 몰탈 미장 타설 및 바닥 완벽 원상복구 마감 완료',
            ];
            return list[idx] || `시공 후 완벽 보수 #${idx + 1}`;
          }
          if (modalProject.id === 'proj-6') {
            const list = [
              '후 1. 벽체 판넬 결합, 채광 창문 타공 설치 및 맞춤 슬라이딩 도어 장착',
              '후 2. 사무실 내부 전기 배선 인입, 콘센트·스위치 설치 및 조명 점등 확인',
              '후 3. 내외부 코너바 빈틈없는 이중 마감 및 공장 3층 맞춤 판넬 사무실 완공 전경',
            ];
            return list[idx] || `시공 후 완벽 보수 #${idx + 1}`;
          }
          return `배관 교체 및 완전 복구 완료 #${idx + 1}`;
        };

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                    <span className="text-blue-700 font-bold">{modalProject.location}</span>
                    {modalProject.date ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{modalProject.date}</span>
                      </>
                    ) : null}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {modalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setModalProject(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                
                {/* View Mode Switcher */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      현장 전·후 비교 검증
                    </span>
                    {(beforeList.length > 1 || afterList.length > 1) && (
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        전 {beforeList.length}장 · 후 {afterList.length}장
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      onClick={() => setComparisonMode('side_by_side')}
                      className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        comparisonMode === 'side_by_side'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      나란히 비교
                    </button>
                    <button
                      onClick={() => setComparisonMode('slider')}
                      className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        comparisonMode === 'slider'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      슬라이더 비교
                    </button>
                  </div>
                </div>

                {/* Image Comparison Box */}
                {comparisonMode === 'side_by_side' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Left Column: 시공 전 (BEFORE) */}
                    <div className="space-y-2.5">
                      <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-4/3 border border-slate-200 shadow-xs">
                        <img
                          src={currentBefore}
                          alt={`시공 전 현장 사진 ${selectedBeforeIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-xs">
                            시공 전 (BEFORE)
                          </span>
                          {beforeList.length > 1 && (
                            <span className="bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                              {selectedBeforeIdx + 1} / {beforeList.length}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-700 font-semibold text-center min-h-[2.25rem] flex items-center justify-center leading-snug px-1">
                        {getBeforeCaption(selectedBeforeIdx)}
                      </p>

                      {/* Before Thumbnails */}
                      {beforeList.length > 1 && (
                        <div className="pt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-2 px-0.5">
                            <span>시공 전 사진 (총 {beforeList.length}장)</span>
                            <span className="text-red-600 font-semibold">
                              {modalProject.id === 'proj-1' ? `전${selectedBeforeIdx + 1}.jpg 선택됨` : `전 ${selectedBeforeIdx + 1}번 사진 선택됨`}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {beforeList.map((img, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedBeforeIdx(idx)}
                                className={`relative rounded-xl overflow-hidden aspect-4/3 border-2 transition-all cursor-pointer group/th ${
                                  selectedBeforeIdx === idx
                                    ? 'border-red-600 ring-2 ring-red-300 shadow-sm'
                                    : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
                                }`}
                              >
                                <img src={img} alt={`전 ${idx + 1}`} className="w-full h-full object-cover group-hover/th:scale-105 transition-transform" />
                                <div className={`absolute bottom-0 inset-x-0 py-0.5 text-center text-[10px] font-bold text-white ${
                                  selectedBeforeIdx === idx ? 'bg-red-600' : 'bg-black/75'
                                }`}>
                                  전 {idx + 1}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: 시공 후 (AFTER) */}
                    <div className="space-y-2.5">
                      <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-4/3 border border-slate-200 shadow-xs">
                        <img
                          src={currentAfter}
                          alt={`시공 후 현장 사진 ${selectedAfterIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="bg-emerald-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-xs">
                            시공 후 (AFTER)
                          </span>
                          {afterList.length > 1 && (
                            <span className="bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md border border-white/20">
                              {selectedAfterIdx + 1} / {afterList.length}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-700 font-semibold text-center min-h-[2.25rem] flex items-center justify-center leading-snug px-1">
                        {getAfterCaption(selectedAfterIdx)}
                      </p>

                      {/* After Thumbnails */}
                      {afterList.length > 1 && (
                        <div className="pt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-2 px-0.5">
                            <span>시공 후 사진 (총 {afterList.length}장)</span>
                            <span className="text-emerald-600 font-semibold">
                              {modalProject.id === 'proj-1' ? `후${selectedAfterIdx + 1}.jpg 선택됨` : `후 ${selectedAfterIdx + 1}번 사진 선택됨`}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {afterList.map((img, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedAfterIdx(idx)}
                                className={`relative rounded-xl overflow-hidden aspect-4/3 border-2 transition-all cursor-pointer group/th ${
                                  selectedAfterIdx === idx
                                    ? 'border-emerald-600 ring-2 ring-emerald-300 shadow-sm'
                                    : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
                                }`}
                              >
                                <img src={img} alt={`후 ${idx + 1}`} className="w-full h-full object-cover group-hover/th:scale-105 transition-transform" />
                                <div className={`absolute bottom-0 inset-x-0 py-0.5 text-center text-[10px] font-bold text-white ${
                                  selectedAfterIdx === idx ? 'bg-emerald-600' : 'bg-black/75'
                                }`}>
                                  후 {idx + 1}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Selectors for slider comparison if multiple */}
                    {(beforeList.length > 1 || afterList.length > 1) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                        {beforeList.length > 1 && (
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-red-600 shrink-0 text-[11px]">시공 전 선택:</span>
                            <div className="flex items-center gap-1 overflow-x-auto">
                              {beforeList.map((_, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setSelectedBeforeIdx(idx)}
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                                    selectedBeforeIdx === idx
                                      ? 'bg-red-600 text-white'
                                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                  }`}
                                >
                                  전 {idx + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {afterList.length > 1 && (
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-emerald-600 shrink-0 text-[11px]">시공 후 선택:</span>
                            <div className="flex items-center gap-1 overflow-x-auto">
                              {afterList.map((_, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setSelectedAfterIdx(idx)}
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                                    selectedAfterIdx === idx
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                  }`}
                                >
                                  후 {idx + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="relative rounded-2xl overflow-hidden aspect-16/10 select-none border border-slate-200 bg-slate-900">
                      {/* After Image Full Background */}
                      <img
                        src={currentAfter}
                        alt="AFTER"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      
                      {/* Before Image Clipped with Slider */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: `${sliderPosition}%` }}
                      >
                        <img
                          src={currentBefore}
                          alt="BEFORE"
                          className="absolute inset-0 w-full h-full object-cover max-w-none"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>

                      {/* Divider Line */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                        style={{ left: `${sliderPosition}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-800 shadow-xl flex items-center justify-center font-bold text-xs">
                          ↔
                        </div>
                      </div>

                      {/* Labels */}
                      <span className="absolute top-3 left-3 bg-red-600/90 text-white text-xs font-black px-2.5 py-1 rounded-md">
                        BEFORE {beforeList.length > 1 ? `(전 ${selectedBeforeIdx + 1})` : ''}
                      </span>
                      <span className="absolute top-3 right-3 bg-emerald-600/90 text-white text-xs font-black px-2.5 py-1 rounded-md">
                        AFTER {afterList.length > 1 ? `(후 ${selectedAfterIdx + 1})` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-500">전후 비교 조절:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(Number(e.target.value))}
                        className="flex-1 accent-blue-600 cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-500 w-10 text-right">{sliderPosition}%</span>
                    </div>
                  </div>
                )}

                {/* Technical Details */}
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-blue-600" />
                      시공 개요 및 현장 진단
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {modalProject.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      정밀 공정 및 기술 솔루션
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {modalProject.details}
                    </p>
                  </div>

                  {/* Used Equipments */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-800 block mb-2">투입 장비 및 자재:</span>
                    <div className="flex flex-wrap gap-2">
                      {modalProject.equipmentUsed.map((eq, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-1 rounded-lg font-medium">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  유사한 누수나 방수 문제가 있으신가요? 동일 기술팀이 방문 진단합니다.
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setModalProject(null)}
                    className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl cursor-pointer"
                  >
                    닫기
                  </button>
                  <a
                    href={`tel:${hotlinePhone}`}
                    className="w-1/2 sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>전화 상담 바로연결</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

    </section>
  );
};
