import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHoverDropdown]'
})
export class MouseEnterShowDropdownDirective implements OnInit{

  constructor(private ddButton:ElementRef) { }

  ngOnInit(){
    // <HTMLElement>(this.ddButton.nativeElement).click()
  }

  @HostListener('mouseenter')
  OnMEnter()
  {
    const element = <HTMLElement>this.ddButton.nativeElement;
    element.parentElement.classList.add('show');
    element.parentElement.children[1].classList.add('show');
  }
}
