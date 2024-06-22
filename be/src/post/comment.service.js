import { Injectable, Inject } from '@nestjs/common';
import "firebase/firestore";
import { getFirestore, setDoc, doc } from "firebase/firestore";


@Injectable()
class CommentService {
  constructor(@Inject('FIREBASE') app) {
    this.db = getFirestore(app)
  }

  async addComment(postId, userId, content) {
    const commentRef = await addDoc(collection(this.firebaseService.firestore, 'posts', postId, 'comments'), {
      userId,
      content,
      createdAt: new Date()
    });
    return commentRef.id;
  }

  async addReply(postId, commentId, userId, content) {
    const replyRef = await addDoc(collection(this.firebaseService.firestore, 'posts', postId, 'comments', commentId, 'replies'), {
      userId,
      content,
      createdAt: new Date()
    });
    return replyRef.id;
  }

  async getComments(postId) {
    const commentsSnapshot = await getDocs(collection(this.firebaseService.firestore, 'posts', postId, 'comments'));
    const comments = [];
    commentsSnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() });
    });
    return comments;
  }

  async getReplies(postId, commentId) {
    const repliesSnapshot = await getDocs(collection(this.firebaseService.firestore, 'posts', postId, 'comments', commentId, 'replies'));
    const replies = [];
    repliesSnapshot.forEach((doc) => {
      replies.push({ id: doc.id, ...doc.data() });
    });
    return replies;
  }


}

export default { CommentService };