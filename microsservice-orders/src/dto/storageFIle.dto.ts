import { ApiProperty } from '@nestjs/swagger';

export class StorageDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
