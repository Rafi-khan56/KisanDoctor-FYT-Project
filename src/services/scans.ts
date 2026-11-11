import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { NewScan, Scan } from '../types/scan';

// Har user ki scans uske apne folder mein: users/{uid}/scans
function scansRef() {
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error('not-logged-in');
  return collection(getFirestore(), 'users', uid, 'scans');
}

// Dhyan: internet na ho to ye promise tab tak "pending" rehta hai jab tak net na aaye.
// Data phone mein foran save ho jata hai, is liye isay `await` na karein, sirf `.catch` lagayein.
export async function addScan(scan: NewScan) {
  return addDoc(scansRef(), { ...scan, createdAt: serverTimestamp() });
}

export function subscribeScans(onData: (scans: Scan[]) => void, onError: () => void) {
  try {
    const q = query(scansRef(), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      snap => {
        onData(
          snap.docs.map(d => {
            const data = d.data() as Omit<Scan, 'id' | 'createdAt'> & {
              createdAt?: { toDate?: () => Date } | null;
            };
            return {
              id: d.id,
              crop: data.crop,
              label: data.label,
              tone: data.tone,
              confidence: data.confidence,
              field: data.field,
              createdAt: data.createdAt?.toDate?.() ?? null,
            };
          }),
        );
      },
      () => onError(),
    );
  } catch {
    onError();
    return () => {};
  }
}

// Screen mein istemal ke liye: scans khud update hoti rehti hain.
export function useScans() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(
    () =>
      subscribeScans(
        s => {
          setScans(s);
          setLoading(false);
        },
        () => {
          setError(true);
          setLoading(false);
        },
      ),
    [],
  );

  return { scans, loading, error };
}
