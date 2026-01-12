import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-tool-create',
  templateUrl: './tool-create.component.html',
  styleUrls: ['./tool-create.component.css']
})
export class ToolCreateComponent {

  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ToolCreateComponent>,
    private Ts: ToolService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // EDIT MODE
    if (data) {
      this.Ts.getToolByID(data).subscribe(res => {
        this.form = new FormGroup({
          date: new FormControl(res.date),
          source: new FormControl(res.source),
        });
      });
    }
    // CREATE MODE
    else {
      this.form = new FormGroup({
        date: new FormControl(null),
        source: new FormControl(null),
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