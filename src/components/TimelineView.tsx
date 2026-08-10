import React, { useState } from 'react';
import { TimelineItem } from '../types';

interface TimelineViewProps {
  timelineItems: TimelineItem[];
  setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  timelineItems,
  setTimelineItems,
}) => {
  const [filter, setFilter] = useState<'all' | 'project' | 'license' | 'exam'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'project' | 'license' | 'exam'>('project');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState('2024.04');

  const filteredItems = timelineItems.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: TimelineItem = {
      id: `tl-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      status: 'completed',
      date: newDate,
      description: newDesc || '추가된 엔지니어링 프로젝트 이력입니다.',
      badgeText: '완료',
    };

    setTimelineItems([newItem, ...timelineItems]);
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col w-full h-full space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#c5c6ce]/30">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-code text-xs text-[#0453cd] font-bold tracking-widest uppercase bg-[#eff4ff] px-2 py-0.5 rounded border border-[#c5c6ce]">
              TIMELINE-ARCHIVE
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#0b1c30]">프로젝트 타임라인 & 이력 관리</h1>
          <p className="font-body-lg text-sm text-[#44474d] mt-1 leading-relaxed">
            학업 성적, CAD 프로젝트, 공인 자격증 및 캡스톤 결과물을 시계열 아카이브로 관리합니다.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#0453cd] text-white font-label-caps text-xs font-semibold rounded flex items-center gap-2 hover:bg-[#0453cd]/90 transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-base">add</span>
          새 이력 등록
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#c5c6ce]/30 pb-3">
        {(
          [
            { id: 'all', label: '전체 보기' },
            { id: 'project', label: '프로젝트 & 캡스톤' },
            { id: 'license', label: '기사/자격증' },
            { id: 'exam', label: '어학 & 시험' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 font-label-caps text-xs rounded transition-all ${
              filter === tab.id
                ? 'bg-[#031632] text-white font-bold shadow-sm'
                : 'bg-[#eff4ff] text-[#44474d] hover:bg-[#e5eeff]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c5c6ce]/30 p-8 relative overflow-hidden">
        <div className="absolute left-[47px] top-8 bottom-8 w-0.5 bg-[#c5c6ce]/60"></div>
        <div className="space-y-8 relative">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex items-start group">
              <div
                className={`w-7 h-7 rounded-full ${
                  item.category === 'project'
                    ? 'bg-[#0453cd]'
                    : item.category === 'license'
                    ? 'bg-[#FF8C00]'
                    : 'bg-[#374765]'
                } text-white flex items-center justify-center font-code text-xs font-bold z-10 ring-4 ring-white shadow-sm`}
              >
                <span className="material-symbols-outlined text-sm">
                  {item.category === 'project'
                    ? 'engineering'
                    : item.category === 'license'
                    ? 'workspace_premium'
                    : 'school'}
                </span>
              </div>

              <div className="ml-6 bg-[#f8f9ff] p-5 rounded-lg border border-[#c5c6ce]/40 flex-1 transition-all hover:bg-[#eff4ff] hover:border-[#0453cd]/50 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-headline-md text-lg font-bold text-[#0b1c30]">
                      {item.title}
                    </h3>
                    <span className="font-code text-[10px] text-[#0453cd] bg-[#dce9ff] px-2 py-0.5 rounded border border-[#c5c6ce]/30">
                      {item.category.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-code text-xs text-[#75777e] bg-white px-3 py-1 rounded border border-[#c5c6ce]/30">
                    {item.date}
                  </span>
                </div>

                <p className="font-body-md text-xs text-[#44474d] leading-relaxed mb-3">
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="font-code text-[10px] text-[#0453cd] bg-[#e5eeff] px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#031632]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#c5c6ce] max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#c5c6ce]/30 pb-3">
              <h3 className="font-headline-md text-base font-bold text-[#0b1c30]">새 이력 등록</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#75777e]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-label-caps text-[#44474d] mb-1">제목</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: 현대자동차 공정 개선 캡스톤..."
                  className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2 rounded focus:outline-none focus:border-[#0453cd]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-caps text-[#44474d] mb-1">분류</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2 rounded focus:outline-none focus:border-[#0453cd]"
                  >
                    <option value="project">프로젝트</option>
                    <option value="license">자격증</option>
                    <option value="exam">시험/어학</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-caps text-[#44474d] mb-1">일시</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="2024.04"
                    className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2 rounded focus:outline-none focus:border-[#0453cd]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-caps text-[#44474d] mb-1">설명</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="주요 내용 및 정량 성과..."
                  className="w-full bg-[#f8f9ff] border border-[#c5c6ce] p-3 rounded focus:outline-none focus:border-[#0453cd]"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-[#c5c6ce]/30">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#c5c6ce] rounded font-label-caps text-[#44474d]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0453cd] text-white rounded font-label-caps hover:bg-[#0453cd]/90"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
