import React, { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Typography, Space ,Button } from "antd";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/authProvider";
import { getPost, vote, createPost } from "../../services/Post";
import CommentComponent from "./comment";

const { Title, Paragraph } = Typography;



const Post = () =>{
  const { authUser } = useContext(AuthContext);
  const [post, setPost] = useState();
  const [vote, setVote] = useState();
  const { id } = useParams();

  const navigate = useNavigate()


  const fetchPost = async(projectId) => {
    try {
      const res = await getPost(projectId);
      if (res.status === 200) {
        console.log(res.data)
        setPost(res.data.data);
        setVote(res.data.data.voteCount)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = async(values) => {
    try {
      const res = await vote({userId: authUser.uid, postId: id, voteType: values});
      if (res.status === 200) {
        await fetchPost(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigateToCreatePost = () => {
    navigate("/posts/create")
    };

  useEffect(() => {
    if (id != null) {
      fetchPost(id);
    }
  }, [id]);

  return (
    <div style={{ marginBottom: 20 }}>
      <Button type="primary" onClick={navigateToCreatePost}>
        Create Post
      </Button>
      <Title level={2}>{post?.title}</Title>
      <Paragraph>{post?.description}</Paragraph>
      <Space>
        <CaretUpOutlined style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => handleVote('up')} />
        <Row>{vote}</Row>
        <CaretUpOutlined style={{ fontSize: 20, cursor: 'pointer' }} onClick={() => handleVote('down')} />
      </Space>
      {/* Add comments section or component here */}
      <div style={{ height: 400, overflowY: 'scroll', border: '1px solid #e8e8e8', marginTop: 20 }}>
        <CommentComponent postId={id}/>
      </div>
    </div>
  );
};

export default Post;