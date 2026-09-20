export interface GalleryImage {
  id: number;
  url: string;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  alt: string;
}
