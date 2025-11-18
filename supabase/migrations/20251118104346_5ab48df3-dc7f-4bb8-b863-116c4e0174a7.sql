-- إنشاء جدول طلبات القروض
CREATE TABLE IF NOT EXISTS public.loan_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  phone text NOT NULL,
  id_card_image_url text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- إنشاء جدول البيانات الطبية
CREATE TABLE IF NOT EXISTS public.medical_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  chronic_diseases text,
  heart_disease boolean DEFAULT false,
  age integer,
  gender text CHECK (gender IN ('male', 'female')),
  other_conditions text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- إنشاء جدول التقارير الطبية
CREATE TABLE IF NOT EXISTS public.medical_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL REFERENCES public.hospital_doctors(id) ON DELETE CASCADE,
  hospital_id uuid NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
  booking_id text REFERENCES public.hospital_bookings(id) ON DELETE SET NULL,
  report_content text NOT NULL,
  diagnosis text,
  treatment text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- تفعيل RLS على الجداول الجديدة
ALTER TABLE public.loan_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_reports ENABLE ROW LEVEL SECURITY;

-- سياسات RLS لطلبات القروض
CREATE POLICY "Users can create their own loan requests"
  ON public.loan_requests FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own loan requests"
  ON public.loan_requests FOR SELECT
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update loan requests"
  ON public.loan_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

-- سياسات RLS للبيانات الطبية
CREATE POLICY "Users can insert their medical info"
  ON public.medical_info FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their medical info"
  ON public.medical_info FOR SELECT
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin') OR 
         EXISTS (SELECT 1 FROM public.hospital_bookings WHERE user_id = medical_info.user_id));

CREATE POLICY "Users can update their medical info"
  ON public.medical_info FOR UPDATE
  USING (user_id = auth.uid());

-- سياسات RLS للتقارير الطبية
CREATE POLICY "Hospital doctors can create reports"
  ON public.medical_reports FOR INSERT
  WITH CHECK (doctor_id IN (SELECT id FROM public.hospital_doctors WHERE hospital_id IN 
              (SELECT id FROM public.hospitals WHERE user_id = auth.uid())));

CREATE POLICY "Users can view their own medical reports"
  ON public.medical_reports FOR SELECT
  USING (patient_id = auth.uid() OR has_role(auth.uid(), 'admin') OR
         hospital_id IN (SELECT id FROM public.hospitals WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all medical reports"
  ON public.medical_reports FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- إنشاء bucket للقروض
INSERT INTO storage.buckets (id, name, public)
VALUES ('loan-documents', 'loan-documents', false)
ON CONFLICT (id) DO NOTHING;

-- سياسات storage للقروض
CREATE POLICY "Users can upload their loan documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'loan-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their loan documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'loan-documents' AND (auth.uid()::text = (storage.foldername(name))[1] OR has_role(auth.uid(), 'admin')));

-- إضافة trigger للتحديث التلقائي
CREATE TRIGGER update_loan_requests_updated_at
  BEFORE UPDATE ON public.loan_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_info_updated_at
  BEFORE UPDATE ON public.medical_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_reports_updated_at
  BEFORE UPDATE ON public.medical_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();