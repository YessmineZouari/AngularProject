import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from 'src/models/article';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent {

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ArticleCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article | null
  ) {

    this.form = new FormGroup({
      titre: new FormControl(data?.titre ?? null),
      date: new FormControl(
        data?.date ? new Date(data.date) : null   // ⭐ KEY LINE
      ),
      lieu: new FormControl(data?.lieu ?? null),
      sourcePdf: new FormControl(data?.sourcePdf ?? null),
      type: new FormControl(data?.type ?? 'article')
    });
  }

  save(): void {
    const payload = {
      ...this.form.value,
      date: this.form.value.date
        ? new Date(this.form.value.date).toISOString().split('T')[0]
        : null
    };

    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }
}
