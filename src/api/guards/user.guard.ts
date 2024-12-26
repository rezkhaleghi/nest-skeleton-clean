import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Injectable()
export class UserGuard extends AuthGuard {
  canActivate(context: ExecutionContext) {
    super.canActivate(context);
    return true;
  }
}
