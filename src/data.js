// ─── Enum Display Mappings (DB snake_case → Japanese UI) ─────────────────────
export const ENUMS = {
  japanese_level: { n1: 'N1', n2: 'N2', n3: 'N3', n4: 'N4', n5: 'N5', not_taken: '未受験', not_sure: '未定' },
  japanese_speaking_confidence: { business: 'ビジネスレベル', daily_conversation: '日常会話', basic_conversation: '基本的な会話', not_confident: '自信なし', not_sure: '未定' },
  english_level: { native: 'ネイティブ', business: 'ビジネス', conversational: '日常会話', basic: '基本', not_confident: '自信なし', not_sure: '未定' },
  desired_job_type: { sales: '営業', engineer: 'エンジニア', marketing: 'マーケティング', planning: '企画', administration: '事務', design: 'デザイン', research: '研究', other: 'その他' },
  desired_location: { tokyo_area: '東京エリア', kansai_area: '関西エリア', fukuoka_kyushu_area: '福岡・九州', nagoya_chubu_area: '名古屋・中部', other_regional_city: 'その他地方都市', anywhere_in_japan: '日本全国', not_sure: '未定', other: 'その他' },
  regional_work_willingness: { actively_wants_regional_work: '積極的に希望', open_to_regional_work: 'オープン', prefer_major_cities: '大都市希望', not_open_to_regional_work: '希望なし', not_sure: '未定' },
  nationwide_relocation_willingness: { open_to_nationwide_relocation: '転勤可', open_for_limited_period: '期間限定なら可', depends_on_conditions: '条件次第', not_open_to_nationwide_relocation: '転勤不可', not_sure: '未定' },
  visa_status: { student_visa: '学生ビザ', designated_activities: '特定活動', engineer_specialist_humanities_international: '技術・人文知識・国際業務', dependent: '家族滞在', permanent_resident: '永住者', spouse_of_japanese_national: '日本人の配偶者', spouse_of_permanent_resident: '永住者の配偶者', long_term_resident: '定住者', other: 'その他', not_sure: '未定' },
  application_source: { self: '自己応募', hbridge: 'H-bridge', other_agency: '他エージェント', school: '学校', direct_company: '企業直接', event: 'イベント', other: 'その他' },
  application_mode: { self_tracking: 'セルフ管理', hbridge_review: 'H-bridge審査中', hbridge_referral: 'H-bridge紹介', closed: '終了' },
  student_tracking_status: { interested: '興味あり', planning_to_apply: '応募予定', preparing_documents: '書類準備中', applied: '応募済', document_screening: '書類選考中', interview_scheduled: '面接予定', interview_completed: '面接完了', waiting_result: '結果待ち', offer_received: '内定', withdrawn: '辞退', rejected: '不合格', closed: '終了' },
  official_hbridge_status: { hbridge_review_required: 'H-bridge確認待ち', need_more_information: '追加情報必要', hbridge_interview_required: 'H-bridge面談必要', preparing_referral: '紹介準備中', recommended_to_company: '企業推薦済', document_screening: '書類選考', first_interview_scheduling: '一次面接調整中', first_interview_scheduled: '一次面接予定', first_interview_completed: '一次面接完了', first_interview_passed: '一次面接合格', second_interview_scheduling: '二次面接調整中', second_interview_scheduled: '二次面接予定', second_interview_completed: '二次面接完了', second_interview_passed: '二次面接合格', final_interview_scheduling: '最終面接調整中', final_interview_scheduled: '最終面接予定', final_interview_completed: '最終面接完了', offer_received: '内定', offer_accepted: '内定承諾', withdrawn: '辞退', rejected: '不合格', joining_scheduled: '入社予定', closed: '終了' },
  feedback_stage: { document_screening: '書類選考', first_interview: '一次面接', second_interview: '二次面接', final_interview: '最終面接', offer: '内定', withdrawal: '辞退', other: 'その他' },
  selection_result: { pass: '合格', reject: '不合格', hold: '保留', need_more_info: '追加情報必要' },
  feedback_reason_code: { japanese_ability: '日本語能力', lack_of_experience: '経験不足', skill_gap: 'スキルギャップ', motivation: '志望動機', job_fit: '職種適性', location_mismatch: '勤務地不一致', start_timing_mismatch: '入社時期不一致', visa_concern: 'ビザ懸念', interview_impression: '面接印象', condition_mismatch: '条件不一致', communication: 'コミュニケーション', other: 'その他' },
  event_type: { company_info_session: '企業説明会', es_writing_seminar: 'ES対策セミナー', resume_workshop: '履歴書ワークショップ', interview_preparation: '面接対策', industry_study: '業界研究', job_hunting_basics: '就活基礎', other: 'その他' },
  participation_status: { joined: '参加予定', attended: '参加済', no_show: '欠席', cancelled: 'キャンセル' },
  post_event_interest: { interested: '興味あり', request_referral: '紹介希望', not_interested: '興味なし', not_answered: '未回答' },
  support_request_type: { selection_update: '選考状況更新', interview_schedule: '面接日程', company_contacted_me: '企業から連絡あり', offer_or_decline: '内定・辞退', visa_or_joining_condition: 'ビザ・入社条件', referral_related_question: '紹介関連質問', other: 'その他' },
  support_request_status: { open: '対応待ち', in_progress: '対応中', resolved: '解決済', closed: 'クローズ' },
  publish_status: { draft: '下書き', published: '公開中', unpublished: '非公開', closed: '終了', archived: 'アーカイブ' },
  degree: { bachelor: '学士', master: '修士', phd: '博士', other: 'その他' },
  start_timing: { immediately: 'すぐに可能', within_3_months: '3ヶ月以内', april_2027: '2027年4月', october_2027: '2027年10月', other: 'その他', not_sure: '未定' },
};

