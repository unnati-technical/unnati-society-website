import { Injectable, NotFoundException } from '@nestjs/common';
import { SchoolsRepository } from './repositories/schools.repository';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolsService {
  constructor(private readonly schoolsRepository: SchoolsRepository) {}

  async findAll() {
    return this.schoolsRepository.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const school = await this.schoolsRepository.findUnique({ where: { id } });
    if (!school) throw new NotFoundException('School not found');
    return school;
  }

  async create(data: CreateSchoolDto) {
    return this.schoolsRepository.create({ data });
  }

  async update(id: string, data: Partial<CreateSchoolDto>) {
    return this.schoolsRepository.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.schoolsRepository.delete({ where: { id } });
  }
}
