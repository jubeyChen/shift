import { defineStore } from "pinia";
import { signInWithPopup, UserCredential, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { from, Observable, catchError, map } from "rxjs";

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
      map(() => {
       
      }),
      catchError((error) => {
        handleError(error);
        return new Observable<never>();
      })
    );
  }

  return {
    handleError,
    loginWithGoogle,
    logout,
  };
});
