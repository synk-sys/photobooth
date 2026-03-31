
CREATE TABLE public.page_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  referrer text,
  user_agent text,
  session_id text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert page views (anonymous tracking)
CREATE POLICY "Anyone can log page views" ON public.page_views
  FOR INSERT WITH CHECK (true);

-- Only admins can view analytics
CREATE POLICY "Admins can view page views" ON public.page_views
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
