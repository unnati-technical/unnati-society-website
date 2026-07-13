import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import { EmailService } from '../../queues/email/email.service';

@Injectable()
export class DonationsService {
  private razorpay: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    });
  }

  async createOrder(
    amount: number,
    donorName: string,
    donorEmail: string,
    donorPhone?: string,
    donorPan?: string,
    donorAddress?: string,
  ) {
    try {
      // 1. Create a Pending Donation in Database
      const donation = await this.prisma.donation.create({
        data: {
          amount,
          donorName,
          donorEmail,
          donorPhone,
          donorPan,
          donorAddress,
          status: 'PENDING',
          currency: 'INR',
        },
      });

      // 2. Generate Razorpay Order
      const options = {
        amount: amount * 100, // Razorpay works in smallest currency unit (paise)
        currency: 'INR',
        receipt: donation.id, // We use our DB ID as receipt ID for mapping
      };

      const order = await this.razorpay.orders.create(options);

      return {
        orderId: order.id,
        donationId: donation.id,
        amount: order.amount,
        currency: order.currency,
      };
    } catch (error) {
      console.error('Razorpay Error details:', JSON.stringify(error, null, 2));
      throw new InternalServerErrorException(
        'Error creating Razorpay order: ' +
          (error.message || error.error?.description || 'Unknown error'),
      );
    }
  }

  async verifyPayment(
    orderId: string,
    paymentId: string,
    signature: string,
    donationId: string,
  ) {
    try {
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
        .update(orderId + '|' + paymentId)
        .digest('hex');

      if (generatedSignature === signature) {
        // Payment is authentic
        const updatedDonation = await this.prisma.donation.update({
          where: { id: donationId },
          data: {
            status: 'COMPLETED',
            transactionId: paymentId,
          },
        });

        // Send a heartfelt thank you email!
        await this.emailService.sendDonationThankYouEmail(
          updatedDonation.donorName,
          updatedDonation.donorEmail,
          updatedDonation.amount,
        );

        return {
          success: true,
          message: 'Payment verified successfully',
          donation: updatedDonation,
        };
      } else {
        // Payment is fake/tampered
        await this.prisma.donation.update({
          where: { id: donationId },
          data: { status: 'FAILED' },
        });
        throw new BadRequestException('Invalid payment signature');
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        'Error verifying payment: ' + error.message,
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.donation.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching donations: ' + error.message,
      );
    }
  }
}
