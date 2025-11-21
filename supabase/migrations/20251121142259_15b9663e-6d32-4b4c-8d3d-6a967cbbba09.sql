-- حل مشكلة طلبات سحب المستشفيات
-- المشكلة: RLS policy تتطلب auth.uid() لكن المستشفيات تستخدم localStorage session

-- حذف السياسة القديمة
DROP POLICY IF EXISTS "Hospitals can create their withdrawal requests" ON hospital_withdrawal_requests;

-- إنشاء سياسة جديدة تسمح للمستشفيات المعتمدة بإنشاء طلبات السحب
CREATE POLICY "Hospitals can create withdrawal requests" 
ON hospital_withdrawal_requests 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM hospitals 
    WHERE hospitals.id = hospital_id 
    AND hospitals.is_approved = true
  )
);

-- تحديث سياسة العرض لتسمح للمستشفيات برؤية طلباتهم
DROP POLICY IF EXISTS "Hospitals can view their withdrawal requests" ON hospital_withdrawal_requests;

CREATE POLICY "Hospitals can view their withdrawal requests" 
ON hospital_withdrawal_requests 
FOR SELECT 
USING (
  hospital_id IN (SELECT id FROM hospitals WHERE is_approved = true)
  OR has_role(auth.uid(), 'admin')
);