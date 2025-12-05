import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Image } from '../models/image.type';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  http = inject(HttpClient);

  page = signal(1);
  images = signal(Array(0));
  errors = signal(Array(0));

  getImages() {
    const url = `${environment.API_URL}/wallpapers/${this.page()}`;

    this.http
      .get<Array<Image>>(url)
      .pipe(
        catchError((err) => {
          this.page.update((current) => current - 1);
          this.errors.set(err.error.errors);
          throw err;
        })
      )
      .subscribe((images) => {
        this.images.update((current) => [...current, ...images]);
      });
  }
}
