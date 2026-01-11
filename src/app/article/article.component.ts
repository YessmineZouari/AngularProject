import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Article } from 'src/models/article';
import { ArticleService } from 'src/services/article.service';
import { ArticleCreateComponent } from '../article-create/article-create.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'titre',
    'date',
    'lieu',
    'sourcePdf',
    'edit'
  ];

  dataSource: MatTableDataSource<Article> = new MatTableDataSource<Article>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.loadArticles();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadArticles(): void {
    this.articleService.getAllArticle().subscribe((res: Article[]) => {
      this.dataSource.data = res;
    });
  }

  open(): void {
    const dialogRef = this.dialog.open(ArticleCreateComponent);

    dialogRef.afterClosed().subscribe((data: Article | undefined) => {
      if (data) {
        this.articleService.addArticle(data).subscribe(() => {
          this.loadArticles();
        });
      }
    });
  }

  openEdit(id: number): void {
    const config = new MatDialogConfig<number>();
    config.data = id;

    const dialogRef = this.dialog.open(ArticleCreateComponent, config);

    dialogRef.afterClosed().subscribe((updatedData: Article | undefined) => {
      if (updatedData) {
        this.articleService.updateArticle(id, updatedData).subscribe(() => {
          this.loadArticles();
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
