import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CamperCard from "@/components/CamperCard";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface Camper {
  id: number;
  name: string;
  username: string;
  emoji: string;
}

async function fetchCampers(): Promise<Camper[]> {
  const res = await fetch(`${API_URL}/api/users`);
  if (!res.ok) throw new Error("Failed to fetch campers");
  const rows = await res.json();
  return rows.map((r: { id: number; name: string; email: string; username?: string; emoji?: string }) => ({
    id: r.id,
    name: r.name,
    username: r.username ?? "",
    emoji: r.emoji ?? "🦕",
  }));
}

async function updateCamperUsername(id: number, username: string): Promise<Camper> {
  const res = await fetch(`${API_URL}/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Failed to update username");
  }
  const r = await res.json();
  return {
    id: r.id,
    name: r.name,
    username: r.username ?? "",
    emoji: r.emoji ?? "🦕",
  };
}

const Index = () => {
  const queryClient = useQueryClient();
  const { data: campers = [], isLoading, error } = useQuery({
    queryKey: ["campers"],
    queryFn: fetchCampers,
  });

  const mutation = useMutation({
    mutationFn: ({ id, username }: { id: number; username: string }) =>
      updateCamperUsername(id, username),
    onSuccess: (updated) => {
      queryClient.setQueryData<Camper[]>(["campers"], (prev) =>
        prev ? prev.map((c) => (c.id === updated.id ? updated : c)) : [updated]
      );
    },
  });

  const updateUsername = (id: number, newUsername: string) => {
    mutation.mutate({ id, username: newUsername });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading campers…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">
          Could not load campers. Is the backend running and database set up?
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="py-10 text-center">
        <p className="text-4xl mb-2">🦕</p>
        <h1 className="font-display text-4xl font-bold text-foreground">
          Dino Discovery Camp
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Summer 2026 · Enrolled Campers
        </p>
      </header>

      <main className="mx-auto max-w-xl px-4 pb-16 space-y-4">
        {campers.map((c) => (
          <CamperCard
            key={c.id}
            name={c.name}
            username={c.username}
            emoji={c.emoji}
            onSave={(newUsername) => updateUsername(c.id, newUsername)}
          />
        ))}
      </main>
    </div>
  );
};

export default Index;
