
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  AlertTriangle, 
  Ban, 
  CheckCircle, 
  XCircle, 
  Download, 
  Send, 
  Eye,
  TrendingUp,
  Activity,
  Shield,
  MessageSquare,
  Star
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'active' | 'banned' | 'pending';
  joinDate: string;
  swapsCompleted: number;
  rating: number;
  reportCount: number;
}

interface SwapActivity {
  id: string;
  users: [string, string];
  skills: [string, string];
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  date: string;
}

interface Report {
  id: string;
  reportedUser: string;
  reportedBy: string;
  reason: string;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  date: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      avatar: '/placeholder.svg',
      status: 'active',
      joinDate: '2024-01-15',
      swapsCompleted: 12,
      rating: 4.9,
      reportCount: 0
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      avatar: '/placeholder.svg',
      status: 'active',
      joinDate: '2024-01-12',
      swapsCompleted: 8,
      rating: 4.8,
      reportCount: 1
    },
    {
      id: '3',
      name: 'Spam Account',
      email: 'spam@fake.com',
      avatar: '/placeholder.svg',
      status: 'banned',
      joinDate: '2024-01-10',
      swapsCompleted: 0,
      rating: 2.1,
      reportCount: 5
    }
  ]);

  const [swapActivities, setSwapActivities] = useState<SwapActivity[]>([
    {
      id: '1',
      users: ['Sarah Chen', 'Marcus Johnson'],
      skills: ['React Development', 'Guitar Lessons'],
      status: 'completed',
      date: '2024-01-18'
    },
    {
      id: '2',
      users: ['Elena Rodriguez', 'David Kim'],
      skills: ['Spanish Tutoring', 'Photography'],
      status: 'pending',
      date: '2024-01-20'
    }
  ]);

  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      reportedUser: 'Spam Account',
      reportedBy: 'Sarah Chen',
      reason: 'Inappropriate Content',
      description: 'User is posting inappropriate skill descriptions and sending spam messages.',
      status: 'pending',
      date: '2024-01-19'
    }
  ]);

  const [announcement, setAnnouncement] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    bannedUsers: users.filter(u => u.status === 'banned').length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    totalSwaps: swapActivities.length,
    completedSwaps: swapActivities.filter(s => s.status === 'completed').length
  };

  const handleBanUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'banned' as const } : user
    ));
    toast({
      title: "User Banned",
      description: "The user has been banned from the platform.",
      variant: "destructive"
    });
  };

  const handleUnbanUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'active' as const } : user
    ));
    toast({
      title: "User Unbanned",
      description: "The user has been restored to active status.",
    });
  };

  const handleResolveReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: action } : report
    ));
    toast({
      title: action === 'resolved' ? "Report Resolved" : "Report Dismissed",
      description: `The report has been ${action}.`,
    });
  };

  const handleSendAnnouncement = () => {
    if (announcement.trim()) {
      toast({
        title: "Announcement Sent!",
        description: `Platform-wide message sent to ${stats.activeUsers} active users.`,
      });
      setAnnouncement('');
    }
  };

  const handleDownloadReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `${type} report is being prepared for download.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'banned': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    if (selectedFilter === 'all') return true;
    return user.status === selectedFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, monitor activities, and maintain platform quality</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Banned Users</p>
                <p className="text-2xl font-bold text-red-600">{stats.bannedUsers}</p>
              </div>
              <Ban className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingReports}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                <p className="text-2xl font-bold">{stats.totalSwaps}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completedSwaps}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="activities">Swap Activities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and monitor platform activity</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => handleDownloadReport('User Activity')} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Joined {new Date(user.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{user.rating}</span>
                        </div>
                        <div className="text-gray-600">{user.swapsCompleted} swaps</div>
                        {user.reportCount > 0 && (
                          <div className="text-red-600">{user.reportCount} reports</div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{user.name} - User Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <strong>Email:</strong> {user.email}
                                </div>
                                <div>
                                  <strong>Status:</strong> {user.status}
                                </div>
                                <div>
                                  <strong>Join Date:</strong> {new Date(user.joinDate).toLocaleDateString()}
                                </div>
                                <div>
                                  <strong>Completed Swaps:</strong> {user.swapsCompleted}
                                </div>
                                <div>
                                  <strong>Rating:</strong> {user.rating}/5.0
                                </div>
                                <div>
                                  <strong>Reports:</strong> {user.reportCount}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {user.status === 'active' ? (
                          <Button 
                            onClick={() => handleBanUser(user.id)}
                            variant="destructive" 
                            size="sm"
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : user.status === 'banned' ? (
                          <Button 
                            onClick={() => handleUnbanUser(user.id)}
                            variant="outline" 
                            size="sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Reports</CardTitle>
              <CardDescription>Review and manage user reports and violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-red-700">Report: {report.reason}</h3>
                        <p className="text-sm text-gray-600">
                          {report.reportedUser} reported by {report.reportedBy}
                        </p>
                      </div>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm bg-gray-50 p-3 rounded">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Reported on {new Date(report.date).toLocaleDateString()}
                      </span>
                      {report.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleResolveReport(report.id, 'resolved')}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resolve
                          </Button>
                          <Button 
                            onClick={() => handleResolveReport(report.id, 'dismissed')}
                            size="sm"
                            variant="outline"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activities */}
        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Swap Activities</CardTitle>
                  <CardDescription>Monitor ongoing and completed skill exchanges</CardDescription>
                </div>
                <Button onClick={() => handleDownloadReport('Swap Statistics')} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {swapActivities.map((activity) => (
                  <div key={activity.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 font-semibold">
                          <span>{activity.users[0]}</span>
                          <span className="text-gray-400">↔</span>
                          <span>{activity.users[1]}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="text-green-600">{activity.skills[0]}</span>
                          <span className="mx-2">for</span>
                          <span className="text-blue-600">{activity.skills[1]}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Announcements</CardTitle>
                <CardDescription>Send messages to all active users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your announcement here..."
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  rows={4}
                />
                <Button 
                  onClick={handleSendAnnouncement}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  disabled={!announcement.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to {stats.activeUsers} Active Users
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Downloads</CardTitle>
                <CardDescription>Generate and download platform reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => handleDownloadReport('User Activity')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Download className="w-4 h-4 mr-2" />
                  User Activity Report
                </Button>
                <Button 
                  onClick={() => handleDownloadReport('Swap Statistics')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Swap Statistics Report
                </Button>
                <Button 
                  onClick={() => handleDownloadReport('Feedback Logs')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Feedback & Ratings Report
                </Button>
                <Button 
                  onClick={() => handleDownloadReport('Platform Analytics')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Platform Analytics Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
