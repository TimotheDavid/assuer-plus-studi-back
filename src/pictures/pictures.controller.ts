import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Query('id') id: string) {
    await this.picturesService.create(file, id);
  }
}
