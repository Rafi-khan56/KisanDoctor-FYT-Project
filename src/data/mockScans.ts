// Abhi sirf namoona data hai. Baad mein ye Firestore se aayega.
export type Scan = {
  id: string;
  crop: string;
  label: string;
  tone: 'ok' | 'bad' | 'review';
  when: string;
  field: 1 | 2;
};

export const mockScans: Scan[] = [
  { id: '1', crop: 'آلو', label: 'لیٹ بلائٹ', tone: 'bad', when: 'آج، 10:20', field: 1 },
  { id: '2', crop: 'ٹماٹر', label: 'صحت مند', tone: 'ok', when: 'کل، 08:45', field: 2 },
  { id: '3', crop: 'ٹماٹر', label: 'ماہر کا جائزہ', tone: 'review', when: '3 دن پہلے', field: 2 },
  { id: '4', crop: 'گندم', label: 'صحت مند', tone: 'ok', when: '5 دن پہلے', field: 1 },
];
