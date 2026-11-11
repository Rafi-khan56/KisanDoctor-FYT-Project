// Abhi sirf namoona data hai. Baad mein ye Firestore se aayega.
// Text nahi, keys rakhi hain taake zubaan badalne par khud badal jaye.
export type Scan = {
  id: string;
  crop: 'tomato' | 'potato' | 'wheat';
  label: 'healthy' | 'lateBlight' | 'expertReview';
  tone: 'ok' | 'bad' | 'review';
  when: 'today' | 'yesterday' | 'days3' | 'days5';
  field: 1 | 2;
};

export const mockScans: Scan[] = [
  { id: '1', crop: 'potato', label: 'lateBlight', tone: 'bad', when: 'today', field: 1 },
  { id: '2', crop: 'tomato', label: 'healthy', tone: 'ok', when: 'yesterday', field: 2 },
  { id: '3', crop: 'tomato', label: 'expertReview', tone: 'review', when: 'days3', field: 2 },
  { id: '4', crop: 'wheat', label: 'healthy', tone: 'ok', when: 'days5', field: 1 },
];
