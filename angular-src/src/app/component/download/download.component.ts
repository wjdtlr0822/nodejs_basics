import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  fileUrl;
  data;
  constructor(
    private authService:AuthService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.authService.down().subscribe((data1)=>{
      this.data=data1

      const blob = new Blob([this.data], { type: 'application/octet-stream' });

      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  
    })
    
  }

}
