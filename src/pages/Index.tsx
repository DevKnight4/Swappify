
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Star, Users, ArrowRight, Sparkles, Shield, Clock, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Sample data for the demo
  const featuredSkills = [
    "Web Development", "Graphic Design", "Photography", "Language Exchange",
    "Music Lessons", "Cooking", "Marketing", "Data Analysis"
  ];

  const sampleUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      skills: ["React Development", "UI/UX Design"],
      wants: ["Photography", "Spanish"],
      rating: 4.9,
      location: "San Francisco, CA",
      swaps: 12
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "/placeholder.svg", 
      skills: ["Guitar Lessons", "Music Production"],
      wants: ["Web Development", "Marketing"],
      rating: 4.8,
      location: "Austin, TX",
      swaps: 8
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "/placeholder.svg",
      skills: ["Spanish Tutoring", "Content Writing"],
      wants: ["Graphic Design", "Photography"],
      rating: 5.0,
      location: "Miami, FL",
      swaps: 15
    }
  ];

  const stats = [
    { label: "Active Users", value: "2,847", icon: Users },
    { label: "Skills Available", value: "1,200+", icon: Sparkles },
    { label: "Successful Swaps", value: "5,630", icon: Heart },
    { label: "Avg Rating", value: "4.8", icon: Star }
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      toast({
        title: "Search Results",
        description: `Found ${Math.floor(Math.random() * 20) + 5} users with "${searchTerm}" skills`,
      });
    }
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill);
    toast({
      title: "Skill Selected",
      description: `Showing users who offer ${skill}`,
    });
  };

  const handleSwapRequest = (userName: string) => {
    toast({
      title: "Swap Request Sent!",
      description: `Your request has been sent to ${userName}. They'll be notified shortly.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-cyan-500/10" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in shadow-glow">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Join 2,847+ fusion learners today</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gradient-primary mb-6 animate-fade-in">
              Fusion Learning,
              <br />
              Endless Growth
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Experience the fusion of knowledge exchange - where every skill swap creates powerful learning connections and vibrant community growth.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-scale-in">
              <div className="flex gap-2 p-2 bg-card rounded-xl shadow-primary border animate-glow">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for skills (e.g., 'Photography', 'Coding', 'Music')"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 focus-visible:ring-0 text-lg bg-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="bg-gradient-primary hover:shadow-glow transition-all">
                  Search
                </Button>
              </div>
            </div>

            {/* Featured Skills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in">
              {featuredSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkill === skill ? "default" : "secondary"}
                  className={`px-4 py-2 cursor-pointer hover:scale-105 transition-all ${
                    selectedSkill === skill 
                      ? "bg-gradient-primary text-white shadow-glow" 
                      : "hover:bg-accent/20 hover:text-primary"
                  }`}
                  onClick={() => handleSkillClick(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center hover:shadow-primary transition-all animate-fade-in hover:scale-105 bg-gradient-to-br from-card to-accent/5">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary animate-glow" />
                <div className="text-3xl font-bold text-gradient-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Users */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient-primary mb-4">Meet Our Fusion Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with passionate learners who embrace the fusion of knowledge and skill exchange
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sampleUsers.map((user, index) => (
            <Card key={user.id} className="hover:shadow-primary transition-all animate-fade-in hover:scale-105 bg-gradient-to-br from-card to-accent/5">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4 animate-glow">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg bg-gradient-primary text-white font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {user.rating} • {user.swaps} swaps • {user.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Offers:</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-primary border-primary/30 hover:bg-primary/10">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-600 mb-2">Wants:</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.wants.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-cyan-600 border-cyan-300 hover:bg-cyan-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all"
                  onClick={() => handleSwapRequest(user.name)}
                >
                  Request Fusion Swap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient-primary mb-4">How Fusion Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Experience seamless skill fusion - where learning meets innovation in our vibrant community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-primary transition-all animate-fade-in hover:scale-105 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gradient-primary">Create Your Fusion Profile</h3>
              <p className="text-muted-foreground">
                Showcase your skills and learning desires. Set your fusion preferences and connect with like-minded learners.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-primary transition-all animate-fade-in hover:scale-105 bg-gradient-to-br from-card to-cyan-500/5">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                <Search className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gradient-accent">Discover Perfect Matches</h3>
              <p className="text-muted-foreground">
                Our fusion algorithm connects you with ideal learning partners who complement your skill portfolio.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-primary transition-all animate-fade-in hover:scale-105 bg-gradient-to-br from-card to-secondary/5">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'hsl(48 92% 45%)'}}>Start Fusion Exchange</h3>
              <p className="text-muted-foreground">
                Initiate meaningful connections, schedule learning sessions, and experience the power of skill fusion.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-primary rounded-2xl p-12 text-white shadow-glow animate-glow">
          <h2 className="text-3xl font-bold mb-4">Ready for Fusion Learning?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join our vibrant community where skill fusion creates endless possibilities. Your learning journey starts here!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Shield className="w-5 h-5 mr-2" />
              Start Fusion Journey
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm">
              <Clock className="w-5 h-5 mr-2" />
              Explore Demo
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            Free fusion • Secure platform • Vibrant community
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
