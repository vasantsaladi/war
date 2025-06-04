"use client";

import { useState, useEffect, useRef } from "react";
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
  MessageSquare,
  Clock,
  User,
  ArrowUp,
  Eye,
  Video,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";

interface Challenge {
  id: number;
  title: string;
  description: string;
  author: string;
  verified: boolean;
  anonymous: boolean;
  urgency: string;
  trl: string;
  domain: string;
  tags: string[];
  votes: number;
  responses: number;
  views: number;
  timeAgo: string;
  hasVideo: boolean;
  status: string;
}

const mockChallenges: Challenge[] = [
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
    views: 2345,
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
    responses: 44,
    views: 4573,
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
  {
    id: 5,
    title: "Rapid Payload Swap System for Field Ops",
    description:
      "Design a modular payload system for drones to enable rapid field swaps between ISR, EW, and logistics modules. Must be rugged and operable with gloves.",
    author: "PayloadMaster",
    verified: false,
    anonymous: false,
    urgency: "MEDIUM",
    trl: "5-6",
    domain: "Payload Systems",
    tags: ["modular", "payload", "field-ops", "rugged"],
    votes: 321,
    responses: 12,
    views: 1102,
    timeAgo: "3 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 6,
    title: "Autonomous Navigation in GPS-Denied Environments",
    description:
      "Develop AI-based navigation for drones operating in GPS-denied or jammed environments. Should leverage onboard sensors and computer vision.",
    author: "NavAI_Tech",
    verified: true,
    anonymous: false,
    urgency: "URGENT",
    trl: "6-7",
    domain: "Navigation",
    tags: ["ai", "navigation", "gps-denied", "computer-vision"],
    votes: 978,
    responses: 36,
    views: 3120,
    timeAgo: "4 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 7,
    title: "Secure Communications Relay for Swarm Ops",
    description:
      "Need a secure, low-latency communications relay for drone swarms in contested environments. Must support mesh networking and encryption.",
    author: "CommsGuru",
    verified: false,
    anonymous: false,
    urgency: "HIGH",
    trl: "7-8",
    domain: "Communications",
    tags: ["secure-comms", "swarm", "mesh-network", "encryption"],
    votes: 412,
    responses: 21,
    views: 1543,
    timeAgo: "5 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 8,
    title: "Drone Cybersecurity Hardening",
    description:
      "Requesting best practices and solutions for hardening drone platforms against cyber threats. Focus on firmware, comms, and supply chain security.",
    author: "CyberOps",
    verified: true,
    anonymous: false,
    urgency: "MEDIUM",
    trl: "5-6",
    domain: "Cybersecurity",
    tags: ["cybersecurity", "firmware", "supply-chain", "comms"],
    votes: 288,
    responses: 9,
    views: 980,
    timeAgo: "7 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 9,
    title: "Weather-Resistant Drone Design for Arctic Ops",
    description:
      "Looking for design recommendations for drones operating in extreme cold and high winds. Must maintain battery life and sensor function below -20C.",
    author: "ArcticOps",
    verified: false,
    anonymous: false,
    urgency: "LOW",
    trl: "4-5",
    domain: "Other",
    tags: ["arctic", "weather-resistant", "battery", "sensors"],
    votes: 134,
    responses: 4,
    views: 410,
    timeAgo: "8 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 10,
    title: "Payload Delivery Accuracy in Urban Terrain",
    description:
      "Seeking solutions to improve payload delivery accuracy for drones in dense urban environments. Must account for wind, GPS multipath, and obstacles.",
    author: "UrbanDeliver",
    verified: true,
    anonymous: false,
    urgency: "HIGH",
    trl: "7-8",
    domain: "Logistics",
    tags: ["payload", "urban", "accuracy", "obstacles"],
    votes: 501,
    responses: 17,
    views: 1320,
    timeAgo: "9 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 11,
    title: "AI-Driven Target Recognition for ISR Drones",
    description:
      "Need advanced AI models for real-time target recognition and classification from ISR drone video feeds. Must operate on edge hardware.",
    author: "ISR_TechLead",
    verified: true,
    anonymous: false,
    urgency: "MEDIUM",
    trl: "6-7",
    domain: "ISR",
    tags: ["ai", "target-recognition", "edge-compute", "video"],
    votes: 623,
    responses: 15,
    views: 1422,
    timeAgo: "10 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 12,
    title: "Low-Observable Drone Materials for Stealth Missions",
    description:
      "Seeking materials and coatings to reduce drone radar and IR signature for deep penetration missions.",
    author: "StealthOps",
    verified: false,
    anonymous: false,
    urgency: "HIGH",
    trl: "5-6",
    domain: "Other",
    tags: ["stealth", "materials", "coatings", "low-observable"],
    votes: 377,
    responses: 11,
    views: 890,
    timeAgo: "12 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 13,
    title: "Swarm Coordination Algorithms for Multi-Drone Missions",
    description:
      "Looking for robust algorithms to coordinate 10+ drones for search and rescue in GPS-denied environments.",
    author: "SAR_Command",
    verified: true,
    anonymous: false,
    urgency: "URGENT",
    trl: "4-5",
    domain: "Autonomous Systems",
    tags: ["swarm", "coordination", "search-rescue", "gps-denied"],
    votes: 789,
    responses: 27,
    views: 2011,
    timeAgo: "3 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 14,
    title: "Drone-Based RF Spectrum Monitoring",
    description:
      "Need compact RF spectrum analyzers for drones to detect and geolocate hostile emitters in real time.",
    author: "RF_Watchdog",
    verified: true,
    anonymous: false,
    urgency: "HIGH",
    trl: "5-6",
    domain: "Electronic Warfare",
    tags: ["rf", "spectrum", "geolocation", "hostile-emitters"],
    votes: 412,
    responses: 13,
    views: 1109,
    timeAgo: "5 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 15,
    title: "Drone Medical Supply Delivery in Contested Areas",
    description:
      "Seeking solutions for secure, rapid delivery of medical supplies via drones in contested or denied airspace.",
    author: "MedOps",
    verified: true,
    anonymous: false,
    urgency: "URGENT",
    trl: "6-7",
    domain: "Logistics",
    tags: ["medical", "supply", "contested", "delivery"],
    votes: 654,
    responses: 22,
    views: 1780,
    timeAgo: "7 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 16,
    title: "Drone-Launched Micro-Satellite Deployment",
    description:
      "Looking for concepts to deploy micro-satellites from high-altitude drones for comms and ISR.",
    author: "SpaceOps",
    verified: false,
    anonymous: false,
    urgency: "MEDIUM",
    trl: "7-8",
    domain: "Payload Systems",
    tags: ["satellite", "deployment", "high-altitude", "comms"],
    votes: 312,
    responses: 8,
    views: 654,
    timeAgo: "11 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 17,
    title: "Drone-Based Chemical/Biological Threat Detection",
    description:
      "Need sensors and AI for drones to detect and map chemical/biological threats in real time.",
    author: "CBRN_Tech",
    verified: true,
    anonymous: false,
    urgency: "HIGH",
    trl: "5-6",
    domain: "Other",
    tags: ["chemical", "biological", "sensors", "mapping"],
    votes: 401,
    responses: 14,
    views: 1002,
    timeAgo: "8 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 18,
    title: "Drone Swarm Decoy Systems for Air Defense Penetration",
    description:
      "Seeking decoy drone swarm concepts to saturate and confuse enemy air defense systems.",
    author: "RedTeam",
    verified: false,
    anonymous: false,
    urgency: "URGENT",
    trl: "6-7",
    domain: "Counter-UAS",
    tags: ["decoy", "swarm", "air-defense", "penetration"],
    votes: 555,
    responses: 19,
    views: 1450,
    timeAgo: "2 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 19,
    title: "Drone Power Management for Extended Endurance",
    description:
      "Looking for innovative power management and energy harvesting solutions to extend drone endurance beyond 24 hours.",
    author: "PowerLab",
    verified: true,
    anonymous: false,
    urgency: "MEDIUM",
    trl: "7-8",
    domain: "Other",
    tags: ["power", "energy-harvesting", "endurance", "battery"],
    votes: 299,
    responses: 7,
    views: 800,
    timeAgo: "13 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 20,
    title: "Drone-Based Perimeter Security for Forward Operating Bases",
    description:
      "Need autonomous drone patrol and alert systems for 24/7 perimeter security at forward operating bases.",
    author: "BaseSecurity",
    verified: true,
    anonymous: false,
    urgency: "HIGH",
    trl: "6-7",
    domain: "ISR",
    tags: ["perimeter", "security", "autonomous", "patrol"],
    votes: 488,
    responses: 16,
    views: 1201,
    timeAgo: "4 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 21,
    title: "Drone-Based Minefield Mapping for Safe Passage",
    description:
      "Seeking AI-powered drone solutions to rapidly detect and map minefields for convoy route clearance.",
    author: "RouteClear",
    verified: true,
    anonymous: false,
    urgency: "URGENT",
    trl: "5-6",
    domain: "ISR",
    tags: ["minefield", "mapping", "ai", "route-clearance"],
    votes: 601,
    responses: 20,
    views: 1502,
    timeAgo: "2 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 22,
    title: "Drone Swarm Logistics for Humanitarian Aid Drops",
    description:
      "Looking for swarm coordination and payload drop accuracy for humanitarian aid in disaster zones.",
    author: "AidOps",
    verified: false,
    anonymous: false,
    urgency: "HIGH",
    trl: "6-7",
    domain: "Logistics",
    tags: ["swarm", "aid", "payload", "disaster-relief"],
    votes: 355,
    responses: 13,
    views: 900,
    timeAgo: "5 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 23,
    title: "Drone-Enabled Perimeter Intrusion Detection",
    description:
      "Need persistent drone surveillance for perimeter breach detection at remote outposts.",
    author: "PerimeterWatch",
    verified: true,
    anonymous: false,
    urgency: "MEDIUM",
    trl: "7-8",
    domain: "ISR",
    tags: ["perimeter", "intrusion", "surveillance", "remote"],
    votes: 278,
    responses: 8,
    views: 700,
    timeAgo: "7 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 24,
    title: "Drone-Based Bridge Damage Assessment",
    description:
      "Seeking drone imaging and AI analysis for rapid assessment of bridge integrity after strikes.",
    author: "EngOps",
    verified: true,
    anonymous: false,
    urgency: "HIGH",
    trl: "5-6",
    domain: "ISR",
    tags: ["bridge", "damage", "assessment", "ai"],
    votes: 312,
    responses: 10,
    views: 820,
    timeAgo: "8 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 25,
    title: "Drone-Based Signal Jamming Detection",
    description:
      "Need real-time detection and geolocation of hostile jamming sources using drone swarms.",
    author: "SignalOps",
    verified: false,
    anonymous: false,
    urgency: "URGENT",
    trl: "6-7",
    domain: "Electronic Warfare",
    tags: ["jamming", "detection", "geolocation", "swarm"],
    votes: 489,
    responses: 17,
    views: 1100,
    timeAgo: "3 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 26,
    title: "Drone-Based Tactical Resupply in Urban Combat",
    description:
      "Looking for solutions to deliver ammo and medical supplies to units in contested urban environments.",
    author: "UrbanResupply",
    verified: true,
    anonymous: false,
    urgency: "HIGH",
    trl: "7-8",
    domain: "Logistics",
    tags: ["tactical", "resupply", "urban", "combat"],
    votes: 377,
    responses: 12,
    views: 950,
    timeAgo: "6 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 27,
    title: "Drone-Based Camouflage Detection",
    description:
      "Seeking AI/ML solutions for drones to detect camouflaged enemy assets in forested terrain.",
    author: "ReconAI",
    verified: true,
    anonymous: false,
    urgency: "MEDIUM",
    trl: "5-6",
    domain: "ISR",
    tags: ["camouflage", "detection", "ai", "forest"],
    votes: 299,
    responses: 9,
    views: 780,
    timeAgo: "9 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 28,
    title: "Drone-Based Maritime Surveillance for Small Craft",
    description:
      "Need persistent drone surveillance for detection of small craft in littoral waters.",
    author: "MaritimeOps",
    verified: false,
    anonymous: false,
    urgency: "HIGH",
    trl: "6-7",
    domain: "ISR",
    tags: ["maritime", "surveillance", "small-craft", "littoral"],
    votes: 410,
    responses: 14,
    views: 1020,
    timeAgo: "10 hours ago",
    hasVideo: true,
    status: "active",
  },
  {
    id: 29,
    title: "Drone-Based CBRN Recon for Forward Units",
    description:
      "Looking for drone-based CBRN (Chemical, Biological, Radiological, Nuclear) recon for forward-deployed units.",
    author: "CBRN_Forward",
    verified: true,
    anonymous: false,
    urgency: "URGENT",
    trl: "7-8",
    domain: "Other",
    tags: ["cbrn", "recon", "forward", "units"],
    votes: 522,
    responses: 18,
    views: 1200,
    timeAgo: "4 hours ago",
    hasVideo: false,
    status: "active",
  },
  {
    id: 30,
    title: "Drone-Based Secure Mesh Networking for Battlefield Comms",
    description:
      "Seeking robust, secure mesh networking solutions for drone-enabled battlefield communications.",
    author: "MeshComms",
    verified: true,
    anonymous: false,
    urgency: "HIGH",
    trl: "6-7",
    domain: "Communications",
    tags: ["mesh", "networking", "secure", "battlefield"],
    votes: 433,
    responses: 15,
    views: 1050,
    timeAgo: "7 hours ago",
    hasVideo: true,
    status: "active",
  },
];

