import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from '@angular/http';
import { environment} from '../environments/environment'

@Injectable()
export class AuthService {
    token: string = null;

    constructor(private router: Router,private http:Http){
        this.token = localStorage.getItem('myToken');
    }

    logIn(email: string, password: string){
        return this.http.post(`${environment.apiServer}/api/login`,{email:email,password:password}).subscribe((res)=>{
            this.token = res.json().token;
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['/users']);
        },(err)=>{
            alert("You are not logged in. Dude!");
        });
    }

    facebookLogin(access_token){
        return this.http.post(`${environment.apiServer}/api/login/facebook`,{access_token:access_token}).subscribe((res)=>{
            this.token = res.json().token;
            localStorage.setItem('myToken',this.token);
            this.router.navigate(['/users']);
        },(err)=>{
            alert("You are not logged in. Dude!");
        });
    }

    isAuthenticated(){
        return this.token != null;
    }

    logOut(){
        this.token = null;
        localStorage.removeItem('myToken');
    }
}