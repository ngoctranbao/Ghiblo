import axios from "../../config/axios";

export const createPost = (data) => {
    return axios.post("/posts/createPost", data);
};


export const getPost = (postId) => {
    console.log(postId)
    return axios.get(`posts/${postId}`);
};

export const getAllPosts = () => {
    return axios.get(`/posts`);
};


export const vote = (data) => {
    return axios.patch(`/posts/${data.postId}/vote`, data);
};

