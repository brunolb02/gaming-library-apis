import { IsArray, IsInt } from 'class-validator';

export class ListGamesDTO {
  constructor(
    content: unknown,
    totalElements: number,
    size: number,
    totalPages: number,
    currentPage: number,
  ) {
    this.content = content;
    this.totalElements = totalElements;
    this.size = size;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
  @IsArray()
  content: unknown;
  @IsInt()
  totalElements: number;
  @IsInt()
  size: number;
  @IsInt()
  totalPages: number;
  @IsInt()
  currentPage: number;
}
