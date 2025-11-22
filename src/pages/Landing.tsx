import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Heart, Stethoscope, Users, ArrowLeft, Bot, Zap, Shield } from "lucide-react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

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

  const logos = [
    { name: "Supabase", src: "/logos/supabase.png", alt: "Supabase" },
    { name: "Vercel", src: "/logos/vercel.jpg", alt: "Vercel" },
    { name: "Zoho", src: "/logos/zoho.png", alt: "Zoho" },
    { name: "name.com", src: "/logos/namecom.jpeg", alt: "name.com" },
    { name: "Ministry of Health", src: "/logos/moh_egypt.png", alt: "Ministry of Health Egypt" },
  ];

  return (
    <>
      <Helmet>
        <title>كيورا - منصة الرعاية الصحية الشاملة</title>
        <meta name="description" content="منصة كيورا الطبية - استشارات طبية، حجز مواعيد مع أفضل الأطباء، وخدمات صحية متكاملة" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <motion.div 
            className="text-center space-y-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              مرحباً بك في كيورا
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              منصتك الشاملة للرعاية الصحية - استشارات طبية فورية، حجز مواعيد مع أفضل الأطباء، وخدمات صحية متكاملة
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-light text-white px-8 py-6 text-lg rounded-full shadow-strong hover:shadow-stronger transition-all"
                onClick={() => navigate("/auth")}
              >
                ابدأ الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="px-8 py-6 text-lg rounded-full"
                onClick={() => navigate("/auth")}
              >
                تسجيل الدخول
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-3xl border-0 shadow-medium hover:shadow-strong transition-shadow h-full">
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
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-3xl border-0 shadow-medium hover:shadow-strong transition-shadow h-full">
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
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-3xl border-0 shadow-medium hover:shadow-strong transition-shadow h-full">
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
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-3xl border-0 shadow-medium hover:shadow-strong transition-shadow h-full">
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
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-3xl border-0 shadow-strong bg-gradient-to-r from-primary to-primary-light text-white">
              <CardContent className="py-12">
                <div className="grid gap-8 md:grid-cols-3 text-center">
                  <motion.div
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                    <p className="text-white/90">طبيب متخصص</p>
                  </motion.div>
                  <motion.div
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                    <p className="text-white/90">مستشفى شريك</p>
                  </motion.div>
                  <motion.div
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                    <p className="text-white/90">مستخدم سعيد</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Powered by Trusted Technology Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                مدعوم بتكنولوجيا موثوقة
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نحن نستخدم أفضل التقنيات والخدمات العالمية لضمان أمان وموثوقية منصتنا
            </p>
          </motion.div>

          {/* Logos Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 p-8 md:p-12">
            <div className="flex items-center justify-center">
              <motion.div
                className="flex gap-8 md:gap-12 items-center justify-center flex-wrap"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {logos.map((logo, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center h-20 md:h-24"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-[120px] md:max-w-[150px] object-contain filter hover:drop-shadow-lg transition-all"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl -z-10"></div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl border-0 shadow-medium hover:shadow-strong transition-all h-full bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>الأمان والخصوصية</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    بيانات آمنة وموثوقة مع أعلى معايير الحماية والتشفير
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl border-0 shadow-medium hover:shadow-strong transition-all h-full bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>سرعة وكفاءة</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    أداء عالي وسرعة فائقة في جميع العمليات والخدمات
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl border-0 shadow-medium hover:shadow-strong transition-all h-full bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>دعم العملاء</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    فريق دعم متخصص متاح 24/7 لمساعدتك في أي وقت
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <motion.div 
            className="max-w-2xl mx-auto space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              ابدأ رحلتك الصحية اليوم
            </h2>
            <p className="text-lg text-muted-foreground">
              انضم إلى آلاف المستخدمين الذين يثقون في كيورا لتلبية احتياجاتهم الصحية
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary-light text-white px-12 py-6 text-lg rounded-full shadow-strong hover:shadow-stronger transition-all"
                onClick={() => navigate("/auth")}
              >
                سجل الآن مجاناً
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t mt-12">
          <motion.div 
            className="text-center text-sm text-muted-foreground space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>© 2025 كيورا. جميع الحقوق محفوظة.</p>
            <p className="text-xs">مدعوم بتكنولوجيا موثوقة من Supabase, Vercel, Zoho, name.com, ووزارة الصحة والسكان المصرية</p>
          </motion.div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
