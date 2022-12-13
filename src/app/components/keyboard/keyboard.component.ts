import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ViewEncapsulation
} from '@angular/core';
import {SimpleKeyboard as Keyboard} from "simple-keyboard";
import {ExerciseValidationService} from "../../services/excercise-validation.service";

@Component({
    selector: 'keyboard',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.scss'],
})
export class KeyboardComponent implements AfterViewInit{

    keyboardValue = "";
    keyboard: Keyboard | undefined;
    isCapsLocked: boolean = false;
    isShiftPressed: boolean = false;
    exerciseName: string = 'Упражнение Новичёк'
    sourceText: string = 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу.';
    remainingText: string = this.sourceText;
    availableErrors: number = 10;
    userInput: string = '';
    lastInputCharacter: string = '';
    correctInputCharacter: string = '';
    timerInSeconds: number = 90;

    constructor(private cdr: ChangeDetectorRef, private exerciseValidationService: ExerciseValidationService) {
    }

    ngAfterViewInit() {
        this.keyboard = new Keyboard({
                onChange: input => this.onChange(input),
                onKeyPress: (button: string) => this.onKeyPress(button),
                physicalKeyboardHighlightPress: true,
                physicalKeyboardHighlightTextColor: 'white',
                physicalKeyboardHighlight: true,
                layout: {
                    'default': [
                        'ё 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                        '{tab} й ц у к е н г ш щ з х ъ \\',
                        '{lock} ф ы в а п р о л д ж э {enter}',
                        '{shift} я ч с м и т ь б ю . {shift}',
                        '{space}'
                    ],
                    'shift': [
                        'Ё ! \" № ; % : ? * ( ) _ + {bksp}',
                        '{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ |',
                        '{lock} Ф Ы В А П Р О Л Д Ж Э {enter}',
                        '{shift} Я Ч С М И Т Ь Б Ю , {shift}',
                        '{space}'
                    ]
                },
                buttonTheme: [
                    {
                        class: "zone_one",
                        buttons: ' Ё ! \" Й Ф Я * Ш Л Б ё 1 2 й ф я 8 ш л б'
                    },
                    {
                        class: "zone_two",
                        buttons: "№ Ц Ы Ч ( Щ Д Ю 3 ц ы ч 9 щ д ю"
                    },
                    {
                        class: "zone_three",
                        buttons: "; У В С ) З Ж _ Х Э + Ъ , 4 у в с 0 з ж . - х э = ъ"
                    },
                    {
                        class: "zone_four__left",
                        buttons: "% : К А М Е П И 5 6 к а м е п и"
                    },
                    {
                        class: "zone_four__right",
                        buttons: "? Н Р Т Г О Ь 7 н р т г о ь"
                    }

                ]
            },
        );
        document.addEventListener('keydown', (event) => this.handleShift(event));
        document.addEventListener('keyup', (event)=>this.handleKeyUp(event));
        /*console.log(this.keyboard.getButtonElement('a'));*/
        this.startTask()
    }

    startTask() {
        this.startTimer();
        this.exerciseValidationService.remainingText = this.sourceText;
        /*this.exerciseValidationService.availableErrors = 10;*/
        //this.sourceText.
    }

    validateTaskEnd(){
        if (this.exerciseValidationService.errorsCounter > this.availableErrors || this.timerInSeconds < 0) {
            this.taskFailed();
        } else if (this.sourceText === this.userInput) {
            this.taskCompleted();
        }
    }

    taskCompleted(){
        console.log("DEBUG COMPLETE")
    }

    taskFailed(){
        console.log("DEBUG FAIL")
    }

    onChange = (input: string) => {
        console.log('DEBUG',input[input.length-1]);
        if (this.exerciseValidationService.isInputCharacterValid(input[input.length-1])) {
            this.userInput = this.exerciseValidationService.userInput;
            this.remainingText = this.exerciseValidationService.remainingText;
            this.lastInputCharacter = this.exerciseValidationService.lastInputCharacter;
            this.correctInputCharacter = this.exerciseValidationService.correctInputCharacter;
            this.keyboardValue = input;
        } else {
            this.lastInputCharacter = this.exerciseValidationService.lastInputCharacter;
            this.correctInputCharacter = this.exerciseValidationService.correctInputCharacter;
            this.remainingText = this.exerciseValidationService.remainingText;
            if (this.keyboard?.input) {
                this.keyboard.setInput(this.keyboardValue)
            }
        }
        this.cdr.detectChanges();
        console.log("Input changed", input);
    };

    startTimer() {
        console.log('START',this.timerInSeconds);
        let interval = setInterval(()=>{
            if (this.timerInSeconds === 0) {
                this.stopExercise();
                clearInterval(interval);
            }
            this.timerInSeconds = --this.timerInSeconds;
            this.validateTaskEnd();
        },1000)
    }

    stopExercise() {
        console.log('STOPED')
    }

    onKeyPress = (button: string) => {
        console.log("Button pressed", button);

        /**
         * If you want to handle the shift and caps lock buttons
         */
        //if (button === "{shift}" || button === "{lock}") this.handleShift();
    };

    onInputChange = (event: any) => {
        /*this.keyboard?.setInput(event.target.value);*/
    };

    handleKeyUp = (event: any) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            console.log('NOT PRESSED')
            this.isShiftPressed = false;
            console.log('CAPS', this.isCapsLocked);
            let shiftToggle = this.isCapsLocked ? "shift" : "default";

            this.keyboard?.setOptions({
                layoutName: shiftToggle
            });
            this.cdr.detectChanges();
        }
    }

    handleShift =  (event: any) => {
        //TODO: REMOVE
        event.preventDefault();
        //if(event.getModifierState('CapsLock'))this.isCapsLocked = true;
        console.log(event.code);
        if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && !this.isShiftPressed) {
            this.isShiftPressed = true;
            let currentLayout = this.keyboard?.options.layoutName;
            console.log(currentLayout, 'CAPS', this.isCapsLocked);
            let shiftToggle = currentLayout === "default" && !this.isCapsLocked ? "shift" : "default";

            this.keyboard?.setOptions({
                layoutName: shiftToggle
            });
            this.cdr.detectChanges();
        }
        if (event.code === 'CapsLock') {
            this.isCapsLocked = !this.isCapsLocked;
            let shiftToggle = this.isCapsLocked ? "shift" : "default";
            this.keyboard?.setOptions({
                layoutName: shiftToggle
            });
            this.cdr.detectChanges();
        }
    };


}
