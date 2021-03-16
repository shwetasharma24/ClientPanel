import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(){
    
      this.authService.login(this.email,this.password).then((res:any) => {
        this.flashMessage.show('User Authenticated', {
          cssClass: 'alert-success',timeout:4000
        });
        //save uid/email in local storage
        localStorage.setItem("loggedInUser", res.user.email);

        this.router.navigate(['/']);
        console.log(res);
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger',timeout:4000
        });
      });
  }
}
