const { Module } = require('@nestjs/common');
const { AuthControllers } = require('./auth.controller')
const { AuthService } = require('./auth.service').default

@Module({
  controllers: [AuthControllers],
  providers: [AuthService],
})
class AuthModule {}

module.exports = { AuthModule };
