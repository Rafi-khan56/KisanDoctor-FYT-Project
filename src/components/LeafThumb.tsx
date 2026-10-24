import React from 'react';
import { View } from 'react-native';

type Props = { size?: number; sick?: boolean };

// Patte ki shakal (mockup jaisi): do kone gol, do kone nukeele. Bimar patte par bhoore dhabbe.
export default function LeafThumb({ size = 40, sick = false }: Props) {
  const dot = (left: number, top: number, d: number) => (
    <View
      style={{
        position: 'absolute',
        left: size * left,
        top: size * top,
        width: size * d,
        height: size * d,
        borderRadius: size * d,
        backgroundColor: '#5A3A1C',
      }}
    />
  );
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: sick ? '#5E9E4A' : '#4F9140',
        borderTopLeftRadius: 0,
        borderTopRightRadius: size * 0.7,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: size * 0.7,
      }}>
      {sick && (
        <>
          {dot(0.3, 0.35, 0.16)}
          {dot(0.55, 0.55, 0.2)}
          {dot(0.4, 0.72, 0.1)}
        </>
      )}
    </View>
  );
}
