import React, { useState } from 'react';
import { NavView, UserProfile, TimelineItem, CompetencyScore, Artifact, STARReportDraft, SWOTAnalysis } from './types';
import {
  initialUserProfile,
  initialTimelineItems,
  initialCompetencyScores,
  initialArtifacts,
  initialDraft,
  initialSWOT,
} from './data/initialData';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { DiagnosisView } from './components/DiagnosisView';
import { AIReportView } from './components/AIReportView';
import { TimelineView } from './components/TimelineView';
import { SettingsView } from './components/SettingsView';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Global domain state
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>(initialTimelineItems);
  const [competencyScores, setCompetencyScores] = useState<CompetencyScore[]>(initialCompetencyScores);
  const [artifacts, setArtifacts] = useState<Artifact[]>(initialArtifacts);
  const [draft, setDraft] = useState<STARReportDraft>(initialDraft);
  const [swot, setSwot] = useState<SWOTAnalysis>(initialSWOT);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans flex flex-col">
      {/* Navigation Header & Sidebar */}
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Viewport */}
      <main className="ml-72 pt-20 p-8 flex-1 flex flex-col min-h-[calc(100vh-5rem)]">
        {currentView === 'dashboard' && (
          <DashboardView
            user={user}
            timelineItems={timelineItems}
            setTimelineItems={setTimelineItems}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'competency-diagnosis' && (
          <DiagnosisView
            competencyScores={competencyScores}
            setCompetencyScores={setCompetencyScores}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'ai-report' && (
          <AIReportView
            draft={draft}
            setDraft={setDraft}
            swot={swot}
            setSwot={setSwot}
            artifacts={artifacts}
            setArtifacts={setArtifacts}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'project-timeline' && (
          <TimelineView
            timelineItems={timelineItems}
            setTimelineItems={setTimelineItems}
          />
        )}

        {currentView === 'settings' && (
          <SettingsView
            user={user}
            setUser={setUser}
          />
        )}
      </main>
    </div>
  );
}
