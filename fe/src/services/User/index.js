import axios from "../../config/axios";

// export const loginMe = () => {
//   return axios.get("/api/auth/me");
// };

export const followService = (data) => {
    return axios.post("/follow/followUser",data)
}

export const unfollowUser = (data) => {
    return axios.post("/follow/unfollowUser", data)
}

export const followerAmount = (userId) => {
    return axios.get(`/follow/followers-count/${userId}`)
}

export const followingAmount = (userId) => {
    return axios.get(`/follow/following-count/${userId}`)
}

export const followerList = (userId) => {
    return axios.get(`/follow/followers/${userId}`)
}

export const followingList = (userId) => {
    return axios.get(`/follow/following/${userId}`)
}

export const isFollow = (data) => {
    return axios.get(`/follow/isFollow/`, data)
}