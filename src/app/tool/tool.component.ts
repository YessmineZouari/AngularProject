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
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }
  open(){
    const dialogRef = this.dialog.open(ToolCreateComponent);
    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
      this.Ts.addTool(data).subscribe((data)=>{
        this.Ts.getAllTool().subscribe((x)=>{this.dataSource.data=x})
      })
    }
    })
  }
openEdit(id: string) {
  const dialogRef = this.dialog.open(ToolCreateComponent, {
    data: id
  });

  dialogRef.afterClosed().subscribe(updatedData => {
    if (updatedData) {
      this.Ts.updateTool(id, updatedData).subscribe(() => {
        // 🔄 refresh table after update
        this.Ts.getAllTool().subscribe(res => {
          this.dataSource.data = res;
        });
      });
    }
  });
}



  ngAfterViewInit() {
    //remplir le tableau datasource 
    this.Ts.getAllTool().subscribe((res)=>{
      this.dataSource.data=res;})
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
} {

}