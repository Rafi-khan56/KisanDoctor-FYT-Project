import { Strings } from '../i18n/ur';

const pad = (n: number) => (n < 10 ? '0' : '') + n;
const dayStart = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();

// "آج · 10:20", "کل · 08:45", "3 دن پہلے"
export function formatWhen(d: Date | null, t: Strings): string {
  if (!d) return t.time.justNow;
  const days = Math.round((dayStart(new Date()) - dayStart(d)) / 86400000);
  const hm = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (days <= 0) return `${t.time.today} · ${hm}`;
  if (days === 1) return `${t.time.yesterday} · ${hm}`;
  return `${days} ${t.time.daysAgo}`;
}
