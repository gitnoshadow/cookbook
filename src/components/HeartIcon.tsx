export default function HeartIcon({ filled = false, size = 24 }: { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke="#ef4444" strokeWidth={filled ? 0 : 2} strokeLinecap="round" strokeLinejoin="round" style={{ filter: filled ? "drop-shadow(0 2px 4px rgba(239,68,68,0.4))" : undefined }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
