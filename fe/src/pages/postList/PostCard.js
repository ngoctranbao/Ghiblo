import React, { useEffect } from "react";
import { Card, Tag, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./PostCard.scss";

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

  useEffect(() => {
    console.log(post)
  }, [])

return (
    <Card
      style={{width: '100%' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
          {post?.title}
        </div>
      }
      extra={<span>{post?.createdAt}</span>}
      onClick={navigate(`/posts/${post?.id}`)}
    >
      <p><strong>Author:</strong> {post?.author}</p>
      <div>
        {post?.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Card>
  );
};

export default PostCard;
