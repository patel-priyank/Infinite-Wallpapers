import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { fromEvent, Subscription, throttleTime } from 'rxjs';
import { Errors } from '../../components/errors/errors';
import { Images } from '../../components/images/images';

@Component({
  selector: 'app-home',
  imports: [Errors, Images],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  header = signal('Infinite Wallpapers');

  imageService = inject(ImageService);

  scrollSub!: Subscription;

  ngOnInit() {
    this.imageService.getImages();

    this.scrollSub = fromEvent(window, 'scroll')
      .pipe(throttleTime(250))
      .subscribe(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
          this.imageService.page.update((current) => current + 1);
          this.imageService.getImages();
        }
      });
  }

  ngOnDestroy() {
    this.scrollSub?.unsubscribe();
  }
}
