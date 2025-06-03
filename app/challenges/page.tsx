"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MessageSquare, Clock, User, ArrowUp, Eye, Video } from "lucide-react"
import Link from "next/link"

const challenges = [
  {
    id: 1,
    title: "Counter-UAS Swarm Detection in Urban Environments",
    description:
      "Need rapid detection and classification system for coordinated drone swarms operating in dense urban areas. Current systems struggle with false positives from birds and civilian aircraft.",
    author: "WarfighterAlpha",
    verified: true,
    anonymous: false,
    urgency: "URGENT",
    trl: "3-4",
    domain: "Counter-UAS",
    tags: ["swarm-detection", "urban-ops", "ai-ml", "sensors"],
    votes: 847,
    responses: 23,
    views: 2341,
    timeAgo: "2 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 2,
    title: "Autonomous Resupply Drone Range Extension",
    description:
      "Looking for innovative solutions to extend operational range of autonomous resupply missions beyond current 50km limitation. Weight constraints and weather resilience are key factors.",
    author: "Anonymous",
    verified: true,
    anonymous: true,
    urgency: "MEDIUM",
    trl: "6-7",
    domain: "Logistics",
    tags: ["autonomous", "resupply", "range-extension", "weather-resistant"],
    votes: 1203,
    responses: 41,
    views: 4567,
    timeAgo: "6 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 3,
    title: "Silent Reconnaissance Drone for Night Operations",
    description:
      "Require ultra-quiet drone platform for covert night reconnaissance missions. Noise signature must be under 35dB at 100m distance while maintaining 4-hour flight endurance.",
    author: "NightHawk_Ops",
    verified: true,
    anonymous: false,
    urgency: "HIGH",
    trl: "4-5",
    domain: "ISR",
    tags: ["stealth", "night-ops", "reconnaissance", "low-noise"],
    votes: 692,
    responses: 18,
    views: 1876,
    timeAgo: "1 day ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 4,
    title: "Drone-Based Electronic Warfare Countermeasures",
    description:
      "Seeking solutions for deploying EW countermeasures via small drone platforms. Must integrate with existing C2 systems and provide real-time threat assessment.",
    author: "EW_Specialist",
    verified: true,
    anonymous: false,
    urgency: "HIGH",
    trl: "5-6",
    domain: "Electronic Warfare",
    tags: ["electronic-warfare", "countermeasures", "c2-integration"],
    votes: 534,
    responses: 29,
    views: 2103,
    timeAgo: "2 days ago",
    hasVideo: false,
    status: "solved",
  },
]

