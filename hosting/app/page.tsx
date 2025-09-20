// app/page.tsx
"use client";

import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function Page() {
  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log("User:", user);
    });
    return () => unsub();
  }, []);

  return <h1>Home page ✅</h1>;
}
export default function Page() {
  return <h1>Hello, Next.js!</h1>;
}
