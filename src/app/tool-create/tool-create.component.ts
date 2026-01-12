import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolService } from 'src/services/tool.service';
import { Outil } from 'src/models/Outil';

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
    @Inject(MAT_DIALOG_DATA) public data: any // ID for edit, undefined for create
  ) {
    if (data) {
      // Edit mode: fetch the tool by ID
      this.Ts.getToolByID(data).subscribe((res: Outil) => {
        this.form = new FormGroup({
          date: new FormControl(res.date),
          source: new FormControl(res.source)
        });
      });
    } else {
      // Create mode: initialize empty form
      this.form = new FormGroup({
        date: new FormControl(null),
        source: new FormControl(null)
      });
    }
  }

  save() {
    // Close dialog and return form data
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
