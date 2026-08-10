import { UserProfile, TimelineItem, CompetencyScore, Artifact, STARReportDraft, SWOTAnalysis } from '../types';

export const initialUserProfile: UserProfile = {
  id: 'ENGINEER-KIM-99',
  name: '김 엔지니어',
  operatorId: 'OPERATOR_402',
  role: '수석 엔지니어',
  readinessPercentage: 75,
  targetCompany: '현대자동차 생산기술',
  targetRole: '생산기술 / 공정 최적화 엔지니어',
  overallGpa: 3.59,
  majorGpa: 3.72,
  totalCredits: 140,
};

export const initialTimelineItems: TimelineItem[] = [
  {
    id: 'tl-1',
    title: '토익스피킹 IM3',
    category: 'exam',
    status: 'completed',
    date: '2023.05',
    description: 'TOEIC Speaking IM3 자격증을 성공적으로 취득했습니다.',
    badgeText: '취득 완료',
  },
  {
    id: 'tl-2',
    title: '한국사능력검정시험 2급',
    category: 'exam',
    status: 'completed',
    date: '2023.08',
    description: '한국사능력검정시험 2급 자격증을 성공적으로 취득했습니다.',
    badgeText: '취득 완료',
  },
  {
    id: 'tl-3',
    title: 'G-TELP 65점',
    category: 'exam',
    status: 'completed',
    date: '2023.11',
    description: 'G-TELP 시험에서 65점 이상을 획득했습니다.',
    badgeText: '취득 완료',
  },
  {
    id: 'tl-4',
    title: '일반기계기사 필기 합격',
    category: 'license',
    status: 'passed',
    date: '2024.03',
    description: '일반기계기사 필기 시험에 합격했습니다.',
    badgeText: '합격',
  },
  {
    id: 'tl-5',
    title: 'CAD/CAE 설계 프로젝트',
    category: 'project',
    status: 'completed',
    date: '2023 3분기',
    description: '구조 해석을 위해 SolidWorks 및 Ansys를 사용하여 항공우주 부품에 대한 고급 모델링 완료.',
    tags: ['SolidWorks', 'Ansys'],
    badgeText: '2023 3분기',
  },
  {
    id: 'tl-6',
    title: '캡스톤: 확장 가능한 캐리어 설계',
    category: 'project',
    status: 'in_progress',
    date: '2024 1분기 - 진행 중',
    description: '자율 창고 물류를 위한 모듈식 캐리어 시스템의 설계 및 프로토타이핑 주도.',
    progressPercentage: 65,
    badgeText: '진행 중',
  },
  {
    id: 'tl-7',
    title: '기계 엔지니어 실기 평가',
    category: 'license',
    status: 'scheduled',
    date: '2024년 2분기 예정',
    description: '필기 시험 합격. 실기 평가는 2024년 2분기로 예정되어 있습니다.',
    badgeText: '예정',
  },
];

export const initialCompetencyScores: CompetencyScore[] = [
  {
    id: 'comp-1',
    title: '공정 이해도',
    weight: 30,
    rating: 4,
    description: '장비 문제 원인을 분석하고 제조 워크플로를 최적화합니다.',
    keywords: '사이클 타임 최적화, 근본 원인 분석 (RCA)',
    iconName: 'account_tree',
  },
  {
    id: 'comp-2',
    title: '데이터 분석 및 개선',
    weight: 30,
    rating: 3,
    description: '생산 지표를 활용하여 비용을 절감하고 수율을 향상시킵니다.',
    keywords: 'LOT 데이터, SPC를 활용한 비용 절감',
    metric: '수율 15% 향상',
    iconName: 'troubleshoot',
  },
  {
    id: 'comp-3',
    title: '현장 커뮤니케이션',
    weight: 20,
    rating: 2,
    description: '작업장 운영자와 설계 엔지니어링 팀 간의 커뮤니케이션을 지원합니다.',
    keywords: '작업장 인수인계, 이종 부서 정렬',
    iconName: 'forum',
  },
  {
    id: 'comp-4',
    title: '기술 트렌드 적응',
    weight: 20,
    rating: 3,
    description: '인더스트리 4.0, IoT 및 자동 검사 도구의 통합.',
    keywords: '스마트 팩토리, IoT 센서, 머신 비전',
    iconName: 'memory',
  },
];

