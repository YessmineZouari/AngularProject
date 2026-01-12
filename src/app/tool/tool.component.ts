import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Outil } from 'src/models/Outil';
import { ToolService } from 'src/services/tool.service';
import { ToolCreateComponent } from '../tool-create/tool-create.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'date', 'source', 'edit'];
  dataSource: MatTableDataSource<Outil>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private Ts: ToolService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  open() {
    const dialogRef = this.dialog.open(ToolCreateComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.Ts.addTool(data).subscribe(() => {
          this.Ts.getAllTool().subscribe((x) => {
            this.dataSource.data = x;
          });
        });
      }
    });
  }

  openEdit(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;

    const dialogRef = this.dialog.open(ToolCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        this.Ts.updateTool(id, updatedData).subscribe(() => {
          console.log('Outil mis à jour avec succès');
        });
      }
    });
  }

  ngAfterViewInit() {
    this.Ts.getAllTool().subscribe((res) => {
      this.dataSource.data = res;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
