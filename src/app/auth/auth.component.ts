import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = false
  isLoading = false
  error: string = null

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return
    }

    let authResponse: Observable<AuthResponseData>
    const email = form.value.email
    const password = form.value.password
    this.isLoading = true

    if (this.isLoginMode){
      authResponse = this.authService.login(email, password)
    }else{
      authResponse = this.authService.signUp(email, password)
    }

    authResponse.subscribe(
      resData => {
        console.log(resData)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        this.error = errorMessage
        this.isLoading = false
      }
    )

    form.reset()
  }

  onHandleError(){
    this.error = null
  }
}
