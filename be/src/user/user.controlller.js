const { Controller, Post, Param, Body, Patch } = require('@nestjs/common');
const UserService = require('./user.service');

@Controller('user')
class UserController {
  constructor() {
    this.userService = new UserService();
  }

  @Patch(':userId/avatar')
  async changeAvatar(@Param('userId') userId, @Body('avatarUrl') avatarUrl) {
    return await this.userService.changeAvatar(userId, avatarUrl);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email) {
    return await this.userService.forgotPassword(email);
  }

  @Get('profile')
  async getUserProfile(@Param('userId') userId) {
    
  }
}

module.exports = UserController;
