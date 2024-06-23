const { Controller, Get, Post, Body, Req, Res } = require('@nestjs/common');
const { AuthService } = require('./auth.service').default;

@Controller('auth')
class AuthControllers {
  constructor() {
    this.authService = new AuthService();
  }


  @Post('login')
  async login(@Body() request, @Res() response) {
    try {
      const data = await this.authService.login(request);
      return response
        .status(200)
        .json({message: "Login successfully", user: data});
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: error.message }] });
    }
  }


  @Post('signup')
  async signup(@Body() request, @Res() response) {
    try {
      const data = await this.authService.createUserAuth(request);
      const user = await this.authService.createUserFirestore(data)
      return response
        .status(200)
        .json({
          message: "Sign up success",
          data: user
        });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @Post('logout')
  async logout(@Body() request, @Res() response) {
    try {
      const status = await this.authService.logout(request);
      return response
        .status(200)
        .json({ message: "Sign up successfully", data: status });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }  }
}

module.exports = { AuthControllers };
