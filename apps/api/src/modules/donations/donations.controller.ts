import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { Public } from '../auth/decorators/public.decorator';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

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
    @Body('razorpay_order_id') orderId: string,
    @Body('razorpay_payment_id') paymentId: string,
    @Body('razorpay_signature') signature: string,
    @Body('donationId') donationId: string,
  ) {
    return this.donationsService.verifyPayment(
      orderId,
      paymentId,
      signature,
      donationId,
    );
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get()
  async findAll() {
    return this.donationsService.findAll();
  }
}
