export interface OngoingImage {
  src: string;
  caption: string;
}

export interface OngoingResource {
  label: string;
  url: string;
  icon: string;
}

export interface OngoingData {
  images: OngoingImage[];
  tag: string;
  title: string;
  client: string;
  status: string;
  progress: string;
  remaining: string;
  desc: string;
  tech: string[];
  resources: OngoingResource[];
}

export const ongoingData: OngoingData[] = [
  {
    images: [
      { src: 'images/ongoing-banking.jpg', caption: 'Dashboard overview & KPI widgets' },
      { src: 'images/portfolio-dashboard-2.jpg', caption: 'Transaction monitoring & alerts' },
      { src: 'images/portfolio-analytics-1.jpg', caption: 'Financial reporting module' }
    ],
    tag: 'In Development',
    title: 'Banking Dashboard',
    client: 'Client: ABC Bank',
    status: '<span class="ongoing-status status-development">In Development</span>',
    progress: '75%',
    remaining: '3 weeks remaining',
    desc: 'A comprehensive real-time analytics dashboard for banking operations. The platform provides transaction monitoring, fraud detection alerts, financial reporting, and KPI tracking. Built with a focus on data security and low-latency updates, it enables banking executives to make informed decisions quickly.',
    tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'WebSocket', 'Docker'],
    resources: [
      { label: 'GitHub', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
      { label: 'Figma', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="7" height="7" rx="1.5"/><rect x="13" y="2" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="11" width="7" height="7" rx="1.5"/><rect x="13" y="11" width="7" height="7" rx="1.5"/><rect x="4" y="20" width="7" height="7" rx="1.5"/></svg>` },
      { label: 'Project Board', url: '#', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>` }
    ]
  },
  {
    images: [
      { src: 'images/ongoing-telemed.jpg', caption: 'Video consultation interface' },
      { src: 'images/portfolio-mobile-3.jpg', caption: 'Patient mobile app' },
      { src: 'images/portfolio-dashboard-1.jpg', caption: 'Doctor scheduling dashboard' }
    ],
    tag: 'Testing',
    title: 'Telemedicine Platform',
    client: 'Client: HealthNet',
    status: '<span class="ongoing-status status-testing">Testing</span>',
    progress: '40%',
    remaining: '6 weeks remaining',
    desc: 'An end-to-end telemedicine solution that connects patients with healthcare providers remotely. Features include HD video consultations, e-prescriptions, electronic health record (EHR) integration, appointment scheduling, and a mobile app for both patients and doctors.',
    tech: ['Flutter', 'WebRTC', 'Node.js', 'MongoDB', 'Socket.io', 'Azure'],
    resources: [
      { label: 'GitHub', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
      { label: 'Figma', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="7" height="7" rx="1.5"/><rect x="13" y="2" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="11" width="7" height="7" rx="1.5"/><rect x="13" y="11" width="7" height="7" rx="1.5"/><rect x="4" y="20" width="7" height="7" rx="1.5"/></svg>` }
    ]
  },
  {
    images: [
      { src: 'images/ongoing-school.jpg', caption: 'Student portal dashboard' },
      { src: 'images/portfolio-dashboard-3.jpg', caption: 'Grade management system' },
      { src: 'images/portfolio-analytics-2.jpg', caption: 'Attendance tracking & reports' }
    ],
    tag: 'Testing',
    title: 'School Management System',
    client: 'Client: Ministry of Education',
    status: '<span class="ongoing-status status-testing">Testing</span>',
    progress: '90%',
    remaining: '1 week remaining',
    desc: 'A comprehensive school management platform designed for the national education system. It covers student admissions, grade management, attendance tracking, timetable scheduling, parent-teacher communication, and government reporting. The system serves over 500 schools nationwide.',
    tech: ['Next.js', 'PostgreSQL', 'Python', 'FastAPI', 'Docker', 'Azure'],
    resources: [
      { label: 'GitHub', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
      { label: 'Figma', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="7" height="7" rx="1.5"/><rect x="13" y="2" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="11" width="7" height="7" rx="1.5"/><rect x="13" y="11" width="7" height="7" rx="1.5"/><rect x="4" y="20" width="7" height="7" rx="1.5"/></svg>` }
    ]
  },
  {
    images: [
      { src: 'images/ongoing-logistics.jpg', caption: 'Fleet tracking & GPS map view' },
      { src: 'images/portfolio-software-1.jpg', caption: 'Route optimization panel' },
      { src: 'images/portfolio-dashboard-2.jpg', caption: 'Delivery performance analytics' }
    ],
    tag: 'Planning',
    title: 'Logistics Fleet Manager',
    client: 'Client: FreightCo',
    status: '<span class="ongoing-status status-planning">Planning</span>',
    progress: '20%',
    remaining: '10 weeks remaining',
    desc: 'A GPS-based fleet tracking and logistics optimization platform. Features include real-time vehicle tracking, route optimization, fuel consumption monitoring, driver performance scoring, delivery scheduling, and a client portal for shipment tracking.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Redis', 'Docker'],
    resources: [
      { label: 'GitHub', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
      { label: 'Figma', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="7" height="7" rx="1.5"/><rect x="13" y="2" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="11" width="7" height="7" rx="1.5"/><rect x="13" y="11" width="7" height="7" rx="1.5"/><rect x="4" y="20" width="7" height="7" rx="1.5"/></svg>` }
    ]
  }
];
