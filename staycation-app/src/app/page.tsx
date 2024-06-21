import { getUser } from "@/services/userService";

export default async function Home() {
  const user = await getUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello Next
      <p>User first name: {user}</p>
    </main>
  );
}
