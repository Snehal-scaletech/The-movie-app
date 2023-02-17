import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        
        const session_id: any = String(request.query.session_id);

        if (!session_id) {
            throw new UnauthorizedException(`No session ID provided.`);
        }

        return true;
    }
}