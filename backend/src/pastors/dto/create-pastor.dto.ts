import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreatePastorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsOptional()
  @IsString()
  shortBio?: string;

  @IsOptional()
  @IsString()
  @Matches(/^https?:\/\/.+/, { message: 'image must be a valid URL' })
  image?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