export default function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDomain, setSelectedDomain] = useState("all")
  const [selectedUrgency, setSelectedUrgency] = useState("all")
  const [selectedTRL, setSelectedTRL] = useState("all")
  const [sortBy, setSortBy] = useState("votes")

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "URGENT":
        return "bg-red-600"
      case "HIGH":
        return "bg-orange-600"
      case "MEDIUM":
        return "bg-yellow-600"
      case "LOW":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTRLColor = (trl: string) => {
    const level = Number.parseInt(trl.split("-")[0])
    if (level <= 3) return "border-red-500 text-red-400"
    if (level <= 6) return "border-yellow-500 text-yellow-400"
    return "border-green-500 text-green-400"
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DW</span>
              </div>
              <span className="text-xl font-bold text-white">DroneWERX</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/challenges" className="text-blue-400 font-medium">
                Challenges
              </Link>
              <Link href="/solutions" className="text-slate-300 hover:text-white transition-colors">
                Solutions
              </Link>
              <Link href="/submit" className="text-slate-300 hover:text-white transition-colors">
                Submit
              </Link>
              <Button size="sm">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Domain</label>
                  <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Domains</SelectItem>
                      <SelectItem value="counter-uas">Counter-UAS</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="isr">ISR</SelectItem>
                      <SelectItem value="electronic-warfare">Electronic Warfare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Urgency</label>
                  <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">TRL Level</label>
                  <Select value={selectedTRL} onValueChange={setSelectedTRL}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All TRL Levels</SelectItem>
                      <SelectItem value="1-3">TRL 1-3 (Research)</SelectItem>
                      <SelectItem value="4-6">TRL 4-6 (Development)</SelectItem>
                      <SelectItem value="7-9">TRL 7-9 (Deployment)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Active Challenges</span>
                  <span className="text-white font-medium">247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Solved This Week</span>
                  <span className="text-green-400 font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Avg Response Time</span>
                  <span className="text-blue-400 font-medium">4.2 hrs</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="votes">Most Voted</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="responses">Most Responses</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="active" className="mb-6">
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="active" className="data-[state=active]:bg-slate-700">
                  Active ({challenges.filter((c) => c.status === "active").length})
                </TabsTrigger>
                <TabsTrigger value="solved" className="data-[state=active]:bg-slate-700">
                  Solved ({challenges.filter((c) => c.status === "solved").length})
                </TabsTrigger>
                <TabsTrigger value="urgent" className="data-[state=active]:bg-slate-700">
                  Urgent ({challenges.filter((c) => c.urgency === "URGENT").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {challenges
                  .filter((c) => c.status === "active")
                  .map((challenge) => (
                    <Card
                      key={challenge.id}
                      className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getUrgencyColor(challenge.urgency)}>{challenge.urgency}</Badge>
                              <Badge variant="outline" className={getTRLColor(challenge.trl)}>
                                TRL {challenge.trl}
                              </Badge>
                              <Badge variant="outline" className="border-slate-600 text-slate-400">
                                {challenge.domain}
                              </Badge>
                              {challenge.hasVideo && (
                                <Badge variant="outline" className="border-purple-500 text-purple-400">
                                  <Video className="w-3 h-3 mr-1" />
                                  Video
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-white text-xl mb-2 hover:text-blue-400 cursor-pointer">
                              <Link href={`/challenges/${challenge.id}`}>{challenge.title}</Link>
                            </CardTitle>
                            <CardDescription className="text-slate-300 text-base leading-relaxed">
                              {challenge.description}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-center bg-slate-700 rounded-lg p-3 min-w-[80px]">
                            <ArrowUp className="w-5 h-5 text-slate-400 hover:text-blue-400 cursor-pointer mb-1" />
                            <span className="text-white font-bold">{challenge.votes}</span>
                            <span className="text-xs text-slate-400">votes</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {challenge.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {challenge.anonymous ? "Anonymous" : challenge.author}
                              {challenge.verified && (
                                <Badge variant="outline" className="ml-2 text-xs border-green-500 text-green-400">
                                  Verified DoD
                                </Badge>
                              )}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {challenge.responses} responses
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {challenge.views} views
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {challenge.timeAgo}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="solved" className="space-y-4">
                {challenges
                  .filter((c) => c.status === "solved")
                  .map((challenge) => (
                    <Card key={challenge.id} className="bg-slate-800 border-slate-700 opacity-75">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-600">SOLVED</Badge>
                              <Badge variant="outline" className={getTRLColor(challenge.trl)}>
                                TRL {challenge.trl}
                              </Badge>
                              <Badge variant="outline" className="border-slate-600 text-slate-400">
                                {challenge.domain}
                              </Badge>
                            </div>
                            <CardTitle className="text-white text-xl mb-2">{challenge.title}</CardTitle>
                            <CardDescription className="text-slate-300">{challenge.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="urgent" className="space-y-4">
                {challenges
                  .filter((c) => c.urgency === "URGENT")
                  .map((challenge) => (
                    <Card key={challenge.id} className="bg-slate-800 border-red-500/50">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-red-600 animate-pulse">{challenge.urgency}</Badge>
                              <Badge variant="outline" className={getTRLColor(challenge.trl)}>
                                TRL {challenge.trl}
                              </Badge>
                            </div>
                            <CardTitle className="text-white text-xl mb-2">{challenge.title}</CardTitle>
                            <CardDescription className="text-slate-300">{challenge.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
