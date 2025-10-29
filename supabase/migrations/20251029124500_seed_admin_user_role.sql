-- This script assumes a user with the email 'admin@condimentos.com' has been created
-- in the Supabase Auth dashboard or via the API.
-- It updates the role of that user to 'admin'.

UPDATE public.profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'admin@condimentos.com'
);

