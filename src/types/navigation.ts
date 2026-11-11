import { CropKey, LabelKey } from './scan';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Scan: undefined;
  Result: { crop: CropKey; label: Exclude<LabelKey, 'expertReview'>; confidence: number };
};

export type TabParamList = {
  Home: undefined;
  Map: undefined;
  ScanTab: undefined;
  Records: undefined;
  Profile: undefined;
};
