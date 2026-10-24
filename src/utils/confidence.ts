import { colors } from '../theme/colors';

// Proposal ke mutabiq: 80%+ hara, 50-80% narangi, 50% se kam: bimari ka naam nahi dikhana.
export const SHOW_DISEASE_MIN = 50;

export function confidenceColor(percent: number): string {
  if (percent >= 80) return '#2E7D46';
  if (percent >= SHOW_DISEASE_MIN) return colors.orange;
  return colors.red;
}

export function isConfidentEnough(percent: number): boolean {
  return percent >= SHOW_DISEASE_MIN;
}
