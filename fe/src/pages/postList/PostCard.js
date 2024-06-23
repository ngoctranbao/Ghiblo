import React, { useContext, useEffect, useState } from "react";
import { Card, Tag, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./PostCard.scss";
import { followService, followerAmount, followingAmount, unfollowUser } from "../../services/User";
import { AuthContext } from "../../providers/authProvider";

const PostCard = ({
    post = 
        {
          id: 1,
          author: 'Đặng Đức Công',
          time: '23-06-2024',
          title: 'SonarLint: Bí Quyết Để Viết Mã Nguồn Chất Lượng Cao',
          tags: ['barcode', 'Code Quality'],
        },
        // Add more data objects as needed
    }) => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext)
  const [isFollowing, setIsFollowing] = useState(false);
  const [follower, setFollower] = useState();  
  const [following, setFollowing] = useState();  

  const getFollowersCount = async (userId) => {
    try{
      const res = await followerAmount(userId);
      if (res.status === 200) {
        console.log(res.data.data)
        setFollower(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getFollowingsCount = async (userId) => {
    try{
      const res = await followingAmount(userId);
      if (res.status === 200) {
        console.log(res.data.data)
        setFollowing(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const isFollow = async (values) => {
    try{
      const res = await followingAmount(values);
      if (res.status === 200) {
        console.log(res.data.isFollow)
        setIsFollowing(res.data.isFollow);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleFollow = async (userId) => {
    try{
      const res = await followService({followerId: authUser, followeeId: userId});
      if (res.status === 200) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async (userId) => {
    try{
      const res = await unfollowUser({followerId: authUser, followeeId: userId});
      if (res.status === 200) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }    setIsFollowing(false);
  };

  useEffect(() => {
    isFollow(post?.ownerId)
    getFollowersCount(post?.ownerId)
    getFollowingsCount(post?.ownerId)
  }, [])

  const navigateToPost = (postId) => {
    navigate(`/posts/${postId}`)
  }

return (
    <Card
      style={{width: '100%' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
            <div>
              <div>{post?.ownerId}</div>
              <div style={{ fontSize: 12, color: 'gray' }}>
                {follower} Followers | {following} Following
              </div>
            </div>
          </div>
          <div>
            {isFollowing ? (
              <Button onClick={handleUnfollow}>Unfollow</Button>
            ) : (
              <Button type="primary" onClick={handleFollow}>
                Follow
              </Button>
            )}
          </div>
        </div>
      }
      extra={<span>{post?.createdAt}</span>}
      onClick={() => navigateToPost(post?.id)}
    >
      <p><strong>{post?.title}</strong></p>
      <div>
        {post?.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Card>
  );
};

export default PostCard;