// ─── Companies ───────────────────────────────────────────────────────────────
export const companies = [
  {
    id: 'harborline', name: 'Harborline Studio', industry: 'Creative & media',
    tone: ['#2D4FA5', '#4AC5EC'], headline: 'Make work feel human',
    summary: 'A design-led team shaping digital services around real everyday needs.',
    place: 'Tokyo area', path: 'Product & design', language: 'Advanced Japanese', flexible: 'Hybrid rhythm',
    traits: ['creative', 'city', 'language'], signals: ['Portfolio-led work', 'Cross-functional craft', 'Thoughtful pace'],
    roles: ['Product designer', 'Content strategist'],
    japanese_level_required: 'n2', regional_work: false, nationwide_relocation: false,
    foreign_student_friendly: true, featured: true, status: 'published',
    work_locations: ['東京'], employment_types: ['正社員']
  },
  {
    id: 'kizuna', name: 'Kizuna Mobility', industry: 'Manufacturing',
    tone: ['#1B6FE8', '#12B886'], headline: 'Move with purpose',
    summary: 'A mobility group creating dependable systems for communities across Japan.',
    place: 'Regional roles', path: 'Engineering', language: 'Japanese language support', flexible: 'Relocation guidance',
    traits: ['making', 'regional', 'support'], signals: ['Regional impact', 'Hands-on learning', 'Long-term pathways'],
    roles: ['Mechanical engineer', 'Operations associate'],
    japanese_level_required: 'n3', regional_work: true, nationwide_relocation: true,
    foreign_student_friendly: true, featured: true, status: 'published',
    work_locations: ['名古屋', '浜松', '広島'], employment_types: ['正社員']
  },
  {
    id: 'nami', name: 'Nami Systems', industry: 'Technology',
    tone: ['#253353', '#7387B9'], headline: 'Quietly brilliant software',
    summary: 'A growing software team building useful tools for hospitality and local commerce.',
    place: 'Flexible location', path: 'Technology', language: 'English welcome', flexible: 'Hybrid rhythm',
    traits: ['technology', 'flexible', 'language'], signals: ['Clear product craft', 'Mentored ownership', 'Human-centered systems'],
    roles: ['Frontend engineer', 'Customer success associate'],
    japanese_level_required: 'n3', regional_work: false, nationwide_relocation: false,
    foreign_student_friendly: true, featured: false, status: 'published',
    work_locations: ['東京', 'リモート可'], employment_types: ['正社員', '契約社員']
  },
  {
    id: 'mori', name: 'Mori & Field', industry: 'Food & retail',
    tone: ['#E17A3E', '#F5C260'], headline: 'Good food, shared well',
    summary: 'A values-led food company connecting local makers with new communities.',
    place: 'Kansai area', path: 'Brand & retail', language: 'Japanese language support', flexible: 'Regional work',
    traits: ['making', 'regional', 'community'], signals: ['Community connection', 'Brand storytelling', 'Place-based work'],
    roles: ['Retail planning associate', 'Brand coordinator'],
    japanese_level_required: 'n2', regional_work: true, nationwide_relocation: false,
    foreign_student_friendly: false, featured: false, status: 'published',
    work_locations: ['大阪', '京都'], employment_types: ['正社員']
  },
  {
    id: 'sora', name: 'Sora Health Lab', industry: 'Healthcare',
    tone: ['#167B72', '#5EC197'], headline: 'Care in every detail',
    summary: 'A research-minded health group translating better care into daily practice.',
    place: 'Fukuoka area', path: 'Research & care', language: 'Advanced Japanese', flexible: 'Focused location',
    traits: ['care', 'regional', 'language'], signals: ['Purposeful research', 'Careful collaboration', 'Specialist growth'],
    roles: ['Research coordinator', 'Medical sales associate'],
    japanese_level_required: 'n1', regional_work: true, nationwide_relocation: false,
    foreign_student_friendly: true, featured: false, status: 'published',
    work_locations: ['福岡'], employment_types: ['正社員']
  },
  {
    id: 'arc', name: 'Arc Works', industry: 'Consulting',
    tone: ['#1B6FE8', '#38D9A9'], headline: 'Make the next move matter',
    summary: 'A practical consulting collective helping organisations grow through people.',
    place: 'Nationwide', path: 'Business & people', language: 'International team', flexible: 'Relocation guidance',
    traits: ['people', 'regional', 'flexible'], signals: ['Structured learning', 'Broad exposure', 'Human-first consulting'],
    roles: ['Business consultant', 'People operations associate'],
    japanese_level_required: 'n2', regional_work: true, nationwide_relocation: true,
    foreign_student_friendly: true, featured: false, status: 'published',
    work_locations: ['東京', '大阪', '福岡', '名古屋'], employment_types: ['正社員']
  }
];

