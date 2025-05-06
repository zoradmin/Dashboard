import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  // In a real app, check if user is authenticated
  // If authenticated, redirect to dashboard
  // const isAuthenticated = await checkAuth();
  // if (isAuthenticated) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">SysAdmin Dashboard</h1>
          <p className="mt-2 text-gray-400">Cloud-based management for Linux administrators</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
