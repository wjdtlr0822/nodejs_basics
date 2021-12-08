import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  username : string;
  password : string;

  constructor(
    private authService : AuthService,
    private router : Router,
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
        // this.flashMessage.show('로그인 성공',{  //로그인 성공 표기
        //   cssClass:'alert-success',
        //   timeout:3000,
        // });
        this.router.navigate(['dashboard']); //대시보드로 보내기
      }
      else{
        // this.flashMessage.show(data.msg,{
        //   cssClass:'alert-danger',
        //   timeout:3000
        // });
        this.router.navigate(['login']) //리프레시
      }
    });
  }
}
