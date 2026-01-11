import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { Member } from 'src/models/Member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  currentId: string | null = null;
  originalMember: any = null;
  memberType: string = 'etudiant';
  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(
    private MS: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.params['id'];
    this.isEditMode = !!this.currentId;

    if (this.isEditMode && this.currentId) {
      this.MS.getMemberByID(this.currentId).subscribe({
        next: (member: Member) => {
          this.originalMember = member;
          this.memberType = member.grade ? 'enseignant' : 'etudiant';
          this.selectedFileName = member.cv || '';
          this.initializeForm(member);
        },
        error: (error) => {
          console.error('Error loading member:', error);
        }
      });
    } else {
      this.initializeForm();
    }
  }

  private initializeForm(member?: any): void {
    this.form = new FormGroup({
      cin: new FormControl(member?.cin || null, [Validators.required, Validators.minLength(6)]),
      nom: new FormControl(member?.nom || null, Validators.required),
      prenom: new FormControl(member?.prenom || null, Validators.required),
      dateNaissance: new FormControl(
        member?.dateNaissance ? new Date(member.dateNaissance) : null,
        Validators.required
      ),
      email: new FormControl(member?.email || null, [Validators.required, Validators.email]),
      cv: new FormControl(member?.cv || null),
      diplome: new FormControl(member?.diplome || null),
      sujet: new FormControl(member?.sujet || null),
      dateInscription: new FormControl(
        member?.dateInscription ? new Date(member.dateInscription) : null
      ),
      grade: new FormControl(member?.grade || null),
      etablissement: new FormControl(member?.etablissement || null)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.form.patchValue({ cv: file.name });
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.form.patchValue({ cv: '' });
  }

  sub(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched();
      });
      return;
    }

    const memberData: any = {
      cin: this.form.value.cin,
      nom: this.form.value.nom,
      prenom: this.form.value.prenom,
      dateNaissance: this.form.value.dateNaissance,
      email: this.form.value.email,
      cv: this.selectedFileName || this.form.value.cv,
      pasword: 'default123'
    };

    if (this.isEditMode && this.currentId) {
      console.log('Updating member with ID:', this.currentId);
      
      if (this.memberType === 'etudiant') {
        memberData.diplome = this.form.value.diplome;
        memberData.sujet = this.form.value.sujet;
        memberData.dateInscription = this.form.value.dateInscription;
      } else {
        memberData.grade = this.form.value.grade;
        memberData.etablissement = this.form.value.etablissement;
      }
      
      console.log('Data being sent:', memberData);
      
      this.MS.updateMember(this.currentId, memberData).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.router.navigate(['/member']);
        },
        error: (error) => {
          console.error('Full error object:', error);
        }
      });
    } else {
      console.log('Creating new member as:', this.memberType);
      
      if (this.memberType === 'etudiant') {
        memberData.diplome = this.form.value.diplome;
        memberData.sujet = this.form.value.sujet;
        memberData.dateInscription = this.form.value.dateInscription || new Date().toISOString();
      } else {
        memberData.grade = this.form.value.grade;
        memberData.etablissement = this.form.value.etablissement;
      }
      
      console.log('Data being sent:', memberData);
      
      this.MS.addMember(memberData, this.memberType).subscribe({
        next: (response) => {
          console.log('Creation successful:', response);
          this.router.navigate(['/member']);
        },
        error: (error) => {
          console.error('Full error object:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/member']);
  }
}