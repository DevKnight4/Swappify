
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Clock, Star, MessageCircle, Trash2, Calendar, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SwapRequest {
  id: string;
  type: 'incoming' | 'outgoing';
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  otherUser: {
    name: string;
    avatar: string;
    rating: number;
    location: string;
  };
  skillOffered: string;
  skillRequested: string;
  message: string;
  createdAt: string;
  scheduledDate?: string;
}

const SwapRequests = () => {
  const [requests, setRequests] = useState<SwapRequest[]>([
    {
      id: '1',
      type: 'incoming',
      status: 'pending',
      otherUser: {
        name: 'Anil Sharma',
        avatar: '/placeholder.svg',
        rating: 4.8,
        location: 'Austin, TX'
      },
      skillOffered: 'Guitar Lessons',
      skillRequested: 'React Development',
      message: 'Hi! I\'d love to learn React from you. I have 5+ years of guitar experience and can teach acoustic/electric guitar basics to advanced techniques.',
      createdAt: '2024-01-15',
      scheduledDate: undefined
    },
    {
      id: '2',
      type: 'outgoing',
      status: 'accepted',
      otherUser: {
        name: 'Alana Pandey',
        avatar: '/placeholder.svg',
        rating: 5.0,
        location: 'Miami, FL'
      },
      skillOffered: 'UI/UX Design',
      skillRequested: 'Spanish Tutoring',
      message: 'Looking forward to learning Spanish! I can help you with modern UI/UX design principles and Figma.',
      createdAt: '2024-01-12',
      scheduledDate: '2024-01-20'
    },
    {
      id: '3',
      type: 'incoming',
      status: 'completed',
      otherUser: {
        name: 'Danish Khilji',
        avatar: '/placeholder.svg',
        rating: 4.9,
        location: 'Seattle, WA'
      },
      skillOffered: 'Photography',
      skillRequested: 'JavaScript Tutoring',
      message: 'Great session! Thank you for the JavaScript fundamentals. Hope the photography tips were helpful!',
      createdAt: '2024-01-10',
      scheduledDate: '2024-01-18'
    },
    {
      id: '4',
      type: 'outgoing',
      status: 'pending',
      otherUser: {
        name: 'Ananya Sharma',
        avatar: '/placeholder.svg',
        rating: 4.7,
        location: 'Portland, OR'
      },
      skillOffered: 'React Development',
      skillRequested: 'Digital Marketing',
      message: 'Hi Lisa! I\'d love to learn about digital marketing strategies. I can teach you React, hooks, and modern development practices.',
      createdAt: '2024-01-14',
      scheduledDate: undefined
    }
  ]);

  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);

  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'accepted' as const, scheduledDate: '2024-01-25' }
        : req
    ));
    toast({
      title: "Request Accepted!",
      description: "The swap request has been accepted. You can now coordinate your skill exchange.",
    });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected' as const }
        : req
    ));
    toast({
      title: "Request Rejected",
      description: "The swap request has been rejected.",
      variant: "destructive"
    });
  };

  const handleDeleteRequest = (requestId: string) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
    toast({
      title: "Request Deleted",
      description: "The swap request has been removed.",
    });
  };

  const handleCompleteFeedback = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'completed' as const }
        : req
    ));
    toast({
      title: "Feedback Submitted!",
      description: `Thank you for rating this swap experience. Your feedback helps improve our community.`,
    });
    setFeedback('');
    setRating(5);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      case 'completed': return <Star className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const incomingRequests = requests.filter(req => req.type === 'incoming');
  const outgoingRequests = requests.filter(req => req.type === 'outgoing');
  const activeSwaps = requests.filter(req => req.status === 'accepted');
  const completedSwaps = requests.filter(req => req.status === 'completed');

  const renderRequestCard = (request: SwapRequest) => (
    <Card key={request.id} className="hover:shadow-lg transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={request.otherUser.avatar} alt={request.otherUser.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {request.otherUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{request.otherUser.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {request.otherUser.rating}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {request.otherUser.location}
                </div>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(request.status)}>
            {getStatusIcon(request.status)}
            <span className="ml-1 capitalize">{request.status}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-xs text-green-600 font-medium mb-1">
              {request.type === 'incoming' ? 'They Offer' : 'You Offer'}
            </div>
            <div className="font-semibold text-green-700">{request.skillOffered}</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xs text-blue-600 font-medium mb-1">
              {request.type === 'incoming' ? 'They Want' : 'You Want'}
            </div>
            <div className="font-semibold text-blue-700">{request.skillRequested}</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Message</span>
          </div>
          <p className="text-sm text-gray-700">{request.message}</p>
        </div>

        {request.scheduledDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Scheduled for: {new Date(request.scheduledDate).toLocaleDateString()}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {request.type === 'incoming' && request.status === 'pending' && (
            <>
              <Button 
                onClick={() => handleAcceptRequest(request.id)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Accept
              </Button>
              <Button 
                onClick={() => handleRejectRequest(request.id)}
                variant="outline"
                className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </>
          )}

          {request.type === 'outgoing' && request.status === 'pending' && (
            <Button 
              onClick={() => handleDeleteRequest(request.id)}
              variant="outline"
              className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Cancel Request
            </Button>
          )}

          {request.status === 'accepted' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Star className="w-4 h-4 mr-2" />
                  Complete & Rate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Complete Skill Swap</DialogTitle>
                  <DialogDescription>
                    How was your experience with {request.otherUser.name}?
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Feedback (Optional)</label>
                    <Textarea
                      placeholder="Share your experience..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={() => handleCompleteFeedback(request.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Submit Feedback
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Skill Swaps</h1>
        <p className="text-gray-600">Manage your skill exchange requests and track your learning journey</p>
      </div>

      <Tabs defaultValue="incoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Incoming ({incomingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Sent ({outgoingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            Active ({activeSwaps.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Completed ({completedSwaps.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Incoming Requests</h2>
            <p className="text-gray-600">People who want to learn from you</p>
          </div>
          <div className="grid gap-4">
            {incomingRequests.length > 0 ? (
              incomingRequests.map(renderRequestCard)
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Incoming Requests</h3>
                  <p className="text-gray-600">When people want to learn your skills, their requests will appear here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Sent Requests</h2>
            <p className="text-gray-600">Your requests to learn from others</p>
          </div>
          <div className="grid gap-4">
            {outgoingRequests.length > 0 ? (
              outgoingRequests.map(renderRequestCard)
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Sent Requests</h3>
                  <p className="text-gray-600">Start exploring skills and send your first swap request!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Active Swaps</h2>
            <p className="text-gray-600">Currently ongoing skill exchanges</p>
          </div>
          <div className="grid gap-4">
            {activeSwaps.length > 0 ? (
              activeSwaps.map(renderRequestCard)
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Check className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Swaps</h3>
                  <p className="text-gray-600">Accept incoming requests or wait for your sent requests to be approved.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Completed Swaps</h2>
            <p className="text-gray-600">Your successful skill exchange history</p>
          </div>
          <div className="grid gap-4">
            {completedSwaps.length > 0 ? (
              completedSwaps.map(renderRequestCard)
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Swaps Yet</h3>
                  <p className="text-gray-600">Complete your first skill exchange to build your reputation!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SwapRequests;
