import { Injectable, Inject } from '@nestjs/common';
import "firebase/firestore";
import { getFirestore, setDoc, doc, collection, serverTimestamp,getDocs } from "firebase/firestore";


@Injectable()
class UserService {
  constructor(@Inject('FIREBASE') app) {
    this.db = getFirestore(app)
  }

  async followUser(data) {
    const followerRef = doc(collection(this.db, 'User', data.followerId, 'following'), data.followeeId);
    const followeeRef = doc(collection(this.db, 'USer', data.followeeId, 'followers'), data.followerId);

    await setDoc(followerRef, { followedAt: serverTimestamp() });
    await setDoc(followeeRef, { followedAt: serverTimestamp() });
  }

  async unfollowUser(data) {
    const followerRef = doc(collection(this.db, 'User', data.followerId, 'following'), data.followeeId);
    const followeeRef = doc(collection(this.db, 'User', data.followeeId, 'followers'), data.followerId);

    await deleteDoc(followerRef);
    await deleteDoc(followeeRef);
  }

  async getFollowers(data) {
    const followersSnapshot = await getDocs(collection(this.db, 'User', data.userId, 'followers'));
    return followersSnapshot.docs.map(doc => ({ followerId: doc.id, followedAt: doc.data().followedAt }));
  }

  async getFollowing(data) {
    const followingSnapshot = await getDocs(collection(this.db, 'User', data.userId, 'following'));
    return followingSnapshot.docs.map(doc => ({ followeeId: doc.id, followedAt: doc.data().followedAt }));
  }


}

export default { UserService };


