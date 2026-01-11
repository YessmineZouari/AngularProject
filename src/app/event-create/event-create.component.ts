import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EventCreateComponent>,
    private Es: EventService,
    @Inject(MAT_DIALOG_DATA) public data: any // injection correcte des données

  ) {
    if (data){
      console.log(data)
      this.Es.getEventByID(data).subscribe((res)=>{
        this.form =new FormGroup({
      titre: new FormControl(res.titre),
      dateDebut: new FormControl(res.dateDebut),
      dateFin: new FormControl(res.dateFin),

      lieu: new FormControl(res.lieu),
        })
      })
    }else{
     // Initialiser le formulaire
    this.form = new FormGroup({
      titre: new FormControl( null),
      dateDebut: new FormControl( null),
      dateFin: new FormControl( null),
      lieu: new FormControl(null),
    });
    }
    
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
