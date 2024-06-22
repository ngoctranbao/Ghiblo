// src/post/post.controller.js

const { Controller, Post, Body, Get, Param, Patch } = require('@nestjs/common');
const { CommentService } = require('./comment.service').default;

@Controller('comment')
class CommentControllers {
  constructor() {
    this.commentService = new CommentService();
  }

  @Post(':postId/comments')
  async addComment(@Param('postId') postId, @Body('userId') userId, @Body('content') content) {
    return this.postService.addComment(postId, userId, content);
  }

  @Post(':postId/comments/:commentId/replies')
  async addReply(@Param('postId') postId, @Param('commentId') commentId, @Body('userId') userId, @Body('content') content) {
    return this.postService.addReply(postId, commentId, userId, content);
  }

  @Get(':postId/comments')
  async getComments(@Param('postId') postId) {
    return this.postService.getComments(postId);
  }

  @Get(':postId/comments/:commentId/replies')
  async getReplies(@Param('postId') postId, @Param('commentId') commentId) {
    return this.postService.getReplies(postId, commentId);
  }


}

module.exports = {CommentControllers};
