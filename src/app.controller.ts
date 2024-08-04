import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './common/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor() {}

  @Get()
  someProtectedRoute(@Req() req) {
    return { message: 'Accessed Resource', userdId: req.userdId };
  }
}
