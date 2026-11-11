export type CropKey = 'tomato' | 'potato' | 'wheat';
export type LabelKey = 'healthy' | 'earlyBlight' | 'lateBlight' | 'bacterialSpot' | 'leafMold' | 'septoriaLeafSpot' | 'targetSpot' | 'yellowLeafCurl' | 'mosaicVirus' | 'expertReview';
export type Tone = 'ok' | 'bad' | 'review';

// Firestore mein: users/{uid}/scans/{id}
export type Scan = {
  id: string;
  crop: CropKey;
  label: LabelKey;
  tone: Tone;
  confidence: number; // 0 se 100
  field: 1 | 2;
  createdAt: Date | null; // null = abhi server tak nahi pohancha (offline)
};

export type NewScan = Omit<Scan, 'id' | 'createdAt'>;
