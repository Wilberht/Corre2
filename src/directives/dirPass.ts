import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[inputPassword]'

})

export class DirectivePassword{
    @Input('inputPassword') nothing : any;
    constructor(private el: ElementRef){
        
        el.nativeElement.onkeypress = function(e){
            if(' {}[]'.includes(String.fromCharCode(e.charCode))){
                e.preventDefault();
                return;
            }
        };

    }
}