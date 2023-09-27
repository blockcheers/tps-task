import { ApiProperty } from "@nestjs/swagger";

export class VideoDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  url: string;
}
