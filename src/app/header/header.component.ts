import {Component, OnDestroy, OnInit} from "@angular/core"
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true
  isAuthenticated = false
  authSub: Subscription

  constructor(private dataService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe(user => this.isAuthenticated = !!user)
  }

  onSaveData(){
    this.dataService.storeRecipes()
  }

  onFetchData(){
    this.dataService.fetchRecipes().subscribe()
  }

  onLogout(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }

}
