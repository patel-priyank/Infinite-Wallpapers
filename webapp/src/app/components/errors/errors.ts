import { Component, inject } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-errors',
  imports: [],
  templateUrl: './errors.html',
  styleUrl: './errors.scss',
})
export class Errors {
  imageService = inject(ImageService);
}