// ─── Jobs (2 per company) ────────────────────────────────────────────────────
export const jobs = [
  { id: 'j1', company_id: 'harborline', title: 'Product Designer', job_type: 'design', location: '東京', employment_type: '正社員', japanese_level_required: 'n2', english_level_required: 'conversational', start_timing: 'april_2027', regional_placement: false, nationwide_transfer: false, housing_support: false, status: 'published' },
  { id: 'j2', company_id: 'harborline', title: 'Content Strategist', job_type: 'marketing', location: '東京', employment_type: '正社員', japanese_level_required: 'n2', english_level_required: 'business', start_timing: 'april_2027', regional_placement: false, nationwide_transfer: false, housing_support: false, status: 'published' },
  { id: 'j3', company_id: 'kizuna', title: 'Mechanical Engineer', job_type: 'engineer', location: '名古屋', employment_type: '正社員', japanese_level_required: 'n3', english_level_required: 'basic', start_timing: 'april_2027', regional_placement: true, nationwide_transfer: true, housing_support: true, status: 'published' },
  { id: 'j4', company_id: 'kizuna', title: 'Operations Associate', job_type: 'administration', location: '浜松', employment_type: '正社員', japanese_level_required: 'n3', english_level_required: 'basic', start_timing: 'april_2027', regional_placement: true, nationwide_transfer: true, housing_support: true, status: 'published' },
  { id: 'j5', company_id: 'nami', title: 'Frontend Engineer', job_type: 'engineer', location: 'リモート可', employment_type: '正社員', japanese_level_required: 'n3', english_level_required: 'business', start_timing: 'within_3_months', regional_placement: false, nationwide_transfer: false, housing_support: false, status: 'published' },
  { id: 'j6', company_id: 'nami', title: 'Customer Success Associate', job_type: 'sales', location: '東京', employment_type: '契約社員', japanese_level_required: 'n2', english_level_required: 'conversational', start_timing: 'april_2027', regional_placement: false, nationwide_transfer: false, housing_support: false, status: 'published' },
  { id: 'j7', company_id: 'mori', title: 'Retail Planning Associate', job_type: 'planning', location: '大阪', employment_type: '正社員', japanese_level_required: 'n2', english_level_required: 'basic', start_timing: 'april_2027', regional_placement: true, nationwide_transfer: false, housing_support: false, status: 'published' },
  { id: 'j8', company_id: 'mori', title: 'Brand Coordinator', job_type: 'marketing', location: '京都', employment_type: '正社員', japanese_level_required: 'n2', english_level_required: 'conversational', start_timing: 'april_2027', regional_placement: true, nationwide_transfer: false, housing_support: false, status: 'published' },
  { id: 'j9', company_id: 'sora', title: 'Research Coordinator', job_type: 'research', location: '福岡', employment_type: '正社員', japanese_level_required: 'n1', english_level_required: 'business', start_timing: 'april_2027', regional_placement: true, nationwide_transfer: false, housing_support: true, status: 'published' },
  { id: 'j10', company_id: 'sora', title: 'Medical Sales Associate', job_type: 'sales', location: '福岡', employment_type: '正社員', japanese_level_required: 'n1', english_level_required: 'basic', start_timing: 'april_2027', regional_placement: true, nationwide_transfer: false, housing_support: false, status: 'published' },
  { id: 'j11', company_id: 'arc', title: 'Business Consultant', job_type: 'planning', location: '東京・大阪', employment_type: '正社員', japanese_level_required: 'n2', english_level_required: 'business', start_timing: 'april_2027', regional_placement: true, nationwide_transfer: true, housing_support: true, status: 'published' },
  { id: 'j12', company_id: 'arc', title: 'People Operations Associate', job_type: 'administration', location: '東京', employment_type: '正社員', japanese_level_required: 'n2', english_level_required: 'conversational', start_timing: 'april_2027', regional_placement: false, nationwide_transfer: false, housing_support: false, status: 'published' },
];

