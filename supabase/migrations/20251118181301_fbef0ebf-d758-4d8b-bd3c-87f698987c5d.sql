-- Create hospital_withdrawal_requests table
CREATE TABLE IF NOT EXISTS public.hospital_withdrawal_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  status request_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hospital_withdrawal_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Hospitals can create their withdrawal requests"
ON public.hospital_withdrawal_requests
FOR INSERT
TO authenticated
WITH CHECK (
  hospital_id IN (
    SELECT id FROM public.hospitals WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Hospitals can view their withdrawal requests"
ON public.hospital_withdrawal_requests
FOR SELECT
TO authenticated
USING (
  hospital_id IN (
    SELECT id FROM public.hospitals WHERE user_id = auth.uid()
  )
  OR has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update withdrawal requests"
ON public.hospital_withdrawal_requests
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Add balance column to hospitals table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'hospitals' 
    AND column_name = 'balance'
  ) THEN
    ALTER TABLE public.hospitals ADD COLUMN balance NUMERIC NOT NULL DEFAULT 0.00;
  END IF;
END $$;

-- Create trigger for updated_at
CREATE TRIGGER update_hospital_withdrawal_requests_updated_at
BEFORE UPDATE ON public.hospital_withdrawal_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();