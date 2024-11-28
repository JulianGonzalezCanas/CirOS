import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ElementRef, Renderer2, CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-c-phone',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './c-phone.component.html',
  styleUrl: './c-phone.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CPhoneComponent implements OnInit {

  constructor(private el: ElementRef,private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}
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

