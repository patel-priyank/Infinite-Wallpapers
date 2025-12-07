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
  loading = signal(false);

  getImages() {
    const url = `${environment.API_URL}/wallpapers/${this.page()}`;

    this.loading.set(true);

    this.http
      .get<Array<Image>>(url)
      .pipe(
        catchError((err) => {
          this.page.update((current) => current - 1);
          this.errors.set(err.error.errors);
          this.loading.set(false);
          throw err;
        })
      )
      .subscribe((images) => {
        this.errors.set([]);
        this.loading.set(false);
        this.images.update((current) => [...current, ...images]);
      });
  }
}
