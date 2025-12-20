import { useEffect } from "react";
import { updatePageMeta, PageMeta } from "@/lib/seoMeta";

/**
 * Hook to update page meta tags on route change
 * Usage: usePageMeta(seoPages.home)
 */
export function usePageMeta(pageMeta: PageMeta) {
  useEffect(() => {
    updatePageMeta(pageMeta);
  }, [pageMeta]);
}