export const initialArtifacts: Artifact[] = [
  {
    id: 'art-1',
    code: 'CAPSTONE_CATIA',
    title: '캡스톤 CATIA 도면',
    fileName: 'CAPSTONE_CATIA_FINAL_V2.DWG',
    fileType: 'dwg',
    verified: true,
    matchCompetency: '문제 해결',
    date: '2024.01.15',
  },
  {
    id: 'art-2',
    code: 'MECH_ENG',
    title: '기계 공학 자격 증명',
    fileName: 'MECH_ENG_CERTIFICATION.PDF',
    fileType: 'cert',
    verified: true,
    matchCompetency: '도구 숙련도',
    date: '2024.03.10',
  },
  {
    id: 'art-3',
    code: 'CAD_ASSY',
    title: '최신 CAD 어셈블리',
    fileName: 'CAD_Assembly_V3_Final.stp',
    fileType: 'stp',
    verified: true,
    matchCompetency: '시스템 설계',
    date: '2024.04.02',
  },
];

export const initialDraft: STARReportDraft = {
  situation: '확장 가능한 캐리어 설계 프로젝트(PRJ-2023-A4)의 구조 분석 팀을 이끄는 동안, 우리는 조립 라인에서 동적 페이로드 이동에 필요한 모듈성이 기존 무인 운반차(AGV) 플랫폼에 부족하다는 심각한 제약에 직면했습니다.',
  task: '우리의 목표는 툴링 교체 시간을 최소 30% 단축하면서 레거시 PLC 네트워크와 원활하게 통합할 수 있는 확장 가능한 캐리어 서브시스템을 설계하는 것이었습니다.',
  action: '저는 CAD에서 토폴로지 최적화 알고리즘을 활용한 기계적 재설계를 주도하여 비틀림 강성을 손상시키지 않으면서 구조적 질량을 18% 줄였습니다. 동시에 기계 엔지니어링 팀과 산업 자동화 팀 간의 격차를 해소하여 실제 부하 주기를 시뮬레이션하는 교차 기능 검증 프로토콜을 구축했습니다.',
  result: '그 결과 최종 프로토타입은 초기 사양을 초과 달성하여 교체 가동 중지 시간을 42% 단축하고 모듈식 캐리어 배포를 위한 새로운 내부 표준을 확립했습니다. 이는 현대자동차의 생산기술 이니셔티브에 필수적인 공정 최적화 및 자동화 통합 요구사항으로 직접 해석됩니다.',
  meta: {
    readiness: '높음',
    tokensUsed: 245,
    model: 'Spec-Chain-v2.1',
    tone: '기술적 & 정밀함',
  },
};

export const initialSWOT: SWOTAnalysis = {
  strengths: '기계 분석 분야의 탁월한 핵심 역량 보유. 파라메트릭 모델링에 대한 뛰어난 적성과 실력 검증됨.',
  weaknesses: '스토리텔링 및 커뮤니케이션. 프로젝트 결과에 대한 설명이 지나치게 기술적이며, 비즈니스 가치로 연결하여 설명하는 능력이 다소 부족함.',
  opportunities: '스마트 팩토리 통합 기술에 대한 산업적 수요가 급증하고 있으며, 이는 진행하신 캡스톤 프로젝트의 주제와 완벽하게 부합합니다.',
  threats: '이론적 시뮬레이션 모델에 대한 의존도가 높아, 즉각적인 현장 투입 및 문제 해결 역량에 대한 우려가 있을 수 있음.',
  actionableInsight: '현장 인턴십 기간 동안 수행한 구체적인 업무와 의사결정 과정을 상세히 문서화하여, 실무 준비도 평가 점수를 향상시켜 보시기 바랍니다.',
};

export const gpaChartData = {
  labels: ['2020-1', '2020-2', '2023-1', '2023-2', '2024-1', '2024-2', '2025-1', '2025-2'],
  scores: [3.87, 3.39, 3.59, 3.25, 3.65, 4.20, 3.70, 3.71],
};
