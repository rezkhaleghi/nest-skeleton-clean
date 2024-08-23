import { Injectable, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class UserGuard extends JwtAuthGuard {
  canActivate(context: ExecutionContext) {
    super.canActivate(context);
    return true;
  }
}
