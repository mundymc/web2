import { createParamDecorator, ForbiddenException, SetMetadata } from "@nestjs/common";
import { Role } from "./entities/role.entity";


export const CurrentUser=createParamDecorator((data,context)=>{
    const user=context.switchToHttp().getRequest().user
    
    if(!user) throw new ForbiddenException()
    
    return user
})

export function Public(){
    return SetMetadata("isPublic",true)
}

export function Private(role:Role){
    return SetMetadata("isRestricted",role)
}
