import React, { useState } from 'react';
import { 
  AppState, 
  BrandColorTheme, 
  Inquiry, 
  InquiryStatus, 
  ProjectItem, 
  ServiceCategory 
} from '../../types';
import { 
  LayoutDashboard, 
  Inbox, 
  FileEdit, 
  Palette, 
  Search, 
  Trash2, 
  Plus, 
  Edit3, 
  Check, 
  RotateCcw, 
  Save, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  MapPin, 
  Building2, 
  Calendar, 
  MessageSquare, 
  Settings2,
  Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  appState: AppState;
  onUpdateState: (newState: AppState) => void;
  onResetToDefault: () => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  appState,
  onUpdateState,
  onResetToDefault,
  onCloseAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'projects' | 'customizer' | 'seo'>('overview');
  
  // Local editable copies for smooth interaction
  const [companyForm, setCompanyForm] = useState(appState.company);
  const [themeForm, setThemeForm] = useState(appState.theme);
  const [seoForm, setSeoForm] = useState(appState.seo);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Inquiries filter & note editing
  const [inquiryFilter, setInquiryFilter] = useState<string>('all');
  const [editingInquiryId, setEditingInquiryId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string>('');

  // Project CMS state
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProjectModal, setIsNewProjectModal] = useState(false);

  // Notification helper
  const showNotice = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => {
      setSaveSuccessNotice(null);
    }, 2800);
  };

  // Save company & theme
  const handleSaveCompanyAndTheme = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...appState,
      company: companyForm,
      theme: themeForm,
    };
    onUpdateState(updated);
    showNotice('기본 정보 및 테마 설정이 성공적으로 저장되었습니다.');
  };

  // Save SEO
  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...appState,
      seo: seoForm,
    };
    onUpdateState(updated);
    showNotice('SEO 및 소셜 메타 태그 설정이 저장되었습니다.');
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = (id: string, newStatus: InquiryStatus) => {
    const updatedInquiries = appState.inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    onUpdateState({ ...appState, inquiries: updatedInquiries });
    showNotice(`문의 #${id} 처리 상태가 [${newStatus}](으)로 변경되었습니다.`);
  };

  // Save Inquiry Admin Note
  const handleSaveInquiryNote = (id: string) => {
    const updatedInquiries = appState.inquiries.map((inq) =>
      inq.id === id ? { ...inq, adminNote: editingNote } : inq
    );
    onUpdateState({ ...appState, inquiries: updatedInquiries });
    setEditingInquiryId(null);
    showNotice('상담 메모가 저장되었습니다.');
  };

  // Delete Inquiry
  const handleDeleteInquiry = (id: string) => {
    if (!window.confirm('정말 이 견적 문의 건을 삭제하시겠습니까?')) return;
    const updatedInquiries = appState.inquiries.filter((inq) => inq.id !== id);
    onUpdateState({ ...appState, inquiries: updatedInquiries });
    showNotice('문의 내역이 삭제되었습니다.');
  };

  // Toggle Project Publish State
  const handleToggleProjectPublish = (id: string) => {
    const updatedProjects = appState.projects.map((p) =>
      p.id === id ? { ...p, isPublished: !p.isPublished } : p
    );
    onUpdateState({ ...appState, projects: updatedProjects });
    showNotice('시공사례 공개 상태가 변경되었습니다.');
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    if (!window.confirm('정말 이 시공사례를 삭제하시겠습니까?')) return;
    const updatedProjects = appState.projects.filter((p) => p.id !== id);
    onUpdateState({ ...appState, projects: updatedProjects });
    showNotice('시공사례가 삭제되었습니다.');
  };

  // Save (Create or Edit) Project
  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isNewProjectModal) {
      // Create
      const newProj = {
        ...editingProject,
        id: `proj-${Date.now()}`,
      };
      onUpdateState({
        ...appState,
        projects: [newProj, ...appState.projects],
      });
      showNotice('새 시공사례가 등록되었습니다.');
    } else {
      // Edit
      const updatedProjects = appState.projects.map((p) =>
        p.id === editingProject.id ? editingProject : p
      );
      onUpdateState({
        ...appState,
        projects: updatedProjects,
      });
      showNotice('시공사례가 수정되었습니다.');
    }

    setEditingProject(null);
    setIsNewProjectModal(false);
  };

  // Open New Project Modal with template
  const handleOpenNewProject = () => {
    const template: ProjectItem = {
      id: '',
      title: '[울산 남구 삼산동] 신축 상가 누수 정밀탐지 및 배관 수리',
      category: 'leak_detection',
      location: '울산광역시 남구 삼산동 상가',
      date: new Date().toISOString().split('T')[0],
      period: '당일 시공 (2시간)',
      warranty: '기본 1년 최대 3년 하자보수 보증',
      beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
      equipmentUsed: ['정밀 청음식 탐지기', '수소 혼합가스 탐지기'],
      summary: '간단한 요약을 입력하세요.',
      details: '정밀 시공 세부 내역 및 문제 해결 과정을 입력하세요.',
      tags: ['울산누수', '배관수리'],
      isPublished: true,
    };
    setEditingProject(template);
    setIsNewProjectModal(true);
  };

  // Backup JSON download
  const handleExportBackup = () => {
    const blob = new Blob([JSON.stringify(appState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ulsan_leak_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotice('전체 데이터 백업 JSON 파일이 다운로드되었습니다.');
  };

  // Backup JSON import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.company && parsed.projects) {
          onUpdateState(parsed);
          setCompanyForm(parsed.company);
          setThemeForm(parsed.theme);
          setSeoForm(parsed.seo);
          showNotice('백업 데이터가 성공적으로 복원되었습니다.');
        } else {
          alert('올바른 백업 파일 형식이 아닙니다.');
        }
      } catch (err) {
        alert('JSON 파싱에 실패했습니다.');
      }
    };
    reader.readAsText(file);
  };

  // Inquiries filtered list
  const filteredInquiries = appState.inquiries.filter((inq) => {
    if (inquiryFilter === 'all') return true;
    return inq.status === inquiryFilter;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      
      {/* Admin Top Navigation Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-slate-950 rounded-xl font-black">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-base">울산누수종합방수설비</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/30">
                관리자 대시보드 CMS
              </span>
            </div>
            <p className="text-[11px] text-slate-400">실시간 콘텐츠, 견적 관리 및 테마 커스터마이징</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccessNotice && (
            <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1.5 rounded-lg animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{saveSuccessNotice}</span>
            </div>
          )}

          <button
            onClick={onCloseAdmin}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span>웹사이트로 돌아가기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Admin Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full lg:w-64 bg-slate-950 border border-slate-800 rounded-2xl p-4 shrink-0 h-fit space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>대시보드 요약 (Overview)</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left ${
              activeTab === 'inquiries'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4" />
              <span>견적 문의 접수 관리</span>
            </div>
            {appState.inquiries.filter((i) => i.status === '대기').length > 0 && (
              <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black">
                {appState.inquiries.filter((i) => i.status === '대기').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileEdit className="w-4 h-4" />
              <span>시공사례 관리 (CMS)</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {appState.projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('customizer')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left ${
              activeTab === 'customizer'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>사이트 정보 & 테마</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left ${
              activeTab === 'seo'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>SEO & 메타 태그</span>
          </button>

          {/* Bottom Data Tools */}
          <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block">
              데이터 영속성 & 백업
            </span>

            <button
              onClick={handleExportBackup}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-900 rounded-lg transition-colors text-left"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>JSON 백업 다운로드</span>
            </button>

            <label className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer text-left">
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>백업 파일 복원</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>

            <button
              onClick={() => {
                if (window.confirm('모든 변경사항을 지우고 울산 지역 초기 샘플 데이터로 복구하시겠습니까?')) {
                  onResetToDefault();
                  showNotice('초기 데이터로 완전히 초기화되었습니다.');
                }
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-950/40 rounded-lg transition-colors text-left"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>초기 샘플 데이터 복구</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-6 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">대시보드 실시간 현황</h3>
                <p className="text-xs text-slate-400 mt-1">
                  울산누수종합방수설비 온라인 문의 및 게시 콘텐츠 요약 정보입니다.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>전체 견적 문의</span>
                    <Inbox className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl font-black text-white">
                    {appState.inquiries.length}
                    <span className="text-xs text-slate-400 font-normal ml-1">건</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-semibold">
                    접수대기: {appState.inquiries.filter((i) => i.status === '대기').length}건
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>등록된 시공사례</span>
                    <FileEdit className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-white">
                    {appState.projects.length}
                    <span className="text-xs text-slate-400 font-normal ml-1">건</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    공개 상태: {appState.projects.filter((p) => p.isPublished).length}건
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>직통 대표전화</span>
                    <PhoneCall className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-lg font-black text-white">
                    {appState.company.hotlinePhone}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    사무실: {appState.company.officePhone}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>적용 브랜드 테마</span>
                    <Palette className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-base font-bold text-white capitalize">
                    {appState.theme.colorTheme.replace('_', ' ')}
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    LocalStorage 자동 동기화 중
                  </div>
                </div>
              </div>

              {/* Recent Inquiries Quick Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>최근 접수된 실시간 견적 문의</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    전체 보기 →
                  </button>
                </div>

                <div className="divide-y divide-slate-800">
                  {appState.inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{inq.name}</span>
                          <span className="text-slate-400">({inq.district} · {inq.buildingType})</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inq.status === '대기' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-slate-400 mt-0.5 line-clamp-1">{inq.symptom}</p>
                      </div>
                      <div className="text-right text-slate-500 text-[11px] shrink-0 ml-4">
                        {inq.createdAt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleOpenNewProject}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center gap-3 text-left transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">새 시공사례 포트폴리오 등록</div>
                    <div className="text-xs text-slate-400">현장 사진 및 전후 비교 사례 작성</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('customizer')}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 flex items-center gap-3 text-left transition-colors"
                >
                  <div className="p-2 rounded-lg bg-amber-600/20 text-amber-400">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">전화번호 및 히어로 슬로건 수정</div>
                    <div className="text-xs text-slate-400">사이트 메인 문구 실시간 변경</div>
                  </div>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: INQUIRIES MANAGEMENT */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-white">온라인 견적 문의 관리</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    고객이 홈페이지를 통해 접수한 실시간 누수/방수 견적 신청 목록입니다.
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  {['all', '대기', '상담완료', '방문진단예정', '시공완료', '취소'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setInquiryFilter(st)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                        inquiryFilter === st
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {st === 'all' ? '전체' : st}
                    </button>
                  ))}
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="bg-slate-900 rounded-2xl p-12 text-center text-slate-400 text-sm">
                  해당 조건의 접수 문의가 없습니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-slate-500">#{inq.id}</span>
                          <span className="text-base font-black text-white">{inq.name}</span>
                          <a
                            href={`tel:${inq.phone}`}
                            className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>{inq.phone}</span>
                          </a>
                        </div>

                        {/* Status Select */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">상태:</span>
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                              inq.status === '대기'
                                ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                                : inq.status === '시공완료'
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                                : 'bg-slate-800 text-slate-200 border-slate-700'
                            }`}
                          >
                            <option value="대기">대기</option>
                            <option value="상담완료">상담완료</option>
                            <option value="방문진단예정">방문진단예정</option>
                            <option value="시공완료">시공완료</option>
                            <option value="취소">취소</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Inquiry Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                        <div>
                          <span className="text-slate-500 block mb-0.5">지역 및 건물유형</span>
                          <div className="font-semibold text-white">
                            울산 {inq.district} · {inq.buildingType}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500 block mb-0.5">희망 일정</span>
                          <div className="font-semibold text-white">
                            {inq.preferredDate || '협의 요망'}
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500 block mb-0.5">접수 일시</span>
                          <div className="text-slate-400 font-mono">
                            {inq.createdAt}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-200 leading-relaxed border border-slate-800/80">
                        <span className="text-slate-500 font-bold block mb-1">고객 증상 설명:</span>
                        {inq.symptom}
                      </div>

                      {/* Photo attachments */}
                      {inq.photos && inq.photos.length > 0 && (
                        <div>
                          <span className="text-xs text-slate-500 block mb-1.5">첨부된 현장 사진:</span>
                          <div className="flex gap-2">
                            {inq.photos.map((ph, idx) => (
                              <a
                                key={idx}
                                href={ph}
                                target="_blank"
                                rel="noreferrer"
                                className="w-16 h-16 rounded-lg overflow-hidden border border-slate-700 block"
                              >
                                <img src={ph} alt="현장사진" className="w-full h-full object-cover" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Admin Note Section */}
                      <div className="pt-2 border-t border-slate-800">
                        {editingInquiryId === inq.id ? (
                          <div className="space-y-2">
                            <textarea
                              rows={2}
                              value={editingNote}
                              onChange={(e) => setEditingNote(e.target.value)}
                              placeholder="상담 결과, 출동 일정, 특이사항 메모"
                              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => setEditingInquiryId(null)}
                                className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                              >
                                취소
                              </button>
                              <button
                                onClick={() => handleSaveInquiryNote(inq.id)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
                              >
                                메모 저장
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-xs">
                            <div className="text-slate-400">
                              <span className="font-bold text-slate-300">관리자 상담 메모: </span>
                              {inq.adminNote ? (
                                <span className="text-amber-300 ml-1">{inq.adminNote}</span>
                              ) : (
                                <span className="text-slate-600 italic ml-1">작성된 메모 없음</span>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setEditingInquiryId(inq.id);
                                setEditingNote(inq.adminNote || '');
                              }}
                              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{inq.adminNote ? '메모 수정' : '메모 작성'}</span>
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROJECTS CMS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-white">시공사례 관리 시스템</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    홈페이지에 노출되는 시공 전·후 사례 포트폴리오를 작성, 수정, 삭제합니다.
                  </p>
                </div>

                <button
                  onClick={handleOpenNewProject}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>새 시공사례 등록</span>
                </button>
              </div>

              {/* Projects Table / List */}
              <div className="space-y-3">
                {appState.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Image Thumbnail */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                        <img src={proj.afterImage} alt={proj.title} className="w-full h-full object-cover" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-blue-400">{proj.location}</span>
                          {proj.date ? (
                            <>
                              <span className="text-slate-600">·</span>
                              <span className="text-slate-400">{proj.date}</span>
                            </>
                          ) : null}
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            proj.isPublished ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {proj.isPublished ? '공개중' : '비공개'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {proj.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => handleToggleProjectPublish(proj.id)}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                        title={proj.isPublished ? '비공개로 전환' : '공개로 전환'}
                      >
                        {proj.isPublished ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsNewProjectModal(false);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-400 rounded-lg hover:bg-slate-800"
                        title="수정"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMIZER & THEME */}
          {activeTab === 'customizer' && (
            <form onSubmit={handleSaveCompanyAndTheme} className="space-y-8">
              <div>
                <h3 className="text-xl font-black text-white">사이트 콘텐츠 & 브랜드 테마</h3>
                <p className="text-xs text-slate-400 mt-1">
                  대표 번호, 슬로건, 주소 및 컬러 테마를 실시간으로 커스터마이징합니다.
                </p>
              </div>

              {/* Color Theme Selector */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-white block">
                  브랜드 컬러 테마 선택
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'ocean_blue', label: '오션 블루 (클래식)', color: 'bg-blue-600' },
                    { id: 'safety_orange', label: '세이프티 오렌지 (엔지니어)', color: 'bg-amber-600' },
                    { id: 'tech_navy', label: '테크 네이비 (중후한)', color: 'bg-slate-800' },
                    { id: 'emerald_teal', label: '에메랄드 틸 (청수)', color: 'bg-teal-600' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setThemeForm({ ...themeForm, colorTheme: t.id as BrandColorTheme })}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                        themeForm.colorTheme === t.id
                          ? 'border-blue-500 bg-slate-800 ring-2 ring-blue-500/30'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full ${t.color}`}></span>
                      <span className="text-xs font-bold text-slate-200">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Banner Notice Setting */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">상단 안내 공지 배너</span>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={themeForm.showBannerNotice}
                      onChange={(e) => setThemeForm({ ...themeForm, showBannerNotice: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span>배너 노출</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={themeForm.bannerNotice}
                  onChange={(e) => setThemeForm({ ...themeForm, bannerNotice: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Company Info Fields */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <span className="text-xs font-bold text-white block">
                  회사 기본 정보 & 연락처
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">상호명</label>
                    <input
                      type="text"
                      value={companyForm.siteName}
                      onChange={(e) => setCompanyForm({ ...companyForm, siteName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">대표자명</label>
                    <input
                      type="text"
                      value={companyForm.ownerName}
                      onChange={(e) => setCompanyForm({ ...companyForm, ownerName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">직통 상담 대표전화</label>
                    <input
                      type="text"
                      value={companyForm.hotlinePhone}
                      onChange={(e) => setCompanyForm({ ...companyForm, hotlinePhone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">사무실 대표전화</label>
                    <input
                      type="text"
                      value={companyForm.officePhone}
                      onChange={(e) => setCompanyForm({ ...companyForm, officePhone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">사업자등록번호</label>
                    <input
                      type="text"
                      value={companyForm.businessNumber}
                      onChange={(e) => setCompanyForm({ ...companyForm, businessNumber: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">사업장 주소</label>
                    <input
                      type="text"
                      value={companyForm.address}
                      onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">네이버 블로그 주소 링크</label>
                    <input
                      type="text"
                      value={companyForm.naverBlogUrl}
                      onChange={(e) => setCompanyForm({ ...companyForm, naverBlogUrl: e.target.value })}
                      placeholder="https://blog.naver.com/wjdgml2301"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs text-slate-400 mb-1">메인 슬로건</label>
                  <input
                    type="text"
                    value={companyForm.slogan}
                    onChange={(e) => setCompanyForm({ ...companyForm, slogan: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">서브 설명 문구</label>
                  <input
                    type="text"
                    value={companyForm.subSlogan}
                    onChange={(e) => setCompanyForm({ ...companyForm, subSlogan: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>설정 사항 저장하기</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: SEO SETTINGS */}
          {activeTab === 'seo' && (
            <form onSubmit={handleSaveSeo} className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">SEO & 소셜 메타 검색 최적화</h3>
                <p className="text-xs text-slate-400 mt-1">
                  네이버, 다음, 구글 검색 엔진 노출 및 카카오톡 공유 시 표시되는 메타 정보를 설정합니다.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">HTML 메타 타이틀 (Meta Title)</label>
                  <input
                    type="text"
                    value={seoForm.metaTitle}
                    onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">메타 디스크립션 (Meta Description)</label>
                  <textarea
                    rows={3}
                    value={seoForm.metaDescription}
                    onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">소셜 공유 이미지 (og:image URL)</label>
                  <input
                    type="text"
                    value={seoForm.ogImageUrl}
                    onChange={(e) => setSeoForm({ ...seoForm, ogImageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">핵심 타깃 키워드 (쉼표 구분)</label>
                  <input
                    type="text"
                    value={seoForm.keywords}
                    onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>SEO 설정 저장</span>
                </button>
              </div>
            </form>
          )}

        </main>
      </div>

      {/* Project Create/Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-black text-white">
                {isNewProjectModal ? '새 시공사례 포트폴리오 등록' : '시공사례 수정'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-slate-400 hover:text-white"
              >
                닫기
              </button>
            </div>

            <form onSubmit={handleSaveProjectForm} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">제목</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">카테고리</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ServiceCategory })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="leak_detection">미세누수 정밀탐지</option>
                    <option value="waterproofing">지붕/옥상/외벽 종합방수</option>
                    <option value="pipe_cleaning">공장 지붕/행거도어 보수 & 방수</option>
                    <option value="bathroom">욕실 방수 & 리모델링</option>
                    <option value="pipe_repair">신규배관공사 및 보수</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">현장 위치</label>
                  <input
                    type="text"
                    required
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">시공 일자</label>
                  <input
                    type="date"
                    required
                    value={editingProject.date}
                    onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">보증 조건</label>
                  <input
                    type="text"
                    value={editingProject.warranty}
                    onChange={(e) => setEditingProject({ ...editingProject, warranty: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">시공 전(Before) 이미지 URL</label>
                  <input
                    type="text"
                    required
                    value={editingProject.beforeImage}
                    onChange={(e) => setEditingProject({ ...editingProject, beforeImage: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">시공 후(After) 이미지 URL</label>
                  <input
                    type="text"
                    required
                    value={editingProject.afterImage}
                    onChange={(e) => setEditingProject({ ...editingProject, afterImage: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">간단 요약</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">상세 시공 과정 및 해결 내역</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.details}
                  onChange={(e) => setEditingProject({ ...editingProject, details: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isPublished}
                    onChange={(e) => setEditingProject({ ...editingProject, isPublished: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span>홈페이지에 바로 공개</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
                  >
                    저장하기
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
