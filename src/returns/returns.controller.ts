import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';

@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post('create')
  create(@Body() createReturnDto: CreateReturnDto) {
    return this.returnsService.create(createReturnDto);
  }

  @Get('all')
  findAll() {
    return this.returnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnsService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateReturnDto: UpdateReturnDto) {
    return this.returnsService.update(+id, updateReturnDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.returnsService.remove(+id);
  }
}
