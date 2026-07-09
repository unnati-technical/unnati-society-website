import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Public() // Needs to be public so the frontend can check before logging in
  @Get('verify')
  verifyAdmin(@Query('email') email: string) {
    if (!email) {
      return { isAuthorized: false };
    }
    return this.adminsService.verifyAdmin(email);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Post()
  create(@Body() body: { email: string; name: string }) {
    return this.adminsService.create(body.email, body.name);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
