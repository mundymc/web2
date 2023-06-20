import { Body, Controller, Get, Post } from "@nestjs/common"
import { CurrentUser, Private, Public } from "./current.meta";
import { LoginDto } from "./dto/login.dto";
import { Role } from "./entities/role.entity";
import { UserService } from "./users.service";
// import { ExampleService } from "./example.service"

@Controller()
export class UserController {
    constructor(private service: UserService) {
        /*...*/
    }

    @Get()
    getAll() {
        return this.service.getAll()
    }

    @Post("/login")
    @Public()
    async postLogin(@Body() body:LoginDto){
        console.log(body.user,body.password)
        return await this.service.verifyUser(body.user,body.password)  

    }

    @Post("/signup")
    @Public()
    async postSignUp(@Body() body:LoginDto){
        console.log(body.user,body.password) 
        await this.service.createUser(body.user,body.password,Role.USER)  
    }

    @Get("/me")
    @Private(Role.ADMIN)
    getMe(@CurrentUser() user){
        console.log(user);
        
    }
}

