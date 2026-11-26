import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { CropKey, LabelKey } from '../types/scan';

// Sab users ke gumnaam reports: outbreaks/{id}. Location ~1 km tak gol (2 ashariya).
export type Outbreak = {
  id: string;
  crop: CropKey;
  label: LabelKey;
  lat: number;
  lng: number;
  createdAt: Date | null;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

// `await` na karein (internet na ho to pending rehta hai), sirf `.catch` lagayein.
export function reportOutbreak(r: { crop: CropKey; label: LabelKey; lat: number; lng: number }) {
  const uid = getAuth().currentUser?.uid;
  if (!uid) return Promise.resolve();
  return addDoc(collection(getFirestore(), 'outbreaks'), {
    crop: r.crop,
    label: r.label,
    lat: round2(r.lat),
    lng: round2(r.lng),
    uid,
    createdAt: serverTimestamp(),
  });
}

export function useOutbreaks() {
  const [reports, setReports] = useState<Outbreak[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const q = query(
        collection(getFirestore(), 'outbreaks'),
        orderBy('createdAt', 'desc'),
        limit(300),
      );
      return onSnapshot(
        q,
        snap => {
          setReports(
            snap.docs.map(d => {
              const x = d.data() as Omit<Outbreak, 'id' | 'createdAt'> & {
                createdAt?: { toDate?: () => Date } | null;
              };
              return {
                id: d.id,
                crop: x.crop,
                label: x.label,
                lat: x.lat,
                lng: x.lng,
                createdAt: x.createdAt?.toDate?.() ?? null,
              };
            }),
          );
          setLoading(false);
        },
        () => {
          setError(true);
          setLoading(false);
        },
      );
    } catch {
      setError(true);
      setLoading(false);
      return undefined;
    }
  }, []);

  return { reports, loading, error };
}
