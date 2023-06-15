import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { APP_GUARD } from '@nestjs/core';
// import { PolicyGuard } from 'src/authz/policy/policy.guard';
 
@Module({
  controllers: [UserController],
  providers: [
   
    UserService],
  exports:  [UserService]
})
export class UserModule {}
