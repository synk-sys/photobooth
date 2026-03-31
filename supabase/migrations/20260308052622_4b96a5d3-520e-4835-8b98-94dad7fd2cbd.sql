
-- Drop the overly permissive SELECT policy
DROP POLICY "Authenticated users can view newsletter subscribers" ON public.newsletter_subscribers;

-- Only admins can view subscribers
CREATE POLICY "Only admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
