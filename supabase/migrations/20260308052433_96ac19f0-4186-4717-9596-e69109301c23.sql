
CREATE POLICY "Authenticated users can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (true);
