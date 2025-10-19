"use client"
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const HomeView = () => {
  const {data: session, refetch} = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return (
      <p>Loading</p>
    )

  }
  return (
    <div className="p-4 flex flex-col gap-y-4">
        <h1>Welcome, {session.user?.name || "User"}!</h1>
        <Button onClick={() => {
          authClient.signOut({fetchOptions: {onSuccess: () => router.push('/sign-in')}})
        }}>
            Sign Out
        </Button>
      </div>
  );
}


