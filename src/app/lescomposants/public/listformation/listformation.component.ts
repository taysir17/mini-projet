import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/app/lesclasses/form';
import { Formation } from 'src/app/lesclasses/formation';
import { CondidatService } from 'src/app/lesservices/condidat.service';
import { FormationService } from 'src/app/lesservices/formation.service';

@Component({
  selector: 'app-listformation',
  templateUrl: './listformation.component.html',
  styleUrls: ['./listformation.component.css']
})
export class ListformationComponent implements OnInit {
  x: Form[] = [];
  c!: string;
  formationName!: string;
  minMaxChecked: boolean = false;
  selectedDomains: { [key: string]: boolean } = {};

  lesformation: Formation[] = [];

  constructor(private router: Router, private formationService: FormationService, private condidatService: CondidatService) { }

  getFormation() {
    this.formationService.getformation("").subscribe(data => this.lesformation = data);
  }

  ngOnInit(): void {
    this.getFormation();
  }

  chercher(categorie: string, free: boolean) {
    this.c = "?";
    if (categorie !== "") {
      this.c += "&titre=" + categorie;
    }
    if (free) {
      this.c += "&prix=0";
    }

   

    this.formationService.getformation(this.c).subscribe(data => this.lesformation = data);
  }

  cherchername() {
    if (this.formationName.trim() !== "") {
      this.formationService.getformation("?titre=" + this.formationName).subscribe(data => this.lesformation = data);
    }
  }

}