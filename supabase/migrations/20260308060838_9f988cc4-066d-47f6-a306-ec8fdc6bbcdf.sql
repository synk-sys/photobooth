
CREATE TABLE public.contests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  prize TEXT NOT NULL,
  deadline TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'upcoming', 'ended')),
  is_visible BOOLEAN NOT NULL DEFAULT true
);

ALTER TABLE public.contests ENABLE ROW LEVEL SECURITY;

-- Anyone can view visible contests
CREATE POLICY "Anyone can view visible contests"
ON public.contests FOR SELECT
USING (is_visible = true);

-- Admins can do everything
CREATE POLICY "Admins can manage contests"
ON public.contests FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
