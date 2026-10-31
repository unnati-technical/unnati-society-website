import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Delete,
  Param,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) { }

  @Public()
  @Post('create-order')
  async createOrder(
    @Body('amount') amount: number,
    @Body('donorName') donorName: string,
    @Body('donorEmail') donorEmail: string,
    @Body('donorPhone') donorPhone?: string,
    @Body('donorPan') donorPan?: string,
    @Body('donorAddress') donorAddress?: string,
  ) {
    return this.donationsService.createOrder(
      amount,
      donorName,
      donorEmail,
      donorPhone,
      donorPan,
      donorAddress,
    );
  }

  @Public()
  @Post('verify-payment')
  async verifyPayment(
    @Body('orderId') orderId: string,
    @Body('donationId') donationId: string,
  ) {
    return this.donationsService.verifyPayment(orderId, donationId);
  }

  @Public()
  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    return this.donationsService.handleWebhook(body);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get()
  async findAll() {
    return this.donationsService.findAll();
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  async deleteDonation(@Param('id') id: string, @Req() req: any) {
    // Only allow specific admin to delete donations
    if (req.user?.email?.toLowerCase() !== 'technical.ir@iiitbh.ac.in') {
      throw new BadRequestException('Unauthorized to delete donations');
    }
    return this.donationsService.deleteDonation(id);
  }
}
