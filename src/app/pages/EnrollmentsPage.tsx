import { Search, ChevronDown, Eye, Trash2, CheckCircle2, FileCheck, Filter, Download, Calendar, TrendingUp } from "lucide-react";
import imgImage21 from "@figma-asset/153d4b2c52af2254769423a78c9ecc5e79d28de1.png";
import imgImage4 from "@figma-asset/49af7ed80aa049895bd35e4bcc8dc71552b05961.png";
import imgImage5 from "@figma-asset/9b46a0752173e05475b2c009b52a0141dc8f8a46.png";
import imgImage7 from "@figma-asset/d127b57e902a03afbeb9481feb0bd8cdb7b318d2.png";
import imgImage14 from "@figma-asset/7b261b81411f53cfa0ea3a728aa573ec337b0427.png";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Progress } from "../components/ui/progress";
import { motion } from "motion/react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog";
import { useLanguage } from "../contexts/LanguageContext";

const initialEnrollments: any[] = [];

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewingEnrollment, setViewingEnrollment] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [enrollmentToDelete, setEnrollmentToDelete] = useState<number | null>(null);
  const { t } = useLanguage();

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch = enrollment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         enrollment.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || enrollment.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalEnrollments = enrollments.length;
  const completedEnrollments = enrollments.filter(e => e.status === "Completed").length;
  const activeEnrollments = enrollments.filter(e => e.status === "Active").length;
  const totalRevenue = enrollments.filter(e => e.payment === "Paid").length * 49.99; // Assuming average price

  const openViewDialog = (enrollment: any) => {
    setViewingEnrollment(enrollment);
    setIsViewDialogOpen(true);
  };

  const handleDeleteEnrollment = (enrollmentId: number) => {
    setEnrollments(enrollments.filter(e => e.id !== enrollmentId));
    setEnrollmentToDelete(null);
    toast.success("Enrollment deleted successfully!");
  };

  const handleExport = () => {
    toast.success("Exporting enrollments data...");
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-black">Enrollments Management</h1>
        <p className="text-gray-600 mt-1">Track and manage student enrollments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <FileCheck className="w-8 h-8 opacity-80" />
            <span className="text-sm bg-white/20 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-sm opacity-90 mb-1">Total Enrollments</p>
          <p className="text-4xl font-semibold">{totalEnrollments}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 opacity-80" />
            <span className="text-sm bg-white/20 px-2 py-1 rounded">80%</span>
          </div>
          <p className="text-sm opacity-90 mb-1">Completed</p>
          <p className="text-4xl font-semibold">{completedEnrollments}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-sm bg-white/20 px-2 py-1 rounded">Active</span>
          </div>
          <p className="text-sm opacity-90 mb-1">In Progress</p>
          <p className="text-4xl font-semibold">{activeEnrollments}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl">$</span>
            <span className="text-sm bg-white/20 px-2 py-1 rounded">+8%</span>
          </div>
          <p className="text-sm opacity-90 mb-1">Revenue</p>
          <p className="text-4xl font-semibold">${totalRevenue.toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search enrollments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4139c1] focus:ring-2 focus:ring-[#4139c1]/20"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full lg:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Enrollments Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Student</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Course Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 hidden lg:table-cell">Progress</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 hidden lg:table-cell">Payment</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment, index) => (
                <motion.tr 
                  key={enrollment.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">#{enrollment.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={enrollment.avatar} alt={enrollment.name} className="w-10 h-10 rounded-full" />
                      <span className="font-medium text-gray-900">{enrollment.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{enrollment.course}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress value={enrollment.progress} className="w-24" />
                      <span className="text-sm text-gray-600">{enrollment.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <Badge className="bg-green-100 text-green-700 border-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> {enrollment.payment}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`border-0 ${
                      enrollment.status === "Completed" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {enrollment.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openViewDialog(enrollment)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEnrollmentToDelete(enrollment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 gap-4">
          <div className="text-sm text-gray-600">
            Showing {filteredEnrollments.length} of {enrollments.length} entries
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
      </motion.div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enrollment Details</DialogTitle>
            <DialogDescription>View complete enrollment information</DialogDescription>
          </DialogHeader>
          {viewingEnrollment && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <img src={viewingEnrollment.avatar} alt={viewingEnrollment.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-lg font-semibold">{viewingEnrollment.name}</h3>
                  <p className="text-gray-600">{viewingEnrollment.course}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Enrollment Date</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {viewingEnrollment.enrolledAt}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Completion Date</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {viewingEnrollment.finishedAt}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <Badge className="bg-green-100 text-green-700 border-0">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> {viewingEnrollment.payment}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge className={`border-0 ${
                    viewingEnrollment.status === "Completed" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {viewingEnrollment.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Course Progress</p>
                  <p className="font-semibold">{viewingEnrollment.progress}%</p>
                </div>
                <Progress value={viewingEnrollment.progress} className="h-2" />
              </div>

              {viewingEnrollment.status === "Completed" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Final Grade</p>
                      <p className="text-2xl font-semibold text-green-700">{viewingEnrollment.grade}%</p>
                    </div>
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={enrollmentToDelete !== null} onOpenChange={() => setEnrollmentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the enrollment record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => enrollmentToDelete && handleDeleteEnrollment(enrollmentToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}