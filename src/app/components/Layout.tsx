import { Link, Outlet, useLocation, useNavigate } from "react-router";
import imgLogo from "@figma-asset/792adab817ee7ba14e45d6a8da126e2958f4db41.png";
import imgAvatar from "@figma-asset/6d6700e203106918d5f147a22b373be827c13d64.png";
import imgImage2 from "@figma-asset/2e8cd3ef01279397febcab007ecb306ec25b68ed.png";
import imgImage3 from "@figma-asset/83647b722c698007e4460b8ac26b85739816a2b7.png";
import imgImage13 from "@figma-asset/31274377bfb8efb31bae7963509b046a20e05926.png";
import imgImage6 from "@figma-asset/476b5ec1da0d0bba78adf37e439d7b157dfd9d81.png";
import imgImage8 from "@figma-asset/7ecdccb0a2188cab4c9743e49efef333a6c8b03b.png";
import imgImage9 from "@figma-asset/8adaba627767319e584ba39e1eb858e391f570e3.png";
import imgImage10 from "@figma-asset/c3956271d3d4fd2b8ec1d3a2088988c84fe2fcec.png";
import imgImage11 from "@figma-asset/c2c3bb9d59824752ed0ef5b2d723ad1bb10afde8.png";
import imgImage12 from "@figma-asset/8844c20e641128a24d6d01de5923e85427f7b99b.png";
import imgImage1 from "@figma-asset/8dc92eff357205cb31585c8277aeec70ca29377c.png";
import { Bell, ChevronDown, LogOut, Settings, User, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Toaster } from "./ui/sonner";
import { useLanguage } from "../contexts/LanguageContext";
import { useNotifications } from "../contexts/NotificationContext";
import { toast } from "sonner";

const navItems = [
  { path: "/", labelKey: "nav.dashboard", icon: imgImage2 },
  { path: "/users", labelKey: "nav.users", icon: imgImage3 },
  { path: "/courses", labelKey: "nav.courses", icon: imgImage13 },
  { path: "/enrollments", labelKey: "nav.enrollments", icon: imgImage6 },
  { path: "/exams", labelKey: "nav.exams", icon: imgImage8 },
  { path: "/job-offers", labelKey: "nav.jobOffers", icon: imgImage9 },
  { path: "/certificates", labelKey: "nav.certificates", icon: imgImage10 },
  { path: "/payments", labelKey: "nav.payments", icon: imgImage11 },
  { path: "/statistics", labelKey: "nav.statistics", icon: imgImage12 },
  { path: "/settings", labelKey: "nav.settings", icon: imgImage1 },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#f7f8fc]">
      <Toaster position="top-right" richColors />
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#4139c1] text-white rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:static inset-y-0 left-0 z-40 w-[250px] bg-[#4139c1] flex flex-col shadow-lg transition-transform duration-300
      `}>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 mt-12 lg:mt-0">
          <img src={imgLogo} alt="Formanova" className="w-10 h-10" />
          <h1 className="text-white text-2xl font-semibold">Formanova</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
                  isActive
                    ? "bg-[#4f4fde] text-white shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <img src={item.icon} alt="" className="w-6 h-6 opacity-90" />
                <span className="text-base font-medium">{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <p className="text-white/50 text-xs text-center">© 2026 Formanova</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm h-[80px] flex items-center justify-between px-4 lg:px-8">
          <div className="flex-1 lg:block hidden" />
          
          {/* Mobile Title */}
          <div className="lg:hidden flex-1 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Formanova</h2>
          </div>
          
          {/* Right side - notifications, user menu, settings */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>{t("notifications.title")}</span>
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                    className="text-xs text-[#4139c1] font-normal cursor-pointer hover:underline"
                  >
                    {t("notifications.markAllRead")}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 px-4">
                      <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No notifications</p>
                      <p className="text-gray-400 text-xs mt-1">You're all caught up!</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <DropdownMenuItem 
                        key={notif.id} 
                        onClick={() => markAsRead(notif.id)}
                        className="flex flex-col items-start p-3 cursor-pointer"
                      >
                        <div className="flex items-start gap-2 w-full">
                          {notif.unread && (
                            <div className="w-2 h-2 bg-[#4139c1] rounded-full mt-1.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${notif.unread ? 'font-semibold' : 'font-medium'} text-gray-900`}>
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-[#4139c1] font-medium cursor-pointer">
                  {t("notifications.viewAll")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 lg:gap-3 px-2 lg:px-4 py-2 border-2 border-[#4139c1] rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-semibold text-gray-700 hidden lg:block">User@gmail.com</span>
                  <img src={imgAvatar} alt="User" className="w-8 h-8 rounded-full" />
                  <ChevronDown className="w-4 h-4 text-gray-600 hidden lg:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}