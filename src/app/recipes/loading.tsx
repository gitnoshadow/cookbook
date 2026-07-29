export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
      <div className="animate-spin text-5xl mb-4" style={{ animationDuration: "3s" }}>🍳</div>
      <p className="text-lg font-medium" style={{ color: "#8d6e63" }}>
        正在尋找食譜喵...
      </p>
    </div>
  );
}
