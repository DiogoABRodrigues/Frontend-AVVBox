// models/Settings.ts
export interface Settings {
  _id?: string;
  user?: string;
  fifteenMin?: boolean;
  thirtyMin?: boolean;
  sixtyMin?: boolean;
  onetwentyMin?: boolean;
  trainingPending?: boolean;
  trainingApproved?: boolean;
  trainingRejected?: boolean;
  trainingCanceled?: boolean;
  trainingUpdated?: boolean;
}
