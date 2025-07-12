
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Filter, MapPin, Star, Clock, Send, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  completedSwaps: number;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  bio: string;
  isOnline: boolean;
}

const SkillBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [requestMessage, setRequestMessage] = useState("");
  const [selectedUserForRequest, setSelectedUserForRequest] = useState<User | null>(null);

  const skillCategories = [
    "All Skills",
    "Technology",
    "Creative Arts",
    "Languages",
    "Music",
    "Business",
    "Fitness",
    "Cooking",
    "Crafts"
  ];

  const locations = [
    "All Locations",
    "San Francisco, CA",
    "New York, NY",
    "Austin, TX",
    "Seattle, WA",
    "Miami, FL",
    "Denver, CO",
    "Portland, OR"
  ];

  const sampleUsers: User[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '/placeholder.svg',
      location: 'San Francisco, CA',
      rating: 4.9,
      completedSwaps: 12,
      skillsOffered: ['React Development', 'UI/UX Design', 'JavaScript Tutoring'],
      skillsWanted: ['Photography', 'Spanish Language', 'Digital Marketing'],
      availability: ['Weekends', 'Evenings'],
      bio: 'Passionate web developer with 5+ years experience. Love sharing knowledge and learning new creative skills!',
      isOnline: true
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      avatar: '/placeholder.svg',
      location: 'Austin, TX',
      rating: 4.8,
      completedSwaps: 8,
      skillsOffered: ['Guitar Lessons', 'Music Production', 'Audio Engineering'],
      skillsWanted: ['Web Development', 'Photography', 'Video Editing'],
      availability: ['Weekday Evenings', 'Weekends'],
      bio: 'Professional musician and audio engineer. Been playing guitar for 10+ years and love teaching!',
      isOnline: false
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      avatar: '/placeholder.svg',
      location: 'Miami, FL',
      rating: 5.0,
      completedSwaps: 15,
      skillsOffered: ['Spanish Tutoring', 'Content Writing', 'Social Media Marketing'],
      skillsWanted: ['Graphic Design', 'Photography', 'Cooking'],
      availability: ['Flexible Schedule'],
      bio: 'Native Spanish speaker and marketing professional. Excited to help others learn while picking up creative skills!',
      isOnline: true
    },
    {
      id: '4',
      name: 'David Kim',
      avatar: '/placeholder.svg',
      location: 'Seattle, WA',
      rating: 4.9,
      completedSwaps: 10,
      skillsOffered: ['Photography', 'Photo Editing', 'Lightroom Tutorials'],
      skillsWanted: ['JavaScript', 'React', 'Node.js'],
      availability: ['Weekend Mornings', 'Weekday Evenings'],
      bio: 'Professional photographer looking to transition into tech. Happy to trade photo skills for coding knowledge!',
      isOnline: true
    },
    {
      id: '5',
      name: 'Lisa Chen',
      avatar: '/placeholder.svg',
      location: 'Portland, OR',
      rating: 4.7,
      completedSwaps: 6,
      skillsOffered: ['Digital Marketing', 'SEO', 'Content Strategy'],
      skillsWanted: ['Yoga', 'Meditation', 'Fitness Training'],
      availability: ['Weekday Mornings', 'Weekend Afternoons'],
      bio: 'Marketing strategist seeking work-life balance. Would love to learn wellness practices in exchange for marketing expertise!',
      isOnline: false
    },
    {
      id: '6',
      name: 'Alex Thompson',
      avatar: '/placeholder.svg',
      location: 'Denver, CO',
      rating: 4.6,
      completedSwaps: 4,
      skillsOffered: ['Rock Climbing', 'Fitness Training', 'Nutrition Coaching'],
      skillsWanted: ['Web Design', 'Graphic Design', 'Branding'],
      availability: ['Early Mornings', 'Weekends'],
      bio: 'Certified fitness trainer and climbing instructor. Looking to learn design skills to build my online presence!',
      isOnline: true
    }
  ];

  const [users] = useState<User[]>(sampleUsers);

  const getFilteredUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.skillsOffered.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter(user => 
        user.location === locationFilter
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'swaps':
          return b.completedSwaps - a.completedSwaps;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const handleSendRequest = () => {
    if (selectedUserForRequest && requestMessage.trim()) {
      toast({
        title: "Swap Request Sent!",
        description: `Your request has been sent to ${selectedUserForRequest.name}. They'll be notified shortly.`,
      });
      setRequestMessage("");
      setSelectedUserForRequest(null);
    }
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Skills</h1>
        <p className="text-gray-600">Find skilled individuals in your community ready to share their expertise</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search skills or people..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location, index) => (
                  <SelectItem key={index} value={index === 0 ? "all" : location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="swaps">Most Swaps</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'person' : 'people'} found
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Online now</span>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-xl transition-all hover-scale">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{user.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{user.completedSwaps} swaps</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                </div>
                {user.isOnline && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Online
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                {user.bio}
              </p>

              <div>
                <h4 className="font-semibold text-green-700 text-sm mb-2">Offers:</h4>
                <div className="flex flex-wrap gap-1">
                  {user.skillsOffered.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs text-green-700 border-green-200">
                      {skill}
                    </Badge>
                  ))}
                  {user.skillsOffered.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.skillsOffered.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 text-sm mb-2">Wants:</h4>
                <div className="flex flex-wrap gap-1">
                  {user.skillsWanted.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs text-blue-700 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                  {user.skillsWanted.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{user.skillsWanted.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>{user.availability.join(', ')}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{user.name}</div>
                          <div className="text-sm font-normal text-gray-600 flex items-center gap-2">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {user.rating} • {user.completedSwaps} swaps • {user.location}
                          </div>
                        </div>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">About</h4>
                        <p className="text-gray-700">{user.bio}</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2">Skills Offered</h4>
                          <div className="space-y-1">
                            {user.skillsOffered.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-green-700 border-green-200 mr-1 mb-1">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2">Skills Wanted</h4>
                          <div className="space-y-1">
                            {user.skillsWanted.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-blue-700 border-blue-200 mr-1 mb-1">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Availability
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {user.availability.map((time) => (
                            <Badge key={time} variant="secondary">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => setSelectedUserForRequest(user)}
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Request Swap
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Swap Request</DialogTitle>
                      <DialogDescription>
                        Send a request to {user.name} to start a skill exchange
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">You Offer</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your skill" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="react">React Development</SelectItem>
                              <SelectItem value="design">UI/UX Design</SelectItem>
                              <SelectItem value="javascript">JavaScript Tutoring</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">You Want</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select their skill" />
                            </SelectTrigger>
                            <SelectContent>
                              {user.skillsOffered.map((skill) => (
                                <SelectItem key={skill} value={skill.toLowerCase().replace(/\s+/g, '-')}>
                                  {skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Message</Label>
                        <Textarea
                          placeholder="Introduce yourself and explain what you'd like to learn and teach..."
                          value={requestMessage}
                          onChange={(e) => setRequestMessage(e.target.value)}
                          rows={4}
                        />
                      </div>
                      
                      <Button 
                        onClick={handleSendRequest}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                        disabled={!requestMessage.trim()}
                      >
                        Send Request
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more skill swappers.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillBrowser;
