import { defineStore } from "pinia";
import { signInWithPopup, UserCredential, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { from, Observable, catchError, map } from "rxjs";
import { doc, getDoc } from "firebase/firestore";

export const useApiStore = defineStore("apiStore", () => {
  function handleError(error: any) {
    console.error("API 错误:", error);
    throw error;
  }

  function loginWithGoogle(): Observable<UserCredential> {
    return from(signInWithPopup(auth, googleProvider)).pipe(
      map((result) => {
        return result;
      }),
      catchError((error) => {
        handleError(error);
        return new Observable<never>();
      })
    );
  }

  function logout(): Observable<void> {
    return from(signOut(auth)).pipe(
      map(() => {}),
      catchError((error) => {
        handleError(error);
        return new Observable<never>();
      })
    );
  }

  function getData(): Observable<any> {
    return from(getDoc(doc(db, "people-data", "yRz4x8hNBVSVicNecMdc"))).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.log("文件不存在!");
          return [];
        }
      }),
      catchError((error) => {
        console.error("獲取文件時出錯:", error);
        handleError(error);
        return new Observable<never>();
      })
    );
  }

  return {
    handleError,
    loginWithGoogle,
    logout,
    getData,
  };
});
