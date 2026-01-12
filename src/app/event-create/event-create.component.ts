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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // EDIT MODE
    if (data) {
      this.Es.getEventByID(data).subscribe(res => {
        this.form = new FormGroup({
          titre: new FormControl(res.titre),
          date: new FormControl(res.date), // ✅ FIXED
          lieu: new FormControl(res.lieu),
        });
      });
    }
    // CREATE MODE
    else {
      this.form = new FormGroup({
        titre: new FormControl(null),
        date: new FormControl(null), // ✅ SAME NAME
        lieu: new FormControl(null),
      });
    }
  }

  save() {
    const payload = {
      ...this.form.value,
      date: this.form.value.date
        ? new Date(this.form.value.date).toISOString().split('T')[0]
        : null
    };

    this.dialogRef.close(payload);
  }

  close() {
    this.dialogRef.close();
  }
}
