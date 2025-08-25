// app/(auth)/auth/page.jsx
import AuthCard from "@/components/AuthCard";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const metadata = { title: "Auth | Login / Sign up" };

export default async function AuthPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (session) redirect("/dashboard");

  return <AuthCard />;
}
