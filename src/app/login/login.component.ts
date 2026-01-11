import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    constructor(private AS:AuthService, private router:Router) {}
  
    //sub() ==> invoquer le service qui genere JWT 
    sub(){
      this.AS.signInWithEmailAndPassword(this.email , this.password).then(()=>{
        this.router.navigate(['/member'])
      })
      
    }

}
