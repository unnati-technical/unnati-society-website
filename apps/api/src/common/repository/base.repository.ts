import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

export abstract class BaseRepository<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string,
  ) {}

  protected get model(): any {
    return (this.prisma as any)[this.modelName];
  }

  async findMany(args?: any): Promise<T[]> {
    return this.model.findMany(args);
  }

  async paginate(
    paginationDto: PaginationDto,
    args: any = {},
  ): Promise<PaginatedResponseDto<T>> {
    const {
      page = 1,
      limit = 20,
      sort = 'desc',
      sortBy = 'createdAt',
    } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.findMany({
        ...args,
        skip,
        take: limit,
        orderBy: { [sortBy]: sort },
      }),
      this.model.count({ where: args.where }),
    ]);

    return new PaginatedResponseDto<T>(data, total, page, limit);
  }

  async findUnique(args: any): Promise<T | null> {
    return this.model.findUnique(args);
  }

  async findFirst(args: any): Promise<T | null> {
    return this.model.findFirst(args);
  }

  async create(args: any): Promise<T> {
    return this.model.create(args);
  }

  async update(args: any): Promise<T> {
    return this.model.update(args);
  }

  async delete(args: any): Promise<T> {
    return this.model.delete(args);
  }

  async deleteMany(args: any): Promise<any> {
    return this.model.deleteMany(args);
  }

  async count(args?: any): Promise<number> {
    return this.model.count(args);
  }
}
