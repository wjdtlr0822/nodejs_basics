import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Login } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import * as forge from 'node-forge';
const pki = forge.pki;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username : string;
  password : string;

  constructor(
    private authService : AuthService,
    private router : Router,
    private flashMessage : FlashMessagesService
  ) {   }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const login: Login={ //models/user.ts에 만들어 놓은 Login
      username : this.username,
      password : this.password
    };

    this.authService.authenticateUser(login).subscribe((data)=>{
      //Observable: 서비스에서 백엔드와의 통신 후 결과를 받아옴
      // – Subscribe: 컴포넌트에서 서비스의 결과를 받아서 사용

      if(data.success){
        this.authService.storeUserData(data.token, data.userNoPW); // 토큰과 사용자 정보를 저장
        this.flashMessage.show('로그인 성공',{  //로그인 성공 표기
          cssClass:'alert-success',
          timeout:3000,
        });
        this.router.navigate(['dashboard']); //대시보드로 보내기
      }
      else{
        this.flashMessage.show(data.msg,{
          cssClass:'alert-danger',
          timeout:3000
        });
        this.router.navigate(['login']) //리프레시
      }
    });
  }


onLoginSigSubmit() {
  const privateKeyPem = localStorage.getItem('privateKey');
  const privateKey = pki.privateKeyFromPem(privateKeyPem);
  const certPem = localStorage.getItem('cert');
  const cert = pki.certificateFromPem(certPem);
  const username = cert.subject.getField('CN').value;
  const currentTime = new Date().getTime();
  // Signature generation on username, currentTime
  let md = forge.md.sha1.create();
  md.update(username + currentTime, 'utf8');
  const signature = privateKey.sign(md);
  const signatureHex = forge.util.bytesToHex(signature);
  // Easy login request
  const request = {
  username: username,
  currentTime: currentTime,
  signatureHex: signatureHex,
  };
  if (!privateKeyPem) {
    this.flashMessage.show('No certificate provided', {
    cssClass: 'alert-danger',
    timeout: 5000,
    });
    this.router.navigate(['login']);
    }
    this.authService.authenticateSigUser(request).subscribe((data) => {
    if (data.success) {
    this.authService.storeUserData(data.token, data.userNoPW);
    this.flashMessage.show(data.msg, {
    cssClass: 'alert-success',
    timeout: 5000,
    });
    this.router.navigate(['dashboard']);
    } else {
    this.flashMessage.show(data.msg, {
    cssClass: 'alert-danger',
    timeout: 5000,
    });
    this.router.navigate(['login']);
    }
    });
    }
    

    onQRSigLoginSubmit() {
      this.router.navigate(['qrlogin']);
      }
      
  }
