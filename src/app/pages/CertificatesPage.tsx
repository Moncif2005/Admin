import { Search, ChevronDown, Eye, Trash2, Download, Award, FileCheck, ShieldCheck, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import imgImage21 from "@figma-asset/153d4b2c52af2254769423a78c9ecc5e79d28de1.png";
import imgImage4 from "@figma-asset/49af7ed80aa049895bd35e4bcc8dc71552b05961.png";
import imgImage5 from "@figma-asset/9b46a0752173e05475b2c009b52a0141dc8f8a46.png";
import imgImage7 from "@figma-asset/d127b57e902a03afbeb9481feb0bd8cdb7b318d2.png";
import imgImage14 from "@figma-asset/7b261b81411f53cfa0ea3a728aa573ec337b0427.png";

const certificates: any[] = [];

export default function CertificatesPage() {
  const { t } = useLanguage();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-black">{t("certificates.title")}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-6 h-6 text-[#4139c1]" />
            <p className="text-gray-600 font-medium italic">{t("certificates.totalCertificates")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="w-6 h-6 text-[#2ed47a]" />
            <p className="text-gray-600 font-medium italic">{t("certificates.issued")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-6 h-6 text-[#FFB946]" />
            <p className="text-gray-600 font-medium italic">{t("certificates.pending")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-6 h-6 text-[#109cf1]" />
            <p className="text-gray-600 font-medium italic">{t("certificates.verified")}</p>
          </div>
          <p className="text-5xl font-semibold">0</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t("certificates.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4139c1] focus:border-transparent"
              />
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-700">{t("certificates.filterByStatus")}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">{t("certificates.student")}</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">{t("certificates.course")}</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">{t("certificates.issueDate")}</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">{t("certificates.verificationCode")}</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">{t("certificates.status")}</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">{t("certificates.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {certificates.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">{t("certificates.noCertificates")}</p>
                  <p className="text-gray-400 text-xs mt-1">{t("certificates.noCertificatesDesc")}</p>
                </td>
              </tr>
            ) : (
              certificates.map((cert) => (
                <tr key={cert.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={cert.avatar} alt={cert.name} className="w-10 h-10 rounded-full object-cover" />
                      <span className="font-medium text-gray-900">{cert.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{cert.course}</td>
                  <td className="py-4 px-6 text-gray-700">{cert.issueDate}</td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm text-gray-600">{cert.verificationCode}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      cert.status === "Issued" 
                        ? "bg-green-100 text-green-700" 
                        : cert.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
