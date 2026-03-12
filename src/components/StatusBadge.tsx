interface StatusBadgeProps {
  status: string;
}

const styles: Record<string, string> = {
  "Available": "bg-blue-100 text-blue-800",
  "Requested": "bg-amber-100 text-amber-800",
  "Assigned": "bg-amber-100 text-amber-800",
  "Picked Up": "bg-green-100 text-green-800",
  "Completed": "bg-green-100 text-green-800",
};

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || "bg-secondary text-secondary-foreground"}`}>
    {status}
  </span>
);

export default StatusBadge;
