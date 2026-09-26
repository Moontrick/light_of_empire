import type { NewsBlock } from './news';

export enum PurchaseStatus {
  PENDING = 'PENDING',
  ISSUED = 'ISSUED',
  REJECTED = 'REJECTED',
}

export interface DonationImage {
  id: number;
  seq: number;
  url: string; // абсолютный (хост API + путь)
}

// View-model витрины и админского списка
export interface DonationListItem {
  id: number;
  title: string;
  smallBody: string;
  price: number;
  isActive: boolean;
  images: DonationImage[]; // отсортированы по seq
  coverUrl: string | null; // images[0].url
  createdAt: string;
  changedAt: string;
}

export interface DonationDetail extends Omit<DonationListItem, 'smallBody'> {
  body: NewsBlock[];
}

export interface PurchaseDonationRef {
  id: number;
  title: string;
  coverUrl: string | null; // абсолютный
}

export interface PurchaseParticipant {
  id: number;
  login: string;
  email: string;
  avatar_url: string | null; // относительный
}

// Своя заявка (/purchases/me, ответ POST /purchases)
export interface Purchase {
  id: number;
  status: PurchaseStatus;
  price: number;
  steamUrl: string;
  userComment: string | null;
  resolutionComment: string | null;
  createdAt: string;
  processedAt: string | null;
  donation: PurchaseDonationRef;
}

// Полная форма (/purchases, PATCH status) — CURATOR+
export interface PurchaseFull extends Purchase {
  user: PurchaseParticipant;
  processedBy: PurchaseParticipant | null;
}
