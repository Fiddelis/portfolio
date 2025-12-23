type Props = {
  className?: string;
};

export default function BackgroundBlurs({ className = "" }: Props) {
  return (
    <div className={`ambient-blurs ${className}`} aria-hidden="true">
      <span className="ambient-blur ambient-blur--primary" />
      <span className="ambient-blur ambient-blur--accent" />
      <span className="ambient-blur ambient-blur--secondary" />
    </div>
  );
}
