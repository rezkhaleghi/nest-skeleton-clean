// src/api/DTOs/response.dto.ts
export class ResponseDto<T> {
  success: boolean;
  message: string;
  status: number;
  data: T;
  error: string | null;

  constructor(
    success: boolean,
    message: string,
    status: number,
    data: T,
    error: string | null = null,
  ) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.data = data;
    this.error = error;
  }
}
