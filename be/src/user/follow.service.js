import { Injectable, Inject } from '@nestjs/common';
import "firebase/firestore";
import { getFirestore, setDoc, doc, getDoc, collection, serverTimestamp, getDocs, deleteDoc, updateDoc,increment } from "firebase/firestore";


@Injectable()
class FollowService {
  constructor(@Inject('FIREBASE') app) {
    this.db = getFirestore(app)
  }

  async followUser(data) {
    try {
      const followerRef = doc(collection(this.db, 'User', data.followerId, 'following'), data.followeeId);
      const followeeRef = doc(collection(this.db, 'User', data.followeeId, 'followers'), data.followerId);
  
      await setDoc(followerRef, { followedAt: serverTimestamp() });
      await setDoc(followeeRef, { followedAt: serverTimestamp() });
      
      await updateDoc(doc(this.db, 'User', data.followerId), {
        countFollowing: increment(1),
      });
      await updateDoc(doc(this.db, 'User', data.followeeId), {
        countFollowers: increment(1),
      });  
    } catch (error) {
      console.error("Error add follow service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }

  async unfollowUser(data) {
    try {
      const followerRef = doc(collection(this.db, 'User', data.followerId, 'following'), data.followeeId);
      const followeeRef = doc(collection(this.db, 'User', data.followeeId, 'followers'), data.followerId);
  
      await deleteDoc(followerRef);
      await deleteDoc(followeeRef);
  
      // Decrement the counts
      await updateDoc(doc(this.db, 'User', data.followerId), {
        countFollowing: increment(-1),
      });
      await updateDoc(doc(this.db, 'User', data.followeeId), {
        countFollowers: increment(-1),
      });      
    } catch (error) {
      console.error("Error unfollow service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }

  }

  async getFollowersCount(userId) {
    try {
      const followersSnapshot = await getDocs(collection(this.db, 'User', userId));
      return followersSnapshot.countFollowers;
    } catch (error) {
      console.error("Error get follower count service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }


  async getFollowingCount(userId) {
    try {
      const followersSnapshot = await getDocs(collection(this.db, 'User', userId));
      return followersSnapshot.countFollowing;
    } catch (error) {
      console.error("Error get following count service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }


  async getFollowerDetail(userId) {
    try {
      const followersSnapshot = await getDocs(collection(this.db, 'User', userId, 'followers'));
      const followers = await Promise.all(followersSnapshot.docs.map(async (docSnapshot) => {
        const userDoc = await getDoc(doc(this.db, 'User', docSnapshot.id));
        return { id: docSnapshot.id, ...userDoc.data() };
      }));
      return followers;
    } catch (error) {
      console.error("Error get follower detail service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }

  async getFollowingDetail(userId) {
    try {
      const followingSnapshot = await getDocs(collection(this.db, 'User', userId, 'following'));
      const following = await Promise.all(followingSnapshot.docs.map(async (docSnapshot) => {
        const userDoc = await getDoc(doc(this.db, 'User', docSnapshot.id));
        return { id: docSnapshot.id, ...userDoc.data() };
      }));
      return following;
    } catch (error) {
      console.error("Error get following detail service: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }
}

export default { FollowService };


