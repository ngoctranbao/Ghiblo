// src/post/post.controller.js

const { Controller, Post, Body, Get, Param, Patch, Res } = require('@nestjs/common');
const { CommentService } = require('./comment.service').default;

@Controller('comments')
class CommentControllers {
  constructor() {
    this.commentService = new CommentService();
  }

  @Post(':postId/comments')
  async addComment(@Param('postId') postId, @Body() request, @Res()response) {
    try {
      const data = await this.commentService.addComment({postId: postId, content: request.content, userId: request.userId}); 
      return response
        .status(200)
        .json({message: "Comment success", data: data})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: ` Comment fail ${error.message}` }] });
    }
  }

  @Post(':postId/comments/:commentId/replies')
  async addReply(@Param('postId') postId, @Param('commentId') commentId, @Body() request, @Res()response) {
    try {
      const data = await this.commentService.addReply({postId: postId, commentId: commentId, content: request.content, userId: request.userId}); 
      return response
        .status(200)
        .json({message: "Reply success", data: data})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: ` Reply fail ${error.message}` }] });
    }  }

  @Get(':postId/comments')
  async getComments(@Param('postId') postId, @Res() response) {
    try {
      const data = await this.commentService.getComments(postId);
      return response
        .status(200)
        .json({message: "Get List Comment success", data: data})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: `Get List Comment fail ${error.message}` }] });
      }  
  }

  @Get(':postId/comments/:commentId/replies')
  async getReplies(@Param('postId') postId, @Param('commentId') commentId, @Res()response) {
    try {
      const data = await this.commentService.getReplies({postId: postId, commentId: commentId});
      return response
        .status(200)
        .json({message: "Get Reply success", data: data})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: `Get List Reply fail ${error.message}` }] });
      }
  }


}

module.exports = {CommentControllers};