// ─── Mock Student Profile ────────────────────────────────────────────────────
export const mockStudentProfile = {
  id: 'sp-001', user_id: 'u-001', full_name: 'Nguyen Minh Tuan', email: 'tuan.nguyen@example.com',
  phone: '080-1234-5678', nationality: 'Vietnamese', current_location: '東京都新宿区',
  university_name: '早稲田大学', faculty: '商学部', major_category: 'Business', degree: 'bachelor',
  graduation_year: 2027, graduation_month: 3,
  japanese_level: 'n2', japanese_speaking_confidence: 'daily_conversation',
  english_level: 'business', other_languages: 'Vietnamese (native)',
  desired_job_type: 'engineer', desired_industry: 'Technology',
  desired_location: 'tokyo_area', location_flexibility: 'Open to Kansai area as well',
  regional_work_willingness: 'open_to_regional_work', nationwide_relocation_willingness: 'depends_on_conditions',
  long_term_work_intention: 'yes',
  current_visa_status: 'student_visa', visa_expiry: '2027-09-30', need_visa_support: true,
  available_start_timing: 'april_2027',
  resume_url: '', linkedin_url: 'https://linkedin.com/in/tuan-nguyen', github_url: 'https://github.com/tuann', portfolio_url: '',
  profile_completion_score: 72
};

// ─── Mock Career Check Result ────────────────────────────────────────────────
export const mockCareerCheck = {
  scores: { japanese_communication: 18, job_clarity: 12, resume_readiness: 14, interview_readiness: 10, japan_motivation: 13, visa_clarity: 8 },
  total_score: 75, max_score: 100,
  completed_at: '2026-07-08T14:30:00Z',
  answers: {
    japanese_confidence: 'Daily conversation level',
    interview_confidence: 'Need preparation',
    career_direction: 'Comparing a few paths',
    resume_readiness: 'In progress',
    interview_preparation: 'Some preparation done',
    japan_motivation: 'Committed to Japan career',
    visa_clarity: 'Clear visa and timing'
  }
};

