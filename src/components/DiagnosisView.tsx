import React, { useState } from 'react';
import { CompetencyScore, NavView } from '../types';

interface DiagnosisViewProps {
  competencyScores: CompetencyScore[];
  setCompetencyScores: React.Dispatch<React.SetStateAction<CompetencyScore[]>>;
  setCurrentView: (view: NavView) => void;
}

export const DiagnosisView: React.FC<DiagnosisViewProps> = ({
  competencyScores,
  setCompetencyScores,
  setCurrentView,
}) => {
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (id: string, newRating: number) => {
    setCompetencyScores((prev) =>
      prev.map((item) => (item.id === id ? { ...item, rating: newRating } : item))
    );
  };

  const handleKeywordChange = (id: string, text: string) => {
    setCompetencyScores((prev) =>
      prev.map((item) => (item.id === id ? { ...item, keywords: text } : item))
    );
  };

  const handleMetricChange = (id: string, text: string) => {
    setCompetencyScores((prev) =>
      prev.map((item) => (item.id === id ? { ...item, metric: text } : item))
    );
  };

  // Weighted score calculation
  const totalWeight = competencyScores.reduce((acc, curr) => acc + curr.weight, 0);
  const weightedSum = competencyScores.reduce((acc, curr) => acc + (curr.rating * curr.weight), 0);
  const aggregateScore = totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : '0.0';
  const readinessTarget = Math.round((parseFloat(aggregateScore) / 5.0) * 100);

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentView('ai-report');
    }, 600);
  };

  const handleLoadPrevious = () => {
    setCompetencyScores([
      { id: 'comp-1', title: '공정 이해도', weight: 30, rating: 4, description: '장비 문제 원인을 분석하고 제조 워크플로를 최적화합니다.', keywords: '사이클 타임 최적화, 근본 원인 분석 (RCA)', iconName: 'account_tree' },
      { id: 'comp-2', title: '데이터 분석 및 개선', weight: 30, rating: 3, description: '생산 지표를 활용하여 비용을 절감하고 수율을 향상시킵니다.', keywords: 'LOT 데이터, SPC를 활용한 비용 절감', metric: '수율 15% 향상', iconName: 'troubleshoot' },
      { id: 'comp-3', title: '현장 커뮤니케이션', weight: 20, rating: 2, description: '작업장 운영자와 설계 엔지니어링 팀 간의 커뮤니케이션을 지원합니다.', keywords: '교대조 인수인계, 교차 기능 정렬', iconName: 'forum' },
      { id: 'comp-4', title: '기술 트렌드 적응', weight: 20, rating: 3, description: '인더스트리 4.0, IoT 및 자동 검사 도구의 통합.', keywords: 'IoT 센서, 머신 비전', iconName: 'memory' },
    ]);
  };

  // Convert ratings (1-5 scale) to radar polygon points (scale 0..40 radius around center 50,50)
  const getRadarPoints = () => {
    const scores = competencyScores.map((c) => (c.rating / 5) * 35);
    const top = 50 - (scores[0] || 25);
    const right = 50 + (scores[1] || 25);
    const bottom = 50 + (scores[2] || 25);
    const left = 50 - (scores[3] || 25);
    return `50,${top} ${right},50 50,${bottom} ${left},50`;
  };

  return (
    <div className="flex flex-col w-full h-full p-2 space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#c5c6ce]/30">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-code text-xs text-[#0453cd] font-bold tracking-widest uppercase bg-[#eff4ff] px-2 py-0.5 rounded border border-[#c5c6ce]">
              DIAG-402-X
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0453cd]"></span>
            <span className="font-label-caps text-xs text-[#44474d]">생산 엔지니어링 프로필</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#0b1c30]">역량 진단</h1>
          <p className="font-body-lg text-sm text-[#44474d] mt-2 max-w-2xl leading-relaxed">
            핵심 제조 및 분석 영역에 걸친 운영 숙련도를 평가합니다. 결과는 향후 교육 모듈 및 AI 자기소개서를 자동 조정하는 데 사용됩니다.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLoadPrevious}
            className="px-5 py-2.5 border-[1.5px] border-[#031632] text-[#031632] font-label-caps text-xs rounded flex items-center gap-2 hover:bg-[#031632] hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            이전 항목 불러오기
          </button>
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="px-6 py-2.5 bg-[#FF8C00] text-white font-label-caps text-xs font-semibold rounded flex items-center gap-2 hover:bg-[#E67E00] transition-colors shadow-sm group"
          >
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            {loading ? 'AI 분석 리포트 컴파일 중...' : 'AI 리포트 생성 및 제출'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        {/* Left Blueprint Line Accent */}
        <div className="hidden lg:flex absolute -left-10 top-0 bottom-0 w-6 border-r border-dashed border-[#c5c6ce]/60 flex-col items-center py-8 gap-12 text-[#75777e]/40 select-none pointer-events-none">
          <div className="font-code [writing-mode:vertical-rl] tracking-widest text-[9px]">SEC-01-PRC</div>
          <div className="font-code [writing-mode:vertical-rl] tracking-widest text-[9px]">SEC-02-DAT</div>
          <div className="font-code [writing-mode:vertical-rl] tracking-widest text-[9px]">SEC-03-COM</div>
          <div className="font-code [writing-mode:vertical-rl] tracking-widest text-[9px]">SEC-04-TCH</div>
        </div>

        {/* Left Column: Assessment Form Cards */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {competencyScores.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white border border-[#CBD5E1] rounded relative overflow-hidden shadow-sm transition-all hover:border-[#0453cd]/50"
            >
              {/* Left Color Accent */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${idx === 0 ? 'bg-[#0453cd]' : 'bg-[#75777e]'}`}></div>
              
              <div className="p-6 pl-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="material-symbols-outlined text-[#0453cd] text-[20px]">
                        {item.iconName}
                      </span>
                      <h2 className="font-headline-md text-lg font-bold text-[#0b1c30]">
                        {item.title}
                      </h2>
                    </div>
                    <p className="font-body-sm text-xs text-[#44474d]">{item.description}</p>
                  </div>
                  <div className="font-code text-xs text-[#75777e] bg-[#eff4ff] px-2.5 py-1 rounded border border-[#c5c6ce]/30">
                    비중: {item.weight}%
                  </div>
                </div>

                {/* Rating Scale (1 to 5) */}
                <div>
                  <label className="font-label-caps text-xs text-[#0b1c30] mb-2 block uppercase">
                    숙련도 평가 (1 - 5 점)
                  </label>
                  <div className="flex gap-3 w-full">
                    {[1, 2, 3, 4, 5].map((val) => {
                      const isSelected = item.rating === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleRatingChange(item.id, val)}
                          className={`flex-1 py-3 rounded transition-all text-center font-bold font-sans text-base ${
                            isSelected
                              ? 'bg-[#0453cd] text-white shadow-md ring-2 ring-[#0453cd] ring-offset-2 ring-offset-white'
                              : 'border border-[#c5c6ce] hover:border-[#0453cd] hover:bg-[#eff4ff] text-[#44474d]'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-1 px-1 font-code text-[10px] text-[#75777e]">
                    <span>1 (초보자)</span>
                    <span>3 (보통)</span>
                    <span>5 (전문가)</span>
                  </div>
                </div>

                {/* Keywords & Metric Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="font-label-caps text-[11px] text-[#0b1c30] mb-1.5 block">
                      핵심 역량 / 키워드
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777e] text-[18px]">
                        key
                      </span>
                      <input
                        type="text"
                        value={item.keywords}
                        onChange={(e) => handleKeywordChange(item.id, e.target.value)}
                        className="w-full bg-[#f8f9ff] border border-[#c5c6ce] rounded py-2 pl-10 pr-3 font-body-sm text-xs text-[#0b1c30] focus:outline-none focus:border-[#0453cd]"
                        placeholder="키워드 입력..."
                      />
                    </div>
                  </div>

                  {item.metric !== undefined && (
                    <div>
                      <label className="font-label-caps text-[11px] text-[#0b1c30] mb-1.5 block">
                        성과 지표 (정량 수치)
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#0453cd] text-[18px]">
                          trending_up
                        </span>
                        <input
                          type="text"
                          value={item.metric}
                          onChange={(e) => handleMetricChange(item.id, e.target.value)}
                          className="w-full bg-[#f8f9ff] border border-[#c5c6ce] rounded py-2 pl-10 pr-3 font-body-sm text-xs text-[#0453cd] font-semibold focus:outline-none focus:border-[#0453cd]"
                          placeholder="예: 수율 15% 향상"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Dynamic Radar Chart & Aggregate Score */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Radar Chart */}
          <div className="bg-white border border-[#CBD5E1] rounded p-6 shadow-sm flex flex-col h-[380px]">
            <h3 className="font-label-caps text-xs text-[#0b1c30] uppercase font-bold tracking-wider mb-0.5">
              역량 분포 (Competency Radar)
            </h3>
            <p className="font-body-sm text-xs text-[#75777e] mb-4">현재 진단 점수 실시간 차트</p>
            
            <div className="flex-1 relative flex items-center justify-center">
              <svg className="w-full h-full max-w-[240px] max-h-[240px]" viewBox="0 0 100 100">
                {/* Background Radar Grids */}
                <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="#c5c6ce" strokeWidth="0.5" strokeDasharray="2,2" />
                <polygon points="50,28 72,50 50,72 28,50" fill="none" stroke="#c5c6ce" strokeWidth="0.5" strokeDasharray="2,2" />
                <polygon points="50,40 60,50 50,60 40,50" fill="none" stroke="#c5c6ce" strokeWidth="0.5" strokeDasharray="2,2" />

                {/* Radar Axes */}
                <line x1="50" y1="15" x2="50" y2="85" stroke="#c5c6ce" strokeWidth="0.5" />
                <line x1="15" y1="50" x2="85" y2="50" stroke="#c5c6ce" strokeWidth="0.5" />

                {/* Dynamic Data Polygon */}
                <polygon
                  points={getRadarPoints()}
                  fill="rgba(4, 83, 205, 0.25)"
                  stroke="#0453cd"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Radar Point Bullets */}
                {competencyScores.map((c, i) => {
                  const pts = getRadarPoints().split(' ');
                  const pair = pts[i].split(',');
                  return (
                    <circle key={i} cx={pair[0]} cy={pair[1]} r="3" fill="#0453cd" stroke="#ffffff" strokeWidth="1" />
                  );
                })}
              </svg>

              {/* Axis Labels */}
              <span className="absolute top-1 left-1/2 -translate-x-1/2 font-label-caps text-[10px] text-[#0b1c30] font-bold bg-white/80 px-1 rounded">
                공정 ({competencyScores[0]?.rating || 0})
              </span>
              <span className="absolute top-1/2 right-0 translate-x-2 -translate-y-1/2 font-label-caps text-[10px] text-[#0b1c30] font-bold bg-white/80 px-1 rounded">
                데이터 ({competencyScores[1]?.rating || 0})
              </span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-label-caps text-[10px] text-[#0b1c30] font-bold bg-white/80 px-1 rounded">
                소통 ({competencyScores[2]?.rating || 0})
              </span>
              <span className="absolute top-1/2 left-0 -translate-x-2 -translate-y-1/2 font-label-caps text-[10px] text-[#0b1c30] font-bold bg-white/80 px-1 rounded">
                기술 ({competencyScores[3]?.rating || 0})
              </span>
            </div>
          </div>

          {/* Aggregate Score Widget */}
          <div className="bg-[#031632] text-white border border-[#1a2b48] rounded p-6 shadow-md relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#0453cd]/30 rounded-full blur-2xl"></div>
            <h3 className="font-label-caps text-xs text-[#8293b5] uppercase mb-2">종합 지수</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold text-white tracking-tight">{aggregateScore}</span>
              <span className="font-headline-md text-[#8293b5] text-lg">/ 5.0</span>
            </div>
            <div className="mt-6 pt-6 border-t border-[#1a2b48]">
              <div className="flex justify-between items-center font-body-sm text-xs text-[#8293b5] mb-2">
                <span>지원 준비도 목표 달성률</span>
                <span className="text-white font-bold font-code">{readinessTarget}%</span>
              </div>
              <div className="h-2 w-full bg-[#1a2b48] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0453cd] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(readinessTarget, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Environmental Facility Visual Card */}
          <div className="border border-[#CBD5E1] rounded overflow-hidden shadow-sm relative h-48 group bg-[#031632]">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#031632] via-[#031632]/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <div className="font-code text-[10px] text-[#b6c7eb] mb-0.5">FACILITY-A4</div>
              <div className="font-headline-md text-sm font-bold">배포 환경: EV 생산자동화 클린룸</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
