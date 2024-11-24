import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-c-pad',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './c-pad.component.html',
  styleUrls: ['./c-pad.component.css']
})
export class CPadComponent implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2, private route : Router) {}

  ngOnInit(): void {
    const sideImages = this.el.nativeElement.querySelectorAll('.side-image');
    const mainImage = this.el.nativeElement.querySelector('#main-image');

    if (mainImage) {
      sideImages.forEach((image: HTMLImageElement) => {
        this.renderer.listen(image, 'click', () => {
          this.renderer.setAttribute(mainImage, 'src', image.src);
        });
      });
    }
  }
}
