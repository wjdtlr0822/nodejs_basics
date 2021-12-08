import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Login, User, UserNoPW,CertReq } from '../models/User';
import * as forge from 'node-forge';

const pki = forge.pki;

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
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
    return ep;
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
    'Content-Type': 'application/json', 
    Authorization: 'Bearer ' + authToken,
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



  // Issuing certificate
  certRequest(request, keySize): Observable<any> {
    // Key generation
    let keyPair = pki.rsa.generateKeyPair(keySize);
    let publicKey = keyPair.publicKey;
    let privateKey = keyPair.privateKey;
    let publicKeyPem = pki.publicKeyToPem(publicKey);
    let privateKeyPem = pki.privateKeyToPem(privateKey);
    // Storing private key
    localStorage.setItem('privateKey', privateKeyPem);
    // Certificate request. UTF-8 encoding.
    const req: CertReq = {
      country: forge.util.encodeUtf8(request.country),
      state: forge.util.encodeUtf8(request.state),
      locality: forge.util.encodeUtf8(request.locality),
      organization: forge.util.encodeUtf8(request.organization),
      orgUnit: forge.util.encodeUtf8(request.orgUnit),
      common: request.common, // common = username should be English
      publicKey: publicKeyPem,
      };
    const certUrl = this.PrepEndpoin('users/cert');
    return this.http.post(certUrl, req, httpOptions);
    }

    storeCert(cert, caCert) {
    localStorage.setItem('cert', cert);
    localStorage.setItem('caCert', caCert);
    }

    authenticateSigUser(request): Observable<any> {
      const loginUrl = this.PrepEndpoin('users/authenticateSig');
      return this.http.post(loginUrl, request, httpOptions);
      }

    getList(): Observable<any> {
      let authToken: any = localStorage.getItem('authToken');
      const httpOptions1 = {
      headers: new HttpHeaders({
      contentType: 'application/json',
      authorization: 'Bearer ' + authToken,
      }),
      };
      const listUrl = this.PrepEndpoin('users/list');
      return this.http.get(listUrl, httpOptions1);
      }
        
    down():Observable<any>{
      const DownUrl = this.PrepEndpoin('users/download');
      return this.http.get(DownUrl,{ responseType: "blob"});
    }
}