// ─── Mock Applications ───────────────────────────────────────────────────────
export const mockApplications = [
  {
    id: 'app-001', student_id: 'sp-001', company_id: 'harborline', job_id: 'j1',
    external_company_name: null, external_job_title: null,
    application_source: 'self', application_mode: 'self_tracking',
    student_tracking_status: 'applied', official_hbridge_status: null,
    referral_requested_at: null, next_action_date: '2026-07-20',
    student_note: 'Applied via company website. Waiting for document screening result.',
    es_questions: [
      { question: '自己PR', answer: 'ベトナムから日本に留学し、異文化環境での適応力を磨いてきました。チームワークを重視し、多様な視点を活かした課題解決が得意です。' },
      { question: '学生時代に力を入れたこと', answer: 'ハッカソンへの参加を通じて、短期間でのプロダクト開発と効果的なチーム協働を学びました。' }
    ],
    interview_memos: [],
    created_at: '2026-07-05T10:00:00Z'
  },
  {
    id: 'app-002', student_id: 'sp-001', company_id: 'nami', job_id: null,
    external_company_name: null, external_job_title: null,
    application_source: 'hbridge', application_mode: 'hbridge_review',
    student_tracking_status: 'planning_to_apply', official_hbridge_status: 'hbridge_review_required',
    referral_requested_at: '2026-07-08T15:00:00Z', next_action_date: '2026-07-15',
    student_note: 'Interested after browsing Compass. Requested H-bridge referral support.',
    es_questions: [],
    interview_memos: [],
    created_at: '2026-07-08T15:00:00Z'
  },
  {
    id: 'app-003', student_id: 'sp-001', company_id: 'arc', job_id: 'j11',
    external_company_name: null, external_job_title: null,
    application_source: 'event', application_mode: 'hbridge_referral',
    student_tracking_status: 'interview_scheduled', official_hbridge_status: 'first_interview_scheduled',
    referral_requested_at: '2026-06-20T09:00:00Z', next_action_date: '2026-07-18',
    student_note: 'Met at company info session. H-bridge made the referral.',
    es_questions: [
      { question: '自己PR', answer: '国際ビジネスに強い関心を持ち、多文化チームでのコンサルティング経験を積みたいと考えています。' },
      { question: '志望動機', answer: 'Arc Worksの「人を通じて組織を育てる」という理念に共感し、グローバルな視点を活かして貢献したいです。' }
    ],
    interview_memos: [
      { date: '2026-07-10', company: 'Arc Works', notes: 'カジュアル面談。チームの雰囲気は良好。次回は一次面接。' }
    ],
    created_at: '2026-06-20T09:00:00Z'
  }
];

// ─── Mock Selection Feedback ─────────────────────────────────────────────────
export const mockSelectionFeedback = [
  {
    id: 'fb-001', application_id: 'app-003', stage: 'first_interview', result: 'pass',
    reason_codes: [],
    company_feedback_raw: '候補者のコミュニケーション能力は高く、チームフィットも良好。二次面接に進めてください。',
    internal_note: 'Strong candidate. Prioritize for fast-track.',
    student_facing_feedback: '一次面接の結果、合格です。コミュニケーション能力とチームへの適性が高く評価されました。次のステップに進みましょう。',
    next_action: '二次面接の準備を進めてください。H-bridgeから日程調整の連絡をします。',
    share_with_student: true, is_read_by_student: false,
    published_at: '2026-07-10T16:00:00Z', created_by: 'admin-001'
  },
  {
    id: 'fb-002', application_id: 'app-003', stage: 'second_interview', result: 'hold',
    reason_codes: ['japanese_ability', 'interview_impression'],
    company_feedback_raw: '日本語でのディスカッション力にやや不安がある。もう一度確認したい。',
    internal_note: 'Company wants to see improvement in business Japanese. Consider recommending ES seminar.',
    student_facing_feedback: '',
    next_action: '',
    share_with_student: false, is_read_by_student: false,
    published_at: null, created_by: 'admin-001'
  }
];

