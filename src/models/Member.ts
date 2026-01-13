import { Article } from './article';
import {Evt } from './Evt';


export interface Member {
  id: number;
  cin: string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  email: string;
  cv: string;

  // Etudiant
  dateInscription?: Date;
  diplome?: string;
  sujet?: string;

  // Enseignant
  grade?: string;
  etablissement?: string;
   pubs?: Article[];
   events?: Evt[];
}
