import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const getSessionId = () => {
  let id = sessionStorage.getItem("pv_session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("pv_session", id);
  }
  return id;
};

const PageViewTracker = () => {
  const location = useLocation();
  const lastPath = useRef("");

  useEffect(() => {
    const path = location.pathname;
    if (path === lastPath.current) return;
    lastPath.current = path;

    const logView = async () => {
      let country: string | null = null;
      try {
        const res = await fetch("https://api.country.is/");
        if (res.ok) {
          const data = await res.json();
          country = data.country || null;
        }
      } catch {}

      supabase.from("page_views").insert({
        path,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: getSessionId(),
        country,
      } as any);
    };

    logView();
  }, [location.pathname]);

  return null;
};

export default PageViewTracker;
