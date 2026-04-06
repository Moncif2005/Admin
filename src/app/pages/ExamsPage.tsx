import { Search, ChevronDown, Eye, Trash2, Calendar, Clock, Award, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const exams: any[] = [];

export default function ExamsPage() {
  const { t } = useLanguage();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-black">{t("exams.title")}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-6 h-6 text-[#4139c1]" />
            <p className="text-gray-600 font-medium italic">{t("exams.totalExams")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-[#ff6b6b]" />
            <p className="text-gray-600 font-medium italic">{t("exams.upcomingExams")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-6 h-6 text-[#9b59b6]" />
            <p className="text-gray-600 font-medium italic">{t("exams.activeExams")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-6 h-6 text-[#2ed47a]" />
            <p className="text-gray-600 font-medium italic">{t("exams.passedExams")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t("exams.searchPlaceholder")}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4139c1]"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          {t("exams.sortByType")} <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Exams Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">ID</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">{t("exams.examTitle")}</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">{t("exams.course")}</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">{t("exams.dueDate")}</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">{t("exams.totalQuestions")}</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">{t("exams.attempts")}</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">{t("exams.passRate")}</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">{t("common.status")}</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">{t("common.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{exam.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{exam.title}</td>
                <td className="px-6 py-4 text-gray-700">{exam.course}</td>
                <td className="px-6 py-4 text-gray-700">{exam.dueDate}</td>
                <td className="px-6 py-4 text-gray-700 text-center">{exam.totalQuestions}</td>
                <td className="px-6 py-4 text-gray-700 text-center">{exam.attempts}</td>
                <td className="px-6 py-4 text-gray-700 font-semibold">{exam.passRate}</td>
                <td className="px-6 py-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    exam.status === "Completed" 
                      ? "bg-green-100 text-green-700" 
                      : exam.status === "Upcoming"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {exam.status === "Completed" ? t("common.completed") : exam.status === "Upcoming" ? t("exams.upcoming") : t("exams.active")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title={t("common.view")}>
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title={t("common.delete")}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {t("pagination.showing")} 1 {t("pagination.to")} 5 {t("pagination.of")} 10 {t("pagination.entries")}
          </div>
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">&lt;</button>
            <button className="px-3 py-1 bg-[#4139c1] text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">4</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}