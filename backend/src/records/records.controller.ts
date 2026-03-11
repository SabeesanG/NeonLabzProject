import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: { userId: string; email: string };
}

@UseGuards(JwtAuthGuard)
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.recordsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.recordsService.findOne(id, req.user.userId);
  }

  @Post()
  create(@Body() dto: CreateRecordDto, @Req() req: AuthenticatedRequest) {
    return this.recordsService.create(dto, req.user.userId);
  }

  @Patch(':id')
  updatePatch(
    @Param('id') id: string,
    @Body() dto: UpdateRecordDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.recordsService.update(id, dto, req.user.userId);
  }

  @Put(':id')
  updatePut(
    @Param('id') id: string,
    @Body() dto: UpdateRecordDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.recordsService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.recordsService.remove(id, req.user.userId);
  }
}
