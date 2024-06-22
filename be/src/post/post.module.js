const { Module } = require('@nestjs/common');
const { PostControllers } = require('./post.controller');
const { CommentControllers } = require('./comment.controller');
const { CommentService } = require('./comment.service').default;
const { PostService } = require('./post.service').default;


@Module({
  controllers: [PostControllers, CommentControllers],
  providers: [PostService, CommentService],
})
class PostModule {}

module.exports = { PostModule };
