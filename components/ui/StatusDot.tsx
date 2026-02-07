type Status = "accepted" | "pending" | "canceled";

const statusColor: Record<Status, string> = {
  accepted: "bg-green-500",
  pending: "bg-blue-500",
  canceled: "bg-red-500",
};

export function StatusDot({ status }: { status: Status }) {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${statusColor[status]}`}
      />
      <span
        className={`relative inline-flex h-3 w-3 rounded-full ${statusColor[status]}`}
      />
    </span>
  );
}
