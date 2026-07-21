export interface PortfolioImage {
  src: string;
  caption: string;
}

export interface ResourceLink {
  label: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  images: PortfolioImage[];
  tag: string;
  title: string;
  client: string;
  desc: string;
  tech: string[];
  resources: ResourceLink[];
}

export const portfolioData: PortfolioData[] = [
  {
    images: [
      { src: 'images/portfolio-dashboard-1.jpg', caption: 'Admin dashboard with real-time metrics' },
      { src: 'images/portfolio-dashboard-2.jpg', caption: 'Sales analytics & reporting' },
      { src: 'images/portfolio-dashboard-3.jpg', caption: 'Product catalog management' },
      { src: 'images/portfolio-analytics-1.jpg', caption: 'Customer order dashboard' }
    ],
    tag: 'Web Application',
    title: 'ShopEthio',
    client: 'Client: Ethiopian Retail Association',
    desc: 'A full-featured e-commerce platform built for the Ethiopian market. ShopEthio handles everything from product catalog management and real-time inventory tracking to secure payment gateway integration and detailed sales analytics. The platform supports multiple vendors, order fulfillment workflows, and a customer loyalty system.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    resources: [
      { label: 'GitHub', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
      { label: 'Figma', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="7" height="7" rx="1.5"/><rect x="13" y="2" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="11" width="7" height="7" rx="1.5"/><rect x="13" y="11" width="7" height="7" rx="1.5"/><rect x="4" y="20" width="7" height="7" rx="1.5"/></svg>` },
      { label: 'Live Demo', url: '#', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>` }
    ]
  },
  {
    images: [
      { src: 'images/portfolio-mobile-1.jpg', caption: 'Passenger app — booking a ride' },
      { src: 'images/portfolio-mobile-2.jpg', caption: 'Real-time driver tracking interface' },
      { src: 'images/portfolio-mobile-3.jpg', caption: 'Route map & navigation view' },
      { src: 'images/portfolio-software-1.jpg', caption: 'Admin fleet management dashboard' }
    ],
    tag: 'Mobile Application',
    title: 'GoMove',
    client: 'Client: GoMove Transport PLC',
    desc: 'A ride-hailing and logistics application with real-time GPS tracking, intelligent driver-passenger matching, and digital wallet payments. GoMove includes features like fare estimation, route optimization, ride scheduling, and a comprehensive admin dashboard for fleet management.',
    tech: ['Flutter', 'Firebase', 'Google Maps', 'Stripe', 'Node.js', 'MongoDB'],
    resources: [
      { label: 'GitHub', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
      { label: 'Figma', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="7" height="7" rx="1.5"/><rect x="13" y="2" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="11" width="7" height="7" rx="1.5"/><rect x="13" y="11" width="7" height="7" rx="1.5"/><rect x="4" y="20" width="7" height="7" rx="1.5"/></svg>` },
      { label: 'App Store', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.665 16.811a10.316 10.316 0 01-1.022 1.749c-.537.767-.978 1.296-1.316 1.587-.526.483-1.09.73-1.697.74-.434 0-.957-.123-1.57-.37-.613-.247-1.176-.37-1.69-.37-.544 0-1.126.123-1.745.37-.62.247-1.117.368-1.495.368-.578.01-1.155-.246-1.727-.768-.37-.32-.828-.868-1.375-1.643-.588-.832-1.07-1.798-1.448-2.896-.406-1.18-.61-2.323-.61-3.43 0-1.268.274-2.36.822-3.276.433-.722 1.01-1.293 1.73-1.712.72-.42 1.498-.632 2.335-.64.458 0 1.06.142 1.803.42.742.277 1.22.418 1.433.418.131 0 .577-.178 1.335-.534.715-.33 1.35-.467 1.9-.413 1.403.111 2.458.667 3.162 1.667-1.257.76-1.878 1.826-1.864 3.192.013 1.064.397 1.947 1.15 2.653.342.34.724.604 1.147.792-.092.267-.19.523-.295.768zM15.07 2.534c0 .834-.305 1.613-.913 2.334-.733.86-1.62 1.357-2.582 1.278-.012-.1-.019-.204-.019-.31 0-.803.349-1.662.97-2.364.31-.354.704-.65 1.182-.887.477-.236.928-.36 1.353-.37.009.105.013.21.013.32z"/></svg>` },
      { label: 'Play Store', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.79 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>` }
    ]
  },
  {
    images: [
      { src: 'images/portfolio-ai-1.jpg', caption: 'Chatbot conversation interface' },
      { src: 'images/portfolio-analytics-1.jpg', caption: 'Sentiment analysis dashboard' },
      { src: 'images/portfolio-analytics-2.jpg', caption: 'Multi-language support & NLP config' }
    ],
    tag: 'AI Solution',
    title: 'SmartAssist',
    client: 'Client: EthioTech Corp',
    desc: 'An AI-powered customer service chatbot that handles inquiries in multiple languages including Amharic. SmartAssist uses natural language processing to understand customer intent, integrates with CRM systems, and can escalate complex issues to human agents. The system reduced response times by 80% for the client.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Docker', 'Azure'],
    resources: [
      { label: 'GitHub', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
      { label: 'Figma', url: '#', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="2" width="7" height="7" rx="1.5"/><rect x="13" y="2" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="11" width="7" height="7" rx="1.5"/><rect x="13" y="11" width="7" height="7" rx="1.5"/><rect x="4" y="20" width="7" height="7" rx="1.5"/></svg>` },
      { label: 'API Docs', url: '#', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><path d="M12 6v6"/><path d="M9 9h6"/></svg>` }
    ]
  }
];
