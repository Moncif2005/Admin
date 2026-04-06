import { Search, ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();

  const handleSave = () => {
    toast.success(t("common.success"));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-black">{t("settings.title")}</h1>
        <div className="w-96 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t("settings.searchPlaceholder")}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4139c1]"
          />
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold mb-8">{t("settings.general")}</h2>

        <div className="grid grid-cols-2 gap-x-12 gap-y-8">
          {/* System Language */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.systemLanguage")}</label>
            <div className="relative">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#4139c1]"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
                <option value="ar">العربية</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* User Sign up */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.userSignUp")}</label>
            <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg">
              <span className="text-gray-600">{t("settings.allowSignUp")}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#4139c1] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4139c1]"></div>
              </label>
            </div>
          </div>

          {/* Admin Dashboard Theme */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.adminTheme")}</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#4139c1]">
                <option>{t("settings.lightTheme")}</option>
                <option>{t("settings.darkTheme")}</option>
                <option>{t("settings.autoTheme")}</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Default Theme for Users */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.defaultUserTheme")}</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#4139c1]">
                <option>{t("settings.lightTheme")}</option>
                <option>{t("settings.darkTheme")}</option>
                <option>{t("settings.autoTheme")}</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Time Zone */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.timeZone")}</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#4139c1]">
                <option>CET - Central European Time</option>
                <option>EST - Eastern Standard Time</option>
                <option>PST - Pacific Standard Time</option>
                <option>GMT - Greenwich Mean Time</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Date and Time Format */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.dateTimeFormat")}</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#4139c1]">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY/MM/DD</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.currency")}</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#4139c1]">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Notifications */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.notifications")}</label>
            <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg">
              <span className="text-gray-600">{t("settings.allowNotifications")}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#4139c1] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4139c1]"></div>
              </label>
            </div>
          </div>

          {/* System Update Frequency */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.systemUpdateFreq")}</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#4139c1]">
                <option>{t("settings.monthly")}</option>
                <option>{t("settings.weekly")}</option>
                <option>{t("settings.daily")}</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Security Checks Frequency */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">{t("settings.securityChecksFreq")}</label>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-[#4139c1]">
                <option>{t("settings.weekly")}</option>
                <option>{t("settings.daily")}</option>
                <option>{t("settings.monthly")}</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-10 flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-[#4139c1] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3530a8] transition-colors"
          >
            {t("settings.saveChanges")}
          </button>
        </div>
      </div>
    </div>
  );
}
