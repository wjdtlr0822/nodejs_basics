import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Login, User, UserNoPW } from '../models/User'

const httpOptions={
  headers:new HttpHeaders({
    contentType:'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:User;


  constructor(
    private http:HttpClient,
    public jwtHelper:JwtHelperService
    ) {}


  PrepEndpoin(ep){
    // return "http://localhost:3000/"+ep;
    return 'https://cloudeservice1.herokuapp.com/' + ep;
    // return ep;
  }


  registerUser(user: User):Observable<any>{
    // const registerUrl='http://localhost:3000/users/register';
    const registerUrl=this.PrepEndpoin('users/register');
    return this.http.post<any>(registerUrl,user,httpOptions)
  }

  authenticateUser(login:Login):Observable<any>{
    // const loginurl='http://localhost:3000/users/authenticate';
    const loginurl=this.PrepEndpoin('users/authenticate');
    return this.http.post<any>(loginurl,login,httpOptions) 
  }

  
  getProfile(): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    // 토큰을 포함한 헤더 옵션 생성
    const httpOptions1 = {
    headers: new HttpHeaders({
    contentType: 'application/json', 
    authorization: 'Bearer ' + authToken,
    }),
    };
    const profileUrl = this.PrepEndpoin('users/profile');
    return this.http.get<any>(profileUrl, httpOptions1);
    }
    

  storeUserData(token:any, userNoPW : UserNoPW){
    localStorage.setItem('authToken',token);                   //로컬스토리지에 토큰을 저장
    localStorage.setItem('userNoPW',JSON.stringify(userNoPW)); //localStorage에는 json객체를 직접 저장하지 못해 string형식으로 바꾸어 저장
  }//토큰과 사용자 정보를 로컬스토리지에 저장

  logout(){
    // localStorage.clear()  메모리에 있는거 전부 삭제
    localStorage.removeItem("authToken");
    localStorage.removeItem("userNoPW");
  }

  loggedIn():boolean{
    let authToken:any=localStorage.getItem("authToken");
    return !this.jwtHelper.isTokenExpired(authToken); 
    //토큰은 유효기간이 지났는지 물어보는 함수. 지났으면 yes가 나옴.
  }
}
