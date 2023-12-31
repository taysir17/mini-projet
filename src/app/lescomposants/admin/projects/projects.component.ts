import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from 'src/app/lesclasses/form';
import { Formation } from 'src/app/lesclasses/formation';
import { Message } from 'src/app/lesclasses/message';
import { CondidatService } from 'src/app/lesservices/condidat.service';
import { FormationService } from 'src/app/lesservices/formation.service';
import { MessageService } from 'src/app/lesservices/message.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  visible: boolean = false;
  c!:string

  affiche() {
    this.visible = !this.visible;
  }
  constructor(private router:Router,private formationService:FormationService,private condidatService:CondidatService,private messageService:MessageService) { }
  lesformation:Formation[]=[];
  lespublic:Form[]=[]
  lesmessage:Message[]=[]
  nbformation!:number;
  nbadmin!:number;
  user!:Form;
  formationName:string="";
  
  getFormation(){
    this.formationService.getformation("").subscribe (data=>this.lesformation=data) }
  
  ngOnInit(): void {
    this.user=this.condidatService.getuser();
    this.condidatService.getpublic().subscribe(data=>this.lespublic=data)
    this.getFormation()
    this.formationService.getformation("").subscribe(data=>this.nbformation=data.length)
    this.condidatService.getadmin().subscribe(data=>this.nbadmin=data.length)
    
  }
  ajouter(){
    this.router.navigate(['/admin/ajouter']);
  }
  modifier(f:Formation){
    this.formationService.setf(f)
    this.router.navigate(['/admin/modifier']);
  }
  effacer(id: string, i: number) {
    if (confirm("Es-tu sûr(e) de vouloir supprimer cette formation ?")) {
      this.formationService.deleteformation(id).subscribe(() => {
        this.lesformation.splice(i, 1);
      });
    } else {
      console.log("Suppression annulée");
    }
  }
  
  chercher(){
    this.formationService.getformation("").subscribe (data=>{this.lesformation=data;
      this.lesformation=this.lesformation.filter(e=>e.titre.startsWith(this.formationName))})

  }
  
    
}
