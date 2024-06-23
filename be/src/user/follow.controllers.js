const { Controller, Post, Delete, Param, Get, Body, Res } = require('@nestjs/common');
const { FollowService } = require('./follow.service').default;

@Controller('follow')
class FollowControllers {
  constructor() {
    this.followService = new FollowService();
  }

  @Post('followUser')
  async followUser(@Body() request, @Res() response) {
    try {
      const data = await this.followService.followUser(request);
      return response
        .status(200)
        .json({message: "Follow success", data: data})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: ` Follow fail ${error.message}` }] });
    }
  }

  @Delete('unfollowUser')
  async unfollowUser(@Body() request, @Res() response) {
    try {
      const data = await this.followService.unfollowUser(request);
      return response
        .status(200)
        .json({message: "UnFollow success", data: data})
    } catch (error) {
      console.log(error);
      return response
        .status(400)
        .json({ message: [{ field: "error", message: ` UnFollow fail ${error.message}` }] });
    }  
  }

  @Get('followers-count/:userId')
  async getFollowersCount(@Param('userId') userId, @Res() response) {
    try {
      const count = await this.followService.getFollowersCount(userId);
      return response
        .status(200)
        .json({message: "Count Follower success", data: count})
    } catch (error) {
        console.log(error);
        return response
          .status(400)
          .json({ message: [{ field: "error", message: ` Failed to get followers count ${error.message}` }] });
    }
  }

  @Get('following-count/:userId')
  async getFollowingCount(@Param('userId') userId, @Res() response) {
    try {
      const count = await this.followService.getFollowingCount(userId);
      return response
        .status(200)
        .json({message: "Count Following success", data: count})
    } catch (error) {
      console.log(error);
        return response
          .status(400)
          .json({ message: [{ field: "error", message: ` Failed to get following count ${error.message}` }] });
    }
  }

  @Get('followers/:userId')
  async getFollowerDetail(@Param('userId') userId, @Res() response) {
    try {
      const followers = await this.followService.getFollowerDetail(userId);
      return response
        .status(200)
        .json({message: "Get follower success", data: followers})
    } catch (error) {
      console.log(error);
        return response
          .status(400)
          .json({ message: [{ field: "error", message: `Failed to get follower details ${error.message}` }] });
    }
  }

  @Get('following/:userId')
  async getFollowingDetail(@Param('userId') userId, @Res() response) {
    try {
      const following = await this.followService.getFollowingDetail(userId);
      return response
        .status(200)
        .json({message: "Get following success", data: following})
    } catch (error) {
      console.log(error);
        return response
          .status(400)
          .json({ message: [{ field: "error", message: `Failed to get following details ${error.message}` }] });
    }
  }

  @Get('isFollow')
  async isFollow(@Body() request, @Res() response) {
    try {
      const isFollow = await this.followService.isFollow(request);
      return response
        .status(200)
        .json({message: "Get following success", data: isFollow === true ? true : false})
    } catch (error) {
      console.log(error);
        return response
          .status(400)
          .json({ message: [{ field: "error", message: `Failed to get following details ${error.message}` }] });
    }
  }

}

module.exports = { FollowControllers };
