export interface Article {
  id: number;        // Long → number
  titre: string;
  date: string;      // Date → string (ISO)
  lieu: string;
  sourcePdf: string;
  type: string;      // "ARTICLE"
}

