import { Search, ChevronDown, Edit, Trash2, Plus, Filter, Download, Eye, Upload } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog";
import { motion } from "motion/react";
import { Textarea } from "../components/ui/textarea";
import { useLanguage } from "../contexts/LanguageContext";

const initialCourses: any[] = [];

const courseTypeColors: Record<string, string> = {
  PDF: "bg-red-100 text-red-700",
  MP4: "bg-blue-100 text-blue-700",
  PPTX: "bg-orange-100 text-orange-700",
  DOC: "bg-green-100 text-green-700",
  MP3: "bg-purple-100 text-purple-700",
};

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [viewingCourse, setViewingCourse] = useState<any>(null);
  const [newCourse, setNewCourse] = useState({
    name: "",
    instructor: "",
    type: "PDF",
    price: "0",
    description: "",
  });

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || course.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCourses(filteredCourses.map(c => c.id));
    } else {
      setSelectedCourses([]);
    }
  };

  const handleSelectCourse = (courseId: number) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.instructor) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const course = {
      id: Math.max(...courses.map(c => c.id)) + 1,
      ...newCourse,
      created: new Date().toLocaleDateString('en-GB'),
      students: 0,
      rating: 0,
    };
    
    setCourses([...courses, course]);
    setIsAddDialogOpen(false);
    setNewCourse({ name: "", instructor: "", type: "PDF", price: "0", description: "" });
    toast.success("Course added successfully!");
  };

  const handleEditCourse = () => {
    if (!editingCourse) return;
    
    setCourses(courses.map(c => c.id === editingCourse.id ? editingCourse : c));
    setIsEditDialogOpen(false);
    setEditingCourse(null);
    toast.success("Course updated successfully!");
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses(courses.filter(c => c.id !== courseId));
    setCourseToDelete(null);
    toast.success("Course deleted successfully!");
  };

  const handleBulkDelete = () => {
    setCourses(courses.filter(c => !selectedCourses.includes(c.id)));
    setSelectedCourses([]);
    toast.success(`${selectedCourses.length} courses deleted successfully!`);
  };

  const handleExport = () => {
    toast.success("Exporting courses data...");
  };

  const openEditDialog = (course: any) => {
    setEditingCourse({...course});
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (course: any) => {
    setViewingCourse(course);
    setIsViewDialogOpen(true);
  };

  const totalRevenue = courses.reduce((sum, course) => sum + parseFloat(course.price) * course.students, 0);
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const averageRating = courses.reduce((sum, course) => sum + course.rating, 0) / courses.length;

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-black">Courses Management</h1>
          <p className="text-gray-600 mt-1">Create and manage your courses</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4139c1] hover:bg-[#3530a8]">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>Fill in the details to create a new course.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  placeholder="Enter course name"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor Name</Label>
                <Input
                  id="instructor"
                  placeholder="Enter instructor name"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Course Type</Label>
                  <Select value={newCourse.type} onValueChange={(value) => setNewCourse({...newCourse, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="MP4">Video (MP4)</SelectItem>
                      <SelectItem value="PPTX">Presentation (PPTX)</SelectItem>
                      <SelectItem value="DOC">Document (DOC)</SelectItem>
                      <SelectItem value="MP3">Audio (MP3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter course description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Course Files</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#4139c1] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, MP4, PPTX, DOC (max. 100MB)</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddCourse} className="bg-[#4139c1] hover:bg-[#3530a8]">Add Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search, Filter, and Actions */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses by name or instructor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4139c1] focus:ring-2 focus:ring-[#4139c1]/20"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full lg:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="mp4">Video (MP4)</SelectItem>
            <SelectItem value="pptx">Presentation</SelectItem>
            <SelectItem value="doc">Document</SelectItem>
            <SelectItem value="mp3">Audio</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        {selectedCourses.length > 0 && (
          <Button variant="destructive" onClick={handleBulkDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete ({selectedCourses.length})
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <p className="text-sm text-gray-600 mb-1">Total Courses</p>
          <p className="text-2xl font-semibold">{courses.length}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <p className="text-sm text-gray-600 mb-1">Total Students</p>
          <p className="text-2xl font-semibold">{totalStudents}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold">${totalRevenue.toFixed(2)}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <p className="text-sm text-gray-600 mb-1">Avg. Rating</p>
          <p className="text-2xl font-semibold">⭐ {averageRating.toFixed(1)}</p>
        </motion.div>
      </div>

      {/* Courses Table */}
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
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded"
                    checked={selectedCourses.length === filteredCourses.length && filteredCourses.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Course Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 hidden lg:table-cell">Instructor</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 hidden lg:table-cell">Students</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 hidden lg:table-cell">Rating</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <motion.tr 
                  key={course.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleSelectCourse(course.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{course.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 hidden lg:table-cell">{course.instructor}</td>
                  <td className="px-6 py-4">
                    <Badge className={`${courseTypeColors[course.type]} border-0`}>{course.type}</Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-700 hidden lg:table-cell">{course.students}</td>
                  <td className="px-6 py-4 text-gray-700 hidden lg:table-cell">⭐ {course.rating}</td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">
                    {parseFloat(course.price) === 0 ? "Free" : `$${course.price}`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openViewDialog(course)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditDialog(course)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setCourseToDelete(course.id)}
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
            Showing {filteredCourses.length} of {courses.length} entries
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
            <DialogTitle>Course Details</DialogTitle>
          </DialogHeader>
          {viewingCourse && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">Course Name</Label>
                  <p className="font-semibold mt-1">{viewingCourse.name}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Instructor</Label>
                  <p className="font-semibold mt-1">{viewingCourse.instructor}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Type</Label>
                  <Badge className={`${courseTypeColors[viewingCourse.type]} border-0 mt-1`}>{viewingCourse.type}</Badge>
                </div>
                <div>
                  <Label className="text-gray-600">Price</Label>
                  <p className="font-semibold mt-1">{parseFloat(viewingCourse.price) === 0 ? "Free" : `$${viewingCourse.price}`}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Students</Label>
                  <p className="font-semibold mt-1">{viewingCourse.students}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Rating</Label>
                  <p className="font-semibold mt-1">⭐ {viewingCourse.rating}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Created</Label>
                  <p className="font-semibold mt-1">{viewingCourse.created}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Revenue</Label>
                  <p className="font-semibold mt-1">${(parseFloat(viewingCourse.price) * viewingCourse.students).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update course information below.</DialogDescription>
          </DialogHeader>
          {editingCourse && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Course Name</Label>
                <Input
                  id="edit-name"
                  value={editingCourse.name}
                  onChange={(e) => setEditingCourse({...editingCourse, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-instructor">Instructor Name</Label>
                <Input
                  id="edit-instructor"
                  value={editingCourse.instructor}
                  onChange={(e) => setEditingCourse({...editingCourse, instructor: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Course Type</Label>
                  <Select value={editingCourse.type} onValueChange={(value) => setEditingCourse({...editingCourse, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="MP4">Video (MP4)</SelectItem>
                      <SelectItem value="PPTX">Presentation (PPTX)</SelectItem>
                      <SelectItem value="DOC">Document (DOC)</SelectItem>
                      <SelectItem value="MP3">Audio (MP3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({...editingCourse, price: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditCourse} className="bg-[#4139c1] hover:bg-[#3530a8]">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={courseToDelete !== null} onOpenChange={() => setCourseToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => courseToDelete && handleDeleteCourse(courseToDelete)}
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