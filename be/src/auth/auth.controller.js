// src/cats/cats.controller.js
const { Controller, Get, Post, Body } = require('@nestjs/common');
const { AuthService } = require('./auth.service').default;

@Controller('auth')
class AuthControllers {
  constructor() {
    this.authService = new AuthService();
  }

  @Get()
  getHello() {
    return this.authService.getHello();
  }

  @Post()
  login(@Body() data) {
    return this.authService.login(data);
  }

  @Post()
  signup(@Body() createCatDto) {
    return this.authService.signup(createCatDto);
  }

  @Post()
  logout(@Body() data) {
    return this.authService.logout(data)
  }
}

module.exports = { AuthControllers };
