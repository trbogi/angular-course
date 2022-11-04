import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
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
      ).pipe(catchError(this.handleError))
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCu1FLERZGeWfqE1bJVziwiJRcUcw1CKcA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError))
  }

  private handleError(errorResp: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!'
    if (!errorResp.error || !errorResp.error.error){
      return throwError(errorMessage)
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This e-mail exists already.'
        break
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password.'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This e-mail does not exist.'
        break
    }
    return throwError(errorMessage)
  }
}