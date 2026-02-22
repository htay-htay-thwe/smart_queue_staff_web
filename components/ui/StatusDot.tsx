export function StatusDot({ status }: { status: string }) {
  const color =
    status === "ready to seat"
      ? "bg-green-500"
      : status === "waiting"
        ? "bg-blue-500"
        : "bg-red-500";

  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${color}`}
      />
      <span className={`relative inline-flex h-3 w-3 rounded-full ${color}`} />
    </span>
  );
}
