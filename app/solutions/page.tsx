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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Clock,
  User,
  ArrowUp,
  Eye,
  CheckCircle,
  Building,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

const solutions = [
  {
    id: 1,
    title: "AI-Powered Swarm Detection Algorithm",
    description:
      "Machine learning solution achieving 97.3% accuracy in detecting coordinated drone swarms using multi-sensor fusion and behavioral analysis.",
    author: "DefenseTech_AI",
    company: "Quantum Defense Solutions",
    verified: true,
    challengeId: 1,
    challengeTitle: "Counter-UAS Swarm Detection",
    trl: "6-7",
    domain: "Counter-UAS",
    tags: ["ai-ml", "swarm-detection", "sensors", "real-time"],
    votes: 1247,
    views: 3421,
    timeAgo: "3 hours ago",
    status: "active",
    implementation: "prototype",
    cost: "$$",
    timeline: "6-9 months",
  },
  {
    id: 2,
    title: "Hybrid Power System for Extended Range",
    description:
      "Solar-assisted battery system extending drone operational range to 150km with 8-hour endurance. Weather-resistant design tested in harsh conditions.",
    author: "AeroSystems_Eng",
    company: "Advanced Aerospace Corp",
    verified: true,
    challengeId: 2,
    challengeTitle: "Autonomous Resupply Range Extension",
    trl: "7-8",
    domain: "Logistics",
    tags: ["power-systems", "solar", "endurance", "weather-resistant"],
    votes: 892,
    views: 2156,
    timeAgo: "8 hours ago",
    status: "active",
    implementation: "field-tested",
    cost: "$$$",
    timeline: "3-6 months",
  },
  {
    id: 3,
    title: "Ultra-Quiet Propulsion System",
    description:
      "Proprietary blade design and motor configuration achieving <30dB at 100m while maintaining 4+ hour flight time. Patent pending.",
    author: "SilentFlight_Tech",
    company: "Stealth Dynamics LLC",
    verified: true,
    challengeId: 3,
    challengeTitle: "Silent Reconnaissance Drone",
    trl: "5-6",
    domain: "ISR",
    tags: ["stealth", "propulsion", "noise-reduction", "endurance"],
    votes: 634,
    views: 1789,
    timeAgo: "1 day ago",
    status: "selected",
    implementation: "lab-tested",
    cost: "$$$$",
    timeline: "9-12 months",
  },
  {
    id: 4,
    title: "Modular EW Payload Integration",
    description:
      "Plug-and-play electronic warfare modules with real-time C2 integration. Compatible with existing drone platforms and communication systems.",
    author: "EW_Innovations",
    company: "Electronic Warfare Systems Inc",
    verified: true,
    challengeId: 4,
    challengeTitle: "Drone-Based EW Countermeasures",
    trl: "8-9",
    domain: "Electronic Warfare",
    tags: ["electronic-warfare", "modular", "c2-integration", "payload"],
    votes: 756,
    views: 2034,
    timeAgo: "2 days ago",
    status: "implemented",
    implementation: "deployed",
    cost: "$$$$$",
    timeline: "1-3 months",
  },
  {
    id: 5,
    title: "Minefield Mapping AI Suite",
    description:
      "AI-powered multi-sensor fusion for rapid minefield detection and mapping. Field-tested in NATO exercises.",
    author: "SafeRouteAI",
    company: "Defense Robotics Inc.",
    verified: true,
    challengeId: 21,
    challengeTitle: "Drone-Based Minefield Mapping for Safe Passage",
    trl: "6-7",
    domain: "ISR",
    tags: ["ai", "minefield", "mapping", "fusion"],
    votes: 812,
    views: 2100,
    timeAgo: "1 hour ago",
    status: "active",
    implementation: "prototype",
    cost: "$$$",
    timeline: "3-6 months",
  },
  {
    id: 6,
    title: "Swarm Drop Precision System",
    description:
      "Swarm coordination and payload drop system for humanitarian aid. Achieved 95% accuracy in field trials.",
    author: "AidSwarmTech",
    company: "Relief Robotics",
    verified: true,
    challengeId: 22,
    challengeTitle: "Drone Swarm Logistics for Humanitarian Aid Drops",
    trl: "7-8",
    domain: "Logistics",
    tags: ["swarm", "aid", "payload", "precision"],
    votes: 456,
    views: 1200,
    timeAgo: "2 hours ago",
    status: "selected",
    implementation: "field-tested",
    cost: "$$",
    timeline: "1-2 months",
  },
  {
    id: 7,
    title: "Persistent Perimeter Watch",
    description:
      "Autonomous drone patrol system for 24/7 perimeter breach detection. Integrated with base C2.",
    author: "PerimeterAI",
    company: "BaseSecure LLC",
    verified: true,
    challengeId: 23,
    challengeTitle: "Drone-Enabled Perimeter Intrusion Detection",
    trl: "8-9",
    domain: "ISR",
    tags: ["perimeter", "autonomous", "c2", "detection"],
    votes: 389,
    views: 900,
    timeAgo: "3 hours ago",
    status: "implemented",
    implementation: "deployed",
    cost: "$$$",
    timeline: "6 months",
  },
  {
    id: 8,
    title: "Bridge Integrity Analyzer",
    description:
      "Drone imaging and AI analysis suite for rapid bridge damage assessment. Used in recent NATO exercises.",
    author: "EngAI",
    company: "InfraTech Solutions",
    verified: true,
    challengeId: 24,
    challengeTitle: "Drone-Based Bridge Damage Assessment",
    trl: "6-7",
    domain: "ISR",
    tags: ["bridge", "ai", "damage", "assessment"],
    votes: 277,
    views: 700,
    timeAgo: "4 hours ago",
    status: "active",
    implementation: "prototype",
    cost: "$$$",
    timeline: "2-4 months",
  },
  {
    id: 9,
    title: "Jammer Hunter Swarm",
    description:
      "Swarm-enabled geolocation of hostile jamming sources. Successfully demoed in Red Flag 2024.",
    author: "SignalHunt",
    company: "EW Dynamics",
    verified: true,
    challengeId: 25,
    challengeTitle: "Drone-Based Signal Jamming Detection",
    trl: "7-8",
    domain: "Electronic Warfare",
    tags: ["jamming", "swarm", "geolocation", "ew"],
    votes: 501,
    views: 1100,
    timeAgo: "5 hours ago",
    status: "active",
    implementation: "field-tested",
    cost: "$$$",
    timeline: "3 months",
  },
  {
    id: 10,
    title: "Urban Combat Resupply Drone",
    description:
      "Ruggedized drone for ammo and med supply drops in urban combat. Used by USMC in 2024 exercises.",
    author: "UrbanSupplyTech",
    company: "Tactical Robotics",
    verified: true,
    challengeId: 26,
    challengeTitle: "Drone-Based Tactical Resupply in Urban Combat",
    trl: "8-9",
    domain: "Logistics",
    tags: ["urban", "resupply", "rugged", "combat"],
    votes: 333,
    views: 950,
    timeAgo: "6 hours ago",
    status: "implemented",
    implementation: "deployed",
    cost: "$$$",
    timeline: "1 month",
  },
  {
    id: 11,
    title: "Camouflage Detection AI",
    description:
      "Deep learning model for drone-based detection of camouflaged assets. 87% accuracy in forested terrain.",
    author: "ForestReconAI",
    company: "Recon Analytics",
    verified: true,
    challengeId: 27,
    challengeTitle: "Drone-Based Camouflage Detection",
    trl: "6-7",
    domain: "ISR",
    tags: ["camouflage", "ai", "forest", "detection"],
    votes: 299,
    views: 780,
    timeAgo: "7 hours ago",
    status: "active",
    implementation: "prototype",
    cost: "$$",
    timeline: "2 months",
  },
  {
    id: 12,
    title: "Maritime Small Craft Tracker",
    description:
      "AI-powered drone system for persistent detection of small craft in littoral waters.",
    author: "MaritimeAI",
    company: "Naval Robotics",
    verified: true,
    challengeId: 28,
    challengeTitle: "Drone-Based Maritime Surveillance for Small Craft",
    trl: "7-8",
    domain: "ISR",
    tags: ["maritime", "ai", "small-craft", "tracker"],
    votes: 410,
    views: 1020,
    timeAgo: "8 hours ago",
    status: "active",
    implementation: "field-tested",
    cost: "$$$",
    timeline: "4 months",
  },
  {
    id: 13,
    title: "CBRN Recon Drone Suite",
    description:
      "Integrated CBRN sensors and AI for forward-deployed drone recon. NATO certified.",
    author: "CBRNTech",
    company: "CBRN Robotics",
    verified: true,
    challengeId: 29,
    challengeTitle: "Drone-Based CBRN Recon for Forward Units",
    trl: "8-9",
    domain: "Other",
    tags: ["cbrn", "recon", "ai", "forward"],
    votes: 522,
    views: 1200,
    timeAgo: "3 hours ago",
    status: "implemented",
    implementation: "deployed",
    cost: "$$$$",
    timeline: "6 months",
  },
  {
    id: 14,
    title: "MeshNet Battlefield Comms",
    description:
      "Secure mesh networking for drone-enabled battlefield comms. Used in US Army 2024 trials.",
    author: "MeshNetComms",
    company: "CommsTech",
    verified: true,
    challengeId: 30,
    challengeTitle: "Drone-Based Secure Mesh Networking for Battlefield Comms",
    trl: "7-8",
    domain: "Communications",
    tags: ["mesh", "networking", "secure", "battlefield"],
    votes: 433,
    views: 1050,
    timeAgo: "2 hours ago",
    status: "active",
    implementation: "field-tested",
    cost: "$$$",
    timeline: "2 months",
  },
  {
    id: 15,
    title: "Smart Payload Drop System",
    description:
      "AI-guided payload drop system for high-accuracy resupply in contested zones.",
    author: "SmartDropAI",
    company: "Payload Dynamics",
    verified: true,
    challengeId: 2,
    challengeTitle: "Autonomous Resupply Drone Range Extension",
    trl: "7-8",
    domain: "Logistics",
    tags: ["payload", "ai", "resupply", "contested"],
    votes: 512,
    views: 1400,
    timeAgo: "1 hour ago",
    status: "active",
    implementation: "prototype",
    cost: "$$$",
    timeline: "3 months",
  },
];

