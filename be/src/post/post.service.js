import { Injectable, Inject } from '@nestjs/common';
import "firebase/firestore";
import { getFirestore, setDoc, doc, addDoc, deleteDoc, collection, updateDoc, getDoc, getDocs, increment } from "firebase/firestore";


@Injectable()
class PostService {
  constructor(@Inject('FIREBASE') app) {
    this.db = getFirestore(app)
  }

  async createPost(data) {
    const docRef = await addDoc(collection(this.db, 'Post'), {
      title: data.title,
      description: data.description,
      tags: data.tags,
      voteCount: 0,
      ownerId: data.ownerId,
      createdAt: new Date()
    });

    await updateDoc(docRef, {
      projectId: docRef.id
    });

    return docRef.id;
  }

  async getPost(postId) {
    try {
      const docRef = doc(this.db, 'Post', postId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error('Post not found');
      }
    } catch (error) {
      console.error("Error Get Post service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }

  async getAllPosts() {
    const querySnapshot = await getDocs(collection(this.db, 'Post'));
    const posts = [];
    querySnapshot.forEach((document) => {
      const data = document.data();
      posts.push({
        id: document.id,
        title: data.title,
        tags: data.tags,
        ownerId: data.ownerId
      });
    });
    return posts;
  }

  async vote(data) {
    const postRef = doc(this.db, 'Post', data.postId);
    const voteRef = doc(this.db, 'Post', data.postId, 'Voters', data.userId);
    const voteSnap = await getDoc(voteRef);
    let voteChange = 0;
    let addVoter = true

    if (voteSnap.exists()) {
      const currentVote = voteSnap.data().voteType;
      if (currentVote === data.voteType) {
        voteChange = currentVote === 'up' ? -1 : 1; // Undo the previous vote
        addVoter = false
      }
      else {
        voteChange = data.voteType === 'up' ? 2 : -2; // Change from down to up or up to down
      }
    } else {
      voteChange = data.voteType === 'up' ? 1 : -1; // New vote
    }
    if (addVoter === true) {
      await setDoc(voteRef, {
        usesrId: data.userId,
        voteType: data.voteType
      });
    } else {
      await deleteDoc(voteRef); // Delete the vote document
    }

    await updateDoc(postRef, {
      voteCount: increment(voteChange)
    });
  }
}

export default { PostService };