// ─── Events (6 total) ────────────────────────────────────────────────────────
export const events = [
  {
    id: 'regional-paths', kind: 'Company information session', event_type: 'company_info_session',
    title: 'Discover careers beyond the major cities',
    detail: 'Meet teams working across Japan and explore what a regional move can mean for your career.',
    mode: 'Online conversation', theme: ['#1559B3', '#12B886'],
    date: '2026-07-25T14:00:00Z', capacity: 30, participants_count: 18, company_id: 'kizuna', status: 'published'
  },
  {
    id: 'resume-story', kind: 'Resume workshop', event_type: 'resume_workshop',
    title: 'Build a resume that tells your story',
    detail: 'Turn experience, values, and career direction into a clear narrative employers can understand.',
    mode: 'Interactive workshop', theme: ['#247A87', '#61C6BD'],
    date: '2026-07-28T10:00:00Z', capacity: 20, participants_count: 12, company_id: null, status: 'published'
  },
  {
    id: 'interview-practice', kind: 'Interview preparation', event_type: 'interview_preparation',
    title: 'Prepare for a thoughtful interview conversation',
    detail: 'Reflect on your motivation, questions, and readiness in a supportive group setting.',
    mode: 'Small-group practice', theme: ['#1B6FE8', '#38D9A9'],
    date: '2026-08-01T13:00:00Z', capacity: 15, participants_count: 8, company_id: null, status: 'published'
  },
  {
    id: 'es-seminar', kind: 'ES writing seminar', event_type: 'es_writing_seminar',
    title: 'Write an ES that stands out',
    detail: 'Learn techniques for writing Self PR and Gakuchika that clearly convey your strengths.',
    mode: 'Lecture + practice', theme: ['#2D4FA5', '#4AC5EC'],
    date: '2026-08-05T14:00:00Z', capacity: 25, participants_count: 5, company_id: null, status: 'published'
  },
  {
    id: 'industry-study', kind: 'Industry study', event_type: 'industry_study',
    title: 'Tech industry deep-dive for international students',
    detail: 'Understand the landscape of Japanese tech companies and what they look for in global talent.',
    mode: 'Panel discussion', theme: ['#253353', '#7387B9'],
    date: '2026-08-10T15:00:00Z', capacity: 40, participants_count: 22, company_id: null, status: 'published'
  },
  {
    id: 'job-hunting-101', kind: 'Job hunting basics', event_type: 'job_hunting_basics',
    title: 'Japanese job hunting: where to begin',
    detail: 'A beginner-friendly session covering shukatsu timing, key documents, and mindset for success.',
    mode: 'Interactive workshop', theme: ['#167B72', '#5EC197'],
    date: '2026-08-15T10:00:00Z', capacity: 50, participants_count: 30, company_id: null, status: 'published'
  }
];

// ─── Mock Support Requests ───────────────────────────────────────────────────
export const mockSupportRequests = [
  { id: 'sr-001', student_id: 'sp-001', application_id: 'app-003', company_id: 'arc', request_type: 'interview_schedule', message: 'Arc Worksの一次面接の日程について確認したいです。来週の火曜日と水曜日が都合が良いです。', status: 'resolved', priority: 'high', assigned_admin_id: 'admin-001', is_read_by_student: true, resolved_at: '2026-07-09T10:00:00Z', created_at: '2026-07-08T16:00:00Z' },
  { id: 'sr-002', student_id: 'sp-001', application_id: null, company_id: null, request_type: 'referral_related_question', message: 'Nami Systemsへの紹介可能性について、進捗を教えていただけますか？', status: 'open', priority: 'medium', assigned_admin_id: null, is_read_by_student: false, resolved_at: null, created_at: '2026-07-10T11:00:00Z' }
];

