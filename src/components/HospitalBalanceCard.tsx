import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface HospitalBalanceCardProps {
  balance: number;
  hospitalId: string;
  onWithdrawalSuccess?: () => void;
}

export const HospitalBalanceCard = ({ balance, hospitalId, onWithdrawalSuccess }: HospitalBalanceCardProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleWithdrawal = async () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح");
      return;
    }

    if (amount > balance) {
      toast.error("الرصيد غير كافٍ");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("hospital_withdrawal_requests")
        .insert({
          hospital_id: hospitalId,
          amount: amount,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        throw new Error("تعذر إنشاء طلب السحب، برجاء المحاولة مرة أخرى");
      }

      toast.success("تم إرسال طلب السحب بنجاح");
      setDialogOpen(false);
      setWithdrawAmount("");
      onWithdrawalSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء إرسال الطلب");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary to-primary-light text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">الرصيد المتاح</CardTitle>
        <DollarSign className="h-4 w-4 text-white/80" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">{balance.toFixed(2)} جنيه</div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="secondary" 
              className="w-full bg-white text-primary hover:bg-white/90"
              disabled={balance <= 0}
            >
              <TrendingUp className="h-4 w-4 ml-2" />
              سحب الرصيد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle>طلب سحب رصيد</DialogTitle>
              <DialogDescription>
                الرصيد المتاح: {balance.toFixed(2)} جنيه
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">المبلغ المراد سحبه</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  max={balance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="أدخل المبلغ"
                  className="text-right"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleWithdrawal}
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? "جاري الإرسال..." : "إرسال الطلب"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  disabled={submitting}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
