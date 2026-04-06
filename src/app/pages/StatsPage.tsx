import { Users, BookOpen, FileText, Award, Database } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function StatsPage() {
  const { t } = useLanguage();

  // Empty data arrays for production-ready state
  const userGrowthData: any[] = [];
  const enrollmentData: any[] = [];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-black">{t("stats.title")}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-[#4139c1]" />
            <p className="text-gray-600 font-medium italic">{t("stats.totalUsers")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-6 h-6 text-[#109cf1]" />
            <p className="text-gray-600 font-medium italic">{t("stats.totalCourses")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-6 h-6 text-[#2ed47a]" />
            <p className="text-gray-600 font-medium italic">{t("stats.totalEnrollments")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-6 h-6 text-[#ffb946]" />
            <p className="text-gray-600 font-medium italic">{t("stats.certificatesIssued")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-5 gap-6">
        {/* User Growth Chart */}
        <div className="col-span-3 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#192a3e] text-lg font-medium">{t("stats.userGrowth")}</h3>
            <button className="text-xs text-[#6a707e] px-3 py-1 border border-gray-300 rounded">
              {t("stats.monthly")}
            </button>
          </div>

          {userGrowthData.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No user growth data available</p>
                <p className="text-gray-400 text-xs mt-1">Data will appear here once users start joining</p>
              </div>
            </div>
          ) : (
            <>
              <div className="h-80 relative">
                <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="60" x2="600" y2="60" stroke="#f0f0f0" strokeWidth="1" />
                  <line x1="0" y1="120" x2="600" y2="120" stroke="#f0f0f0" strokeWidth="1" />
                  <line x1="0" y1="180" x2="600" y2="180" stroke="#f0f0f0" strokeWidth="1" />
                  <line x1="0" y1="240" x2="600" y2="240" stroke="#f0f0f0" strokeWidth="1" />

                  {/* Y-axis labels */}
                  <text x="10" y="55" fontSize="12" fill="#999">120</text>
                  <text x="10" y="115" fontSize="12" fill="#999">90</text>
                  <text x="10" y="175" fontSize="12" fill="#999">60</text>
                  <text x="10" y="235" fontSize="12" fill="#999">30</text>
                  <text x="10" y="295" fontSize="12" fill="#999">0k</text>

                  {/* Area fill */}
                  <path
                    d="M 50,200 L 150,180 L 250,150 L 350,170 L 450,140 L 550,100 L 550,300 L 50,300 Z"
                    fill="#e8eaf6"
                    opacity="0.5"
                  />

                  {/* Line */}
                  <polyline
                    fill="none"
                    stroke="#4139c1"
                    strokeWidth="3"
                    points="50,200 150,180 250,150 350,170 450,140 550,100"
                  />

                  {/* Data points */}
                  {[
                    { x: 50, y: 200 },
                    { x: 150, y: 180 },
                    { x: 250, y: 150 },
                    { x: 350, y: 170 },
                    { x: 450, y: 140 },
                    { x: 550, y: 100 },
                  ].map((point, i) => (
                    <circle key={i} cx={point.x} cy={point.y} r="5" fill="#4139c1" />
                  ))}
                </svg>

                {/* Month labels */}
                <div className="flex justify-between text-xs text-gray-400 mt-2 px-12">
                  <span>JAN</span>
                  <span>FEB</span>
                  <span>MAR</span>
                  <span>APR</span>
                  <span>MAY</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-3 h-3 bg-[#4139c1] rounded-full"></div>
                <span className="text-sm text-gray-600">2026</span>
              </div>
            </>
          )}
        </div>

        {/* Enrollments Overview */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[#192a3e] text-lg font-medium mb-6">{t("stats.enrollmentsOverview")}</h3>

          {enrollmentData.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No enrollment data available</p>
                <p className="text-gray-400 text-xs mt-1">Data will appear here once courses are enrolled</p>
              </div>
            </div>
          ) : (
            <div className="h-80 flex items-end justify-around gap-4 px-4">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-[#4139c1] rounded-t" style={{ height: "50%" }}></div>
                <span className="text-xs text-gray-600">Web Development</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-[#4139c1] rounded-t" style={{ height: "52%" }}></div>
                <span className="text-xs text-gray-600">DataScience</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-[#4139c1] rounded-t" style={{ height: "75%" }}></div>
                <span className="text-xs text-gray-600">JavaScript</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-[#4139c1] rounded-t" style={{ height: "90%" }}></div>
                <span className="text-xs text-gray-600">UI Design</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full bg-[#4139c1] rounded-t" style={{ height: "100%" }}></div>
                <span className="text-xs text-gray-600">C++ POO</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}