// ─── Mock Admin Notes (NEVER visible to students) ────────────────────────────
export const mockAdminNotes = [
  { id: 'an-001', student_id: 'sp-001', note: 'Tuan has strong potential for tech roles. Japanese needs improvement for client-facing positions. Recommend ES seminar participation before next referral.', created_by: 'admin-001', created_at: '2026-07-09T14:00:00Z' },
  { id: 'an-002', student_id: 'sp-001', note: 'Arc Works interested in Tuan. Fast-track the interview scheduling. Company mentioned they want someone with regional flexibility.', created_by: 'admin-001', created_at: '2026-07-10T09:00:00Z' }
];

// ─── Mock Activities ─────────────────────────────────────────────────────────
export const mockActivities = [
  { id: 'act-001', type: 'profile_updated', description: 'プロフィールを更新しました', timestamp: '2026-07-10T08:00:00Z' },
  { id: 'act-002', type: 'career_check_completed', description: 'Career Checkを完了しました（スコア: 75/100）', timestamp: '2026-07-08T14:30:00Z' },
  { id: 'act-003', type: 'interested_added', description: 'Nami Systemsを「興味あり」に追加しました', timestamp: '2026-07-08T12:00:00Z' },
  { id: 'act-004', type: 'referral_requested', description: 'Nami Systemsへの紹介サポートをリクエストしました', timestamp: '2026-07-08T15:00:00Z' },
  { id: 'act-005', type: 'event_joined', description: '「Discover careers beyond the major cities」に参加予定登録しました', timestamp: '2026-07-07T09:00:00Z' }
];

// ─── Mock Students (for Admin list) ──────────────────────────────────────────
export const mockStudents = [
  { ...mockStudentProfile },
  { id: 'sp-002', user_id: 'u-002', full_name: 'Li Wei', email: 'wei.li@example.com', phone: '080-5555-1234', nationality: 'Chinese', current_location: '大阪市北区', university_name: '大阪大学', faculty: '工学部', major_category: 'Engineering', degree: 'master', graduation_year: 2027, graduation_month: 3, japanese_level: 'n1', japanese_speaking_confidence: 'business', english_level: 'conversational', desired_job_type: 'engineer', desired_industry: 'Manufacturing', desired_location: 'kansai_area', regional_work_willingness: 'actively_wants_regional_work', nationwide_relocation_willingness: 'open_to_nationwide_relocation', current_visa_status: 'student_visa', available_start_timing: 'april_2027', profile_completion_score: 90, long_term_work_intention: 'yes' },
  { id: 'sp-003', user_id: 'u-003', full_name: 'Kim Soo-yeon', email: 'sooyeon.kim@example.com', phone: '080-9999-8765', nationality: 'Korean', current_location: '東京都渋谷区', university_name: '東京大学', faculty: '経済学部', major_category: 'Economics', degree: 'bachelor', graduation_year: 2027, graduation_month: 9, japanese_level: 'n2', japanese_speaking_confidence: 'daily_conversation', english_level: 'native', desired_job_type: 'planning', desired_industry: 'Consulting', desired_location: 'tokyo_area', regional_work_willingness: 'prefer_major_cities', nationwide_relocation_willingness: 'not_open_to_nationwide_relocation', current_visa_status: 'student_visa', available_start_timing: 'october_2027', profile_completion_score: 65, long_term_work_intention: 'considering' }
];

// ─── Filter Groups & Prompt Suggestions (kept from original) ─────────────────
export const promptSuggestions = [
  'Show me work with regional impact',
  'I want to build things with my hands',
  'Help me find an international team',
  'I am exploring a creative career'
];

export const filterGroups = [
  { label: 'Work direction', values: [['creative', 'Creative & media'], ['technology', 'Technology'], ['making', 'Making & operations'], ['people', 'Business & people'], ['care', 'Research & care']] },
  { label: 'Place & flexibility', values: [['city', 'City-based roles'], ['regional', 'Regional work'], ['flexible', 'Flexible location'], ['support', 'Relocation guidance']] },
  { label: 'Candidate support', values: [['language', 'Advanced Japanese'], ['community', 'Community-minded work']] }
];
