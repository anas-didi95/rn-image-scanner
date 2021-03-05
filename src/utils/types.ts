export type EType = 'Phone' | 'Email' | 'Web Link' | 'Text';
export type TResult = {
  value: string;
  type: EType;
};
export type TFirestoreResult = {
  imageUri: string;
  fullText: string;
  texts: TResult[];
  createDate: Date;
};
