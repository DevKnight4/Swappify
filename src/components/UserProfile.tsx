
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Star, MapPin, Clock, Shield, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UserProfileProps {
  isEditing?: boolean;
}

const UserProfile = ({ isEditing = false }: UserProfileProps) => {
  const [editing, setEditing] = useState(isEditing);
  const [profile, setProfile] = useState({
    name: "Ananya Sharma",
    email: "ananya.sharma@email.com",
    location: "San Francisco, CA",
    bio: "Passionate web developer and UI/UX enthusiast. Love sharing knowledge and learning new creative skills!",
    avatar: "/placeholder.svg",
    isPublic: true,
    skillsOffered: ["React Development", "UI/UX Design", "JavaScript Tutoring"],
    skillsWanted: ["Photography", "Spanish Language", "Digital Marketing"],
    availability: ["Weekends", "Evenings"],
    rating: 4.9,
    completedSwaps: 12,
    joinDate: "March 2024"
  });

  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");

  const addSkillOffered = () => {
    if (newSkillOffered.trim() && !profile.skillsOffered.includes(newSkillOffered.trim())) {
      setProfile(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered("");
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim() && !profile.skillsWanted.includes(newSkillWanted.trim())) {
      setProfile(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()]
      }));
      setNewSkillWanted("");
    }
  };

  const removeSkill = (skill: string, type: 'offered' | 'wanted') => {
    if (type === 'offered') {
      setProfile(prev => ({
        ...prev,
        skillsOffered: prev.skillsOffered.filter(s => s !== skill)
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        skillsWanted: prev.skillsWanted.filter(s => s !== skill)
      }));
    }
  };

  const handleSave = () => {
    setEditing(false);
    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const availabilityOptions = [
    "Weekday Mornings", "Weekday Afternoons", "Weekday Evenings",
    "Weekend Mornings", "Weekend Afternoons", "Weekend Evenings",
    "Flexible Schedule"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2 md:mb-4">
                {editing ? (
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold h-auto p-2"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                )}
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{profile.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {editing ? (
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="h-6 text-sm"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                  <div>{profile.completedSwaps} successful swaps</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <Shield className={`w-4 h-4 ${profile.isPublic ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="text-sm">{profile.isPublic ? 'Public' : 'Private'}</span>
                {editing && (
                  <Switch
                    checked={profile.isPublic}
                    onCheckedChange={(checked) => setProfile(prev => ({ ...prev, isPublic: checked }))}
                  />
                )}
              </div>
              
              {editing ? (
                <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              ) : (
                <Button onClick={() => setEditing(true)} variant="outline">
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* About Section */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              {editing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  placeholder="Tell others about yourself and your skills..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              )}
            </CardContent>
          </Card>

          {/* Skills Offered */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Skills I Offer</CardTitle>
              <CardDescription>
                Skills you can teach or help others with
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profile.skillsOffered.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-green-700 border-green-200 flex items-center gap-2">
                    {skill}
                    {editing && (
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeSkill(skill, 'offered')}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              
              {editing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you offer..."
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkillOffered()}
                  />
                  <Button onClick={addSkillOffered} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills Wanted */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">Skills I Want to Learn</CardTitle>
              <CardDescription>
                Skills you're interested in learning from others
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profile.skillsWanted.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-blue-700 border-blue-200 flex items-center gap-2">
                    {skill}
                    {editing && (
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeSkill(skill, 'wanted')}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              
              {editing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you want to learn..."
                    value={newSkillWanted}
                    onChange={(e) => setNewSkillWanted(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkillWanted()}
                  />
                  <Button onClick={addSkillWanted} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editing ? (
                <div className="space-y-2">
                  {availabilityOptions.map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.availability.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfile(prev => ({
                              ...prev,
                              availability: [...prev.availability, option]
                            }));
                          } else {
                            setProfile(prev => ({
                              ...prev,
                              availability: prev.availability.filter(a => a !== option)
                            }));
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {profile.availability.map((time) => (
                    <Badge key={time} variant="secondary" className="mr-2 mb-2">
                      {time}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>My Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Member since</span>
                <span className="font-medium">{profile.joinDate}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed swaps</span>
                <span className="font-medium text-green-600">{profile.completedSwaps}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{profile.rating}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Skills offered</span>
                <span className="font-medium text-blue-600">{profile.skillsOffered.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