export default function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [selectedTRL, setSelectedTRL] = useState("all");
  const [sortBy, setSortBy] = useState("votes");
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);

  useEffect(() => {
    // Only initialize with mock data if localStorage is empty
    const storedChallenges = localStorage.getItem("challenges");
    if (!storedChallenges) {
      localStorage.setItem("challenges", JSON.stringify(mockChallenges));
      setChallenges(mockChallenges);
    } else {
      setChallenges(JSON.parse(storedChallenges));
    }
  }, []);

  const handleVote = (challengeId: number) => {
    setChallenges((prevChallenges: Challenge[]) => {
      const updatedChallenges = prevChallenges.map((challenge: Challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, votes: challenge.votes + 1 };
        }
        return challenge;
      });
      // Update localStorage
      localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      return updatedChallenges;
    });
  };

  // Filter challenges based on search and filters
  const filteredChallenges = challenges.filter((challenge: Challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === "all" ||
      challenge.domain.toLowerCase() === selectedDomain.toLowerCase();
    const matchesUrgency =
      selectedUrgency === "all" ||
      challenge.urgency.toLowerCase() === selectedUrgency.toLowerCase();
    const matchesTRL = selectedTRL === "all" || challenge.trl === selectedTRL;

    return matchesSearch && matchesDomain && matchesUrgency && matchesTRL;
  });

  // Sort challenges
  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    if (sortBy === "votes") return b.votes - a.votes;
    if (sortBy === "recent")
      return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
    return 0;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "URGENT":
        return "bg-red-600";
      case "HIGH":
        return "bg-orange-600";
      case "MEDIUM":
        return "bg-yellow-600";
      case "LOW":
        return "bg-green-600";
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

  // Helper to get trending/featured challenges
  const trendingChallenges = [...challenges]
    .filter((c) => c.status === "active")
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  // Helper to get recently solved challenges
  const recentlySolved = [...challenges]
    .filter((c) => c.status === "solved")
    .sort((a, b) => b.timeAgo.localeCompare(a.timeAgo))
    .slice(0, 3);

  // Live activity ticker mock data
  const activityMessages = [
    "WarfighterAlpha just posted a new challenge!",
    "PayloadMaster upvoted 'Drone-Based Minefield Mapping'!",
    "CyberOps commented on 'Drone Cybersecurity Hardening'!",
    "MedOps submitted a solution to 'Drone Medical Supply Delivery'!",
    "UrbanDeliver replied to 'Payload Delivery Accuracy in Urban Terrain'!",
    "BaseSecurity flagged a post for OPSEC review!",
    "ISR_TechLead marked a challenge as solved!",
    "CommsGuru started a trending discussion!",
    "RedTeam escalated a challenge for moderation!",
    "SAR_Command just joined the platform!",
  ];

  const [activityIndex, setActivityIndex] = useState(0);
  const activityInterval = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    activityInterval.current = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % activityMessages.length);
    }, 3500);
    return () => {
      if (activityInterval.current) clearInterval(activityInterval.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar activeTab="challenges" />
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
                    Urgency
                  </label>
                  <Select
                    value={selectedUrgency}
                    onValueChange={setSelectedUrgency}
                  >
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
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  Quick Stats
                </CardTitle>
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

            <Card className="bg-slate-800 border-military-gold">
              <CardHeader>
                <CardTitle className="text-military-gold text-lg">
                  Recently Solved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recentlySolved.map((challenge) => (
                    <li key={challenge.id} className="text-slate-300 text-sm">
                      <span className="font-semibold text-white">
                        {challenge.title}
                      </span>
                      <br />
                      <span className="text-xs text-military-gold">
                        {challenge.timeAgo}
                      </span>
                    </li>
                  ))}
                </ul>
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
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-slate-700"
                >
                  Active (
                  {challenges.filter((c) => c.status === "active").length})
                </TabsTrigger>
                <TabsTrigger
                  value="solved"
                  className="data-[state=active]:bg-slate-700"
                >
                  Solved (
                  {challenges.filter((c) => c.status === "solved").length})
                </TabsTrigger>
                <TabsTrigger
                  value="urgent"
                  className="data-[state=active]:bg-slate-700"
                >
                  Urgent (
                  {challenges.filter((c) => c.urgency === "URGENT").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {sortedChallenges
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
                              <Badge
                                className={getUrgencyColor(challenge.urgency)}
                              >
                                {challenge.urgency}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getTRLColor(challenge.trl)}
                              >
                                TRL {challenge.trl}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-slate-600 text-slate-400"
                              >
                                {challenge.domain}
                              </Badge>
                              {challenge.hasVideo && (
                                <Badge
                                  variant="outline"
                                  className="border-purple-500 text-purple-400"
                                >
                                  <Video className="w-3 h-3 mr-1" />
                                  Video
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-white text-xl mb-2 hover:text-blue-400 cursor-pointer">
                              <Link href={`/challenges/${challenge.id}`}>
                                {challenge.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="text-slate-300 text-base leading-relaxed">
                              {challenge.description}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col items-center bg-slate-700 rounded-lg p-3 min-w-[80px]">
                            <button
                              onClick={() => handleVote(challenge.id)}
                              className="flex items-center hover:text-blue-400"
                            >
                              <ArrowUp className="w-5 h-5 text-slate-400 hover:text-blue-400 cursor-pointer mb-1" />
                              <span className="text-white font-bold">
                                {challenge.votes}
                              </span>
                            </button>
                            <span className="text-xs text-slate-400">
                              votes
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {challenge.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-slate-700 text-slate-300 text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {challenge.anonymous
                                ? "Anonymous"
                                : challenge.author}
                              {challenge.verified && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-xs border-green-500 text-green-400 flex items-center"
                                >
                                  <Shield className="w-3 h-3 mr-1" />
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
                {sortedChallenges
                  .filter((c) => c.status === "solved")
                  .map((challenge) => (
                    <Card
                      key={challenge.id}
                      className="bg-slate-800 border-slate-700 opacity-75"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-600">SOLVED</Badge>
                              <Badge
                                variant="outline"
                                className={getTRLColor(challenge.trl)}
                              >
                                TRL {challenge.trl}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-slate-600 text-slate-400"
                              >
                                {challenge.domain}
                              </Badge>
                            </div>
                            <CardTitle className="text-white text-xl mb-2">
                              {challenge.title}
                            </CardTitle>
                            <CardDescription className="text-slate-300">
                              {challenge.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="urgent" className="space-y-4">
                {sortedChallenges
                  .filter((c) => c.urgency === "URGENT")
                  .map((challenge) => (
                    <Card
                      key={challenge.id}
                      className="bg-slate-800 border-red-500/50"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-red-600 animate-pulse">
                                {challenge.urgency}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={getTRLColor(challenge.trl)}
                              >
                                TRL {challenge.trl}
                              </Badge>
                            </div>
                            <CardTitle className="text-white text-xl mb-2">
                              {challenge.title}
                            </CardTitle>
                            <CardDescription className="text-slate-300">
                              {challenge.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>

            {/* Live Activity Ticker */}
            <div className="w-full bg-military-navy border-b border-military-gold text-military-gold text-center py-2 font-semibold animate-pulse">
              {activityMessages[activityIndex]}
            </div>

            {/* Trending/Featured Challenges */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-military-gold mb-4">
                Trending Challenges
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {trendingChallenges.map((challenge) => (
                  <Card
                    key={challenge.id}
                    className="bg-slate-800 border-military-gold"
                  >
                    <CardHeader>
                      <CardTitle className="text-white text-lg mb-2">
                        {challenge.title}
                      </CardTitle>
                      <CardDescription className="text-slate-300">
                        {challenge.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getUrgencyColor(challenge.urgency)}>
                          {challenge.urgency}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={getTRLColor(challenge.trl)}
                        >
                          TRL {challenge.trl}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-slate-400"
                        >
                          {challenge.domain}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <span>▲ {challenge.votes} votes</span>
                        <span>💬 {challenge.responses} responses</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
