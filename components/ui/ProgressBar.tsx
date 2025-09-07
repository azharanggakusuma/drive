"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Setiap kali URL berubah (navigasi selesai), panggil `NProgress.done()`
    NProgress.done();
  }, [pathname, searchParams]);

  // Komponen ini tidak me-render apa pun ke layar
  return null;
}