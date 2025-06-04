"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Flag,
  Eye,
  MessageSquare,
  User,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

const pendingReviews = [
  {
    id: 1,
    type: "challenge",
    title: "Advanced Counter-Drone Jamming System",
    author: "TacticalOps_7",
    submittedAt: "2 hours ago",
    riskLevel: "medium",
    flags: ["technical-specs", "operational-context"],
    content:
      "Need solutions for jamming coordinated drone swarms while maintaining friendly communications...",
    reviewNotes: "",
  },
  {
    id: 2,
    type: "solution",
    title: "AI-Powered Threat Detection Algorithm",
    author: "DefenseTech_AI",
    submittedAt: "4 hours ago",
    riskLevel: "low",
    flags: [],
    content:
      "Our machine learning approach can identify hostile drones with 97.3% accuracy...",
    reviewNotes: "",
  },
  {
    id: 3,
    type: "challenge",
    title: "Stealth Reconnaissance Platform Requirements",
    author: "Anonymous",
    submittedAt: "6 hours ago",
    riskLevel: "high",
    flags: ["classified-risk", "location-data", "unit-identification"],
    content:
      "Operating in [REDACTED] region, need ultra-quiet platform for night operations...",
    reviewNotes:
      "Contains potential OPSEC violations - location references and operational details",
  },
];

const flaggedContent = [
  {
    id: 4,
    type: "comment",
    title: "Re: Urban Swarm Detection",
    author: "CivilianContractor",
    flaggedBy: "ModeratorAlpha",
    reason: "Inappropriate disclosure",
    flaggedAt: "1 day ago",
    content:
      "Based on our work with [SPECIFIC UNIT] in [LOCATION], we recommend...",
    status: "pending",
  },
  {
    id: 5,
    type: "solution",
    title: "Quantum Encryption for Drone Communications",
    author: "QuantumSec_LLC",
    flaggedBy: "Community",
    reason: "Spam/Self-promotion",
    flaggedAt: "2 days ago",
    content:
      "Visit our website to learn more about our revolutionary quantum solutions...",
    status: "pending",
  },
];

export default function ModerationPage() {
  const [selectedAction, setSelectedAction] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const handleReview = (id: number, action: string) => {
    console.log(`Reviewing item ${id} with action: ${action}`);
    console.log(`Notes: ${reviewNotes}`);
    // Handle review action
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">
                    {pendingReviews.length}
                  </p>
                  <p className="text-slate-400 text-sm">Pending Reviews</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">
                    {flaggedContent.length}
                  </p>
                  <p className="text-slate-400 text-sm">Flagged Content</p>
                </div>
                <Flag className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">47</p>
                  <p className="text-slate-400 text-sm">Approved Today</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-slate-400 text-sm">Rejected Today</p>
                </div>
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* OPSEC Guidelines */}
        <Alert className="mb-8 border-blue-600 bg-blue-600/10">
          <Shield className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>OPSEC Review Guidelines:</strong> Flag content containing
            specific unit designations, operational locations, classified
            technical specifications, or sensitive timing information. When in
            doubt, escalate to senior moderators.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-slate-700"
            >
              Pending Reviews ({pendingReviews.length})
            </TabsTrigger>
            <TabsTrigger
              value="flagged"
              className="data-[state=active]:bg-slate-700"
            >
              Flagged Content ({flaggedContent.length})
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-slate-700"
            >
              Review History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            {pendingReviews.map((item) => (
              <Card key={item.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getRiskColor(item.riskLevel)}>
                          {item.riskLevel.toUpperCase()} RISK
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-slate-400"
                        >
                          {item.type.toUpperCase()}
                        </Badge>
                        {item.flags.map((flag) => (
                          <Badge
                            key={flag}
                            variant="outline"
                            className="border-red-500 text-red-400"
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {flag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-white text-lg">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 flex items-center gap-4 mt-2">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {item.author}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.submittedAt}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {item.reviewNotes && (
                    <div className="bg-yellow-600/10 border border-yellow-600/20 p-4 rounded-lg">
                      <p className="text-yellow-200 text-sm">
                        <strong>Review Notes:</strong> {item.reviewNotes}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Select
                        value={selectedAction}
                        onValueChange={setSelectedAction}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approve">Approve</SelectItem>
                          <SelectItem value="approve-edit">
                            Approve with Edits
                          </SelectItem>
                          <SelectItem value="request-revision">
                            Request Revision
                          </SelectItem>
                          <SelectItem value="reject">Reject</SelectItem>
                          <SelectItem value="escalate">
                            Escalate to Senior Moderator
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleReview(item.id, selectedAction)}
                        disabled={!selectedAction}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Submit Review
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    placeholder="Add review notes (required for rejections and revisions)"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="flagged" className="space-y-6">
            {flaggedContent.map((item) => (
              <Card
                key={item.id}
                className="bg-slate-800 border-slate-700 border-l-4 border-l-red-500"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-red-600">FLAGGED</Badge>
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-slate-400"
                        >
                          {item.type.toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 flex items-center gap-4 mt-2">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {item.author}
                        </span>
                        <span className="flex items-center">
                          <Flag className="w-4 h-4 mr-1" />
                          Flagged by {item.flaggedBy}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.flaggedAt}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-lg">
                    <p className="text-red-200 text-sm mb-2">
                      <strong>Flag Reason:</strong> {item.reason}
                    </p>
                  </div>

                  <div className="bg-slate-700 p-4 rounded-lg">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Dismiss Flag
                    </Button>
                    <Button variant="destructive">
                      <XCircle className="w-4 h-4 mr-2" />
                      Remove Content
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Author
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Recent Moderation Actions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  History of moderation decisions and actions taken.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <div>
                      <p className="text-white font-medium">
                        Approved: "AI-Enhanced Target Recognition"
                      </p>
                      <p className="text-slate-400 text-sm">
                        Reviewed by ModeratorBeta • 2 hours ago
                      </p>
                    </div>
                    <Badge className="bg-green-600">APPROVED</Badge>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <div>
                      <p className="text-white font-medium">
                        Rejected: "Classified Drone Specifications"
                      </p>
                      <p className="text-slate-400 text-sm">
                        Reviewed by ModeratorAlpha • 4 hours ago
                      </p>
                    </div>
                    <Badge className="bg-red-600">REJECTED</Badge>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-700">
                    <div>
                      <p className="text-white font-medium">
                        Escalated: "Advanced EW Countermeasures"
                      </p>
                      <p className="text-slate-400 text-sm">
                        Reviewed by ModeratorGamma • 6 hours ago
                      </p>
                    </div>
                    <Badge className="bg-yellow-600">ESCALATED</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
