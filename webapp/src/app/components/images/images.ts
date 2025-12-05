import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { ImageItem } from '../image-item/image-item';

@Component({
  selector: 'app-images',
  imports: [ImageItem],
  templateUrl: './images.html',
  styleUrl: './images.scss',
})
export class Images {
  imageService = inject(ImageService);

  activeImageId: WritableSignal<string | null> = signal(null);

  setActiveImageId(id: string | null) {
    this.activeImageId.set(id);
  }
}
