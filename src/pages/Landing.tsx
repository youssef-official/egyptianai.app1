import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Heart, Stethoscope, Users, ArrowLeft, Bot } from "lucide-react";
import { Helmet } from "react-helmet";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // User is logged in, redirect to dashboard
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Helmet>
        <title>كيورا - منصة الرعاية الصحية الشاملة</title>
        <meta name="description" content="منصة كيورا الطبية - استشارات طبية، حجز مواعيد مع أفضل الأطباء، وخدمات صحية متكاملة" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              مرحباً بك في كيورا
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              منصتك الشاملة للرعاية الصحية - استشارات طبية فورية، حجز مواعيد مع أفضل الأطباء، وخدمات صحية متكاملة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-light text-white px-8 py-6 text-lg rounded-full shadow-strong hover:shadow-stronger transition-all"
                onClick={() => navigate("/auth")}
              >
                ابدأ الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-lg rounded-full"
                onClick={() => navigate("/auth")}
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-3xl border-0 shadow-medium hover:shadow-strong transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">استشارات طبية</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  احصل على استشارة طبية فورية من أطباء متخصصين
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-medium hover:shadow-strong transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">حجز المستشفيات</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  احجز موعدك في أفضل المستشفيات بسهولة وسرعة
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-medium hover:shadow-strong transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">مساعد ذكي</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  احصل على إجابات فورية لاستفساراتك الطبية من الذكاء الاصطناعي
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-medium hover:shadow-strong transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">رعاية شاملة</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  متابعة صحتك وسجلاتك الطبية في مكان واحد
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <Card className="rounded-3xl border-0 shadow-strong bg-gradient-to-r from-primary to-primary-light text-white">
            <CardContent className="py-12">
              <div className="grid gap-8 md:grid-cols-3 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                  <p className="text-white/90">طبيب متخصص</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                  <p className="text-white/90">مستشفى شريك</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                  <p className="text-white/90">مستخدم سعيد</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              ابدأ رحلتك الصحية اليوم
            </h2>
            <p className="text-lg text-muted-foreground">
              انضم إلى آلاف المستخدمين الذين يثقون في كيورا لتلبية احتياجاتهم الصحية
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-light text-white px-12 py-6 text-lg rounded-full shadow-strong hover:shadow-stronger transition-all"
              onClick={() => navigate("/auth")}
            >
              سجل الآن مجاناً
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t mt-12">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 كيورا. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
