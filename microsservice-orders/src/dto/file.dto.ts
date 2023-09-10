import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({ type: 'string' })
  fieldname: string;

  @ApiProperty({ type: 'string' })
  originalname: string;

  @ApiProperty({ type: 'string' })
  encoding: string;

  @ApiProperty({ type: 'string' })
  mimetype: string;

  @ApiProperty({ type: 'buffer' })
  buffer: Buffer;

  @ApiProperty({ type: 'number' })
  size: number;
}
