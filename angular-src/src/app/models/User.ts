import { stringify } from "querystring"

//사용자 등록시 서버에 전송하는 정보의 데이터 모델
export interface User{
    name:string;
    email:string;
    username:string;
    password:string;
}

//로그인시 서버에 보내는 정보의 데이터 모델
export interface Login{
    username:string;
    password:string;
}

//로그인된 사용자정보의 데이터 모델.
//보안을 위해 서버가 패스워드 정보는 제외하고 보내주었음. 
export interface UserNoPW{
    _id:string;
    name:string;
    email:string;
    username:string;
}

// 인증서 발급 요청
export interface CertReq {
country: string;
state: string;
locality: string;
organization: string;
orgUnit: string;
common: string;
publicKey: string;
}

//interface = 변수, 메서드 등을 선언만 함 / 타입 검사에 활용 가능
// class    = 변수, 메서드 등을 선언하고 구현 가능
