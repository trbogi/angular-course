import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

export interface AuthResponseData{
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService{
  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCu1FLERZGeWfqE1bJVziwiJRcUcw1CKcA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(errorResp => {
        let errorMessage = 'An unknown error occurred!'
        if (!errorResp.error || !errorResp.error.error){
          return throwError(errorMessage)
        }
        switch (errorResp.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This e-mail exists already.'
        }
        return throwError(errorMessage)
    }))
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCu1FLERZGeWfqE1bJVziwiJRcUcw1CKcA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      )
  }
}
