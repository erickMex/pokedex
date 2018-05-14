import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PokedexService } from './pokedex.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  mensaje = "";

  askQuestions: any = [
  ];

  session_id = uuid();

  constructor(private pokedex: PokedexService) { }

  ngOnInit() {
    this.scrollToBottom();
    if (sessionStorage.getItem("session_id")) {
      this.session_id = sessionStorage.getItem("session_id");
    } else {
      sessionStorage.setItem("session_id", this.session_id);
    }

    if (sessionStorage.getItem("conversacion")) {
      this.askQuestions = JSON.parse(sessionStorage.getItem("conversacion"));
    } else {
      sessionStorage.setItem("conversacion", JSON.stringify(this.askQuestions));
    }    
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  enviar() {

    this.pokedex.getRequest(this.mensaje, this.session_id).subscribe((response: any) => {
      console.log(response);

      

      this.askQuestions.push({
        texto: response.data.current_response.message,
        isResponse: true
      });
      sessionStorage.setItem("conversacion", JSON.stringify(this.askQuestions));
    });

    this.askQuestions.push({
      texto: this.mensaje,
      isResponse: false
    });

    this.mensaje = "";
    sessionStorage.setItem("conversacion", JSON.stringify(this.askQuestions));
  }

  resetChat(){
    sessionStorage.removeItem("conversacion");
    sessionStorage.removeItem("session_id");
    this.askQuestions = [];
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
