// src/cats/cats.service.js
import { Injectable, Inject } from '@nestjs/common';
import "firebase/firestore";
import { getAuth } from "firebase/auth";

@Injectable()
class AuthService {
  constructor(@Inject('FIREBASE') app) {
    this.auth = getAuth(app)
  }

  login(data) {
    var user;
    signInWithEmailAndPassword(this.auth, data.email, data.email)
      .then((userCredential) => {
        // Signed in 
        user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      return user
  }

  signup(data) {
    createUserWithEmailAndPassword(this.auth, data.email, data.password)
      .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });   
  }

  logout(data) {
    return `This action allow logout with ${data}`
  }

  getHello() {
    return `${this.db.toJSON}`
  }
}

export default { AuthService };


