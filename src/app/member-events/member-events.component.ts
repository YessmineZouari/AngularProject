import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Evt } from 'src/models/Evt';

@Component({
  selector: 'app-member-events',
  templateUrl: './member-events.component.html',
  styleUrls: ['./member-events.component.css']
})
export class MemberEventsComponent {

  displayedColumns: string[] = ['id', 'titre', 'date', 'lieu'];
  dataSource: MatTableDataSource<Event>;

  memberName: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { events: Event[], memberName: string },
    private dialogRef: MatDialogRef<MemberEventsComponent>
  ) {
    this.dataSource = new MatTableDataSource<Event>(data.events);
    this.memberName = data.memberName;
  }

  close(): void {
    this.dialogRef.close();
  }
}
