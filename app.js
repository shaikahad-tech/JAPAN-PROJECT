const companies = [
  {
    id: 'harbor',
    name: 'Harborline Studio',
    industry: 'Creative & media',
    description: 'A design-led team building clear, accessible digital experiences for everyday services.',
    cover: 'ocean',
    coverLabel: 'Make work feel human',
    tags: ['Tokyo area', 'Advanced Japanese', 'Foreign-student friendly'],
    filters: ['creative', 'n2', 'tokyo', 'friendly'],
    featured: true,
    jobs: ['Product designer', 'Content strategist']
  },
  {
    id: 'kizuna',
    name: 'Kizuna Mobility',
    industry: 'Manufacturing',
    description: 'A people-first mobility group creating reliable systems for communities across Japan.',
    cover: 'rose',
    coverLabel: 'Move with purpose',
    tags: ['Regional roles', 'Engineering', 'Japanese support'],
    filters: ['manufacturing', 'regional', 'n3'],
    featured: false,
    jobs: ['Mechanical engineer', 'Operations associate']
  },
  {
    id: 'nami',
    name: 'Nami Systems',
    industry: 'Technology',
    description: 'A growing software team focused on useful tools for hospitality and local commerce.',
    cover: 'ink',
    coverLabel: 'Quietly brilliant software',
    tags: ['Hybrid work', 'Technology', 'English welcome'],
    filters: ['technology', 'tokyo', 'friendly'],
    featured: true,
    jobs: ['Frontend engineer', 'Customer success associate']
  },
  {
    id: 'mori',
    name: 'Mori & Field',
    industry: 'Food & retail',
    description: 'A values-driven food company bringing thoughtful products from local makers to more people.',
    cover: 'sun',
    coverLabel: 'Good food, shared well',
    tags: ['Kansai area', 'Sales', 'Regional work'],
    filters: ['retail', 'kansai', 'regional'],
    featured: false,
    jobs: ['Retail planning associate', 'Brand coordinator']
  },
  {
    id: 'sora',
    name: 'Sora Health Lab',
    industry: 'Healthcare',
    description: 'A research-minded health group helping teams turn better care into daily practice.',
    cover: 'forest',
    coverLabel: 'Care in every detail',
    tags: ['Fukuoka area', 'Research', 'Advanced Japanese'],
    filters: ['healthcare', 'fukuoka', 'n2'],
    featured: false,
    jobs: ['Research coordinator', 'Medical sales associate']
  },
  {
    id: 'arc',
    name: 'Arc Works',
    industry: 'Consulting',
    description: 'A practical consulting collective helping organizations grow with their people in mind.',
    cover: 'lilac',
    coverLabel: 'Make the next move matter',
    tags: ['Nationwide', 'Business roles', 'Support available'],
    filters: ['consulting', 'nationwide', 'friendly'],
    featured: true,
    jobs: ['Business consultant', 'People operations associate']
  },
  {
    id: 'tsugi',
    name: 'Tsugi Logistics',
    industry: 'Logistics',
    description: 'A future-facing logistics team making regional supply chains easier to navigate.',
    cover: 'sand',
    coverLabel: 'Everywhere feels closer',
    tags: ['Regional roles', 'Operations', 'Japanese support'],
    filters: ['logistics', 'regional', 'n3'],
    featured: false,
    jobs: ['Logistics planner', 'Data operations associate']
  },
  {
    id: 'hikari',
    name: 'Hikari Learning',
    industry: 'Education',
    description: 'An education company creating welcoming learning journeys for diverse communities.',
    cover: 'midnight',
    coverLabel: 'Open more doors',
    tags: ['Remote friendly', 'Education', 'English welcome'],
    filters: ['education', 'tokyo', 'friendly'],
    featured: false,
    jobs: ['Learning experience designer', 'Community associate']
  }
];

const events = [
  { id: 'welcome', type: 'Company info session', title: 'Discover careers beyond the major cities', copy: 'Meet teams hiring for meaningful regional roles and learn how to explore a move with confidence.', tags: ['Online', 'Regional careers'] },
  { id: 'resume', type: 'Resume workshop', title: 'Build a resume that tells your story', copy: 'A focused workshop for turning your experience, strengths, and career direction into a clear narrative.', tags: ['Career support', 'Bring your draft'] },
  { id: 'interview', type: 'Interview preparation', title: 'Interview preparation for Japan-based roles', copy: 'Practice communicating your motivation, readiness, and questions in a supportive small-group format.', tags: ['Interactive', 'Career support'] }
];

