import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from 'src/models/article';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-article-members',
  templateUrl: './article-members.component.html',
  styleUrls: ['./article-members.component.css']
})
export class ArticleMembersComponent {
  displayedColumns: string[] = ['id', 'titre', 'date', 'type', 'sourcePdf'];
  dataSource: MatTableDataSource<Article>;

  memberName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { publications: Article[], memberName: string },
    private dialogRef: MatDialogRef<ArticleMembersComponent>
  ) {
    this.dataSource = new MatTableDataSource<Article>(data.publications);
    this.memberName = data.memberName;
  }

  close(): void {
    this.dialogRef.close();
  }
}
