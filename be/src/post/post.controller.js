// src/post/post.controller.js

const { Controller, Post, Body, Get, Param, Patch, Res } = require('@nestjs/common');
const { PostService } = require('./post.service').default;

@Controller('posts')
class PostControllers {
  constructor() {
    this.postService = new PostService();
  }

  @Post('createPost')
  async createPost(@Body() request, @Res() response) {
    if (request.tags.length > 5) {
      return response
      .status(400)
      .json({ message: [{ field: "error", message: `invalid tags length` }] });
    }
    try {
      const data = await this.postService.createPost(request);    
      return response
        .status(200)
        .json({message: "Post success", data: data})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: ` Create Post fail ${error.message}` }] });
      }
  }

  @Get(':postId')
  async getPost(@Param('postId') postId, @Res() response) {
    try {
      const data = await this.postService.getPost(postId); 
      return response
        .status(200)
        .json({message: "Get Post success", data: data})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: ` Get  Post fail ${error.message}` }] });
    }
  }

  @Get()
  async getAllPosts(@Res() response) {
    try {
      const data = await this.postService.getAllPosts();
      return response
        .status(200)
        .json({message: "Get List Post success", data: data})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: `Get List Post fail ${error.message}` }] });
      }
  }

  @Patch(':postId/vote')
  async vote(@Param('postId') postId, @Body() request, @Res() response) {
    if (request.voteType !== 'up' && request.voteType !== 'down') {
      return response
        .status(400)
        .json({ message: [{ field: "error", message: ` Invalid vote type` }] });
      }
    try {
      await this.postService.vote({voteType: request.voteType, postId: postId, userId: request.userId});
      return response
        .status(200)
        .json({message: "Vote success"})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: ` Vote fail: ${error.message}` }] });
      }
  }


}

module.exports = {PostControllers};
