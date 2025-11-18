import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const MedicalInfo = () => {
  const [chronicDiseases, setChronicDiseases] = useState("");
  const [heartDisease, setHeartDisease] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [otherConditions, setOtherConditions] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    checkExistingInfo();
  }, []);

  const checkExistingInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data } = await supabase
      .from('medical_info')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('medical_info').insert({
        user_id: user.id,
        chronic_diseases: chronicDiseases,
        heart_disease: heartDisease,
        age: parseInt(age),
        gender,
        other_conditions: otherConditions
      });

      if (error) throw error;

      toast({ title: "تم الحفظ", description: "تم حفظ بياناتك الطبية بنجاح" });
      navigate('/');
    } catch (error: any) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-strong rounded-3xl border-0">
        <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-white rounded-t-3xl">
          <CardTitle className="text-center">البيانات الطبية</CardTitle>
          <p className="text-center text-sm text-white/90">يرجى إكمال بياناتك الطبية لاستكمال التسجيل</p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="age">العمر</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="أدخل عمرك"
                required
                min="1"
                max="150"
              />
            </div>

            <div className="space-y-2">
              <Label>الجنس</Label>
              <RadioGroup value={gender} onValueChange={setGender} required>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">ذكر</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">أنثى</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chronic">الأمراض المزمنة</Label>
              <Textarea
                id="chronic"
                value={chronicDiseases}
                onChange={(e) => setChronicDiseases(e.target.value)}
                placeholder="مثل: السكري، الضغط، إلخ..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="heart"
                checked={heartDisease}
                onCheckedChange={(checked) => setHeartDisease(checked as boolean)}
              />
              <Label htmlFor="heart">هل تعاني من أمراض القلب؟</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="other">حالات طبية أخرى</Label>
              <Textarea
                id="other"
                value={otherConditions}
                onChange={(e) => setOtherConditions(e.target.value)}
                placeholder="أي معلومات طبية أخرى مهمة..."
                className="min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-light"
              disabled={loading}
            >
              {loading ? "جاري الحفظ..." : "حفظ ومتابعة"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalInfo;