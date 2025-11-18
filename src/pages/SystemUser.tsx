import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Hospital, User } from "lucide-react";

const SystemUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (roles) {
        setIsAuthenticated(true);
        loadReports();
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roles) {
        await supabase.auth.signOut();
        throw new Error('ليس لديك صلاحيات الوصول');
      }

      setIsAuthenticated(true);
      loadReports();
      toast({ title: "تم تسجيل الدخول", description: "مرحباً بك في لوحة التقارير الطبية" });
    } catch (error: any) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const loadReports = async () => {
    const { data } = await supabase
      .from('medical_reports')
      .select(`
        *,
        profiles:patient_id(full_name, email),
        hospital_doctors(doctor_name, specialization),
        hospitals(name)
      `)
      .order('created_at', { ascending: false });

    setReports(data || []);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-strong rounded-3xl border-0">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-white rounded-t-3xl">
            <CardTitle className="text-center">نظام التقارير الطبية</CardTitle>
            <p className="text-center text-sm text-white/90">تسجيل دخول المشرفين فقط</p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-light"
                disabled={loading}
              >
                {loading ? "جاري التحقق..." : "تسجيل الدخول"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 p-4">
      <div className="container mx-auto max-w-6xl">
        <Card className="shadow-strong rounded-3xl border-0 mb-6">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-white rounded-t-3xl">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6" />
              التقارير الطبية
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {reports.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">لا توجد تقارير حتى الآن</p>
              ) : (
                reports.map((report) => (
                  <Card key={report.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-semibold">{report.profiles?.full_name}</span>
                            <Badge variant="secondary">{report.profiles?.email}</Badge>
                          </div>
                          <Badge>{new Date(report.created_at).toLocaleDateString('ar-EG')}</Badge>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Hospital className="w-4 h-4" />
                          <span>{report.hospitals?.name}</span>
                          <span>•</span>
                          <span>د. {report.hospital_doctors?.doctor_name}</span>
                          <Badge variant="outline">{report.hospital_doctors?.specialization}</Badge>
                        </div>

                        <div className="bg-secondary p-4 rounded-lg">
                          <p className="font-semibold mb-2">التقرير:</p>
                          <p className="whitespace-pre-wrap">{report.report_content}</p>
                          
                          {report.diagnosis && (
                            <div className="mt-3">
                              <p className="font-semibold">التشخيص:</p>
                              <p>{report.diagnosis}</p>
                            </div>
                          )}
                          
                          {report.treatment && (
                            <div className="mt-3">
                              <p className="font-semibold">العلاج:</p>
                              <p>{report.treatment}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemUser;