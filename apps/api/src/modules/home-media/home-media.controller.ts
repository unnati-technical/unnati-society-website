import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HomeMediaService } from './home-media.service';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('home-media')
export class HomeMediaController {
  constructor(private readonly homeMediaService: HomeMediaService) {}

  @Public()
  @Get()
  async findAll() {
    return this.homeMediaService.findAll();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body()
    body: {
      type: string;
      title?: string;
      subtitle?: string;
      displayOrder?: string;
      url?: string;
    },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.homeMediaService.create(
      {
        type: body.type,
        title: body.title,
        subtitle: body.subtitle,
        displayOrder: body.displayOrder ? Number(body.displayOrder) : 0,
        url: body.url,
      },
      file,
    );
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      type?: string;
      title?: string;
      subtitle?: string;
      displayOrder?: number;
      url?: string;
    },
  ) {
    return this.homeMediaService.update(id, body);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.homeMediaService.remove(id);
  }
}
