import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export type Coords = { lat: number; lng: number };

// Phone ki location (ek dafa). Ijazat na mile ya na mil sake to null.
export async function getLocation(): Promise<Coords | null> {
  try {
    if (Platform.OS === 'android') {
      const res = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      const ok = Object.values(res).some(v => v === PermissionsAndroid.RESULTS.GRANTED);
      if (!ok) return null;
    }
    return await new Promise<Coords | null>(resolve => {
      Geolocation.getCurrentPosition(
        p => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => resolve(null),
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
      );
    });
  } catch {
    return null;
  }
}

// me se p tak: dx (mashriq, km), dy (shumal, km), aur seedhi doori (km).
export function offsetKm(me: Coords, p: Coords) {
  const dy = (p.lat - me.lat) * 111.32;
  const dx = (p.lng - me.lng) * 111.32 * Math.cos((me.lat * Math.PI) / 180);
  return { dx, dy, dist: Math.hypot(dx, dy) };
}
