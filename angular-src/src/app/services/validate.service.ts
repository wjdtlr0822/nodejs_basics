import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(
      user.name == undefined||
      user.email == undefined||
      user.password == undefined||
      user.username == undefined
    ){
      return false;
    }else{
      return true;
    }
  }

  validateEmail(email){
    const re=/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return re.test(String(email).toLowerCase());
  }
}
