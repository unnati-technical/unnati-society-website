import { Injectable, NotFoundException } from '@nestjs/common';
import { PartnersRepository } from './repositories/partners.repository';
import { CreatePartnerDto } from './dto/create-partner.dto';

@Injectable()
export class PartnersService {
  constructor(private readonly partnersRepository: PartnersRepository) {}

  async findAll() {
    return this.partnersRepository.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const partner = await this.partnersRepository.findUnique({ where: { id } });
    if (!partner) throw new NotFoundException('Partner not found');
    return partner;
  }

  async create(data: CreatePartnerDto) {
    return this.partnersRepository.create({ data });
  }

  async update(id: string, data: Partial<CreatePartnerDto>) {
    return this.partnersRepository.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.partnersRepository.delete({ where: { id } });
  }
}
