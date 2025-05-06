import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-gray-400">Join our cloud-based management platform</p>
        </div>
        <SignupForm />
      </div>
    </main>
  )
}
