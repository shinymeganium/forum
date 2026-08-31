import Card from "../ui/Card";

export default function ProfileCard() {
  return (
    <Card>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          testuser
        </h2>

        <p className="text-gray-500">
          Joined 31.8.2026
        </p>

        <div className="pt-2">
          <p>Threads: 15</p>
          <p>Comments: 42</p>
        </div>
      </div>
    </Card>
  );
}