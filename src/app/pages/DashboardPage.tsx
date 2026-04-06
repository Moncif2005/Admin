import svgPaths from "../../imports/svg-hm17iv5lu4";
import imgImage15 from "@figma-asset/ad05d21cbad6ad8b0a5a9077facfe93f5d12ac9f.png";
import imgImage16 from "@figma-asset/5fffc27f274a11e000d7e3b46dc8299d7a888d5c.png";
import imgImage18 from "@figma-asset/0bb96440a06858b8850c4280c56d778dc20ecbd3.png";
import imgImage14 from "@figma-asset/9a2ac95de1cc9d67c8c3260327ad467ae317d630.png";
import { ChevronDown, TrendingUp, TrendingDown, Users, BookOpen, GraduationCap, DollarSign, Database } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

const visitorData: any[] = [];

const taskData: any[] = [];

const recentActivities: any[] = [];

const topCourses: any[] = [];

export default function DashboardPage() {
  const stats = [
    { title: "Total Users", value: "0", icon: Users, color: "bg-blue-500", change: "0%", trend: "up" },
    { title: "Learners", value: "0", icon: GraduationCap, color: "bg-green-500", change: "0%", trend: "up" },
    { title: "Instructors", value: "0", icon: BookOpen, color: "bg-purple-500", change: "0%", trend: "up" },
    { title: "Courses", value: "0", icon: BookOpen, color: "bg-orange-500", change: "0%", trend: "up" },
    { title: "Revenue", value: "$0", icon: DollarSign, color: "bg-emerald-500", change: "0%", trend: "up" },
  ];

  const { language } = useLanguage();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl lg:text-4xl font-semibold">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitor Statistics Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#192a3e] text-lg font-semibold">Visitor Statistics</h3>
            <div className="text-xs text-[#6a707e]">Nov - July</div>
          </div>
          
          <div className="mb-4 flex flex-wrap justify-end gap-4 lg:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#109cf1]"></div>
              <span className="text-gray-600 text-xs lg:text-sm">LAST 6 MONTHS</span>
              <span className="font-semibold">475,273</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2ed47a]"></div>
              <span className="text-gray-600 text-xs lg:text-sm">PREVIOUS</span>
              <span className="font-semibold">782,396</span>
            </div>
          </div>

          {visitorData.length === 0 ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No visitor data available</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6a707e" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6a707e" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line 
                  key="line-last-six-months"
                  type="monotone" 
                  dataKey="lastSixMonths" 
                  stroke="#109cf1" 
                  strokeWidth={2}
                  dot={{ fill: '#109cf1', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Last 6 Months"
                />
                <Line 
                  key="line-previous"
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#2ed47a" 
                  strokeWidth={2}
                  dot={{ fill: '#2ed47a', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Previous"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Tasks Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#192a3e] text-lg font-semibold">Tasks</h3>
            <button className="text-xs text-[#109cf1] flex items-center gap-1 hover:underline">
              This month <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {taskData.length === 0 ? (
            <div className="flex items-center justify-center h-[250px]">
              <div className="text-center">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No task data available</p>
              </div>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={taskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {taskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="text-center -mt-[180px] mb-[120px] pointer-events-none">
                <span className="text-5xl font-semibold text-[#4139c1]">60%</span>
              </div>

              {/* Legend */}
              <div className="space-y-3 mt-4">
                {taskData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Recent Activities and Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-[#192a3e] text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.length === 0 ? (
              <div className="text-center py-12">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No recent activities</p>
                <p className="text-gray-400 text-xs mt-1">Activities will appear here once users interact with the system</p>
              </div>
            ) : (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 bg-[#4139c1] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                      <span className="font-semibold text-[#4139c1]">{activity.course}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Top Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-[#192a3e] text-lg font-semibold mb-4">Top Courses</h3>
          <div className="space-y-4">
            {topCourses.length === 0 ? (
              <div className="text-center py-12">
                <Database className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No courses available</p>
                <p className="text-gray-400 text-xs mt-1">Create courses to see top performers here</p>
              </div>
            ) : (
              topCourses.map((course, index) => (
                <div key={course.name} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#4139c1] text-white rounded-lg flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{course.name}</p>
                      <p className="text-xs text-gray-500">{course.students} students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-[#4139c1]">{course.revenue}</p>
                    <p className="text-xs text-gray-500">⭐ {course.rating}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}