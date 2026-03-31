
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  property_id TEXT,
  property_title TEXT,
  user_type TEXT,
  source TEXT
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a lead (public form)
CREATE POLICY "Anyone can submit leads"
ON public.leads FOR INSERT
WITH CHECK (true);

-- Only admins can view leads
CREATE POLICY "Admins can view leads"
ON public.leads FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete leads
CREATE POLICY "Admins can delete leads"
ON public.leads FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));
