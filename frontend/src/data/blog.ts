export interface BlogData {
  image: string;
  date: string;
  title: string;
  author: string;
  authorRole: string;
  avatar: string;
  body: string;
}

export const blogData: BlogData[] = [
  {
    image: 'images/blog-cms.jpg',
    date: 'Jul 15, 2026',
    title: 'Why Headless CMS is the Future of Web Development',
    author: 'Abebe Kebede',
    authorRole: 'CEO & Founder',
    avatar: 'images/team-1.jpg',
    body: `<p>For years, traditional CMS platforms like WordPress and Drupal dominated the web. They offered a monolithic approach where the backend and frontend were tightly coupled. While this worked for simple websites, it created limitations for modern, dynamic applications that need to deliver content across multiple channels — web, mobile, IoT, and more.</p><h4>What is a Headless CMS?</h4><p>A headless CMS separates the content management backend from the presentation layer. Content is stored and managed in a central hub and delivered via APIs to any frontend. This decoupling gives developers the freedom to use any framework (React, Vue, Next.js, etc.) while content editors enjoy a familiar editing experience.</p><h4>Key Benefits</h4><p><strong>Omnichannel delivery</strong> — Publish once, display anywhere. Your content flows seamlessly to websites, mobile apps, smartwatches, and even AR/VR experiences. <strong>Better performance</strong> — Frontends optimized for speed can fetch content via lightweight APIs, resulting in faster load times. <strong>Future-proof</strong> — When you want to redesign or add a new channel, you only change the frontend. Your content stays intact.</p><h4>Why We Made the Switch</h4><p>At Mager, we recently migrated our own site to a headless architecture using a modern CMS. The result? 40% faster page loads, easier content updates, and the ability to experiment with new frontend technologies without touching the backend. For our clients, we recommend headless CMS for any project that expects to scale across platforms.</p>`
  },
  {
    image: 'images/blog-api.jpg',
    date: 'Jul 8, 2026',
    title: 'Building Scalable APIs with Node.js and Express',
    author: 'Sara Mulugeta',
    authorRole: 'CTO',
    avatar: 'images/team-2.jpg',
    body: `<p>APIs are the backbone of modern software. Whether you are building a mobile app, a single-page application, or integrating with third-party services, your API needs to be robust, scalable, and maintainable. Over the past few years, Node.js with Express has become one of the most popular stacks for building RESTful APIs.</p><h4>Structure Matters</h4><p>The key to a scalable API is clean separation of concerns. We follow a layered architecture: routes handle HTTP concerns, controllers manage request/response logic, services contain business logic, and repositories handle data access. This makes the codebase testable and easy to extend.</p><h4>Error Handling</h4><p>Consistent error handling is critical. We use a centralized error middleware that catches all errors and returns structured JSON responses. Every error includes a code, message, and timestamp — making debugging straightforward for frontend teams.</p><h4>Performance Tips</h4><p>Use compression middleware, implement caching with Redis for frequently accessed data, paginate list endpoints, and use database indexing. For high-traffic endpoints, consider implementing rate limiting and async processing with message queues.</p><h4>Testing First</h4><p>We write integration tests for every endpoint using Supertest and Jest. This catches regressions early and gives us confidence when deploying. A well-tested API is a maintainable API.</p>`
  },
  {
    image: 'images/blog-fintech.jpg',
    date: 'Jun 28, 2026',
    title: 'AI in Fintech: Opportunities and Challenges',
    author: 'Dawit Tadesse',
    authorRole: 'Lead Designer',
    avatar: 'images/team-3.jpg',
    body: `<p>Artificial intelligence is transforming the financial services industry at an unprecedented pace. From fraud detection to personalized banking, AI-powered solutions are reshaping how financial institutions operate and serve their customers. But with great opportunity comes significant challenges.</p><h4>Fraud Detection & Prevention</h4><p>Machine learning models can analyze thousands of transactions per second, identifying patterns that indicate fraudulent activity. Unlike rule-based systems, ML models adapt to new fraud patterns over time, reducing false positives and catching sophisticated attacks.</p><h4>Personalized Banking</h4><p>AI enables hyper-personalized financial advice, spending insights, and product recommendations. By analyzing transaction history and behavior, banks can offer tailored savings plans, investment suggestions, and credit products.</p><h4>Regulatory Compliance</h4><p>RegTech solutions use NLP to scan and interpret regulatory documents, automating compliance workflows. This reduces the manual burden on compliance teams and minimizes the risk of regulatory fines.</p><h4>Challenges to Address</h4><p>Data privacy remains a top concern. Financial institutions must ensure customer data is handled responsibly and in compliance with regulations. Model explainability is another challenge — regulators need to understand how AI decisions are made. Finally, legacy system integration can be complex and costly.</p><h4>The Road Ahead</h4><p>Despite these challenges, the trajectory is clear. AI will become deeply embedded in every layer of financial services. Institutions that invest in AI strategy today will be the leaders of tomorrow.</p>`
  }
];
