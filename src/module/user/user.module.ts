import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/config/database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
    imports:[DatabaseModule , TypeOrmModule.forFeature([User])],
    controllers:[UserController],
    providers:[UserService],
})
export class UserModule {}