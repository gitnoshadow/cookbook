export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
      <div className="animate-bounce text-5xl mb-4">🐾</div>
      <p className="text-lg font-medium" style={{ color: "#8d6e63" }}>
        讀取中，請稍候喵...
      </p>
    </div>
  );
}
