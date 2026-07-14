import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import axios from 'axios';
import { EmailService } from '../../queues/email/email.service';

@Injectable()
export class DonationsService {
  private readonly logger = new Logger(DonationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createOrder(
    amount: number,
    donorName: string,
    donorEmail: string,
    donorPhone?: string,
    donorPan?: string,
    donorAddress?: string,
  ) {
    if (amount > 100000) {
      throw new BadRequestException('Maximum donation amount is ₹1,00,000');
    }
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

      // 2. Generate Cashfree Order
      const cashfreeEnv = process.env.CASHFREE_ENV || 'SANDBOX';
      const baseUrl =
        cashfreeEnv === 'PRODUCTION'
          ? 'https://api.cashfree.com/pg/orders'
          : 'https://sandbox.cashfree.com/pg/orders';

      let validPhone = donorPhone ? donorPhone.replace(/\D/g, '') : '';
      if (validPhone.length < 10) validPhone = '9999999999';
      if (validPhone.length > 10)
        validPhone = validPhone.substring(validPhone.length - 10);

      let validName = donorName ? donorName.trim() : 'Donor';
      if (validName.length < 3) validName = validName + '  ';

      const payload = {
        order_id: donation.id, // We use our DB ID as the Cashfree order_id
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id:
            donorEmail.replace(/[^a-zA-Z0-9]/g, '').substring(0, 50) ||
            'customer',
          customer_name: validName,
          customer_email: donorEmail || 'donor@example.com',
          customer_phone: validPhone,
        },
        order_meta: {
          return_url: `${process.env.FRONTEND_URL || 'https://unnati.iiitbh.ac.in'}/donate?order_id=${donation.id}`,
        },
      };

      const response = await axios.post(baseUrl, payload, {
        headers: {
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
          'x-api-version': '2023-08-01',
          'Content-Type': 'application/json',
        },
      });

      return {
        orderId: response.data.order_id,
        donationId: donation.id,
        amount: response.data.order_amount,
        currency: response.data.order_currency,
        payment_session_id: response.data.payment_session_id,
      };
    } catch (error) {
      console.error(
        'Cashfree Error details:',
        error.response?.data || error.message,
      );
      throw new InternalServerErrorException(
        'Error creating Cashfree order: ' +
          (error.response?.data?.message || error.message),
      );
    }
  }

  async verifyPayment(orderId: string, donationId: string) {
    try {
      const cashfreeEnv = process.env.CASHFREE_ENV || 'SANDBOX';
      const baseUrl =
        cashfreeEnv === 'PRODUCTION'
          ? `https://api.cashfree.com/pg/orders/${orderId}`
          : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

      const response = await axios.get(baseUrl, {
        headers: {
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
          'x-api-version': '2023-08-01',
        },
      });

      const orderStatus = response.data.order_status;

      if (orderStatus === 'PAID') {
        const updatedDonation = await this.prisma.donation.update({
          where: { id: donationId },
          data: {
            status: 'COMPLETED',
            transactionId: orderId,
          },
        });

        await this.emailService.sendDonationThankYouEmail(
          updatedDonation.donorName,
          updatedDonation.donorEmail,
          updatedDonation.amount,
        );

        await this.emailService.sendAdminDonationNotification(
          updatedDonation.donorName,
          updatedDonation.donorEmail,
          updatedDonation.amount,
          updatedDonation.donorPhone || undefined,
        );

        return {
          success: true,
          message: 'Payment verified successfully',
          donation: updatedDonation,
        };
      } else {
        await this.prisma.donation.update({
          where: { id: donationId },
          data: { status: 'FAILED' },
        });
        throw new BadRequestException(
          `Payment not successful. Status: ${orderStatus}`,
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error('Verify error:', error.response?.data || error.message);
      throw new InternalServerErrorException(
        'Error verifying payment: ' +
          (error.response?.data?.message || error.message),
      );
    }
  }

  async handleWebhook(body: any) {
    try {
      this.logger?.log(`Received Cashfree Webhook: ${body?.type}`);

      const orderId =
        body?.data?.order?.order_id || body?.data?.refund?.order_id;
      if (!orderId) return { success: true };

      // Handle Refunds
      if (
        body?.type?.includes('REFUND') ||
        body?.data?.refund?.refund_status === 'SUCCESS'
      ) {
        await this.prisma.donation.updateMany({
          where: { id: orderId },
          data: { status: 'REFUNDED' },
        });
        return { success: true };
      }

      // Handle Success (Fallback if frontend verification failed/closed)
      if (
        body?.type === 'PAYMENT_SUCCESS_WEBHOOK' ||
        body?.data?.payment?.payment_status === 'SUCCESS'
      ) {
        const donation = await this.prisma.donation.findUnique({
          where: { id: orderId },
        });

        if (donation && donation.status === 'PENDING') {
          const updatedDonation = await this.prisma.donation.update({
            where: { id: orderId },
            data: { status: 'COMPLETED' },
          });

          await this.emailService.sendDonationThankYouEmail(
            updatedDonation.donorName,
            updatedDonation.donorEmail,
            updatedDonation.amount,
          );

          await this.emailService.sendAdminDonationNotification(
            updatedDonation.donorName,
            updatedDonation.donorEmail,
            updatedDonation.amount,
            updatedDonation.donorPhone || undefined,
          );
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Webhook processing error:', error);
      return { success: false };
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

  async deleteDonation(id: string) {
    try {
      await this.prisma.donation.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      this.logger?.error('Error deleting donation', error);
      throw new InternalServerErrorException('Failed to delete donation');
    }
  }
}
