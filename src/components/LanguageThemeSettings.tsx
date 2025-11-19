import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { applyDirection } from "@/i18n";
import { toast } from "sonner";
import { Globe, Palette } from "lucide-react";

export const LanguageThemeSettings = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    applyDirection(lang as any);
    localStorage.setItem("lang", lang);
    setCurrentLang(lang);
    toast.success("تم تغيير اللغة بنجاح");
    window.location.reload();
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    toast.success("تم تغيير المظهر بنجاح");
  };

  return (
    <div className="space-y-4">
      <Card className="rounded-3xl border-0 shadow-medium">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-t-3xl">
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="w-5 h-5" />
            اللغة
          </CardTitle>
          <CardDescription>اختر اللغة المفضلة للتطبيق</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label>اللغة</Label>
            <Select value={currentLang} onValueChange={handleLanguageChange}>
              <SelectTrigger className="text-right">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 shadow-medium">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-t-3xl">
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="w-5 h-5" />
            المظهر
          </CardTitle>
          <CardDescription>اختر المظهر المفضل للتطبيق</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label>المظهر</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="text-right">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">فاتح</SelectItem>
                <SelectItem value="dark">داكن</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
