export interface CreateFormationDto {
  name: string;
  description?: string;
  color?: string;
  styles?: string;
}

export interface UpdateFormationDto {
  name?: string;
  description?: string;
  color?: string;
  styles?: string;
}
