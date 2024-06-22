const { Module } = require('@nestjs/common');
// const { UserController } = require('.user.controller');
// const { UserService } = require('./user.service');
const { FollowControllers } = require('./follow.controllers');
const { FollowService } = require('./follow.service').default;

@Module({
  controllers: [ FollowControllers],
  providers: [ FollowService],
})
class UserModule {}

module.exports = { UserModule };
