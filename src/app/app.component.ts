import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface vidDetails {
  url: string;
  info: Array<any>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'youtube-downloader';

  input: any = {
      url: "",
  };

  video: boolean = false;

  url: string = "";

  info: Array<any> = [{}];

  loading: boolean = false;

  error: boolean = false;

  errorMessage: string = "";

  constructor(private http: HttpClient) {}
    
    download(): void {
        this.error = false;
        this.errorMessage = "";
        this.loading = true;
        this.http.get<vidDetails>('http://localhost:5000/download', {params: this.input}).subscribe((data) => {
        this.video = true;
        this.url = data.url;
        this.info = data.info;
        this.loading = false;
      }, (err) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = err.error.text;
      }    
    )
    }
    
    reset(): void {
      this.video = false;
      this.url = '';
      this.info = [{}];
      this.input.url = "";
    }
}