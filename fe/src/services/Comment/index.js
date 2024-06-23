import axios from "../../config/axios";

export const createComment = (data) => {
    return axios.post(`/comments/${data.postId}/comments`, data);
};


export const createReply = (data) => {
    return axios.post(`/comments/${data.postId}/comments/${data.commentId}/replies`, data);
};

export const getComments = (postId) => {
    return axios.get(`/comments/${postId}/comments`);
};


export const getReplies = (data) => {
    return axios.get(`/comments/${data.postId}/comments/${data.commentId}/replies`);
};
