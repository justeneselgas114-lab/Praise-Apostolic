import { IsDateString, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateSermonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  scripture?: string;

  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  youtubeId?: string;

  @IsOptional()
  @IsString()
  @Matches(/^https?:\/\/.+/, { message: 'audioUrl must be a valid URL' })
  audioUrl?: string;

  @IsOptional()
  @IsString()
  @Matches(/^https?:\/\/.+/, { message: 'thumbnail must be a valid URL' })
  thumbnail?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  preacher?: string;
}
