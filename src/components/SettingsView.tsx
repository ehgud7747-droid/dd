import React, { useState } from 'react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, setUser }) => {
  const [formData, setFormData] = useState({ ...user });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...formData });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col w-full h-full space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Toast Notification */}
      {saved && (
        <div className="fixed bottom-6 right-6 bg-[#031632] text-white px-5 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-3 border border-[#0453cd]">
          <span className="material-symbols-outlined text-[#0453cd]">check_circle</span>
          <span className="font-body-sm text-xs">프로필 및 시스템 설정이 성공적으로 저장되었습니다.</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-6 border-b border-[#c5c6ce]/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-code text-xs text-[#0453cd] font-bold uppercase tracking-widest bg-[#eff4ff] px-2 py-0.5 rounded border border-[#c5c6ce]">
            SYS-SETTINGS
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-[#0b1c30]">시스템 & 지원자 설정</h1>
        <p className="font-body-lg text-sm text-[#44474d] mt-1">
          엔지니어 식별자, 목표 지원 분야 및 AI 모델 파라미터를 구성합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c5c6ce]/30 space-y-6">
          <h2 className="font-headline-md text-lg font-bold text-[#0b1c30] flex items-center gap-2 border-b border-[#c5c6ce]/20 pb-3">
            <span className="material-symbols-outlined text-[#0453cd]">badge</span>
            지원자 인적 및 목표 정보
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body-sm text-xs">
            <div>
              <label className="block font-label-caps text-[#0b1c30] mb-1.5 font-semibold">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2.5 rounded focus:outline-none focus:border-[#0453cd]"
              />
            </div>

            <div>
              <label className="block font-label-caps text-[#0b1c30] mb-1.5 font-semibold">오퍼레이터 식별자 (ID)</label>
              <input
                type="text"
                value={formData.operatorId}
                onChange={(e) => setFormData({ ...formData, operatorId: e.target.value })}
                className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2.5 rounded focus:outline-none focus:border-[#0453cd] font-code"
              />
            </div>

            <div>
              <label className="block font-label-caps text-[#0b1c30] mb-1.5 font-semibold">목표 채용 기업</label>
              <input
                type="text"
                value={formData.targetCompany}
                onChange={(e) => setFormData({ ...formData, targetCompany: e.target.value })}
                className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2.5 rounded focus:outline-none focus:border-[#0453cd]"
              />
            </div>

            <div>
              <label className="block font-label-caps text-[#0b1c30] mb-1.5 font-semibold">목표 직무 / 역할</label>
              <input
                type="text"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2.5 rounded focus:outline-none focus:border-[#0453cd]"
              />
            </div>
          </div>
        </div>

        {/* Academic GPA Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c5c6ce]/30 space-y-6">
          <h2 className="font-headline-md text-lg font-bold text-[#0b1c30] flex items-center gap-2 border-b border-[#c5c6ce]/20 pb-3">
            <span className="material-symbols-outlined text-[#0453cd]">school</span>
            학업 및 평점 정보
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body-sm text-xs">
            <div>
              <label className="block font-label-caps text-[#0b1c30] mb-1.5 font-semibold">전체 평점 (GPA)</label>
              <input
                type="number"
                step="0.01"
                value={formData.overallGpa}
                onChange={(e) => setFormData({ ...formData, overallGpa: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2.5 rounded focus:outline-none focus:border-[#0453cd] font-code"
              />
            </div>

            <div>
              <label className="block font-label-caps text-[#0b1c30] mb-1.5 font-semibold">전공 평점</label>
              <input
                type="number"
                step="0.01"
                value={formData.majorGpa}
                onChange={(e) => setFormData({ ...formData, majorGpa: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2.5 rounded focus:outline-none focus:border-[#0453cd] font-code"
              />
            </div>

            <div>
              <label className="block font-label-caps text-[#0b1c30] mb-1.5 font-semibold">이수 학점</label>
              <input
                type="number"
                value={formData.totalCredits}
                onChange={(e) => setFormData({ ...formData, totalCredits: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#f8f9ff] border border-[#c5c6ce] px-3 py-2.5 rounded focus:outline-none focus:border-[#0453cd] font-code"
              />
            </div>
          </div>
        </div>

        {/* AI & System Integration Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c5c6ce]/30 space-y-6">
          <h2 className="font-headline-md text-lg font-bold text-[#0b1c30] flex items-center gap-2 border-b border-[#c5c6ce]/20 pb-3">
            <span className="material-symbols-outlined text-[#0453cd]">smart_toy</span>
            Spec-Chain AI 컴파일러 파라미터
          </h2>

          <div className="space-y-4 font-body-sm text-xs">
            <div className="p-4 bg-[#eff4ff] rounded border border-[#c5c6ce]/30 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0b1c30]">Gemini API Key 상태</p>
                <p className="text-[#75777e] mt-0.5">Google AI Studio에서 환경 변수를 자동으로 주입합니다.</p>
              </div>
              <span className="font-code text-xs text-[#0453cd] bg-white px-3 py-1 rounded border border-[#c5c6ce] font-bold">
                CONNECTED (GEMINI 3.6 FLASH)
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-[#0453cd] text-white rounded font-label-caps text-xs font-semibold hover:bg-[#0453cd]/90 shadow-md transition-all"
          >
            설정 저장하기
          </button>
        </div>
      </form>
    </div>
  );
};
