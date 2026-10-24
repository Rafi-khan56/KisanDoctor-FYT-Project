import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export type IconName = 'home' | 'map' | 'camera' | 'records' | 'profile' | 'leaf';

type Props = { name: IconName; color?: string; size?: number };

// Mockup wale wohi icons (react-native-svg se).
export default function Icon({ name, color = '#1B2A1E', size = 22 }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round">
      {name === 'home' && <Path d="M4 11l8-7 8 7v9H4z" />}
      {name === 'map' && (
        <>
          <Path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
          <Circle cx={12} cy={10} r={2.5} />
        </>
      )}
      {name === 'camera' && (
        <>
          <Path d="M4 8h3l2-3h6l2 3h3v11H4z" />
          <Circle cx={12} cy={13} r={3.5} />
        </>
      )}
      {name === 'records' && (
        <>
          <Path d="M6 4h12v16H6z" />
          <Path d="M9 9h6M9 13h6" />
        </>
      )}
      {name === 'profile' && (
        <>
          <Circle cx={12} cy={8} r={4} />
          <Path d="M4 21c1-5 4-7 8-7s7 2 8 7" />
        </>
      )}
      {name === 'leaf' && (
        <>
          <Path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
          <Path d="M5 19c3-5 6-8 10-10" />
        </>
      )}
    </Svg>
  );
}
