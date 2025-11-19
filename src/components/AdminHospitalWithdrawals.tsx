import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminHospitalWithdrawalsProps {
  withdrawals: any[];
  adminNotes: { [key: string]: string };
  setAdminNotes: (notes: { [key: string]: string }) => void;
  onUpdate: () => void;
}

export const AdminHospitalWithdrawals = ({ 
  withdrawals, 
  adminNotes, 
  setAdminNotes, 
  onUpdate 
}: AdminHospitalWithdrawalsProps) => {
  
  const handleApprove = async (requestId: string, hospitalId: string, amount: number) => {
    try {
      // Get current hospital balance
      const { data: hospital } = await supabase
        .from("hospitals")
        .select("balance")
        .eq("id", hospitalId)
        .single();

      if (!hospital) {
        toast.error("لم يتم العثور على المستشفى");
        return;
      }

      if (hospital.balance < amount) {
        toast.error("رصيد المستشفى غير كافٍ");
        return;
      }

      // Deduct from hospital balance
      await supabase
        .from("hospitals")
        .update({ balance: hospital.balance - amount })
        .eq("id", hospitalId);

      // Update withdrawal request
      await supabase
        .from("hospital_withdrawal_requests")
        .update({ 
          status: "approved",
          admin_notes: adminNotes[requestId] || ""
        })
        .eq("id", requestId);

      toast.success("تمت الموافقة على طلب السحب");
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء معالجة الطلب");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await supabase
        .from("hospital_withdrawal_requests")
        .update({ 
          status: "rejected",
          admin_notes: adminNotes[requestId] || ""
        })
        .eq("id", requestId);

      toast.success("تم رفض طلب السحب");
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء معالجة الطلب");
    }
  };

  return (
    <>
      {withdrawals.map((req) => (
        <Card key={req.id} className="rounded-3xl border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{req.hospitals?.name || "مستشفى"}</span>
              <Badge variant={req.status === 'approved' ? 'default' : req.status === 'rejected' ? 'destructive' : 'secondary'}>
                {req.status === 'approved' ? 'موافق عليه' : req.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة'}
              </Badge>
            </CardTitle>
            <CardDescription>
              {req.hospitals?.phone} • {req.hospitals?.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">المبلغ المطلوب:</span>
                <p className="font-semibold text-lg">{req.amount.toFixed(2)} جنيه</p>
              </div>
              <div>
                <span className="text-muted-foreground">تاريخ الطلب:</span>
                <p>{new Date(req.created_at).toLocaleDateString('ar-EG')}</p>
              </div>
            </div>
            
            {req.admin_notes && (
              <div className="bg-secondary p-3 rounded-lg">
                <span className="text-xs text-muted-foreground">ملاحظات الإدارة:</span>
                <p className="text-sm mt-1">{req.admin_notes}</p>
              </div>
            )}

            {req.status === 'pending' && (
              <>
                <Textarea
                  placeholder="ملاحظات..."
                  value={adminNotes[req.id] || ''}
                  onChange={(e) => setAdminNotes({ ...adminNotes, [req.id]: e.target.value })}
                  className="rounded-2xl text-sm"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleApprove(req.id, req.hospital_id, req.amount)} 
                    className="flex-1 bg-green-600 hover:bg-green-700 rounded-full" 
                    size="sm"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    موافقة وخصم
                  </Button>
                  <Button 
                    onClick={() => handleReject(req.id)} 
                    variant="destructive" 
                    className="flex-1 rounded-full" 
                    size="sm"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    رفض
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
      {withdrawals.length === 0 && (
        <p className="text-center text-muted-foreground py-8">لا توجد طلبات سحب حالياً</p>
      )}
    </>
  );
};
