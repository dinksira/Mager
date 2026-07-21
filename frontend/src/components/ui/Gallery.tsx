'use client';

interface GalleryItem {
  src: string;
  caption: string;
}

interface GalleryProps {
  items: GalleryItem[];
  alt: string;
}

export default function Gallery({ items, alt }: GalleryProps) {
  return (
    <div className="modal-image">
      {items.map((item, i) => (
        <div className="gallery-item" key={i}>
          <img src={item.src} alt={`${alt} screenshot ${i + 1}`} />
          <span className="gallery-caption">{item.caption}</span>
        </div>
      ))}
    </div>
  );
}
