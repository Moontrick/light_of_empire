export interface CreatePositionDto {
  name: string;
  description?: string;
  color?: string;
  styles?: string;
}

export interface UpdatePositionDto {
  name?: string;
  description?: string;
  color?: string;
  styles?: string;
}
