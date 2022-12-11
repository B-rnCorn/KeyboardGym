import {AfterContentInit, AfterViewInit, Component, NgZone, ViewEncapsulation} from '@angular/core';
import {SimpleKeyboard as Keyboard} from "simple-keyboard";

@Component({
    selector: 'keyboard',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.scss'],
})
export class KeyboardComponent {

    value = "";
    keyboard: Keyboard | undefined;

    ngAfterViewInit() {
        this.keyboard = new Keyboard({
                onChange: input => this.onChange(input),
                onKeyPress: (button: string) => this.onKeyPress(button),
                physicalKeyboardHighlightPress: true,
                physicalKeyboardHighlight: true,
                layout: {
                    'default': [
                        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                        '{tab} й ц у к е н г ш щ з х ъ \\',
                        '{lock} ф ы в а п р о л д ж э {enter}',
                        '{shift} я ч с м и т ь б ю / {shift}',
                        '.com @ {space}'
                    ],
                    'shift': [
                        '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
                        '{tab} Q W E R T Y U I O P { } |',
                        '{lock} A S D F G H J K L : " {enter}',
                        '{shift} Z X C V B N M &lt; &gt; ? {shift}',
                        '.com @ {space}'
                    ]
                }
            },
        );
        /*console.log(this.keyboard.getButtonElement('a'));*/
    }

    onChange = (input: string) => {
        this.value = input;
        console.log("Input changed", input);
    };

    onKeyPress = (button: string) => {
        console.log("Button pressed", button);

        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") this.handleShift();
    };

    onInputChange = (event: any) => {
        /*this.keyboard?.setInput(event.target.value);*/
    };

    handleShift = () => {
        let currentLayout = this.keyboard?.options.layoutName;
        let shiftToggle = currentLayout === "default" ? "shift" : "default";

        this.keyboard?.setOptions({
            layoutName: shiftToggle
        });
    };


}
