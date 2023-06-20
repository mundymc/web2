import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Role } from "./entities/role.entity"
import { User } from "./entities/user.entity"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private jwtService: JwtService
  ) {     
      /*...*/
  }

  getAll(): Promise<User[]> {
   return this.repository.find() 
  }

  async createUser(user:string, password:string ,role:Role)  {
    if (await this.repository.exist({where:{user}})){
      throw new BadRequestException("El usuario ya existe")
    }
    const hash = await bcrypt.hash(password,10)
    await this.repository.insert({user,password:hash,role})
  }

  async verifyUser(user:string, password:string ):Promise<string>{
    const userdata=await this.repository.findOne({where:{user}})
    if(!userdata){
      throw new ForbiddenException("El Usuario no existe")
    }
    if (!await bcrypt.compare(password,userdata.password)){
      throw new ForbiddenException("El Usuario no existe")
    }

    return this.jwtService.sign({id:userdata.id,role:userdata.role})
  }

  
}

