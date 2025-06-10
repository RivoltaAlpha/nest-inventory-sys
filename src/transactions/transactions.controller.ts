import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/users/dto/create-user.dto';

@ApiBearerAuth('access-token')
@ApiTags('Transactions') // This groups the endpoints under the 'Transactions' tag in Swagger documentation
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('create')
  @Roles( Role.Sales) // This endpoint is restricted to users with the 'sales' role
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get('all')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse) // This endpoint is restricted to users with the 'admin', 'manager', 'sales', or 'warehouse' role
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.Sales, Role.Warehouse) // This endpoint is restricted to users with the 'admin', 'manager', 'sales', or 'warehouse' role
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch('update/:id')
  @Roles(Role.Admin) // This endpoint is restricted to users with the 'admin' role
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin) // This endpoint is restricted to users with the 'admin' role
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
