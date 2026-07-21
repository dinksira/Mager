'use client';

export default function PortfolioCard({ image, category, title, desc, tags, onClick }: { image: string; category: string; title: string; desc: string; tags: string[]; onClick: () => void }) {
  return (
    <div className="portfolio-card fade-up" onClick={onClick}>
      <div className="portfolio-thumb">
        <img src={image} alt={title} />
        <div className="overlay"></div>
        <span className="category">{category}</span>
        <div className="portfolio-body">
          <h3>{title}</h3>
          <p>{desc}</p>
          <div className="portfolio-tags">
            {tags.map((tag, i) => <span key={i}>{tag}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
