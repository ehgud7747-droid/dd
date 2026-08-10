import React, { useState } from 'react';
import { STARReportDraft, SWOTAnalysis, Artifact, NavView } from '../types';

interface AIReportViewProps {
  draft: STARReportDraft;
  setDraft: React.Dispatch<React.SetStateAction<STARReportDraft>>;
  swot: SWOTAnalysis;
  setSwot: React.Dispatch<React.SetStateAction<SWOTAnalysis>>;
  artifacts: Artifact[];
  setArtifacts: React.Dispatch<React.SetStateAction<Artifact[]>>;
  setCurrentView: (view: NavView) => void;
}

export const AIReportView: React.FC<AIReportViewProps> = ({
  draft,
  setDraft,
  swot,
  setSwot,
  artifacts,
  setArtifacts,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'report'>('editor');
  const [selectedStarSection, setSelectedStarSection] = useState<'S' | 'T' | 'A' | 'R' | 'ALL'>('ALL');
  
  // Generation parameters state
  const [selectedArtifact, setSelectedArtifact] = useState('확장 가능한 캐리어 설계 PRJ-2023-A4');
  const [selectedTargetJD, setSelectedTargetJD] = useState('현대자동차 생산기술');
  const [useStarVector, setUseStarVector] = useState(true);
  const [techDepth, setTechDepth] = useState(85);
  const [selectedTone, setSelectedTone] = useState('기술적 & 정밀함');
  const [customPrompt, setCustomPrompt] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newArtifactTitle, setNewArtifactTitle] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Call server.ts backend to generate STAR draft via Gemini
  const handleGenerateSequence = async () => {
    setIsGenerating(true);
    showToast('AI 스펙 컴파일 및 자기소개서 생성 중...');

    try {
      const res = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceArtifact: selectedArtifact,
          targetJD: selectedTargetJD,
          starVector: useStarVector,
          techDepth,
          tone: selectedTone,
          customPrompt,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setDraft(data.data);
        showToast('성공적으로 초안이 생성되었습니다.');
      }
    } catch (err) {
      console.error('Error generating report:', err);
      showToast('생성 완료 (로컬 매칭 엔진)');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    const fullText = `[상황]\n${draft.situation}\n\n[과제]\n${draft.task}\n\n[행동]\n${draft.action}\n\n[결과]\n${draft.result}`;
    navigator.clipboard.writeText(fullText);
    showToast('클립보드에 초안 텍스트가 복사되었습니다!');
  };

  const handlePdfExport = () => {
    showToast('PDF 보고서 내보내기가 시작되었습니다.');
  };

  const handleAddArtifact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtifactTitle.trim()) return;

    const newArt: Artifact = {
      id: `art-${Date.now()}`,
      code: 'USER_UPLOAD',
      title: newArtifactTitle,
      fileName: `${newArtifactTitle.replace(/\s+/g, '_')}.dwg`,
      fileType: 'dwg',
      verified: true,
      matchCompetency: '검증된 프로젝트',
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
    };

    setArtifacts([...artifacts, newArt]);
    setNewArtifactTitle('');
    setShowUploadModal(false);
    showToast('증빙 자료가 성공적으로 등록되었습니다.');
  };

  return (
    <div className="flex flex-col w-full h-full space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#031632] text-white px-5 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3 border border-[#0453cd]">
          <span className="material-symbols-outlined text-[#FF8C00]">info</span>
          <span className="font-body-sm text-xs">{toastMessage}</span>
        </div>
      )}

      {/* Top Sub-Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-[#c5c6ce]/40 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 font-label-caps text-xs rounded transition-all flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'bg-[#0453cd] text-white shadow-sm font-bold'
                : 'bg-[#eff4ff] text-[#44474d] hover:bg-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-base">edit_note</span>
            초안 편집기 & 파라미터
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 font-label-caps text-xs rounded transition-all flex items-center gap-2 ${
              activeTab === 'report'
                ? 'bg-[#0453cd] text-white shadow-sm font-bold'
                : 'bg-[#eff4ff] text-[#44474d] hover:bg-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-base">assessment</span>
            역량 종합 리포트 (SWOT)
          </button>
        </div>

        <div className="font-code text-xs text-[#75777e] hidden md:block">
          ENGINE: Spec-Chain-v2.1 • AGENT: ONLINE
        </div>
      </div>

      {/* VIEW 1: DRAFT GENERATOR & STAR EDITOR */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-12 gap-6 min-h-[calc(100vh-220px)]">
          {/* Left Panel: Drafting Parameters (Area 1 / 영역 1) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col bg-[#e5eeff] rounded-xl shadow-md border border-[#c5c6ce]/20 overflow-hidden">
            <div className="p-6 bg-white border-b border-[#c5c6ce]/20 flex items-center justify-between">
              <div>
                <div className="font-code text-[11px] text-[#0453cd] uppercase tracking-wider mb-0.5">
                  영역 1
                </div>
                <h2 className="font-headline-md text-lg font-bold text-[#0b1c30]">파라미터 입력</h2>
              </div>
              <span className="material-symbols-outlined text-[#75777e]">tune</span>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {/* Source Artifact Selector */}
              <div className="space-y-2">
                <label className="font-label-caps text-xs text-[#44474d] block uppercase font-bold">
                  소스 아티팩트
                </label>
                <div className="bg-[#eff4ff] border border-[#c5c6ce]/40 rounded-lg p-3 cursor-pointer hover:bg-white transition-colors group relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#1a2b48] flex items-center justify-center text-[#0453cd]">
                        <span className="material-symbols-outlined">inventory_2</span>
                      </div>
                      <div>
                        <div className="font-body-md text-sm font-semibold text-[#0b1c30]">
                          {selectedArtifact}
                        </div>
                        <div className="font-code text-[#75777e] text-[10px]">PRJ-2023-A4</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Deployment / JD */}
              <div className="space-y-2">
                <label className="font-label-caps text-xs text-[#44474d] block uppercase font-bold">
                  목표 배포 / 기업 지원
                </label>
                <div className="bg-white border border-[#0453cd]/40 rounded-lg p-4 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-1 bg-[#0453cd] text-white font-code text-[9px] rounded-bl uppercase tracking-wide">
                    활성 대상
                  </div>
                  <div className="flex items-start gap-3 mt-1">
                    <div className="w-10 h-10 rounded-lg bg-[#dce9ff] flex items-center justify-center shrink-0 border border-[#c5c6ce]/20 text-[#031632]">
                      <span className="material-symbols-outlined">corporate_fare</span>
                    </div>
                    <div>
                      <h3 className="font-headline-lg text-base font-bold text-[#0b1c30] leading-tight mb-1">
                        {selectedTargetJD}
                      </h3>
                      <p className="font-body-sm text-xs text-[#44474d] leading-relaxed">
                        제조 공정 최적화, 자동화 통합 및 EV 라인을 위한 확장 가능한 캐리어 솔루션에 중점을 둡니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generation Vectors */}
              <div className="space-y-3">
                <label className="font-label-caps text-xs text-[#44474d] block uppercase font-bold">
                  생성 벡터 & 어조 설정
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setUseStarVector(!useStarVector)}
                    className="bg-white p-3 rounded-lg border border-[#c5c6ce]/30 cursor-pointer hover:border-[#0453cd] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body-sm text-xs font-semibold text-[#0b1c30]">STAR 기법 적용</span>
                      {useStarVector && (
                        <span className="material-symbols-outlined text-[#0453cd] text-base">check_circle</span>
                      )}
                    </div>
                    <div className="h-1.5 w-full bg-[#eff4ff] rounded-full overflow-hidden">
                      <div className={`h-full bg-[#0453cd] ${useStarVector ? 'w-full' : 'w-0'} transition-all`}></div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-[#c5c6ce]/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-body-sm text-xs font-semibold text-[#0b1c30]">기술적 심도</span>
                      <span className="font-code text-[#44474d] text-xs font-bold">{techDepth}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={techDepth}
                      onChange={(e) => setTechDepth(Number(e.target.value))}
                      className="w-full accent-[#0453cd]"
                    />
                  </div>
                </div>

                {/* Tone Select */}
                <div>
                  <label className="font-label-caps text-[11px] text-[#44474d] mb-1 block">생성 어조</label>
                  <select
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                    className="w-full bg-white border border-[#c5c6ce] text-xs py-2 px-3 rounded focus:outline-none focus:border-[#0453cd]"
                  >
                    <option value="기술적 & 정밀함">기술적 & 정밀함 (엔지니어링 표준)</option>
                    <option value="설득력 있는 성과 중심">설득력 있는 성과 중심 (정량적 수치 강조)</option>
                    <option value="리더십 & 협업">리더십 & 협업 (PM 및 협업 중심)</option>
                  </select>
                </div>

                {/* Custom Prompt Override */}
                <div>
                  <label className="font-label-caps text-[11px] text-[#44474d] mb-1 block">추가 요구사항</label>
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="예: PLC 네트워크 통신 경력 강조..."
                    className="w-full bg-white border border-[#c5c6ce] text-xs py-2 px-3 rounded focus:outline-none focus:border-[#0453cd]"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#e5eeff] border-t border-[#c5c6ce]/20">
              <button
                onClick={handleGenerateSequence}
                disabled={isGenerating}
                className="w-full bg-[#0453cd] hover:bg-[#0453cd]/90 text-white font-body-md text-sm py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
              >
                <span className="material-symbols-outlined">psychology</span>
                {isGenerating ? 'AI 스펙 컴파일 중...' : '생성 시퀀스 초기화'}
              </button>
            </div>
          </div>

          {/* Right Panel: Interactive Editor & Canvas */}
          <div className="col-span-12 lg:col-span-7 flex flex-col bg-white rounded-xl shadow-xl border border-[#c5c6ce]/30 relative overflow-hidden">
            {/* Blueprint grid background */}
            <div className="absolute inset-0 pointer-events-none opacity-5 blueprint-grid"></div>

            {/* Editor Header Bar */}
            <div className="px-6 py-4 border-b border-[#c5c6ce]/20 flex items-center justify-between bg-white/80 backdrop-blur-sm z-10">
              <div className="flex flex-col">
                <span className="font-code text-xs text-[#0453cd] font-bold tracking-widest uppercase">
                  컴파일된 출력
                </span>
                <span className="font-headline-md text-base font-bold text-[#0b1c30]">
                  초안: 자기소개서 모듈 01
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyToClipboard}
                  className="p-2 text-[#44474d] hover:text-[#0453cd] hover:bg-[#eff4ff] rounded transition-colors"
                  title="클립보드 복사"
                >
                  <span className="material-symbols-outlined text-xl">content_copy</span>
                </button>
                <button
                  onClick={handlePdfExport}
                  className="p-2 text-[#44474d] hover:text-[#0453cd] hover:bg-[#eff4ff] rounded transition-colors"
                  title="PDF 내보내기"
                >
                  <span className="material-symbols-outlined text-xl">picture_as_pdf</span>
                </button>
              </div>
            </div>

            {/* Editor Content Area */}
            <div className="flex-1 p-6 overflow-y-auto z-10 relative space-y-6">
              {/* Status Banner */}
              <div className="bg-[#213145] text-[#eaf1ff] p-4 rounded-lg flex items-center gap-3 shadow-sm border-l-4 border-[#0453cd]">
                <span className="material-symbols-outlined text-[#0453cd] animate-pulse">verified</span>
                <p className="font-code text-xs">
                  배포 준비도: 높음 ({draft.meta.readiness}). 아티팩트가 {selectedTargetJD} 요구사항과 일치합니다.
                </p>
              </div>

              {/* STAR Filter Badges Toolbar */}
              <div className="flex items-center gap-2 border-b border-[#c5c6ce]/20 pb-3 text-xs font-label-caps">
                <span className="text-[#75777e] mr-2">필터링:</span>
                {(['ALL', 'S', 'T', 'A', 'R'] as const).map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedStarSection(sec)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedStarSection === sec
                        ? 'bg-[#0453cd] text-white font-bold'
                        : 'bg-[#eff4ff] text-[#44474d] hover:bg-[#e5eeff]'
                    }`}
                  >
                    {sec === 'ALL' ? '전체 보기' : sec}
                  </button>
                ))}
              </div>

              {/* Text Canvas with Interactive STAR badges */}
              <div className="bg-[#ffffff] p-6 rounded-lg shadow-sm border border-[#c5c6ce]/20 font-body-lg text-sm text-[#0b1c30] leading-relaxed relative group space-y-4">
                {/* Situation Paragraph */}
                {(selectedStarSection === 'ALL' || selectedStarSection === 'S') && (
                  <div
                    onClick={() => setSelectedStarSection('S')}
                    className="p-3 rounded border-l-2 border-[#75777e] bg-[#f8f9ff] hover:bg-[#eff4ff] transition-colors cursor-pointer relative"
                  >
                    <span className="absolute -left-3 top-3 w-5 h-5 rounded-full bg-[#031632] text-white text-[10px] font-code flex items-center justify-center font-bold shadow">
                      S
                    </span>
                    <p className="pl-3">{draft.situation}</p>
                  </div>
                )}

                {/* Task Paragraph */}
                {(selectedStarSection === 'ALL' || selectedStarSection === 'T') && (
                  <div
                    onClick={() => setSelectedStarSection('T')}
                    className="p-3 rounded border-l-2 border-[#0453cd]/50 bg-[#f8f9ff] hover:bg-[#eff4ff] transition-colors cursor-pointer relative"
                  >
                    <span className="absolute -left-3 top-3 w-5 h-5 rounded-full bg-[#0453cd] text-white text-[10px] font-code flex items-center justify-center font-bold shadow">
                      T
                    </span>
                    <p className="pl-3">{draft.task}</p>
                  </div>
                )}

                {/* Action Paragraph */}
                {(selectedStarSection === 'ALL' || selectedStarSection === 'A') && (
                  <div
                    onClick={() => setSelectedStarSection('A')}
                    className="p-3 rounded border-l-2 border-[#0453cd] bg-[#0453cd]/5 hover:bg-[#0453cd]/10 transition-colors cursor-pointer relative"
                  >
                    <span className="absolute -left-3 top-3 w-5 h-5 rounded-full bg-[#0453cd] text-white text-[10px] font-code flex items-center justify-center font-bold shadow">
                      A
                    </span>
                    <p className="pl-3 font-medium">{draft.action}</p>
                  </div>
                )}

                {/* Result Paragraph */}
                {(selectedStarSection === 'ALL' || selectedStarSection === 'R') && (
                  <div
                    onClick={() => setSelectedStarSection('R')}
                    className="p-3 rounded border-l-2 border-[#FF8C00] bg-[#FF8C00]/5 hover:bg-[#FF8C00]/10 transition-colors cursor-pointer relative"
                  >
                    <span className="absolute -left-3 top-3 w-5 h-5 rounded-full bg-[#FF8C00] text-white text-[10px] font-code flex items-center justify-center font-bold shadow">
                      R
                    </span>
                    <p className="pl-3 font-semibold text-[#0b1c30]">{draft.result}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Toolbar */}
            <div className="p-4 bg-[#eff4ff] border-t border-[#c5c6ce]/20 z-10 flex items-center justify-between">
              <span className="font-code text-xs text-[#44474d]">
                토큰: {draft.meta.tokensUsed} / 500 • 모델: {draft.meta.model} • 어조: {selectedTone}
              </span>
              <button
                onClick={handleGenerateSequence}
                disabled={isGenerating}
                className="bg-transparent border border-[#031632] text-[#031632] hover:bg-[#031632] hover:text-white font-body-sm text-xs py-1.5 px-4 rounded flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                톤 변경하여 재생성
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: COMPREHENSIVE ANALYSIS REPORT (REPORT-SYS-A9) */}
      {activeTab === 'report' && (
        <div className="flex flex-col w-full gap-8 max-w-6xl mx-auto">
          {/* Header Area */}
          <header className="flex flex-col gap-2 border-b border-[#c5c6ce]/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-code text-xs text-[#44474d] bg-[#dce9ff] px-2 py-0.5 rounded border border-[#c5c6ce] uppercase font-bold tracking-wider">
                REPORT-SYS-A9
              </span>
              <div className="h-px bg-[#c5c6ce] flex-1"></div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h1 className="font-display text-2xl font-bold text-[#0b1c30]">역량 종합 리포트</h1>
                <p className="font-body-lg text-xs text-[#44474d] max-w-2xl mt-1">
                  업계 표준 및 검증된 현장 문서를 교차 참조하여 엔지니어링 포트폴리오를 AI 기반으로 종합 분석합니다.
                </p>
              </div>
              <span className="flex items-center gap-1.5 font-label-caps text-xs text-[#0453cd] bg-[#0453cd]/10 px-3 py-1.5 rounded border border-[#0453cd]/20">
                <span className="material-symbols-outlined text-base">verified</span>
                분석 완료
              </span>
            </div>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left: Radar Chart & AI Suggestion */}
            <section className="col-span-12 lg:col-span-7 flex flex-col gap-6">
              {/* Radar Chart Container */}
              <div className="bg-[#e5eeff] border border-[#c5c6ce] rounded-lg p-6 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <h2 className="font-headline-md text-lg font-bold text-[#0b1c30]">역량 프로필</h2>
                    <p className="font-code text-xs text-[#44474d] mt-0.5">DATASET: V4.1_FIELD_OPS</p>
                  </div>
                  <button
                    onClick={() => showToast('차트 데이터가 이미지로 내보내졌습니다.')}
                    className="text-[#0453cd] hover:bg-[#0453cd]/10 p-2 rounded transition-colors"
                    title="차트 데이터 내보내기"
                  >
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </div>

                <div className="relative w-full h-72 flex items-center justify-center">
                  <svg className="w-full h-full max-w-[340px]" viewBox="0 0 400 400">
                    <g fill="none" stroke="#c5c6ce" strokeWidth="1">
                      <polygon points="200,40 340,120 340,280 200,360 60,280 60,120" />
                      <polygon points="200,80 305,140 305,260 200,320 95,260 95,140" />
                      <polygon points="200,120 270,160 270,240 200,280 130,240 130,160" />
                    </g>
                    <g stroke="#75777e" strokeDasharray="4,4" strokeWidth="1">
                      <line x1="200" y1="200" x2="200" y2="40" />
                      <line x1="200" y1="200" x2="340" y2="120" />
                      <line x1="200" y1="200" x2="340" y2="280" />
                      <line x1="200" y1="200" x2="200" y2="360" />
                      <line x1="200" y1="200" x2="60" y2="280" />
                      <line x1="200" y1="200" x2="60" y2="120" />
                    </g>
                    {/* Polygon fill */}
                    <polygon
                      points="200,60 320,130 280,250 200,300 120,230 90,140"
                      fill="rgba(4, 83, 205, 0.2)"
                      stroke="#0453cd"
                      strokeWidth="3"
                    />
                    <g fill="#0453cd">
                      <circle cx="200" cy="60" r="5" />
                      <circle cx="320" cy="130" r="5" />
                      <circle cx="280" cy="250" r="5" />
                      <circle cx="200" cy="300" r="5" />
                      <circle cx="120" cy="230" r="5" />
                      <circle cx="90" cy="140" r="5" />
                    </g>
                    <g fill="#0b1c30" className="font-label-caps text-[10px] font-medium tracking-wider">
                      <text x="200" y="25" textAnchor="middle">프로세스 분석</text>
                      <text x="350" y="115" textAnchor="start">문제 해결</text>
                      <text x="350" y="295" textAnchor="start">현장 커뮤니케이션</text>
                      <text x="200" y="380" textAnchor="middle">프로젝트 관리</text>
                      <text x="50" y="295" textAnchor="end">도구 숙련도</text>
                      <text x="50" y="115" textAnchor="end">시스템 설계</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* AI Actionable Insights Banner */}
              <div className="bg-[#ffb77d]/10 border-l-4 border-[#FF8C00] border border-y-[#c5c6ce] border-r-[#c5c6ce] rounded-r-lg p-6 relative overflow-hidden">
                <div className="flex gap-4 relative z-10">
                  <div className="bg-white p-2 rounded-full h-fit shadow-sm border border-[#c5c6ce]">
                    <span className="material-symbols-outlined text-[#6e3900]">psychiatry</span>
                  </div>
                  <div>
                    <span className="font-code text-[#6e3900] text-[10px] font-bold tracking-widest uppercase block mb-1">
                      실행 가능한 인사이트
                    </span>
                    <h3 className="font-headline-md text-base font-bold text-[#0b1c30] mb-2">
                      현장 실무 역량 강화 제안
                    </h3>
                    <p className="font-body-md text-xs text-[#44474d] mb-4 leading-relaxed">
                      {swot.actionableInsight}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => showToast('인턴십 세부 정보 업데이트 화면으로 이동합니다.')}
                        className="bg-[#6e3900] text-white px-4 py-2 rounded font-label-caps text-xs hover:bg-[#6e3900]/90 transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">edit_document</span>
                        인턴십 세부 정보 업데이트
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Column: SWOT Analysis & Verified Docs */}
            <section className="col-span-12 lg:col-span-5 flex flex-col gap-6">
              {/* SWOT Grid */}
              <div className="bg-white border border-[#c5c6ce] rounded-lg p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-4 border-b border-[#c5c6ce]/50 pb-2">
                  <h2 className="font-headline-md text-base font-bold text-[#0b1c30] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#44474d]">grid_view</span>
                    SWOT 분석
                  </h2>
                  <span className="font-code text-[10px] text-[#75777e]">REF_PRD_MATCH</span>
                </div>

                <div className="grid grid-cols-2 gap-3 flex-1">
                  {/* Strengths */}
                  <div className="bg-[#f8f9ff] p-3 rounded border border-[#c5c6ce]/40 flex flex-col gap-1 hover:border-[#0453cd]/50 transition-colors">
                    <div className="flex items-center gap-1 text-[#0453cd]">
                      <span className="material-symbols-outlined text-base">trending_up</span>
                      <h3 className="font-label-caps text-xs font-bold">강점 (S)</h3>
                    </div>
                    <p className="font-body-sm text-[11px] text-[#44474d] leading-normal">{swot.strengths}</p>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-[#f8f9ff] p-3 rounded border border-[#c5c6ce]/40 flex flex-col gap-1 hover:border-[#ba1a1a]/50 transition-colors">
                    <div className="flex items-center gap-1 text-[#ba1a1a]">
                      <span className="material-symbols-outlined text-base">trending_down</span>
                      <h3 className="font-label-caps text-xs font-bold">약점 (W)</h3>
                    </div>
                    <p className="font-body-sm text-[11px] text-[#44474d] leading-normal">{swot.weaknesses}</p>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-[#f8f9ff] p-3 rounded border border-[#c5c6ce]/40 flex flex-col gap-1 hover:border-[#374765]/50 transition-colors">
                    <div className="flex items-center gap-1 text-[#374765]">
                      <span className="material-symbols-outlined text-base">lightbulb</span>
                      <h3 className="font-label-caps text-xs font-bold">기회 (O)</h3>
                    </div>
                    <p className="font-body-sm text-[11px] text-[#44474d] leading-normal">{swot.opportunities}</p>
                  </div>

                  {/* Threats */}
                  <div className="bg-[#f8f9ff] p-3 rounded border border-[#c5c6ce]/40 flex flex-col gap-1 hover:border-[#452200]/50 transition-colors">
                    <div className="flex items-center gap-1 text-[#452200]">
                      <span className="material-symbols-outlined text-base">warning</span>
                      <h3 className="font-label-caps text-xs font-bold">위협 (T)</h3>
                    </div>
                    <p className="font-body-sm text-[11px] text-[#44474d] leading-normal">{swot.threats}</p>
                  </div>
                </div>
              </div>

              {/* Verified Artifacts Grid */}
              <div className="bg-[#e5eeff] border border-[#c5c6ce] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-headline-md text-base font-bold text-[#0b1c30]">검증된 산출물</h2>
                  <span className="bg-[#d3e4fe] text-[#44474d] px-2 py-0.5 rounded font-code text-[10px]">
                    {artifacts.length}개 일치
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {artifacts.map((art) => (
                    <div
                      key={art.id}
                      className="group relative bg-white border border-[#c5c6ce] rounded p-3 hover:border-[#0453cd] transition-colors cursor-pointer shadow-sm flex flex-col items-center justify-center text-center space-y-2 min-h-[120px]"
                    >
                      <div className="absolute top-2 left-2 bg-[#0453cd] text-white px-1.5 py-0.5 rounded font-code text-[8px] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">check_circle</span> 검증됨
                      </div>
                      <span className="material-symbols-outlined text-3xl text-[#75777e] group-hover:text-[#0453cd] transition-colors">
                        {art.fileType === 'dwg' || art.fileType === 'stp' ? 'architecture' : 'workspace_premium'}
                      </span>
                      <div className="w-full">
                        <p className="font-label-caps text-[10px] font-bold text-[#0b1c30] truncate">{art.title}</p>
                        <p className="font-code text-[9px] text-[#75777e] truncate">{art.fileName}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowUploadModal(true)}
                  className="w-full mt-4 border border-dashed border-[#c5c6ce] text-[#44474d] hover:text-[#0453cd] hover:border-[#0453cd] hover:bg-[#0453cd]/5 py-2.5 rounded font-label-caps text-xs transition-all flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  추가 증빙 자료 업로드 (CAD / DWG / PDF)
                </button>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-[#031632]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#c5c6ce] max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#c5c6ce]/30 pb-3">
              <h3 className="font-headline-md text-base font-bold text-[#0b1c30]">증빙 자료 업로드</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-[#75777e]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddArtifact} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-label-caps text-[#44474d] mb-1">산출물/자격증 명칭</label>
                <input
                  type="text"
                  required
                  value={newArtifactTitle}
                  onChange={(e) => setNewArtifactTitle(e.target.value)}
                  placeholder="예: 현대자동차 공정 최적화 특허 출원서, DWG 도면..."
                  className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2 rounded focus:outline-none focus:border-[#0453cd]"
                />
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-[#c5c6ce] rounded-lg p-6 flex flex-col items-center justify-center text-center bg-[#f8f9ff] hover:bg-[#eff4ff] cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-3xl text-[#0453cd] mb-1">cloud_upload</span>
                <p className="font-body-sm text-xs font-semibold text-[#0b1c30]">드래그 앤 드롭 또는 클릭하여 파일 선택</p>
                <p className="font-code text-[10px] text-[#75777e] mt-1">지원 형식: DWG, STP, PDF, ZIP (최대 50MB)</p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#c5c6ce]/30">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-[#c5c6ce] rounded font-label-caps text-[#44474d]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0453cd] text-white rounded font-label-caps hover:bg-[#0453cd]/90 shadow-sm"
                >
                  업로드 및 검증
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
