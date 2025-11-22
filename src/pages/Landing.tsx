import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Heart, Stethoscope, Users, ArrowLeft, Bot, Zap, Shield, CheckCircle2, MessageSquare, Calendar, Pill } from "lucide-react";
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

  const features = [
    {
      icon: Stethoscope,
      title: "استشارات طبية فورية",
      description: "احصل على استشارة من أطباء متخصصين في دقائق",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Calendar,
      title: "حجز المواعيد",
      description: "احجز مواعيدك مع أفضل الأطباء بسهولة",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Pill,
      title: "إدارة الأدوية",
      description: "تابع أدويتك والتزاماتك الطبية",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Heart,
      title: "مراقبة الصحة",
      description: "راقب صحتك وسجلاتك الطبية",
      color: "from-red-500 to-red-600"
    },
    {
      icon: MessageSquare,
      title: "التشاور مع الخبراء",
      description: "تواصل مباشر مع متخصصي الرعاية الصحية",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Zap,
      title: "خدمات سريعة",
      description: "احصل على الخدمات الطبية بسرعة فائقة",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <Helmet>
        <title>كيورا - منصة الرعاية الصحية الشاملة</title>
        <meta name="description" content="منصة كيورا الطبية - استشارات طبية، حجز مواعيد مع أفضل الأطباء، وخدمات صحية متكاملة" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <motion.div
              className="flex justify-center lg:justify-start order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-3xl p-8 shadow-2xl">
                  <div className="aspect-square bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 rounded-2xl flex items-center justify-center overflow-hidden">
                    <div className="text-center">
                      <Stethoscope className="w-32 h-32 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">أطباء متخصصون</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">+500</div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">طبيب متخصص</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">Internal Medicine</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">Consultant</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">4.8/5</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              className="space-y-8 order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-4">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  مرحباً بعودتك
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  نرجو إدخال بيانات حسابك كيورا الخاصة بك، إذا لم تتذكر حسابك؟ قم بإعادة تعيين كلمة المرور
                </motion.p>
              </div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    البريد الإلكتروني أو اسم المستخدم
                  </label>
                  <input
                    type="text"
                    placeholder="أدخل البريد الإلكتروني أو اسم المستخدم"
                    className="w-full px-6 py-3 rounded-2xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    placeholder="كلمة المرور"
                    className="w-full px-6 py-3 rounded-2xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="text-right">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                    نسيت كلمة المرور؟
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => navigate("/auth")}
                >
                  تسجيل دخول
                </Button>

                <p className="text-center text-gray-600 dark:text-gray-400">
                  لا يوجد لديك حساب؟{" "}
                  <button
                    onClick={() => navigate("/auth")}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                  >
                    تسجيل حساب
                  </button>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                المميزات الرئيسية
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              استمتع بمجموعة شاملة من الخدمات الصحية المتقدمة
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all h-full bg-white dark:bg-slate-900 overflow-hidden group">
                    <div className={`h-1 bg-gradient-to-r ${feature.color}`}></div>
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-3xl border-0 shadow-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>
              <CardContent className="py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <motion.div
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-5xl md:text-6xl font-bold mb-2">500+</div>
                    <p className="text-white/90 text-lg">طبيب متخصص</p>
                  </motion.div>
                  <motion.div
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-5xl md:text-6xl font-bold mb-2">50+</div>
                    <p className="text-white/90 text-lg">مستشفى شريك</p>
                  </motion.div>
                  <motion.div
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-5xl md:text-6xl font-bold mb-2">10K+</div>
                    <p className="text-white/90 text-lg">مستخدم سعيد</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Powered by Trusted Technology Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                مدعوم بتكنولوجيا موثوقة
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              نستخدم أفضل التقنيات والخدمات العالمية لضمان أمان وموثوقية منصتنا
            </p>
          </motion.div>

          {/* Logos Carousel */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950 border border-blue-100 dark:border-blue-900 p-12 shadow-xl">
            <motion.div
              className="flex gap-12 items-center justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {logos.map((logo, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center h-24 md:h-28"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-full max-w-[140px] md:max-w-[180px] object-contain filter hover:drop-shadow-2xl transition-all"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-indigo-400/20 to-transparent rounded-full blur-3xl -z-10"></div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">الأمان والخصوصية</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 dark:text-gray-300">
                    بيانات آمنة وموثوقة مع أعلى معايير الحماية والتشفير
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all h-full bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">سرعة وكفاءة</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 dark:text-gray-300">
                    أداء عالي وسرعة فائقة في جميع العمليات والخدمات
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all h-full bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">دعم العملاء</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 dark:text-gray-300">
                    فريق دعم متخصص متاح 24/7 لمساعدتك في أي وقت
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div
            className="max-w-2xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ابدأ رحلتك الصحية اليوم
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                انضم إلى آلاف المستخدمين الذين يثقون في كيورا لتلبية احتياجاتهم الصحية
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-lg rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate("/auth")}
              >
                سجل الآن مجاناً
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 border-t border-gray-200 dark:border-gray-800">
          <motion.div
            className="text-center text-gray-600 dark:text-gray-400 space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="font-semibold">© 2025 كيورا. جميع الحقوق محفوظة.</p>
            <p className="text-sm">مدعوم بتكنولوجيا موثوقة من Supabase, Vercel, Zoho, name.com, ووزارة الصحة والسكان المصرية</p>
          </motion.div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
