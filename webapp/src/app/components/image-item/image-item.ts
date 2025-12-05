import { Component, EventEmitter, input, Output } from '@angular/core';
import { Image } from '../../models/image.type';

@Component({
  selector: 'app-image-item',
  imports: [],
  templateUrl: './image-item.html',
  styleUrl: './image-item.scss',
})
export class ImageItem {
  @Output() focus = new EventEmitter<string>();

  @Output() blur = new EventEmitter<null>();

  image = input.required<Image>();

  activeImageId = input<string | null>();

  handleFocus() {
    this.focus.emit(this.image().id);
  }

  handleBlur() {
    this.blur.emit(null);
  }
}