const appState = {
  route: '',
  query: '',
  filters: new Set(),
  saved: new Set(),
  joinedEvents: new Set(),
  applications: [],
  view: 'grid',
  sort: 'recommended',
  modal: null,
  toasts: [],
  profileSaved: false,
  careerAnswers: {},
  careerComplete: false
};

const icon = {
  search: '⌕',
  briefcase: '▣',
  building: '▦',
  compass: '◌',
  calendar: '◇',
  heart: '♡',
  user: '◉',
  dashboard: '▤',
  work: '◫',
  spark: '✦',
  arrow: '→',
  menu: '☷'
};

function routeFromHash() {
  return location.hash.replace(/^#\/?/, '') || 'companies';
}

function navigate(route) {
  location.hash = `/${route}`;
}

function toast(message) {
  const id = `${Date.now()}-${Math.random()}`;
  appState.toasts.push({ id, message });
  renderToasts();
  window.setTimeout(() => {
    appState.toasts = appState.toasts.filter(item => item.id !== id);
    renderToasts();
  }, 3600);
}

function renderToasts() {
  let zone = document.querySelector('.toast-zone');
  if (!zone) {
    zone = document.createElement('div');
    zone.className = 'toast-zone';
    document.body.appendChild(zone);
  }
  zone.innerHTML = appState.toasts.map(item => `<div class="toast">${item.message}</div>`).join('');
}

function navLink(route, label, glyph) {
  return `<a class="nav-link ${appState.route === route ? 'active' : ''}" href="#/${route}"><span>${glyph}</span>${label}</a>`;
}

function header() {
  const route = appState.route;
  return `
    <header class="topbar">
      <a class="brand" href="#/companies" aria-label="H-bridge Career home"><span class="brand-mark"></span><span>H-bridge Career</span></a>
      <nav class="primary-nav" aria-label="Primary navigation">
        ${navLink('companies', 'Discover companies', icon.building)}
        ${navLink('jobs', 'Explore jobs', icon.briefcase)}
        ${navLink('events', 'Career events', icon.calendar)}
        ${navLink('dashboard', 'My workspace', icon.dashboard)}
      </nav>
      <div class="header-actions">
        <button class="language" type="button" data-action="language">English⌄</button>
        <button class="button primary" type="button" data-route="profile">Complete profile</button>
        <button class="button outline" type="button" data-route="login">Sign in</button>
      </div>
    </header>`;
}

function mobileNav() {
  const links = [
    ['dashboard', 'Home', icon.dashboard],
    ['companies', 'Discover', icon.compass],
    ['saved', 'Interested', icon.heart],
    ['applications', 'Workspace', icon.work],
    ['profile', 'Profile', icon.user]
  ];
  return `<nav class="mobile-nav" aria-label="Mobile navigation">${links.map(([route, label, glyph]) => `<button data-route="${route}" class="${appState.route === route ? 'active' : ''}"><span>${glyph}</span>${label}</button>`).join('')}</nav>`;
}

function contextBar(kind) {
  return `
    <div class="contextbar">
      <div class="switcher" aria-label="Explore type">
        <button data-route="companies" class="${kind === 'companies' ? 'active' : ''}">Companies</button>
        <button data-route="jobs" class="${kind === 'jobs' ? 'active' : ''}">Jobs</button>
      </div>
      <label class="search-wrap"><span class="search-icon">${icon.search}</span><input data-search type="search" value="${escapeHtml(appState.query)}" placeholder="Search by name, industry, role, or location" aria-label="Search opportunities" /></label>
      <div class="sort-tabs" aria-label="Sort options">
        <button data-action="set-sort" data-sort="recommended" class="${appState.sort === 'recommended' ? 'active' : ''}">Recommended</button>
        <button data-action="set-sort" data-sort="featured" class="${appState.sort === 'featured' ? 'active' : ''}">Featured</button>
      </div>
    </div>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

const filterGroups = [
  { title: 'Industry', options: [['technology', 'Technology'], ['manufacturing', 'Manufacturing'], ['creative', 'Creative & media'], ['consulting', 'Consulting'], ['retail', 'Food & retail'], ['healthcare', 'Healthcare'], ['logistics', 'Logistics'], ['education', 'Education']] },
  { title: 'Location & flexibility', options: [['tokyo', 'Tokyo area'], ['kansai', 'Kansai area'], ['fukuoka', 'Fukuoka area'], ['regional', 'Open to regional work'], ['nationwide', 'Open to nationwide relocation']] },
  { title: 'Work with confidence', options: [['friendly', 'Foreign-student friendly'], ['n2', 'Advanced Japanese'], ['n3', 'Japanese language support']] }
];

function filterPanel() {
  return `<aside class="filter-panel" aria-label="Opportunity filters">
    <h2>FILTERS</h2>
    ${filterGroups.map(group => `
      <section class="filter-group">
        <button class="filter-title" data-action="toggle-filter"><span>${group.title}</span><span>⌃</span></button>
        <div class="filter-options">
          ${group.options.map(([id, label]) => `<label class="filter-option"><input type="checkbox" data-filter="${id}" ${appState.filters.has(id) ? 'checked' : ''} /><span>${label}</span></label>`).join('')}
        </div>
      </section>`).join('')}
    <button class="filter-clear" data-action="clear-filters">Clear filters</button>
  </aside>`;
}

function companyCard(company) {
  const saved = appState.saved.has(company.id);
  return `<article class="company-card" data-card="${company.id}" data-searchable="${escapeHtml(`${company.name} ${company.industry} ${company.description} ${company.tags.join(' ')}`.toLowerCase())}" data-filters="${company.filters.join(' ')}">
    <div class="cover ${company.cover}"><span class="cover-label">${company.coverLabel}</span></div>
    <div class="card-body">
      <div>
        <div class="company-name-row"><h2 class="company-name">${company.name}</h2><button class="bookmark ${saved ? 'saved' : ''}" data-action="toggle-save" data-company="${company.id}" aria-label="${saved ? 'Remove from Interested' : 'Save to Interested'}">${saved ? '♥' : '♡'}</button></div>
        <p class="industry">${company.industry}</p>
        <p class="company-description">${company.description}</p>
        <div class="tags">${company.tags.slice(0, 3).map((tag, index) => `<span class="tag ${index === 0 ? 'accent' : ''}">${tag}</span>`).join('')}</div>
      </div>
      <div class="card-actions"><button class="button coral small" data-action="open-company" data-company="${company.id}">Explore</button><button class="button outline small" data-action="toggle-save" data-company="${company.id}">${saved ? 'Saved' : 'Interested'}</button></div>
    </div>
  </article>`;
}

function discoverView() {
  let displayed = [...companies];
  if (appState.sort === 'featured') displayed.sort((a, b) => Number(b.featured) - Number(a.featured));
  return `
    ${contextBar('companies')}
    <div class="discover-layout">
      ${filterPanel()}
      <main class="discover-main">
        <div class="discover-heading">
          <div><span class="eyebrow">Find your place</span><h1>Companies for your next step</h1><p class="heading-copy">Explore teams that value your perspective, goals, and potential.</p></div>
          <div class="view-controls" aria-label="View mode"><button class="icon-button ${appState.view === 'grid' ? 'active' : ''}" data-action="set-view" data-view="grid" aria-label="Grid view">▦</button><button class="icon-button ${appState.view === 'list' ? 'active' : ''}" data-action="set-view" data-view="list" aria-label="List view">☷</button></div>
        </div>
        <p class="results-note" data-results-note>Curated opportunities that match your current filters.</p>
        <section class="company-grid ${appState.view === 'list' ? 'list' : ''}" data-company-grid>
          ${displayed.map(companyCard).join('')}
        </section>
        <div class="empty-state" data-empty hidden><span class="empty-icon">⌕</span><h2>No close match yet</h2><p>Try a broader search or clear a filter to find more directions to explore.</p><button class="button primary" data-action="clear-filters">Show all opportunities</button></div>
      </main>
    </div>`;
}

function jobCard(company, job) {
  const id = `${company.id}-${job.replaceAll(' ', '-').toLowerCase()}`;
  const isAdded = appState.applications.some(app => app.id === id);
  return `<article class="job-card" data-job-card data-searchable="${escapeHtml(`${job} ${company.name} ${company.industry} ${company.tags.join(' ')}`.toLowerCase())}">
    <span class="eyebrow">${company.name}</span><h2>${job}</h2><p>Explore the role, its team, and the support available as you plan your next move.</p>
    <div class="meta-line"><span class="tag accent">${company.industry}</span><span class="tag">${company.tags[0]}</span><span class="tag">${company.tags[1]}</span></div>
    <div class="card-actions"><button class="button coral small" data-action="add-application" data-job="${escapeHtml(job)}" data-company="${company.id}">${isAdded ? 'In workspace' : 'Add to workspace'}</button><button class="button outline small" data-action="open-company" data-company="${company.id}">Company</button></div>
  </article>`;
}

function jobsView() {
  const jobs = companies.flatMap(company => company.jobs.map(job => jobCard(company, job))).join('');
  return `${contextBar('jobs')}<main class="page"><div class="page-intro"><span class="eyebrow">Explore roles</span><h1>Jobs with room to grow</h1><p>Use this space to compare role direction, workplace flexibility, and employer support before you commit.</p></div><section class="job-grid" data-job-grid>${jobs}</section><div class="empty-state" data-job-empty hidden><span class="empty-icon">⌕</span><h2>No close match yet</h2><p>Try another keyword to keep exploring.</p></div></main>`;
}

function dashboardView() {
  const interestMessage = appState.saved.size ? 'Your saved companies are ready whenever you want to revisit them.' : 'Save companies you would like to revisit, then ask H-bridge for referral support when you are ready.';
  return `<main class="page"><div class="dashboard-layout"><div class="section-stack"><section class="panel hero-panel"><span class="eyebrow">Your H-bridge workspace</span><h1>Make the next step feel more possible.</h1><p>Keep your profile, career preparation, and company exploration connected in one calm place.</p><div class="progress-card"><span class="progress-orb"></span><div class="progress-copy"><strong>${appState.profileSaved ? 'Profile details saved' : 'Start with your profile'}</strong><span>${appState.profileSaved ? 'You can update this anytime.' : 'A thoughtful profile helps H-bridge support you.'}</span></div></div></section><section class="panel"><h2>Suggested next steps</h2><div class="action-list"><div class="action-row"><div class="action-left"><span class="step-icon">${icon.user}</span><div><strong>Build your profile</strong><span>Share the goals and preferences that matter to you.</span></div></div><button class="button small outline" data-route="profile">Open</button></div><div class="action-row"><div class="action-left"><span class="step-icon">${icon.spark}</span><div><strong>Try Career Check</strong><span>Reflect on your readiness and see a focused next action.</span></div></div><button class="button small outline" data-route="career-check">Start</button></div><div class="action-row"><div class="action-left"><span class="step-icon">${icon.compass}</span><div><strong>Explore companies</strong><span>Find teams aligned with the direction you want to take.</span></div></div><button class="button small outline" data-route="companies">Discover</button></div></div></section></div><aside class="section-stack"><section class="panel"><h2>Your interested companies</h2><p class="heading-copy">${interestMessage}</p>${appState.saved.size ? [...appState.saved].slice(0, 3).map(id => miniCompany(companies.find(company => company.id === id))).join('') : `<button class="button outline small" data-route="companies">Browse companies</button>`}</section><section class="panel"><h2>Upcoming support</h2>${events.slice(0, 2).map(event => `<div class="mini-company"><span class="mini-swatch ${event.id === 'welcome' ? 'cover rose' : 'cover lilac'}"></span><div><strong>${event.title}</strong><span>${appState.joinedEvents.has(event.id) ? 'You have joined this event.' : event.type}</span></div></div>`).join('')}<button class="button ghost small" data-route="events">See all events ${icon.arrow}</button></section></aside></div></main>`;
}

function miniCompany(company) {
  if (!company) return '';
  return `<div class="mini-company"><span class="mini-swatch cover ${company.cover}"></span><div><strong>${company.name}</strong><span>${company.industry}</span></div></div>`;
}

function eventsView() {
  return `<main class="page"><div class="page-intro"><span class="eyebrow">Learn together</span><h1>Career events and workshops</h1><p>H-bridge offers scalable career support through sessions, workshops, and employer-focused events.</p></div><section class="event-grid">${events.map(event => `<article class="event-card"><span class="event-ribbon">${event.type}</span><h2>${event.title}</h2><p>${event.copy}</p><div class="meta-line">${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div><button class="button ${appState.joinedEvents.has(event.id) ? 'outline' : 'coral'}" data-action="join-event" data-event="${event.id}">${appState.joinedEvents.has(event.id) ? 'Joined' : 'Join event'}</button></article>`).join('')}</section></main>`;
}

function savedView() {
  const savedCompanies = companies.filter(company => appState.saved.has(company.id));
  return `<main class="page"><div class="page-intro"><span class="eyebrow">Your shortlist</span><h1>Interested companies</h1><p>Save companies here for later review. They only move to your workspace when you request referral support or add an application.</p></div>${savedCompanies.length ? `<section class="company-grid">${savedCompanies.map(companyCard).join('')}</section>` : empty('♡', 'Your shortlist is waiting', 'When a company catches your eye, use Interested to keep it here without starting an application.', 'Discover companies', 'companies')}</main>`;
}

function empty(symbol, title, copy, buttonLabel, route) {
  return `<section class="empty-state"><span class="empty-icon">${symbol}</span><h2>${title}</h2><p>${copy}</p><button class="button primary" data-route="${route}">${buttonLabel}</button></section>`;
}

function applicationsView() {
  return `<main class="page"><div class="page-intro"><span class="eyebrow">Your active journey</span><h1>Application workspace</h1><p>This is for active applications and referral requests. Interested companies stay separate until you choose a next step.</p></div>${appState.applications.length ? `<div class="application-table"><table><thead><tr><th>Opportunity</th><th>Path</th><th>Your status</th><th>H-bridge update</th><th></th></tr></thead><tbody>${appState.applications.map(application => `<tr><td><strong>${application.title}</strong><br/><span>${application.company.name}</span></td><td>${application.mode === 'hbridge_review' ? 'Referral support' : 'Self-tracking'}</td><td><span class="status-pill ${application.mode === 'hbridge_review' ? 'warm' : ''}">${application.mode === 'hbridge_review' ? 'Waiting for H-bridge review' : 'Ready for your update'}</span></td><td><span class="status-pill mint">${application.mode === 'hbridge_review' ? 'We will follow up here' : 'Private to your workspace'}</span></td><td><button class="button outline small" data-action="open-company" data-company="${application.company.id}">View</button></td></tr>`).join('')}</tbody></table></div>` : empty('◫', 'Your workspace is clear', 'Add a role to track it yourself, or request referral support from a company you have saved.', 'Find opportunities', 'companies')}</main>`;
}

function profileView() {
  return `<main class="page"><div class="page-intro"><span class="eyebrow">Your profile</span><h1>Tell us where you want to go</h1><p>Keep this profile focused on the information that helps H-bridge guide your career journey.</p></div><form class="form-card" data-profile-form><section class="form-section"><h2>About you</h2><p>These details help H-bridge understand your background.</p><div class="field-grid"><div class="field"><label for="name">Full name</label><input id="name" placeholder="Your name" /></div><div class="field"><label for="email">Email</label><input id="email" type="email" placeholder="you@example.com" /></div><div class="field"><label for="nationality">Nationality</label><input id="nationality" placeholder="Your nationality" /></div><div class="field"><label for="school">University or school</label><input id="school" placeholder="Your university or school" /></div></div></section><section class="form-section"><h2>Language and readiness</h2><p>Choose what feels most accurate right now.</p><div class="field-grid"><div class="field"><label for="japanese">Japanese level</label><select id="japanese"><option>Choose a level</option><option>Advanced</option><option>Intermediate</option><option>Learning now</option><option>Not sure yet</option></select></div><div class="field"><label for="confidence">Japanese speaking confidence</label><select id="confidence"><option>Choose a confidence level</option><option>Comfortable in professional settings</option><option>Comfortable in daily conversation</option><option>Building confidence</option><option>Not sure yet</option></select></div></div></section><section class="form-section"><h2>Your direction</h2><p>Flexibility is useful context for matching and referral conversations.</p><div class="field-grid"><div class="field"><label for="job-type">Desired job type</label><input id="job-type" placeholder="For example: engineering, design, sales" /></div><div class="field"><label for="location">Desired location</label><input id="location" placeholder="The areas you are considering" /></div><div class="field full"><label>Regional and relocation openness</label><div class="option-grid"><button class="selectable" type="button" data-action="choose-profile-option">I welcome regional work</button><button class="selectable" type="button" data-action="choose-profile-option">I am open to relocation</button><button class="selectable" type="button" data-action="choose-profile-option">It depends on the role</button></div></div></div></section><footer class="form-footer"><button type="button" class="button ghost" data-route="dashboard">Save later</button><button type="submit" class="button primary">Save profile</button></footer></form></main>`;
}

const questions = [
  ['language', 'How comfortable are you communicating in Japanese for work?', ['I feel ready to try', 'I can manage daily conversation', 'I am building confidence']],
  ['direction', 'How clear is the kind of work you want to explore?', ['I have a focused direction', 'I am comparing a few paths', 'I want help exploring']],
  ['preparation', 'Which preparation step feels most useful now?', ['Refining my resume', 'Understanding employers', 'Preparing for interviews']],
  ['availability', 'What is most important to share about your availability?', ['I know my timing and visa situation', 'I need help clarifying it', 'I would rather discuss this with H-bridge']]
];

function careerCheckView() {
  if (appState.careerComplete) return `<main class="page"><section class="result-card"><span class="eyebrow">Career Check complete</span><h2>Your next step is clear.</h2><p>Use the reflection you shared to complete your profile, explore matching companies, and join a career event when you want more support. H-bridge can use this context during a referral conversation.</p><div class="modal-actions"><button class="button outline" data-route="dashboard">Go to workspace</button><button class="button coral" data-route="companies">Explore companies</button></div></section></main>`;
  return `<main class="page"><div class="page-intro"><span class="eyebrow">Rule-based Career Check</span><h1>Reflect on your job-hunting direction</h1><p>This short check helps you identify a helpful next action. It is a reflection tool, not an automated decision about your future.</p></div><div class="career-layout"><aside class="career-aside"><h2>How this works</h2><p>Your choices stay in this frontend preview and guide the next-step suggestions you see here.</p><div class="checklist"><div>Language confidence</div><div>Job direction</div><div>Preparation focus</div><div>Availability clarity</div></div></aside><section class="question-card">${questions.map(([id, text, choices]) => `<div class="question"><h2>${text}</h2><div class="option-grid">${choices.map(choice => `<button class="selectable ${appState.careerAnswers[id] === choice ? 'selected' : ''}" data-action="career-answer" data-question="${id}" data-value="${escapeHtml(choice)}">${choice}</button>`).join('')}</div></div>`).join('')}<div class="form-footer"><button class="button primary" data-action="finish-career-check">See my next step</button></div></section></div></main>`;
}

function adminView() {
  const applications = appState.applications;
  return `<div class="admin-shell"><aside class="admin-nav"><div class="admin-heading">H-bridge operations</div><a class="active" href="#/admin">Dashboard</a><a href="#/admin">Students</a><a href="#/admin">Applications</a><a href="#/admin">Referral requests</a><a href="#/admin">Events</a><a href="#/admin">Companies</a><a href="#/admin">Selection feedback</a></aside><main class="admin-content"><span class="eyebrow">Admin preview</span><h1>Operational overview</h1><p class="heading-copy">A frontend-only preview of the H-bridge team workspace. Internal notes and raw feedback are intentionally kept out of the student screens.</p><section class="admin-cards"><article class="admin-stat"><span>Referral requests</span><strong>${applications.filter(item => item.mode === 'hbridge_review').length ? 'Needs review' : 'All clear'}</strong></article><article class="admin-stat"><span>Student profiles</span><strong>${appState.profileSaved ? 'Profile available' : 'Awaiting student profile'}</strong></article><article class="admin-stat"><span>Selection feedback</span><strong>Ready when approved</strong></article></section><section class="panel"><div class="discover-heading"><div><h2>Referral requests</h2><p class="heading-copy">Review student context before deciding on a referral path.</p></div><button class="button outline small" data-action="admin-toast">Open filters</button></div>${applications.length ? `<div class="application-table"><table><thead><tr><th>Student</th><th>Company</th><th>Career context</th><th>Official status</th><th>Action</th></tr></thead><tbody>${applications.map(item => `<tr><td><strong>Frontend preview candidate</strong><br/><span>Profile context available in demo</span></td><td>${item.company.name}</td><td>Career Check context available</td><td><span class="status-pill warm">H-bridge review required</span></td><td><button class="button small primary" data-action="admin-toast">Review</button></td></tr>`).join('')}</tbody></table></div>` : empty('▤', 'No referral requests yet', 'Referral requests from the student experience will appear in this list in the frontend preview.', 'Explore student view', 'companies')}</section></main></div>`;
}

function loginView() {
  return `<main class="page"><section class="form-card" style="max-width: 500px; margin: 42px auto;"><span class="eyebrow">Welcome to H-bridge Career</span><h1>Start your career journey</h1><p class="heading-copy" style="margin-bottom: 22px;">This frontend preview does not connect to an account service yet.</p><div class="field"><label for="signin-email">Email</label><input id="signin-email" type="email" placeholder="you@example.com" /></div><div class="field" style="margin-top: 14px;"><label for="signin-password">Password</label><input id="signin-password" type="password" placeholder="Your password" /></div><div class="form-footer"><button class="button ghost" data-route="companies">Back</button><button class="button primary" data-action="mock-login">Continue</button></div><button class="button ghost small" style="margin-top: 14px;" data-route="admin">View admin frontend preview</button></section></main>`;
}

function modal() {
  if (!appState.modal) return '';
  if (appState.modal.type === 'company') {
    const company = companies.find(item => item.id === appState.modal.companyId);
    const saved = appState.saved.has(company.id);
    return `<div class="modal-layer" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="${company.name}" data-modal-content><button class="modal-close" data-action="close-modal" aria-label="Close">×</button><div class="modal-cover cover ${company.cover}"><span class="cover-label">${company.coverLabel}</span></div><span class="eyebrow">${company.industry}</span><h2>${company.name}</h2><p>${company.description}</p><div class="tags">${company.tags.map(tag => `<span class="tag accent">${tag}</span>`).join('')}</div><h3>Explore opportunities</h3><p>${company.jobs.join(' · ')}</p><div class="modal-actions"><button class="button outline" data-action="toggle-save" data-company="${company.id}">${saved ? 'Saved to Interested' : 'Add to Interested'}</button><button class="button coral" data-action="request-referral" data-company="${company.id}">Request referral support</button></div></section></div>`;
  }
  if (appState.modal.type === 'referral') {
    const company = companies.find(item => item.id === appState.modal.companyId);
    return `<div class="modal-layer" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="Request referral support" data-modal-content><button class="modal-close" data-action="close-modal" aria-label="Close">×</button><span class="eyebrow">Request referral support</span><h2>Ask H-bridge to review ${company.name}</h2><p>In the finished product, this would create an application marked for H-bridge review. It does not promise a referral; the team reviews your profile and the opportunity first.</p><div class="field"><label for="referral-message">What would you like H-bridge to know?</label><textarea id="referral-message" rows="4" placeholder="Share why this opportunity interests you."></textarea></div><div class="modal-actions"><button class="button ghost" data-action="close-modal">Cancel</button><button class="button coral" data-action="confirm-referral" data-company="${company.id}">Send request</button></div></section></div>`;
  }
  return '';
}

function render() {
  appState.route = routeFromHash();
  let view;
  switch (appState.route) {
    case 'companies': view = discoverView(); break;
    case 'jobs': view = jobsView(); break;
    case 'dashboard': view = dashboardView(); break;
    case 'events': view = eventsView(); break;
    case 'saved': view = savedView(); break;
    case 'applications': view = applicationsView(); break;
    case 'profile': view = profileView(); break;
    case 'career-check': view = careerCheckView(); break;
    case 'admin': view = adminView(); break;
    case 'login': view = loginView(); break;
    default: view = discoverView(); break;
  }
  document.getElementById('app').innerHTML = `<div class="site-shell">${appState.route !== 'admin' ? header() : ''}${view}${appState.route !== 'admin' ? mobileNav() : ''}</div>${modal()}`;
  renderToasts();
  applyVisibleFilters();
}

function applyVisibleFilters() {
  const query = appState.query.trim().toLowerCase();
  const selected = [...appState.filters];
  const cards = document.querySelectorAll('[data-card]');
  let visible = 0;
  cards.forEach(card => {
    const isSearchMatch = !query || card.dataset.searchable.includes(query);
    const cardFilters = card.dataset.filters.split(' ');
    const isFilterMatch = !selected.length || selected.every(filter => cardFilters.includes(filter));
    const show = isSearchMatch && isFilterMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });
  const emptyState = document.querySelector('[data-empty]');
  if (emptyState) emptyState.hidden = Boolean(visible);
  const note = document.querySelector('[data-results-note]');
  if (note) note.textContent = visible ? 'Curated opportunities that match your current filters.' : 'No close match with these filters yet.';
  const jobCards = document.querySelectorAll('[data-job-card]');
  let jobVisible = 0;
  jobCards.forEach(card => {
    const show = !query || card.dataset.searchable.includes(query);
    card.hidden = !show;
    if (show) jobVisible += 1;
  });
  const jobEmpty = document.querySelector('[data-job-empty]');
  if (jobEmpty) jobEmpty.hidden = Boolean(jobVisible);
}

function toggleSave(companyId) {
  if (appState.saved.has(companyId)) {
    appState.saved.delete(companyId);
    toast('Removed from your Interested list.');
  } else {
    appState.saved.add(companyId);
    toast('Saved to your Interested list. This is not an application.');
  }
  render();
}

function addApplication(companyId, title, mode = 'self_tracking') {
  const company = companies.find(item => item.id === companyId);
  const id = `${companyId}-${title.replaceAll(' ', '-').toLowerCase()}`;
  if (!appState.applications.some(item => item.id === id)) appState.applications.push({ id, title, company, mode });
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action], [data-route]');
  if (!button) return;
  if (button.dataset.modalContent !== undefined) return;
  const route = button.dataset.route;
  if (route) { navigate(route); return; }
  const action = button.dataset.action;
  if (action === 'close-modal') {
    if (event.target !== button && !event.target.closest('.modal-close')) return;
    appState.modal = null;
    render();
    return;
  }
  if (action === 'toggle-filter') {
    const title = button;
    title.classList.toggle('closed');
    title.parentElement.querySelector('.filter-options').classList.toggle('hidden');
    return;
  }
  if (action === 'clear-filters') { appState.filters.clear(); appState.query = ''; render(); return; }
  if (action === 'set-sort') { appState.sort = button.dataset.sort; render(); return; }
  if (action === 'set-view') { appState.view = button.dataset.view; render(); return; }
  if (action === 'toggle-save') { toggleSave(button.dataset.company); return; }
  if (action === 'open-company') { appState.modal = { type: 'company', companyId: button.dataset.company }; render(); return; }
  if (action === 'request-referral') { appState.modal = { type: 'referral', companyId: button.dataset.company }; render(); return; }
  if (action === 'confirm-referral') {
    const company = companies.find(item => item.id === button.dataset.company);
    addApplication(company.id, `Referral support: ${company.name}`, 'hbridge_review');
    appState.modal = null;
    toast('Your referral support request is now in your workspace.');
    navigate('applications');
    return;
  }
  if (action === 'add-application') {
    addApplication(button.dataset.company, button.dataset.job);
    toast('Added to your application workspace.');
    render();
    return;
  }
  if (action === 'join-event') { appState.joinedEvents.add(button.dataset.event); toast('You are joined. It is now visible in your workspace.'); render(); return; }
  if (action === 'choose-profile-option') { button.classList.toggle('selected'); return; }
  if (action === 'career-answer') { appState.careerAnswers[button.dataset.question] = button.dataset.value; render(); return; }
  if (action === 'finish-career-check') {
    if (Object.keys(appState.careerAnswers).length < questions.length) { toast('Choose an answer for each reflection before continuing.'); return; }
    appState.careerComplete = true; render(); return;
  }
  if (action === 'mock-login') { toast('Account sign-in will connect when the backend is ready.'); navigate('dashboard'); return; }
  if (action === 'language') { toast('Language selection is ready to connect to localization later.'); return; }
  if (action === 'admin-toast') { toast('Admin actions are frontend placeholders in this preview.'); return; }
});

document.addEventListener('change', event => {
  const checkbox = event.target.closest('[data-filter]');
  if (!checkbox) return;
  if (checkbox.checked) appState.filters.add(checkbox.dataset.filter);
  else appState.filters.delete(checkbox.dataset.filter);
  applyVisibleFilters();
});

document.addEventListener('input', event => {
  const search = event.target.closest('[data-search]');
  if (!search) return;
  appState.query = search.value;
  applyVisibleFilters();
});

document.addEventListener('submit', event => {
  if (!event.target.matches('[data-profile-form]')) return;
  event.preventDefault();
  appState.profileSaved = true;
  toast('Your profile details are saved in this frontend preview.');
  navigate('dashboard');
});

window.addEventListener('hashchange', render);
render();
