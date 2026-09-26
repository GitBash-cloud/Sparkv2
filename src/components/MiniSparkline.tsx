import React from 'react';

interface MiniSparklineProps {
  points: number[];
  isBullish: boolean;
  className?: string;
  strokeWidth?: number;
}

export const MiniSparkline: React.FC<MiniSparklineProps> = ({
  points,
  isBullish,
  className = 'w-full h-full',
  strokeWidth = 2,
}) => {
  if (!points || points.length < 2) return null;

  const width = 140;
  const height = 36;
  const paddingY = 4;
  const availableHeight = height - paddingY * 2;

  const minVal = Math.min(...points);
  const maxVal = Math.max(...points);
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  const coords = points.map((p, index) => {
    const x = (index / (points.length - 1)) * width;
    const normalized = (p - minVal) / range;
    const y = height - paddingY - normalized * availableHeight;
    return { x, y };
  });

  // Build cubic Bezier path
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1];
    const curr = coords[i];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }

  const fillD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  const strokeColor = isBullish ? '#00E676' : '#FF1744';
  const fillGradientId = `gradient-${isBullish ? 'bull' : 'bear'}-${Math.random().toString(36).substring(2, 7)}`;
  const lastPoint = coords[coords.length - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
          <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
        </linearGradient>
      </defs>
      <path d={fillD} fill={`url(#${fillGradientId})`} />
      <path d={pathD} fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {/* Active glowing endpoint */}
      <circle cx={lastPoint.x} cy={lastPoint.y} r={3.5} fill={strokeColor} fillOpacity={0.4} />
      <circle cx={lastPoint.x} cy={lastPoint.y} r={2} fill={strokeColor} />
    </svg>
  );
};
