import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseArrayPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { LeadershipService } from './leadership.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Public } from '../auth/decorators/public.decorator';
import {
  CreateLeadershipYearDto,
  DuplicateYearDto,
  CreateLeadershipSectionDto,
  CreateLeadershipMemberDto,
  ReorderItemsDto,
} from './dto/leadership.dto';

@Controller('leadership')
export class LeadershipController {
  constructor(
    private readonly leadershipService: LeadershipService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ---------- Public Read Endpoints ----------
  @Public()
  @Get()
  getLeadershipData() {
    return this.leadershipService.getLeadershipData();
  }

  @Public()
  @Get(':year')
  getYearData(@Param('year') year: string) {
    return this.leadershipService.getYearData(year);
  }

  // ---------- Image Upload (Admin Only) ----------
  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.cloudinaryService.uploadFile(
      file,
      'leadership_profiles',
    );
    return { url: (result as any).secure_url };
  }

  // ---------- Year CRUD ----------
  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('year')
  createYear(@Body() createYearDto: CreateLeadershipYearDto) {
    return this.leadershipService.createYear(createYearDto);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('duplicate-year')
  duplicateYear(@Body() duplicateYearDto: DuplicateYearDto) {
    return this.leadershipService.duplicateYear(duplicateYearDto);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch('year/:id/archive')
  archiveYear(@Param('id') id: string) {
    return this.leadershipService.archiveYear(id);
  }

  // ---------- Section CRUD ----------
  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('section')
  createSection(@Body() createSectionDto: CreateLeadershipSectionDto) {
    return this.leadershipService.createSection(createSectionDto);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch('section/:id')
  updateSection(
    @Param('id') id: string,
    @Body() updateSectionDto: Partial<CreateLeadershipSectionDto>,
  ) {
    return this.leadershipService.updateSection(id, updateSectionDto);
  }

  @Public()
  @Delete('section/:id')
  deleteSection(@Param('id') id: string) {
    return this.leadershipService.deleteSection(id);
  }

  // ---------- Member CRUD ----------
  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('member')
  createMember(@Body() createMemberDto: CreateLeadershipMemberDto) {
    return this.leadershipService.createMember(createMemberDto);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Patch('member/:id')
  updateMember(
    @Param('id') id: string,
    @Body() updateMemberDto: Partial<CreateLeadershipMemberDto>,
  ) {
    return this.leadershipService.updateMember(id, updateMemberDto);
  }

  @Public()
  @Delete('member/:id')
  deleteMember(@Param('id') id: string) {
    return this.leadershipService.deleteMember(id);
  }

  // ---------- Reorder ----------
  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('reorder/sections')
  reorderSections(
    @Body(new ParseArrayPipe({ items: ReorderItemsDto }))
    items: ReorderItemsDto[],
  ) {
    return this.leadershipService.reorderSections(items);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post('reorder/members')
  reorderMembers(
    @Body(new ParseArrayPipe({ items: ReorderItemsDto }))
    items: ReorderItemsDto[],
  ) {
    return this.leadershipService.reorderMembers(items);
  }
}
