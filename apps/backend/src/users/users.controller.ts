import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('mock')
  async getMockUser() {
    // Hardcoded user ID for mock purposes
    const mockUserId = '3aa2f075-5d05-4069-b822-1b4f13fa4b77';

    const user = await this.usersService.findOne(mockUserId);

    if (!user) {
      return {
        message:
          'Mock user not found. Please ensure a user with the hardcoded ID exists in the database.',
        mockUserId,
      };
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
