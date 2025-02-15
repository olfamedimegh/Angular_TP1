import { Component, Input } from '@angular/core';
import { Cv } from '../model/cv';
import { EmbaucheService } from '../services/embauche.service';
import { ToastrService } from 'ngx-toastr';
import {DefaultImagePipe} from "../pipes/default-image.pipe";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cv-card',
  templateUrl: './cv-card.component.html',
  styleUrls: ['./cv-card.component.css'],
  imports: [
    DefaultImagePipe,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class CvCardComponent {
  constructor(
    private embaucheService: EmbaucheService,
    private toastr: ToastrService
  ) {}
  @Input() cv: Cv | null = null;

  ngOnInit() {}
  embaucher() {
    if (this.cv) {
      if (this.embaucheService.embauche(this.cv)) {
        this.toastr.success(
          `${this.cv?.firstname} ${this.cv?.name} a été pré embauché`
        );
      } else {
        this.toastr.warning(
          `${this.cv?.firstname} ${this.cv?.name} est déjà pré embauché`
        );
      }
    }
  }
}
