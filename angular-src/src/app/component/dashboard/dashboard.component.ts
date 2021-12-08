import { Component, OnInit } from '@angular/core';
import { UserNoPW } from 'src/app/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userString:any;
  userNoPW:UserNoPW;
  name:string;
  token:any;
  privateKey: any;
  cert: any;
  caCert: any;


  constructor() { }

  ngOnInit(): void {
    this.userString=localStorage.getItem("userNoPW");  //string
    this.userNoPW=JSON.parse(this.userString);         //string->json으로 바꾸기 위해 parse를 사용
    this.name=this.userNoPW.name;
    this.token=localStorage.getItem("authToken");
    this.privateKey = localStorage.getItem('privateKey');
    this.cert = localStorage.getItem('cert');
    this.caCert = localStorage.getItem('caCert');

  }

}
