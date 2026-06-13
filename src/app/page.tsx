"use client";

import { useRouter } from "next/navigation";
import UserPortal from "./components/UserPortal"; // Jalur impor yang benar

export default function HomePage() {
  const router = useRouter();

  // Fungsi navigasi yang benar untuk Next.js App Router
  return <UserPortal onSwitchRole={() => router.push("/admin")} />;
}