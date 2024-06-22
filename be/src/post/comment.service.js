import { Injectable, Inject } from '@nestjs/common';
import "firebase/firestore";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";


@Injectable()
class CommentService {
  constructor(@Inject('FIREBASE') app) {
    this.db = getFirestore(app)
  }

  async addComment(data) {
    try {      
      const commentRef = await addDoc(collection(this.db, 'Post', data.postId, 'Comment'), {
        userId: data.userId,
        content: data.content,
        createdAt: new Date()
      });
      return commentRef.id;
    } catch (error) {
      console.error("Error Add Comment service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }

  async addReply(data) {
    try {
      const replyRef = await addDoc(collection(this.db, 'Post', data.postId, 'Comment', data.commentId, 'Reply'), {
        userId : data.userId,
        content: data.content,
        createdAt: new Date()
      });
      return replyRef.id; 
    } catch (error) {
      console.error("Error Add Reply service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }

  async getComments(postId) {
    try {
      const commentsSnapshot = await getDocs(collection(this.db, 'Post', postId, 'Comment'));
      const comments = [];
      commentsSnapshot.forEach((document) => {
        comments.push({ id: document.id, ...document.data() });
      });
      return comments;
    } catch (error) {
      console.error("Error get Comment service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }

  async getReplies(data) {
    try {
      const repliesSnapshot = await getDocs(collection(this.db, 'Post', data.postId, 'Comment', data.commentId, 'Reply'));
      const replies = [];
      repliesSnapshot.forEach((documnet) => {
        replies.push({ id: documnet.id, ...documnet.data() });
      });
      return replies;
    } catch (error) {
      console.error("Error get Reply service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }


}

export default { CommentService };