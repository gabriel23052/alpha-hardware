import { useEffect } from "react";
import { useLocation } from "react-router";

export default function usePageTitle(title: string): void {
  const location = useLocation();
  useEffect(() => {
    document.title = title;
  }, [location, title]);
}
