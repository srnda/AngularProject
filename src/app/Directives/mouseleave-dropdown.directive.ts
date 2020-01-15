import { Directive, ElementRef, OnInit,HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMouseleaveDropdown]'
})
export class MouseleaveDropdownDirective implements OnInit{

  constructor(private ddButton:ElementRef, private renderer:Renderer2) { }
 
  ngOnInit()
  {

  }

  @HostListener('click')
  OnMClick(event:any)
  {
    this.renderer.removeClass(this.ddButton.nativeElement,'show');
  }

  @HostListener('mouseleave')
  OnMLeft()
  {
    this.renderer.removeClass(this.ddButton.nativeElement,'show');
  }
}
