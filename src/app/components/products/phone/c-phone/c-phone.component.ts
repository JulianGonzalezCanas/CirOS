import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-c-phone',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './c-phone.component.html',
  styleUrl: './c-phone.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CPhoneComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.32/build/spline-viewer.js';
      this.renderer.appendChild(document.body, script);
    }
      //carousel
  }
  
}

