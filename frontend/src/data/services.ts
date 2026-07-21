export interface ServiceData {
  icon: string;
  tag: string;
  title: string;
  desc: string;
  features: string[];
}

export const servicesData: ServiceData[] = [
  {
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="24" height="16" rx="2"/><path d="M10 22v4h12v-4"/><path d="M16 14v4"/><path d="M12 10h0"/><path d="M14 10h0"/></svg>`,
    tag: 'Engineering',
    title: 'Software Development',
    desc: 'We build custom web and desktop applications using modern frameworks like React, Node.js, and Next.js. Our team follows industry best practices — clean architecture, CI/CD, automated testing, and performance optimization — to deliver scalable, maintainable software.',
    features: ['Custom web applications & dashboards', 'Desktop software & internal tools', 'API development & third-party integrations', 'Code reviews, testing & CI/CD setup']
  },
  {
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="8" width="14" height="20" rx="2"/><line x1="10" y1="24" x2="16" y2="24"/><rect x="18" y="4" width="10" height="20" rx="1.5"/><line x1="21" y1="20" x2="25" y2="20"/></svg>`,
    tag: 'Mobile',
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile applications crafted for iOS and Android. We use Flutter, React Native, and native SDKs to deliver smooth, performant apps that users love — from MVPs to enterprise-grade solutions.',
    features: ['Cross-platform apps (Flutter, React Native)', 'Native iOS & Android development', 'App store deployment & management', 'Push notifications & real-time sync']
  },
  {
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4c-4 0-7 3-7 7 0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z"/><circle cx="16" cy="11" r="2.5"/><path d="M7 21c-2 1.5-3 3.5-3 5h24c0-1.5-1-3.5-3-5"/></svg>`,
    tag: 'Infrastructure',
    title: 'Cloud Solutions',
    desc: 'Cloud architecture design, migration, and managed services across AWS, Azure, and GCP. We help you modernize infrastructure, reduce costs, and scale with confidence — from lift-and-shift to cloud-native builds.',
    features: ['Cloud architecture & migration planning', 'Kubernetes & container orchestration', 'Serverless & event-driven systems', 'Monitoring, security & cost optimization']
  },
  {
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4c-3 0-5 2-5 5 0 4 3 6 5 8 2-2 5-4 5-8 0-3-2-5-5-5z"/><path d="M10 20c-2 1-4 3-4 5h20c0-2-2-4-4-5"/><path d="M12 25c0 2 1 3 4 3s4-1 4-3"/></svg>`,
    tag: 'Intelligence',
    title: 'AI & Machine Learning',
    desc: 'Intelligent automation, predictive analytics, and custom ML model development. We turn data into decisions — from chatbots and recommendation engines to computer vision and NLP solutions.',
    features: ['Custom ML model development & training', 'Natural language processing & chatbots', 'Computer vision & document intelligence', 'Predictive analytics & data pipelines']
  },
  {
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 26c0-5 4-8 8-8s8 3 8 8"/><circle cx="16" cy="10" r="5"/><path d="M5 30h22"/><line x1="16" y1="18" x2="16" y2="22"/></svg>`,
    tag: 'Design',
    title: 'UI/UX Design',
    desc: 'User-centered design that balances aesthetics, usability, and business goals. We research, prototype, and test to create intuitive interfaces that delight users and drive engagement.',
    features: ['User research & usability testing', 'Wireframing & interactive prototyping', 'Visual design & design systems', 'Accessibility & responsive design']
  },
  {
    icon: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="14" width="6" height="14" rx="1"/><rect x="13" y="10" width="6" height="18" rx="1"/><rect x="23" y="6" width="6" height="22" rx="1"/></svg>`,
    tag: 'Advisory',
    title: 'IT Consulting',
    desc: 'Strategic technology advisory to help you make the right technical decisions. We assess your current stack, identify opportunities, and create a roadmap — whether you are scaling up, modernizing, or starting from scratch.',
    features: ['Technology stack assessment & roadmap', 'Digital transformation strategy', 'Architecture review & optimization', 'Vendor evaluation & procurement support']
  }
];