export default function SolutionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedTRL, setSelectedTRL] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("votes");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "implemented":
        return "bg-green-600";
      case "selected":
        return "bg-blue-600";
      case "active":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTRLColor = (trl: string) => {
    const level = Number.parseInt(trl.split("-")[0]);
    if (level <= 3) return "border-red-500 text-red-400";
    if (level <= 6) return "border-yellow-500 text-yellow-400";
    return "border-green-500 text-green-400";
  };

  const getCostIndicator = (cost: string) => {
    return cost.length;
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar activeTab="solutions" />
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
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Domain
                  </label>
                  <Select
                    value={selectedDomain}
                    onValueChange={setSelectedDomain}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Domains</SelectItem>
                      <SelectItem value="counter-uas">Counter-UAS</SelectItem>
                      <SelectItem value="logistics">Logistics</SelectItem>
                      <SelectItem value="isr">ISR</SelectItem>
                      <SelectItem value="electronic-warfare">
                        Electronic Warfare
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    TRL Level
                  </label>
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

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">
                    Status
                  </label>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active Proposals</SelectItem>
                      <SelectItem value="selected">
                        Selected Solutions
                      </SelectItem>
                      <SelectItem value="implemented">Implemented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  Solution Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Solutions</span>
                  <span className="text-white font-medium">1,832</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Implemented</span>
                  <span className="text-green-400 font-medium">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">In Development</span>
                  <span className="text-blue-400 font-medium">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Avg Rating</span>
                  <span className="text-yellow-400 font-medium">4.7/5</span>
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
                  placeholder="Search solutions..."
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
                  <SelectItem value="trl">Highest TRL</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-slate-700"
                >
                  All Solutions ({solutions.length})
                </TabsTrigger>
                <TabsTrigger
                  value="selected"
                  className="data-[state=active]:bg-slate-700"
                >
                  Selected (
                  {solutions.filter((s) => s.status === "selected").length})
                </TabsTrigger>
                <TabsTrigger
                  value="implemented"
                  className="data-[state=active]:bg-slate-700"
                >
                  Implemented (
                  {solutions.filter((s) => s.status === "implemented").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {solutions.map((solution) => (
                  <Card
                    key={solution.id}
                    className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(solution.status)}>
                              {solution.status.toUpperCase()}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={getTRLColor(solution.trl)}
                            >
                              TRL {solution.trl}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-slate-600 text-slate-400"
                            >
                              {solution.domain}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="border-purple-500 text-purple-400"
                            >
                              {"$".repeat(getCostIndicator(solution.cost))}
                            </Badge>
                          </div>
                          <CardTitle className="text-white text-xl mb-2 hover:text-blue-400 cursor-pointer">
                            <Link href={`/solutions/${solution.id}`}>
                              {solution.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-slate-300 text-base leading-relaxed mb-3">
                            {solution.description}
                          </CardDescription>
                          <div className="bg-slate-700/50 p-3 rounded-lg">
                            <p className="text-sm text-slate-400 mb-1">
                              Addresses Challenge:
                            </p>
                            <Link
                              href={`/challenges/${solution.challengeId}`}
                              className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                              {solution.challengeTitle}
                            </Link>
                          </div>
                        </div>
                        <div className="flex flex-col items-center bg-slate-700 rounded-lg p-3 min-w-[80px]">
                          <ArrowUp className="w-5 h-5 text-slate-400 hover:text-blue-400 cursor-pointer mb-1" />
                          <span className="text-white font-bold">
                            {solution.votes}
                          </span>
                          <span className="text-xs text-slate-400">votes</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {solution.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-slate-700 text-slate-300 text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Implementation Details */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-slate-700/30 rounded-lg">
                        <div className="text-center">
                          <p className="text-xs text-slate-400">
                            Implementation
                          </p>
                          <p className="text-sm font-medium text-white capitalize">
                            {solution.implementation}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-400">Timeline</p>
                          <p className="text-sm font-medium text-white">
                            {solution.timeline}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-400">Cost Level</p>
                          <p className="text-sm font-medium text-yellow-400">
                            {"$".repeat(getCostIndicator(solution.cost))}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {solution.author}
                          </span>
                          <span className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            {solution.company}
                          </span>
                          {solution.verified && (
                            <Badge
                              variant="outline"
                              className="text-xs border-green-500 text-green-400"
                            >
                              Verified Partner
                            </Badge>
                          )}
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {solution.views} views
                          </span>
                        </div>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {solution.timeAgo}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="selected" className="space-y-4">
                {solutions
                  .filter((s) => s.status === "selected")
                  .map((solution) => (
                    <Card
                      key={solution.id}
                      className="bg-slate-800 border-blue-500/50"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-600">SELECTED</Badge>
                          <Badge
                            variant="outline"
                            className={getTRLColor(solution.trl)}
                          >
                            TRL {solution.trl}
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-xl">
                          {solution.title}
                        </CardTitle>
                        <CardDescription className="text-slate-300">
                          {solution.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="implemented" className="space-y-4">
                {solutions
                  .filter((s) => s.status === "implemented")
                  .map((solution) => (
                    <Card
                      key={solution.id}
                      className="bg-slate-800 border-green-500/50"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            IMPLEMENTED
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getTRLColor(solution.trl)}
                          >
                            TRL {solution.trl}
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-xl">
                          {solution.title}
                        </CardTitle>
                        <CardDescription className="text-slate-300">
                          {solution.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
