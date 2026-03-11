import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Injectable()
export class RecordsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.product.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, ownerId: userId },
    });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(dto: CreateRecordDto, userId: string) {
    return this.prisma.product.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async update(id: string, dto: UpdateRecordDto, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!product) throw new NotFoundException(`Product #${id} not found`);
    if (product.ownerId !== userId) {
      throw new ForbiddenException('You are not allowed to modify this product');
    }

    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: string, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { ownerId: true },
    });

    if (!product) throw new NotFoundException(`Product #${id} not found`);
    if (product.ownerId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this product');
    }

    return this.prisma.product.delete({ where: { id } });
  }
}
