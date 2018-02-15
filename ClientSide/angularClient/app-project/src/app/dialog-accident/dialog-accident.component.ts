import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-accident',
  templateUrl: './dialog-accident.component.html',
  styleUrls: ['./dialog-accident.component.css']
})
export class DialogAccidentComponent implements OnInit {
  adresse;
  date;
  agg;
  int;
  dom;
  commentaire="";
  constructor(@Inject (MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) {
    console.log(data);
    this.adresse = data.all.adr;
    this.date = data.all.date;
    this.agg = data.all.agg;
    this.int = data.all.int;
    this.dom = data.all.dom;
  }

  ngOnInit() {
  }
  envoyer(){
    if(this.commentaire != ""){
      //envoyer au serveur
      console.log(this.commentaire);
    }
  }

}
