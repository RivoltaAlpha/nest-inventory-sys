import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'access' })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
