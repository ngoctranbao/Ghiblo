import React, { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button, Tooltip, Form, List, Avatar, Input  } from "antd";
import { Comment } from '@ant-design/compatible';
import { UserOutlined } from "@ant-design/icons"
import { AuthContext } from "../../providers/authProvider";
import moment from 'moment';
import { getComments, createComment, createReply, getReplies } from "../../services/Comment";


const CommentComponent = ({postId}) =>{
  const { authUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { TextArea } = Input;

  
  const fetchComment = async(projectId) => {
    try {
      const res = await getComments(projectId);
      if (res.status === 200) {
        console.log(res.data.data)
        setComments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      fetchComment(postId);
  }, []);

  const handlecreateComment = async(values) => {
    try {
      const res = await createComment(values);
      if (res.status === 200) {
        fetchComment(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      return; // Prevent adding empty comments
    }

    console.log(`${authUser.uid} && ${newComment}`)
    await handlecreateComment( {
      postId: postId,
      userId: authUser.uid,
      content: newComment,
    });

    // setComments([...comments, newCommentObject]); // Add new comment to the list
    setNewComment(''); // Clear the input field after adding comment
  };

    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment) => (
            <Comment
              author={comment?.userId}
              avatar={<Avatar icon={<UserOutlined />} />}
              content={<p>{comment?.content}</p>}
              datetime={
                <Tooltip title={moment(comment?.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(comment?.createdAt).fromNow()}</span>
                </Tooltip>
              }
            />
          )}
        />

      <Form.Item>
        <TextArea
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a new comment"
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </Form.Item>  
      </>
    );
};

const Editor = () => (
  <Form.Item>
    <TextArea rows={4} />
    <Button htmlType="submit" type="primary">
      Add Comment
    </Button>
  </Form.Item>
);


export default CommentComponent;