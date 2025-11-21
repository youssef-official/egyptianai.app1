import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DoctorReportFormProps {
  booking: any;
  doctorId: string;
  hospitalId: string;
  onSuccess?: () => void;
}

export const DoctorReportForm = ({ booking, doctorId, hospitalId, onSuccess }: DoctorReportFormProps) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reportContent.trim()) {
      toast.error("يرجى كتابة محتوى التقرير");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("medical_reports")
        .insert({
          patient_id: booking.user_id,
          doctor_id: doctorId,
          hospital_id: hospitalId,
          booking_id: booking.id,
          diagnosis: diagnosis.trim() || null,
          treatment: treatment.trim() || null,
          report_content: reportContent.trim(),
        });

      if (error) throw error;

      toast.success("تم حفظ التقرير الطبي بنجاح");
      setDiagnosis("");
      setTreatment("");
      setReportContent("");
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء حفظ التقرير");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>كتابة تقرير طبي</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            <strong>المريض:</strong> {booking.patient_name} | 
            <strong> الهاتف:</strong> {booking.patient_phone}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="diagnosis">التشخيص (اختياري)</Label>
          <Input
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="أدخل التشخيص"
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="treatment">العلاج (اختياري)</Label>
          <Input
            id="treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            placeholder="أدخل العلاج الموصوف"
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="report">محتوى التقرير *</Label>
          <Textarea
            id="report"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="أدخل تفاصيل الحالة والملاحظات الطبية..."
            rows={8}
            className="text-right resize-none"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full"
        >
          {submitting ? "جاري الحفظ..." : "حفظ التقرير"}
        </Button>
      </CardContent>
    </Card>
  );
};
