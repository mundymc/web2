import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./entities/user.entity"
import { AuthGuard } from "./user.guard"
import { UserController } from "./users.controller"
import { UserService } from "./users.service"


@Module({
  controllers: [UserController],
  providers:[UserService,AuthGuard],
  exports:[AuthGuard],
  imports:[ TypeOrmModule.forFeature([User]),
            JwtModule.register({secret:"key"})
          ]
})
export class UsersModule {
  /*...*/ 
}