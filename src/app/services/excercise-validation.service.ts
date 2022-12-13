import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ExerciseValidationService {
    get correctInputCharacter(): string {
        return this._correctInputCharacter;
    }
    get userInput(): string {
        return this._userInput;
    }
    get remainingText(): string {
        return this._remainingText;
    }
    get errorsCounter(): number {
        return this._errorsCounter;
    }

    get lastInputCharacter(): string {
        return this._lastInputCharacter;
    }

    set remainingText(value: string) {
        this._remainingText = value;
    }

    private _userInput: string = '';
    private _lastInputCharacter: string = '';
    private _errorsCounter: number = 0;
    private _remainingText: string = '';
    private _correctInputCharacter: string = '';

    constructor() {

    }

    isInputCharacterValid(inputCharacter: string): boolean {
        console.log('DEBUG VALIDATION',this._userInput, inputCharacter, this.remainingText)
        if (this._remainingText[0] === inputCharacter || this._correctInputCharacter === inputCharacter) {
            this._userInput = this._userInput.concat(inputCharacter);
            if (!this._correctInputCharacter) {
                this._remainingText = this._remainingText.slice(1,this.remainingText.length);
            }
            this._correctInputCharacter = '';
            this._lastInputCharacter = '';
            return true;
        } else {
            if (!this._correctInputCharacter.length) {
                this._correctInputCharacter = this._remainingText[0];
                this._remainingText = this._remainingText.slice(1,this.remainingText.length);
            }
            this._lastInputCharacter = inputCharacter;
            this._errorsCounter = ++this._errorsCounter;
            return false;
        }
    }
}
