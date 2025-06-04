"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import Navbar from "@/components/ui/Navbar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle, Building, User, Clock, Eye, Award } from "lucide-react";

// Solution type
interface Solution {
  id: number;
  title: string;
  description: string;
  author: string;
  company: string;
  verified: boolean;
  challengeId: number;
  challengeTitle: string;
  trl: string;
  domain: string;
  tags: string[];
  votes: number;
  views: number;
  timeAgo: string;
  status: string;
  implementation: string;
  cost: string;
  timeline: string;
}

const mockSolutions: Solution[] = [
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

export default function SolutionDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  const [solution, setSolution] = useState<Solution | null>(null);

  useEffect(() => {
    // Find the solution by ID
    const found = mockSolutions.find((s) => s.id === id) || null;
    setSolution(found);
  }, [id]);

  if (!solution) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <Navbar activeTab="solutions" />
        <div className="text-white text-2xl mt-12">
          Solution not found.{" "}
          <Link href="/solutions" className="text-blue-400 underline ml-2">
            Back to Solutions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar activeTab="solutions" />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card className="bg-slate-800 border-military-gold mb-8">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
              <Badge className="bg-yellow-600 text-white font-bold uppercase">
                {solution.status}
              </Badge>
              <Badge
                variant="outline"
                className="border-slate-600 text-slate-400"
              >
                {solution.domain}
              </Badge>
              <Badge
                variant="outline"
                className="border-green-500 text-green-400"
              >
                TRL {solution.trl}
              </Badge>
              <Badge
                variant="outline"
                className="border-purple-500 text-purple-400"
              >
                {"$".repeat(solution.cost.length)}
              </Badge>
            </div>
            <CardTitle className="text-white text-2xl mb-2">
              {solution.title}
            </CardTitle>
            <CardDescription className="text-slate-300 text-lg mb-2">
              {solution.description}
            </CardDescription>
            <div className="mb-2">
              <span className="text-slate-400 text-sm">
                Addresses Challenge:{" "}
              </span>
              <Link
                href={`/challenges/${solution.challengeId}`}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                {solution.challengeTitle}
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
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
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-slate-700/30 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-slate-400">Implementation</p>
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
                  {"$".repeat(solution.cost.length)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
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
        <div className="flex justify-center">
          <Link
            href="/solutions"
            className="text-blue-400 hover:text-blue-300 font-medium text-lg flex items-center gap-2"
          >
            <Award className="w-5 h-5" /> Back to Solutions
          </Link>
        </div>
      </div>
    </div>
  );
}
