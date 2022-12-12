import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-exercises',
  templateUrl: './admin-exercises.component.html',
  styleUrls: ['./admin-exercises.component.scss']
})
export class AdminExercisesComponent implements OnInit {
    isShowText = false
    buttonText = 'Показать текст'
  constructor() { }

  ngOnInit(): void {
  }
  showText(){
        if(!this.isShowText){
            this.buttonText='Скрыть текст';
            this.isShowText=true
        }else {
            this.buttonText='Показать текст';
            this.isShowText=false
        }


  }
}
