import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-exercises',
  templateUrl: './user-exercises.component.html',
  styleUrls: ['./user-exercises.component.scss']
})
export class UserExercisesComponent implements OnInit {

    isShowText = false
    selectedItem ='1'
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
