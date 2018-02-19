import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoaderCommentsService } from '../loader-comments.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import { AlertService } from '../alert.service';
import { Alert, AlertType } from '../Alert';


@Component({
  selector: 'app-accident-comment',
  templateUrl: './accident-comment.component.html',
  styleUrls: ['./accident-comment.component.css']
})
export class AccidentCommentComponent implements OnInit {

  comments = [];
  id;
  @Input() commentaire: string;
  isNotEmpty;

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;
  alerts: Alert[] = [];

  constructor(private alertService: AlertService,@Inject (MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, private loaderCommentService : LoaderCommentsService) {
    console.log(data);
    this.comments = data.all.comments;
    this.id = data.all._id;
    if(this.comments != undefined){
      if(this.comments.length > 0){
        this.isNotEmpty = true;
      }else{
        this.isNotEmpty = false;
      }
    }
    
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);
  }

  submitComment(){
    console.log(this.commentaire);
    if(this.commentaire !="" && this.commentaire != undefined){
      this.loaderCommentService.postCommentAccident(this.id, this.commentaire).subscribe(
        res => {
          console.log(res);
          if(res != undefined){
            if(res.ok == true){
              this.alertService.success('Commentaire ajouté');
              this.dialogRef.close();
            }else{
              this.alertService.error('Commentaire non ajouté');
              this.dialogRef.close();
            }
          }else{
            this.alertService.error('Commentaire non ajouté');
            this.dialogRef.close();
          }
        },
        err => {
          console.log("Error occured");
        }
      );
      //this._success.next(`${new Date()} - Message successfully changed.`);
      //dialogRef.close();


    }else{
      alert("Votre message est vide");
    }
  }
  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
}

cssClass(alert: Alert) {
    if (!alert) {
        return;
    }

    // return css class based on alert type
    switch (alert.type) {
        case AlertType.Success:
            return 'alert alert-success';
        case AlertType.Error:
            return 'alert alert-danger';
        case AlertType.Info:
            return 'alert alert-info';
        case AlertType.Warning:
            return 'alert alert-warning';
    }
  }

}
