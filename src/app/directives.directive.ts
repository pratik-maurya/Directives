import { Directive,ElementRef,Input,HostListener } from '@angular/core';
@Directive({
  selector: '[appDirectives]'
})

export class DirectivesDirective {

  inputElement: ElementRef;

  @Input('appDirectives')
  appDirectives!: string;
  arabicRegex = '[\u0600-\u06FF]';

  constructor(el: ElementRef) {
    this.inputElement = el;
  }

  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    this.notAllowSpaceatFirst(event)
  }

  integerOnly(event: any) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
      e.preventDefault();
    }
  }

  noSpecialChars(event: any) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    let k;
    k = event.keyCode;  // k = event.charCode;  (Both can be used)
    if ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57)) {
      return;
    }
    const ch = String.fromCharCode(e.keyCode);
    const regEx = new RegExp(this.arabicRegex);
    if (regEx.test(ch)) {
      return;
    }
    e.preventDefault();
  }

  onlyChars(event: any) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    let k;
    k = event.keyCode;  // k = event.charCode;  (Both can be used)
    if ((k > 64 && k < 91) || k === 8 || k === 32 || (k > 96 && k < 124)) {
      return;
    }
    e.preventDefault();
  }

  allowDecimal(event: any) {
    const e = <KeyboardEvent>event;

    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }

    let k;

    k = event.keyCode;  // k = event.charCode;  (Both can be used)

    if ((k == 48) || (k == 49) || (k == 50) || (k == 51) ||
      (k == 52) || (k == 53) || (k == 54) || (k == 55) ||
      (k == 56) || (k == 57)) {
      var arcontrol = new Array();
      var temp = this.inputElement.nativeElement.value;
      arcontrol = this.inputElement.nativeElement.value.split(".");

      if (arcontrol.length == 1) {
        if (arcontrol[0].length < 16) {
          return;
        }
        else {
        }
      }
      else {
        return;
      }
    }
    else if (k == 46) {
      var sCount = new Array();
      sCount = this.inputElement.nativeElement.value.split(".");

      if ((sCount.length) - 1 == 1) {
      }
      else {
        return;
      }
    }

    e.preventDefault();
  }
  notAllowSpaceatFirst(event: any) {
    if (event.target.selectionStart === 0 && event.code === "Space") {
      event.preventDefault();
    }
    else {
      if (this.appDirectives === 'integer') {
        this.integerOnly(event);
      } else if (this.appDirectives === 'noSpecialChars') {
        this.noSpecialChars(event);
      }
      else if (this.appDirectives === 'onlyChars') {
        this.onlyChars(event);        
      }
      else if (this.appDirectives === 'allowDecimal') {
        this.allowDecimal(event);
      }
    }
  }

}

