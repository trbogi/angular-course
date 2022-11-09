import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

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
  user = new BehaviorSubject<User>(null)
  logoutTimer: any

  constructor(private http: HttpClient, private router: Router) {
  }

  autoLogin(){
    const userData: {email: string, id: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'))
    if (!userData){
      return
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    if (loadedUser.token){
      this.user.next(loadedUser)
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCu1FLERZGeWfqE1bJVziwiJRcUcw1CKcA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError),
              tap(respData =>
                this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
              )
    )
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCu1FLERZGeWfqE1bJVziwiJRcUcw1CKcA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(catchError(this.handleError),
              tap(respData =>
                this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
              )
    )
  }

  autoLogout(expirationDuration: number){
    this.logoutTimer = setTimeout(() => this.logout(), expirationDuration * 1000)
  }

  logout(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if (this.logoutTimer){
      clearInterval(this.logoutTimer)
    }
    this.logoutTimer = null
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

  private handleAuthentication(email:string, userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user)
    this.autoLogout(expiresIn)
    localStorage.setItem('userData', JSON.stringify(user))
  }
}
