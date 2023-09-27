import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  url: string;
}
