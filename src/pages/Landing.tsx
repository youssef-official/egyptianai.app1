import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Lock, Calendar, Search, Heart, Menu } from "lucide-react";
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

  const programs = [
    {
      title: "استعادة الثقة بالنفس",
      subtitle: "برامج تطوير الذات",
      image: "🧠",
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "التعامي من الكتاب",
      subtitle: "برامج تعليمية",
      image: "📚",
      color: "from-slate-600 to-slate-800"
    },
    {
      title: "برامج الأطفال",
      subtitle: "تغيير سلوك الطفل",
      image: "👧",
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "حمية الكيتو",
      subtitle: "برامج التغذية",
      image: "🥗",
      color: "from-amber-400 to-orange-500"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "في أي وقت",
      description: "احصل على الخدمات الطبية في أي وقت يناسبك"
    },
    {
      icon: MapPin,
      title: "من أي مكان",
      description: "تواصل مع الأطباء من أي مكان في العالم"
    },
    {
      icon: Lock,
      title: "خصوصية وأمان",
      description: "بيانات آمنة وموثوقة مع أعلى معايير الحماية"
    },
    {
      icon: Calendar,
      title: "لا حاجة للمواعيد",
      description: "احصل على الاستشارة الفورية بدون انتظار"
    }
  ];

  return (
    <>
      <Helmet>
        <title>كيورا - منصة الرعاية الصحية الشاملة</title>
        <meta name="description" content="منصة كيورا الطبية - استشارات طبية، حجز مواعيد مع أفضل الأطباء، وخدمات صحية متكاملة" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-cyan-950 dark:to-blue-950">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex-1 mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث بالتخصص الطبي أو اسم..."
                  className="w-full px-4 py-3 rounded-full bg-cyan-100 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Heart className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                تمكنك كيورا من الاختيار بين الاستشارة
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                تمكنك كيورا من الاختيار بين الاستشارة الفورية خلال دقائق أو الاستشارة المتخصصة في نفس اليوم مع نخبة من الأطباء.
              </p>
            </div>

            {/* Doctors Section */}
            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-3xl p-8 md:p-12 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 flex justify-center">
                  <div className="relative w-full max-w-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20"></div>
                    <div className="relative flex items-center justify-center h-80 bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-cyan-800 dark:to-blue-800 rounded-3xl">
                      <div className="text-center">
                        <div className="text-8xl mb-4">👨‍⚕️</div>
                        <p className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">أطباء متخصصون</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      1500+
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">أطباء متخصصون</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { icon: "⏰", title: "في أي وقت", desc: "احصل على الخدمات في أي وقت" },
                      { icon: "📍", title: "من أي مكان", desc: "تواصل من أي مكان في العالم" },
                      { icon: "🔒", title: "خصوصية وأمان", desc: "بيانات آمنة وموثوقة" },
                      { icon: "📅", title: "لا حاجة للمواعيد", desc: "احصل على الاستشارة الفورية" }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/auth")}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
                  >
                    احجز استشارة فورية الآن
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Programs Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="text-5xl">💊</div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                برامج كيورا للعناية بالصحة
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                برامج العناية بالصحة في مجموعة من الجلسات الشاملة والمعدة مسبقاً للوصول لأهدافك في وقت قياسي لتحقيق أفضل نتائج وأقصى استفادة ممكنة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`relative h-64 rounded-3xl bg-gradient-to-br ${program.color} overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group`}>
                    <div className="absolute inset-0 opacity-20 bg-black"></div>
                    <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{program.image}</div>
                      <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                      <p className="text-sm opacity-90">{program.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="rounded-2xl border-0 shadow-md hover:shadow-lg transition-all h-full bg-white dark:bg-slate-900">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-sm md:text-base text-gray-900 dark:text-white">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-xs md:text-sm text-center text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="rounded-3xl border-0 shadow-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 text-white overflow-hidden">
              <CardContent className="py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <motion.div
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-bold mb-2">1500+</div>
                    <p className="text-white/90 text-lg">طبيب متخصص</p>
                  </motion.div>
                  <motion.div
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
                    <p className="text-white/90 text-lg">برنامج صحي</p>
                  </motion.div>
                  <motion.div
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
                    <p className="text-white/90 text-lg">مستخدم سعيد</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Powered by Trusted Technology */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                مدعوم بتكنولوجيا موثوقة
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                نستخدم أفضل التقنيات العالمية لضمان أمان وموثوقية منصتنا
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-800">
              <motion.div
                className="flex gap-8 items-center justify-center flex-wrap"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {logos.map((logo, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center h-20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-[120px] object-contain filter hover:drop-shadow-lg transition-all"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-12 text-white shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ابدأ رحلتك الصحية اليوم
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                انضم إلى آلاف المستخدمين الذين يثقون في كيورا لتلبية احتياجاتهم الصحية
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/auth")}
                className="bg-white text-cyan-600 font-bold py-4 px-12 rounded-full hover:bg-gray-100 transition-all text-lg shadow-lg"
              >
                سجل الآن مجاناً
              </motion.button>
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 py-12">
            <motion.div
              className="text-center text-gray-600 dark:text-gray-400 space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="font-semibold">© 2025 كيورا. جميع الحقوق محفوظة.</p>
              <p className="text-sm">
                شركة الرعاية الشافية الطبية (كيورا) مرخصة من قبل وزارة الصحة السعودية وتحمل الترخيص رقم 1400005491
              </p>
              <p className="text-sm">مدعوم بتكنولوجيا موثوقة من Supabase, Vercel, Zoho, name.com, ووزارة الصحة والسكان المصرية</p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
