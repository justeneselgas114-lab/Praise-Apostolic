import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // In development, allow access without a JWT so the admin UI can be built/tested
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    return super.canActivate(context);
  }
}
