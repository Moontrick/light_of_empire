import type { PurchaseStatus } from '@/shared/types';

export interface PurchaseDonationRefDto {
  id: number;
  title: string;
  cover_url: string | null; // относительный
}

export interface PurchaseParticipantDto {
  id: number;
  login: string;
  email: string;
  avatar_url: string | null; // относительный
}

export interface PurchaseDto {
  id: number;
  status: PurchaseStatus;
  price: number;
  steam_url: string;
  user_comment: string | null;
  resolution_comment: string | null;
  created_at: string;
  processed_at: string | null;
  donation: PurchaseDonationRefDto;
}

export interface PurchaseFullDto extends PurchaseDto {
  user: PurchaseParticipantDto;
  processed_by: PurchaseParticipantDto | null;
}

export interface CreatePurchaseDto {
  donation_id: number;
  user_comment?: string;
}

export interface MyPurchasesQuery {
  page?: number;
  limit?: number;
  status?: PurchaseStatus;
}

export interface PurchasesQuery extends MyPurchasesQuery {
  user_id?: number;
  donation_id?: number;
  from?: string; // ISO с зоной
  to?: string;
}

export type ResolveStatus = PurchaseStatus.ISSUED | PurchaseStatus.REJECTED;

export interface ResolvePurchaseDto {
  status: ResolveStatus;
  resolution_comment?: string;
}
