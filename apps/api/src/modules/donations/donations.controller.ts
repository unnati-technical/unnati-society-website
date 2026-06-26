import { Controller, Post, Body, Get } from '@nestjs/common';
import { DonationsService } from './donations.service';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

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

  @Get()
  async findAll() {
    return this.donationsService.findAll();
  }
}
