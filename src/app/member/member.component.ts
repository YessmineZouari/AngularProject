import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/Member';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ArticleMembersComponent } from '../article-members/article-members.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'cin',
    'nom',
    'prenom',
    'email',
    'type',
    'diplome',
    'grade',
    'etablissement',
    'sujet',
    'dateInscription',
    'dateNaissance',
    'cv',
    'publications',
    'actions'
  ];
  
  dataSource: Member[] = [];

  constructor(private MS: MemberService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.MS.GetAllMembers().subscribe((data) => {
      this.dataSource = data;
    });
  }

  delete(id: String): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MS.deleteMemberById(id as unknown as string).subscribe(() => {
          this.fetch();
        });
      }
    });
  }

  openPublications(member: Member): void {
    this.MS.getFullMember(member.id.toString()).subscribe(fullMember => {
      console.log(fullMember.pubs);
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '800px';
      dialogConfig.maxHeight = '80vh';
      dialogConfig.data = {
        publications: fullMember.pubs,
        memberName: `${fullMember.nom} ${fullMember.prenom}`
      };

      this.dialog.open(ArticleMembersComponent, dialogConfig);
    });
  }

  // Download CV
  downloadCV(member: Member): void {
    const fileName = `${member.nom}_${member.prenom}_CV.pdf`;
    this.MS.triggerCVDownload(member.id);
  }
}