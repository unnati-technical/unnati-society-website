import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { VolunteerLeaderboardService } from './volunteer-leaderboard.service';
import { UpsertLeaderboardEntryDto } from './upsert-leaderboard-entry.dto';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

const storage = memoryStorage();

@Controller('volunteer-leaderboard')
export class VolunteerLeaderboardController {
  constructor(private readonly service: VolunteerLeaderboardService) {}

  @Public()
  @Get()
  findAll(@Query('month') month?: string) {
    return this.service.findAll(month);
  }

  @Public()
  @Get('months')
  getMonths() {
    return this.service.getMonths();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  upsert(
    @Body() dto: UpsertLeaderboardEntryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.upsert(dto, file);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Delete('month/:month')
  removeMonth(@Param('month') month: string) {
    return this.service.removeMonth(month);
  }

  @Public()
  @Get('active-month')
  getActiveMonth() {
    return this.service.getActiveMonth();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch('month/:month/active')
  setMonthActive(@Param('month') month: string) {
    return this.service.setMonthActive(month);
  }
}
