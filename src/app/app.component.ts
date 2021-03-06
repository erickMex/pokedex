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
  escribiendo: boolean = false;
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
    let nvoMensaje = this.mensaje;
    if(this.mensaje.startsWith("¿")||this.mensaje.startsWith("¡")){
      //console.log(this.mensaje.charAt(0));
      nvoMensaje = this.mensaje.replace(this.mensaje.charAt(0),"");
    }
    if(this.mensaje.endsWith("?")||this.mensaje.endsWith("!")){
      nvoMensaje = this.mensaje.replace(this.mensaje.charAt(this.mensaje.length-1),"");
    }
    if((this.mensaje.startsWith("¿")&&this.mensaje.endsWith("?"))||(this.mensaje.startsWith("¡")&&this.mensaje.endsWith("!"))){
      nvoMensaje = this.mensaje.replace(this.mensaje.charAt(0),"");
      nvoMensaje = nvoMensaje.replace(nvoMensaje.charAt(nvoMensaje.length-1),"");
    }
    this.escribiendo = true;
    this.pokedex.getRequest(nvoMensaje, this.session_id).subscribe((response: any) => {
      //console.log(response);

      
      this.askQuestions.push({
        texto: response.data.current_response.message,
        isResponse: true
      });
      sessionStorage.setItem("conversacion", JSON.stringify(this.askQuestions));
      this.escribiendo = false;
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
    this.escribiendo = false;
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
