"use client";

import { Suspense } from "react";
import LoginLoading from "./login-loading";
import LoginContent from "./login-content";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}
