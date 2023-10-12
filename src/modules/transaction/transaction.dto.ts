import { IsString, IsInt, IsBoolean, IsNumber, IsArray, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PriceLimitDto {
  @IsNumber()
  max: number;

  @IsNumber()
  min: number;
}

class RequirementsDto {
  @IsString()
  reqprocessor: string;

  @IsString()
  reqgraphics: string;

  @IsString()
  reqmemory: string;

  @IsString()
  reqdiskspace: string;

  @IsString()
  reqsystem: string;

  @IsString()
  reqother: string;
}

class VideoDto {
  @IsString()
  type: string;

  @IsString()
  url: string;
}

class CategoryDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}

export class TransactionDto {

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsInt()
  qty: number;

  @IsNumber()
  minPrice: number;

  @IsBoolean()
  availableToBuy: boolean;

  @IsString()
  thumbnail: string;

  @IsString()
  coverImage: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsString()
  region: string;

  @IsString()
  developer: string;

  @IsString()
  publisher: string;

  @IsString()
  platform: string;

  @ValidateNested()
  @Type(() => PriceLimitDto)
  priceLimit: PriceLimitDto;

  @ValidateNested()
  @Type(() => RequirementsDto)
  requirements: {
    minimal: RequirementsDto;
    recommended: RequirementsDto;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VideoDto)
  videos: VideoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories: CategoryDto[];
}
