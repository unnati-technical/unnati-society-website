import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Public()
  @Post()
  async subscribe(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscribersService.subscribe(createSubscriberDto.email);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get()
  async getAllSubscribers() {
    return this.subscribersService.getAllSubscribers();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  async deleteSubscriber(@Param('id') id: string) {
    return this.subscribersService.deleteSubscriber(id);
  }
}
