interface Props {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: Props) {
  return (
    <div className="p-6 border rounded-xl">
      <h3 className="text-sm text-muted-foreground">{title}</h3>

      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
