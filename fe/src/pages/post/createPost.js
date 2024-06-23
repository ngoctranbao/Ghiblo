import React, { useState,useContext } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate, useHistory } from 'react-router-dom';
import { AuthContext } from '../../providers/authProvider';
import { createPost } from '../../services/Post';

const { TextArea } = Input;
const { Option } = Select;

const PostComponent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagError, setTagError] = useState('');
  const { authUser } = useContext(AuthContext);

  const navigate = useNavigate()


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTagsChange = (selectedTags) => {
    setTags(selectedTags);
    // Clear tag error message when tags are selected
    if (selectedTags.length > 0) {
      setTagError('');
    }
  };

  const handlecreatePost = async(values) => {
    try {
      const res = await createPost(values);
      if (res.status === 200) {
        toast("Success")
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    // Replace with your logic to handle form submission
    await handlecreatePost({title: title, description: content, ownerId: authUser?.uid, tags: tags})
    
    // Example: Reset form fields after submission
    setTitle('');
    setContent('');
  };

  return (
    <Form>
      <Form.Item label="Title">
        <Input value={title} onChange={handleTitleChange} placeholder="Enter post title" />
      </Form.Item>
      <Form.Item label="Content">
        <TextArea rows={4} value={content} onChange={handleContentChange} placeholder="Enter post content" />
      </Form.Item>
      <Form.Item label="Tags" validateStatus={tagError ? 'error' : ''} help={tagError}>
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Enter tags"
          value={tags}
          onChange={handleTagsChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Create Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostComponent;
