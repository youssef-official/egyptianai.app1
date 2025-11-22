import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search } from "lucide-react";

export const PatientSearchSection = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [patientData, setPatientData] = useState<any>(null);

  const searchPatient = async () => {
    if (!searchEmail.trim()) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return;
    }

    setSearching(true);
    try {
      const trimmed = searchEmail.trim();
      // يمكن البحث إما بالبريد الإلكتروني أو بمعرّف المستخدم
      const isEmail = trimmed.includes("@");

      // البحث عن المريض
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq(isEmail ? "email" : "id", trimmed)
        .maybeSingle();

      if (profileError) throw profileError;
      if (!profile) {
        toast.error("لم يتم العثور على المريض عن طريق البيانات المدخلة");
        setPatientData(null);
        return;
      }

      // جلب البيانات الطبية
      const { data: medicalInfo } = await supabase
        .from("medical_info")
        .select("*")
        .eq("user_id", profile.id)
        .maybeSingle();

      // جلب الحجوزات
      const { data: bookings } = await supabase
        .from("hospital_bookings")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false });

      // جلب التقارير الطبية
      const { data: reports } = await supabase
        .from("medical_reports")
        .select(`
          *,
          hospital_doctors(doctor_name, specialization),
          hospitals(name)
        `)
        .eq("patient_id", profile.id)
        .order("created_at", { ascending: false });

      // جلب المعاملات
      const { data: wallet } = await supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", profile.id)
        .maybeSingle();

      const { data: transactions } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false })
        .limit(10);

      setPatientData({
        profile,
        medicalInfo,
        bookings: bookings || [],
        reports: reports || [],
        wallet: wallet?.balance || 0,
        transactions: transactions || [],
      });

      toast.success("تم العثور على بيانات المريض");
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء البحث");
      setPatientData(null);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>البحث عن بيانات المريض</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="search-email">البريد الإلكتروني</Label>
              <Input
                id="search-email"
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="أدخل البريد الإلكتروني"
                className="text-right"
              />
            </div>
            <Button
              onClick={searchPatient}
              disabled={searching}
              className="mt-auto"
            >
              <Search className="h-4 w-4 ml-2" />
              {searching ? "جاري البحث..." : "بحث"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {patientData && (
        <div className="space-y-4">
          {/* معلومات الملف الشخصي */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات المريض</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>الاسم:</strong> {patientData.profile.full_name}</p>
              <p><strong>الهاتف:</strong> {patientData.profile.phone}</p>
              <p><strong>البريد:</strong> {patientData.profile.email}</p>
              <p><strong>رصيد المحفظة:</strong> {patientData.wallet} جنيه</p>
            </CardContent>
          </Card>

          {/* البيانات الطبية */}
          {patientData.medicalInfo && (
            <Card>
              <CardHeader>
                <CardTitle>البيانات الطبية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>العمر:</strong> {patientData.medicalInfo.age} سنة</p>
                <p><strong>الجنس:</strong> {patientData.medicalInfo.gender === "male" ? "ذكر" : "أنثى"}</p>
                <p><strong>أمراض مزمنة:</strong> {patientData.medicalInfo.chronic_diseases || "لا يوجد"}</p>
                <p><strong>أمراض القلب:</strong> {patientData.medicalInfo.heart_disease ? "نعم" : "لا"}</p>
                {patientData.medicalInfo.other_conditions && (
                  <p><strong>حالات أخرى:</strong> {patientData.medicalInfo.other_conditions}</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* التقارير الطبية */}
          {patientData.reports.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>التقارير الطبية ({patientData.reports.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientData.reports.map((report: any) => (
                    <div key={report.id} className="p-4 border rounded-lg space-y-2">
                      <p><strong>المستشفى:</strong> {report.hospitals?.name}</p>
                      <p><strong>الدكتور:</strong> {report.hospital_doctors?.doctor_name}</p>
                      <p><strong>التخصص:</strong> {report.hospital_doctors?.specialization}</p>
                      <p><strong>التشخيص:</strong> {report.diagnosis || "-"}</p>
                      <p><strong>العلاج:</strong> {report.treatment || "-"}</p>
                      <p><strong>التقرير:</strong> {report.report_content}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(report.created_at).toLocaleDateString("ar-EG")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* الحجوزات */}
          {patientData.bookings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>سجل الحجوزات ({patientData.bookings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patientData.bookings.map((booking: any) => (
                    <div key={booking.id} className="flex justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{booking.doctor_name}</p>
                        <p className="text-sm text-muted-foreground">{booking.specialization}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(booking.created_at).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                      <p className="font-bold">{booking.price} جنيه</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* المعاملات */}
          {patientData.transactions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>آخر المعاملات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patientData.transactions.map((tx: any) => (
                    <div key={tx.id} className="flex justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tx.created_at).toLocaleDateString("ar-EG")}
                        </p>
                      </div>
                      <p className="font-bold">{tx.amount} جنيه</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
