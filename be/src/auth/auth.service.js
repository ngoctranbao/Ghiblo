import { Injectable, Inject } from '@nestjs/common';
import "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";


@Injectable()
class AuthService {
  constructor(@Inject('FIREBASE') app) {
    this.auth = getAuth(app)
    this.db = getFirestore(app)
  }

  async login(data) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, data.email, data.password)
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.error("Error creating user: ", error.message);
      throw error; // Re-throw the error to handle it in the controller
    }
  }

  async createUserAuth(data) {
      try {
        const userCredential = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
        const user = userCredential.user;
        return {
          email: user.email, userName: data.username, userId: user.uid
        };
      } catch (error) {
        console.error("Error creating user: ", error.message);
        throw error; // Re-throw the error to handle it in the controller
      }
  }

  async createUserFirestore(data) {
    try {
      const user = await setDoc(doc(this.db, "User", `${data.userId}`), {
        userId: data.userId,
        userName: data.userName,
        email: data.email,
        loginned: true,
        countFollowers: 0,
        countFollowing: 0,
      });
      return user
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async logout(data) {
    return `This action allow logout with ${data}`
  }

  getHello() {
    return `${this.db.toJSON}`
  }
}

export default { AuthService };


