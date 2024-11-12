import { Component, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { catchError, Observable, of } from "rxjs";
import {ListComponent} from "../list/list.component";
import {CvCardComponent} from "../cv-card/cv-card.component";
import {AsyncPipe, DatePipe, UpperCasePipe} from "@angular/common";
import {EmbaucheComponent} from "../embauche/embauche.component";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
  imports: [
    ListComponent,
    CvCardComponent,
    DatePipe,
    AsyncPipe,
    UpperCasePipe,
    EmbaucheComponent
  ],
  standalone: true
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  cvs: Observable<Cv[]>;
  selectedCv: Observable<Cv> | null = null;
  /*   selectedCv: Cv | null = null; */
  date = new Date();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    // Ajouter catchErrror dans la pipe
    this.cvs =  this.cvService.getCvs().pipe(
      catchError( (e) => {
        console.log('we are in error');
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());
      })
    );
    this.toastr.info("Bienvenu dans notre CvTech");
    this.selectedCv =  this.cvService.selectCv$;
  }
}
