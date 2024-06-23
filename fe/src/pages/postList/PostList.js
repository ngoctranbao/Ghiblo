import React, { useEffect, useState } from 'react';

import PostCard from './PostCard';
import { getAllPosts } from '../../services/Post';
import { Empty, Row, Spin } from 'antd';


const PostList = () => {
  const [postList, setPostList] = useState([])
  const [loading, setLoading] = useState(true);


  const fetchAllPost = async() => {
    try {
      const res = await getAllPosts();
      if (res.status === 200) {
        console.log(res.data)
        setPostList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllPost();
  }, []);


  return (
    <div>
      {loading ? (
        <Spin />
      ) : (postList?.length > 0 ? (
        postList.map((post, index) => {
          return <PostCard post={post} key={`post${index}`} />;
        })
      ) : (
        <Row style={{ justifyContent: "center" }}>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 200,
            }}
            description="Chưa có Post nào!"
          ></Empty>
        </Row>
      ))}
    </div>
  );
};

export default PostList;
