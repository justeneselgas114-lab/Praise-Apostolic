import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateGalleryItemDto {
  @IsString()
  @IsNotEmpty()
  folder: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^https?:\/\/.+/, { message: 'url must be a valid URL' })
  url: string;

  @IsOptional()
  @IsString()
  caption?: string;
}
