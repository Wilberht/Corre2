import { Directive, ElementRef, Input  } from '@angular/core';

@Directive({
    selector: '[inputEmail]',
    host:{

    }
})

export class DirectiveInputEmail{

    @Input('inputEmail') nothing : any;
    constructor(private el: ElementRef){
        
        el.nativeElement.onkeypress = function(e){
            if('|°¬!\"#$%&/()/*-+\¿¡?~][], '.includes(String.fromCharCode(e.charCode))){
                e.preventDefault();
                return;
            }
        };

    }
}