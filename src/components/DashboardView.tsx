import React, { useState } from 'react';
import { UserProfile, TimelineItem, NavView } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  timelineItems: TimelineItem[];
  setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
  setCurrentView: (view: NavView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  timelineItems,
  setTimelineItems,
  setCurrentView,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'license' | 'project' | 'exam'>('project');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemDate, setNewItemDate] = useState('2024 2분기');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem: TimelineItem = {
      id: `tl-${Date.now()}`,
      title: newItemTitle,
      category: newItemCategory,
      status: 'completed',
      date: newItemDate,
      description: newItemDesc || '새로운 이력 아티팩트가 등록되었습니다.',
      badgeText: '등록 완료',
    };

    setTimelineItems([newItem, ...timelineItems]);
    setNewItemTitle('');
    setNewItemDesc('');
    setShowAddModal(false);
  };

  const gpaData = [
    { semester: '2020-1', gpa: 3.87 },
    { semester: '2020-2', gpa: 3.39 },
    { semester: '2023-1', gpa: 3.59 },
    { semester: '2023-2', gpa: 3.25 },
    { semester: '2024-1', gpa: 3.65 },
    { semester: '2024-2', gpa: 4.20 },
    { semester: '2025-1', gpa: 3.70 },
    { semester: '2025-2', gpa: 3.71 },
  ];

  return (
    <div className="flex flex-col w-full h-full space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <section className="relative w-full bg-[#e5eeff] rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 border border-[#c5c6ce]/20 group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2b48]/10 via-[#f8f9ff]/30 to-[#e5eeff] opacity-40 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col max-w-2xl space-y-4">
          <div className="flex items-center space-x-2">
            <span className="font-code text-xs text-[#0453cd] bg-white px-2 py-1 rounded shadow-sm border border-[#c5c6ce]/30">
              ID: {user.id}
            </span>
            <span className="font-code text-[11px] text-[#75777e] uppercase font-semibold tracking-wider">
              활성 세션
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#0b1c30]">
            환영합니다, {user.name}님.
          </h1>
          <p className="font-body-lg text-[#44474d] text-base leading-relaxed">
            현재 준비도 지표에 따르면 자동차 생산 엔지니어링 역할에{' '}
            <strong className="text-[#0453cd] font-semibold">{user.readinessPercentage}%</strong> 준비되어 있습니다. 핵심 역량을 계속해서 다듬어 보세요.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <button
              onClick={() => setCurrentView('ai-report')}
              className="bg-[#0453cd] text-white px-5 py-2.5 rounded font-label-caps text-xs font-medium hover:bg-[#0453cd]/90 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">description</span>
              청사진 검토
            </button>
            <button
              onClick={() => setCurrentView('competency-diagnosis')}
              className="bg-transparent text-[#031632] px-5 py-2.5 rounded font-label-caps text-xs font-medium border border-[#031632] hover:bg-[#d3e4fe] transition-colors"
            >
              사양 업데이트
            </button>
          </div>
        </div>

        {/* Spec-Chain Logo Card Graphic */}
        <div className="relative z-10 w-48 h-48 md:w-56 md:h-56 mt-6 md:mt-0 flex-shrink-0 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-4 border border-[#c5c6ce]/30">
          <div className="w-16 h-16 rounded-full bg-[#031632] flex items-center justify-center text-[#0453cd] mb-3 shadow-inner">
            <span className="material-symbols-outlined text-4xl">precision_manufacturing</span>
          </div>
          <span className="font-display font-bold text-lg text-[#031632] tracking-tight">Spec-Chain</span>
          <span className="font-code text-[10px] text-[#75777e] mt-1">ENGINEERING AI MATRIX</span>
          <div className="mt-3 flex items-center gap-1.5 bg-[#eff4ff] px-2.5 py-1 rounded text-xs text-[#0453cd] font-code">
            <span className="w-2 h-2 rounded-full bg-[#0453cd] animate-pulse"></span>
            SYS-ONLINE
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setCurrentView('competency-diagnosis')}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#c5c6ce]/30 flex items-start space-x-4 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-lg bg-[#b6c7eb] flex items-center justify-center flex-shrink-0 text-[#081b38]">
            <span className="material-symbols-outlined text-2xl">analytics</span>
          </div>
          <div>
            <h3 className="font-label-caps text-xs text-[#75777e] uppercase mb-1">진단된 역량</h3>
            <p className="font-display text-2xl font-bold text-[#0b1c30]">
              12 <span className="font-body-sm text-sm text-[#44474d] font-normal">/ 15 필요</span>
            </p>
            <div className="mt-2 flex items-center text-xs text-[#0453cd] font-medium group-hover:underline">
              역량 진단 바로가기 &rarr;
            </div>
          </div>
        </div>

        <div 
          onClick={() => setCurrentView('ai-report')}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#c5c6ce]/30 flex items-start space-x-4 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-lg bg-[#b2c5ff] flex items-center justify-center flex-shrink-0 text-[#001848]">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div>
            <h3 className="font-label-caps text-xs text-[#75777e] uppercase mb-1">검증된 문서</h3>
            <p className="font-display text-2xl font-bold text-[#0b1c30]">
              3 <span className="font-body-sm text-sm text-[#0453cd] font-medium">검증됨</span>
            </p>
            <div className="mt-2 flex items-center text-xs text-[#0453cd] font-medium group-hover:underline">
              아티팩트 및 DWG 확인 &rarr;
            </div>
          </div>
        </div>

        <div 
          onClick={() => setCurrentView('ai-report')}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#c5c6ce]/30 flex items-start space-x-4 transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-lg bg-[#ffb77d] flex items-center justify-center flex-shrink-0 text-[#6e3900]">
            <span className="material-symbols-outlined text-2xl">memory</span>
          </div>
          <div>
            <h3 className="font-label-caps text-xs text-[#75777e] uppercase mb-1">AI 매칭</h3>
            <p className="font-display text-2xl font-bold text-[#0b1c30]">
              5 <span className="font-body-sm text-sm text-[#44474d] font-normal">역할 발견</span>
            </p>
            <div className="mt-2 flex items-center text-xs text-[#FF8C00] font-medium group-hover:underline">
              매칭 리포트 보기 &rarr;
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Timeline & GPA (Left) + AI Recommendations (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          {/* Timeline Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-xl font-bold text-[#0b1c30] flex items-center">
              <span className="material-symbols-outlined mr-2 text-[#75777e]">timeline</span>
              프로젝트 타임라인 (아카이브)
            </h2>
            <div className="flex items-center gap-3">
              <span className="font-label-caps text-xs text-[#75777e]">참조-아카이브-V2</span>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-[#0453cd] text-white px-3 py-1.5 rounded font-label-caps text-xs flex items-center gap-1 hover:bg-[#0453cd]/90 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                이력 추가
              </button>
            </div>
          </div>

          {/* Timeline Container */}
          <div className="bg-white rounded-xl shadow-sm border border-[#c5c6ce]/30 p-6 relative overflow-hidden">
            <div className="absolute left-[39px] top-6 bottom-6 w-px bg-[#c5c6ce]/50"></div>
            <div className="space-y-6 relative">
              {timelineItems.map((item) => (
                <div key={item.id} className="flex items-start group">
                  <div className={`w-5 h-5 rounded-sm ${item.status === 'in_progress' ? 'bg-[#FF8C00]' : 'bg-[#0453cd]'} mt-1 flex-shrink-0 z-10 border-2 border-white flex items-center justify-center shadow-sm`}>
                    {item.status === 'in_progress' ? (
                      <span className="material-symbols-outlined text-[10px] text-white">priority_high</span>
                    ) : (
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="ml-6 bg-[#eff4ff] p-4 rounded-md border border-[#c5c6ce]/30 flex-1 transition-all hover:bg-[#e5eeff] shadow-sm group-hover:border-[#0453cd]/50">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-headline-sm text-base text-[#0b1c30] font-semibold">
                        {item.title}
                      </h4>
                      <span className={`font-label-caps text-xs px-2 py-0.5 rounded ${
                        item.status === 'in_progress'
                          ? 'text-[#FF8C00] bg-[#FF8C00]/10 border border-[#FF8C00]/20'
                          : 'text-[#0453cd] bg-white border border-[#0453cd]/20'
                      }`}>
                        {item.badgeText || item.date}
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-[#44474d] mb-2 leading-relaxed">
                      {item.description}
                    </p>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="font-label-caps text-[10px] text-[#0453cd] bg-[#dae2ff] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.progressPercentage !== undefined && (
                      <div className="w-full bg-[#c5c6ce]/30 h-1.5 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-[#FF8C00] h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.progressPercentage}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GPA Trend Section */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-headline-md text-xl font-bold text-[#0b1c30] flex items-center">
                <span className="material-symbols-outlined mr-2 text-[#75777e]">bar_chart</span>
                학기별 성적 추이 (GPA Matrix)
              </h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#c5c6ce]/30 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                  <div className="bg-[#eff4ff] px-4 py-2 rounded-md border border-[#c5c6ce]/30 shadow-sm">
                    <span className="font-label-caps text-[10px] text-[#75777e] block mb-0.5 uppercase">전공 평점</span>
                    <span className="font-headline-sm text-lg text-[#0453cd] font-bold">{user.majorGpa} / 4.5</span>
                  </div>
                  <div className="bg-[#eff4ff] px-4 py-2 rounded-md border border-[#c5c6ce]/30 shadow-sm">
                    <span className="font-label-caps text-[10px] text-[#75777e] block mb-0.5 uppercase">총 이수학점</span>
                    <span className="font-headline-sm text-lg text-[#0b1c30] font-bold">{user.totalCredits} 학점</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-caps text-xs text-[#0453cd] font-semibold">평균 평점: {user.overallGpa}</span>
                </div>
              </div>

              {/* Custom High-Precision SVG GPA Line Chart */}
              <div className="h-56 w-full relative pt-2">
                <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="500" y2="20" stroke="#c5c6ce" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#c5c6ce" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#c5c6ce" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="0" y1="140" x2="500" y2="140" stroke="#c5c6ce" strokeWidth="1" />

                  {/* Area Fill */}
                  <polygon
                    points="20,50 80,90 140,70 200,100 260,65 320,20 380,60 440,60 440,140 20,140"
                    fill="url(#gpaGradient)"
                    opacity="0.25"
                  />
                  <defs>
                    <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0453cd" />
                      <stop offset="100%" stopColor="#0453cd" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Line */}
                  <polyline
                    fill="none"
                    stroke="#0453cd"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,50 80,90 140,70 200,100 260,65 320,20 380,60 440,60"
                  />

                  {/* Data Points & Tooltip values */}
                  {[
                    { x: 20, y: 50, val: '3.87', label: '20-1' },
                    { x: 80, y: 90, val: '3.39', label: '20-2' },
                    { x: 140, y: 70, val: '3.59', label: '23-1' },
                    { x: 200, y: 100, val: '3.25', label: '23-2' },
                    { x: 260, y: 65, val: '3.65', label: '24-1' },
                    { x: 320, y: 20, val: '4.20', label: '24-2' },
                    { x: 380, y: 60, val: '3.70', label: '25-1' },
                    { x: 440, y: 60, val: '3.71', label: '25-2' },
                  ].map((pt, i) => (
                    <g key={i} className="group/pt cursor-pointer">
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#0453cd" strokeWidth="2.5" />
                      <text x={pt.x} y={pt.y - 10} textAnchor="middle" className="text-[10px] font-code font-bold fill-[#031632]">
                        {pt.val}
                      </text>
                      <text x={pt.x} y="155" textAnchor="middle" className="text-[10px] font-code fill-[#75777e]">
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side Column: AI Recommendation Widget & Latest Artifact */}
        <section className="space-y-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-headline-md text-xl font-bold text-[#0b1c30] flex items-center">
              <span className="material-symbols-outlined mr-2 text-[#452200]">smart_toy</span>
              AI 추천 엔진
            </h2>
          </div>

          {/* Action Required Box */}
          <div className="bg-white rounded-xl shadow-md border border-[#ffb77d]/80 p-6 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#ffb77d]/20 rounded-full blur-2xl group-hover:bg-[#ffb77d]/30 transition-colors"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-3">
                <span className="material-symbols-outlined text-[#FF8C00] text-2xl">warning_amber</span>
                <h3 className="font-headline-sm text-[#0b1c30] font-bold text-base">조치 필요</h3>
              </div>
              <p className="font-body-md text-xs text-[#44474d] mb-4 leading-relaxed">
                프로필에 소프트 스킬 검증이 부족합니다. '생산 엔지니어' 매칭 확률을{' '}
                <strong className="text-[#0453cd]">14%</strong> 높이려면 커뮤니케이션 스킬 진단을 완료하세요.
              </p>
              <div className="bg-[#eff4ff] p-3 rounded-md border border-[#c5c6ce]/20 mb-4 flex items-center justify-between">
                <div>
                  <p className="font-label-caps text-[10px] text-[#75777e] uppercase">예상 소요 시간</p>
                  <p className="font-body-sm text-xs font-semibold text-[#0b1c30]">15 분</p>
                </div>
                <div className="text-right">
                  <p className="font-label-caps text-[10px] text-[#75777e] uppercase">영향력</p>
                  <p className="font-body-sm text-xs font-bold text-[#0453cd]">+14% 매칭 확률</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('competency-diagnosis')}
                className="w-full bg-[#FF8C00] text-white px-4 py-2.5 rounded font-label-caps text-xs font-semibold hover:bg-[#E67E00] transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                진단 시작
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Target Company Match Summary */}
          <div className="bg-[#031632] text-white rounded-xl p-6 shadow-md border border-[#1a2b48] relative overflow-hidden">
            <div className="font-label-caps text-xs text-[#8293b5] uppercase mb-1">목표 매칭 대상</div>
            <h3 className="font-display text-lg font-bold text-white mb-2">현대자동차 생산기술</h3>
            <p className="font-body-sm text-xs text-[#8293b5] mb-4">
              자동화 통합 및 EV 라인 확장 가능한 캐리어 솔루션 분야
            </p>
            <div className="flex justify-between items-center bg-[#1a2b48] p-3 rounded text-xs">
              <span className="font-code text-[#b6c7eb]">적합도 점수</span>
              <span className="font-code text-sm font-bold text-[#ffb77d]">88.5 / 100</span>
            </div>
            <button
              onClick={() => setCurrentView('ai-report')}
              className="mt-4 w-full bg-[#0453cd] text-white text-xs font-label-caps py-2 rounded hover:bg-[#0453cd]/90 transition-colors"
            >
              맞춤 자기소개서 생성
            </button>
          </div>

          {/* Latest Artifact Widget */}
          <div className="bg-white rounded-xl shadow-sm border border-[#c5c6ce]/30 p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-[#eff4ff] flex items-center justify-center border border-[#c5c6ce]/30 text-[#0453cd]">
              <span className="material-symbols-outlined text-xl">description</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-label-caps text-[10px] text-[#75777e] uppercase">최신 등록 아티팩트</p>
              <p className="font-body-sm text-xs text-[#0b1c30] font-medium truncate">CAD_Assembly_V3_Final.stp</p>
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("CAD_Assembly_V3_Final.stp 파일 다운로드가 시작되었습니다."); }}
              className="text-[#0453cd] hover:text-[#031632] p-1.5 rounded hover:bg-[#eff4ff] transition-colors"
              title="다운로드"
            >
              <span className="material-symbols-outlined text-xl">download</span>
            </a>
          </div>
        </section>
      </div>

      {/* Add Timeline Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#031632]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#c5c6ce] max-w-md w-full p-6 space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-[#c5c6ce]/30 pb-3">
              <h3 className="font-headline-md text-lg font-bold text-[#0b1c30]">새 이력 / 프로젝트 추가</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#75777e] hover:text-[#0b1c30]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddItem} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-label-caps text-[#44474d] mb-1">제목</label>
                <input
                  type="text"
                  required
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="예: 공정 최적화 경진대회 수상, 기계기사 자격증..."
                  className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2 rounded focus:outline-none focus:border-[#0453cd]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-caps text-[#44474d] mb-1">분류</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2 rounded focus:outline-none focus:border-[#0453cd]"
                  >
                    <option value="project">프로젝트</option>
                    <option value="license">자격증</option>
                    <option value="exam">어학/시험</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-[#44474d] mb-1">일시/기간</label>
                  <input
                    type="text"
                    value={newItemDate}
                    onChange={(e) => setNewItemDate(e.target.value)}
                    placeholder="예: 2024년 2분기"
                    className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2 rounded focus:outline-none focus:border-[#0453cd]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-caps text-[#44474d] mb-1">상세 설명</label>
                <textarea
                  rows={3}
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="구체적인 수행 역할 및 사용 도구를 기재하세요..."
                  className="w-full bg-[#f8f9ff] border border-[#c5c6ce] p-3 rounded focus:outline-none focus:border-[#0453cd]"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#c5c6ce]/30">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#c5c6ce] rounded font-label-caps text-[#44474d] hover:bg-[#eff4ff]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0453cd] text-white rounded font-label-caps hover:bg-[#0453cd]/90 shadow-sm"
                >
                  등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
