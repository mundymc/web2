import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride("isPublic", [
            context.getHandler(),
            context.getClass(),]
        )
        if (isPublic) return true

        
        const request = context.switchToHttp().getRequest()

        const [type, token] = request.headers.authorization?.split(" ") ?? []
        if (type != "Bearer" || !token) {
            throw new ForbiddenException()
        }

        try {
            const user = this.jwtService.verify(token)
            request["user"] = user

            const role = this.reflector.getAllAndOverride("isRestricted", [
                context.getHandler(),
                context.getClass(),]
            )    

            if (role && role != user.role) return false

        } catch (e) {
            console.warn(e);

            throw new ForbiddenException()
        }

        return true
    }

}