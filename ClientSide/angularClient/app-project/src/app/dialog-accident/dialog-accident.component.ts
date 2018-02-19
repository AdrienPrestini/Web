import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { LoaderCommentsService } from '../loader-comments.service';
import { AccidentCommentComponent } from '../accident-comment/accident-comment.component';

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
  id;
  myData;
  constructor(@Inject (MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, private loaderCommentService : LoaderCommentsService,public dialog: MatDialog) {
    console.log(data);
    this.adresse = data.all.adr;
    this.date = data.all.date;
    this.agg = data.all.agg;
    this.int = data.all.int;
    this.dom = data.all.dom;
    this.id = data.all.id;
  }

  ngOnInit() {
  }
  envoyer(){
    if(this.commentaire != ""){
      //envoyer au serveur
      console.log(this.commentaire);
    }
  }


  test(){
    var test = this.loaderCommentService.getAccidentById(this.id).subscribe((res) => {
      console.log(res);
      this.myData = res;
      let dialogRef = this.dialog.open(AccidentCommentComponent,{
        data:{
          all : this.myData
        },
        height: '600px',
        width: '800px',
      });
    });
    
  }
  
}