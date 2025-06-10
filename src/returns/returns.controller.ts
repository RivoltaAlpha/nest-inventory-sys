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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/users/dto/create-user.dto'; 

@ApiBearerAuth('access-token')
@ApiTags('Returns') // This groups the endpoints under the 'Returns' tag in Swagger documentation
@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post('create')
  @Roles(Role.Sales, Role.Manager, Role.Admin, Role.Warehouse)
  create(@Body() createReturnDto: CreateReturnDto) {
    return this.returnsService.create(createReturnDto);
  }

  @Get('all')
  @Roles(Role.Sales, Role.Manager, Role.Admin, Role.Warehouse)
  findAll() {
    return this.returnsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Sales, Role.Manager, Role.Admin, Role.Warehouse)
  findOne(@Param('id') id: string) {
    return this.returnsService.findOne(+id);
  }

  @Patch('update/:id')
  @Roles(Role.Sales, Role.Manager, Role.Admin, Role.Warehouse)
  update(@Param('id') id: string, @Body() updateReturnDto: UpdateReturnDto) {
    return this.returnsService.update(+id, updateReturnDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Sales, Role.Manager, Role.Admin, Role.Warehouse)
  remove(@Param('id') id: string) {
    return this.returnsService.remove(+id);
  }
}
