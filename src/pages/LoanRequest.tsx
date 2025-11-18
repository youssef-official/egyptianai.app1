import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const LoanRequest = () => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) navigate('/auth');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCardImage) {
      toast({ title: "خطأ", description: "يرجى رفع صورة البطاقة", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload ID card image
      const fileExt = idCardImage.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("loan-documents")
        .upload(filePath, idCardImage);

      if (uploadError) throw uploadError;

      // Insert loan request
      const { error: insertError } = await supabase
        .from("loan_requests")
        .insert({
          user_id: user.id,
          amount: parseFloat(amount),
          phone,
          id_card_image_url: filePath,
          status: "pending"
        });

      if (insertError) throw insertError;

      toast({ 
        title: "تم الإرسال!", 
        description: "تم إرسال طلب القرض بنجاح. سيتم مراجعته قريباً." 
      });
      navigate('/wallet');
    } catch (error: any) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/wallet")} className="gap-2">
            <ArrowRight className="w-4 h-4" />
            العودة
          </Button>
        </div>
        
        <Card className="shadow-strong rounded-3xl border-0">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-white rounded-t-3xl">
            <CardTitle>طلب قرض</CardTitle>
            <p className="text-sm text-white/90">املأ البيانات لطلب قرض من المنصة</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ المطلوب (نقطة)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="أدخل المبلغ"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idCard">صورة البطاقة</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Input
                    id="idCard"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setIdCardImage(e.target.files?.[0] || null)}
                    className="hidden"
                    required
                  />
                  <label htmlFor="idCard" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {idCardImage ? idCardImage.name : "اضغط لرفع صورة البطاقة"}
                    </span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-light"
                disabled={loading}
              >
                {loading ? "جاري الإرسال..." : "إرسال الطلب"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanRequest;