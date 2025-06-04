import Navbar from "@/components/ui/Navbar";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, Zap } from "lucide-react";

const leaderboardData = [
  {
    name: "WarfighterAlpha",
    role: "Top DoD Poster",
    points: 3120,
    avatarColor: "bg-military-gold",
    badge: "Verified DoD",
    category: "Most Challenges Posted",
  },
  {
    name: "PayloadMaster",
    role: "Top Solution Provider",
    points: 2890,
    avatarColor: "bg-military-olive",
    badge: "Industry",
    category: "Most Solutions",
  },
  {
    name: "CyberOps",
    role: "Security Expert",
    points: 2650,
    avatarColor: "bg-military-army",
    badge: "Verified DoD",
    category: "Most Upvotes",
  },
  {
    name: "ISR_TechLead",
    role: "ISR Innovator",
    points: 2410,
    avatarColor: "bg-military-gunmetal",
    badge: "Academia",
    category: "Most Comments",
  },
  {
    name: "CommsGuru",
    role: "Comms Specialist",
    points: 2200,
    avatarColor: "bg-military-steelGray",
    badge: "Industry",
    category: "Top Industry",
  },
  {
    name: "MedOps",
    role: "Medical Logistics",
    points: 2100,
    avatarColor: "bg-military-gold",
    badge: "Verified DoD",
    category: "Most Solutions Accepted",
  },
  {
    name: "RedTeam",
    role: "OPSEC Moderator",
    points: 1980,
    avatarColor: "bg-military-olive",
    badge: "Moderator",
    category: "Most Flags Reviewed",
  },
  {
    name: "UrbanDeliver",
    role: "Urban Ops",
    points: 1850,
    avatarColor: "bg-military-army",
    badge: "Verified DoD",
    category: "Most Upvotes",
  },
  {
    name: "SafeRouteAI",
    role: "AI Innovator",
    points: 1720,
    avatarColor: "bg-military-gunmetal",
    badge: "Industry",
    category: "Top AI Solution",
  },
  {
    name: "SAR_Command",
    role: "Search & Rescue",
    points: 1600,
    avatarColor: "bg-military-steelGray",
    badge: "Verified DoD",
    category: "Most Responses",
  },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar activeTab="leaderboard" />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-military-gold mb-8 text-center flex items-center justify-center gap-2">
          <Award className="w-8 h-8 text-military-gold" /> DroneWERX Leaderboard
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {leaderboardData.map((user, idx) => (
            <div
              key={user.name}
              className={`flex items-center bg-slate-800 border-l-4 ${
                idx === 0
                  ? "border-military-gold"
                  : idx === 1
                  ? "border-military-olive"
                  : idx === 2
                  ? "border-military-army"
                  : "border-slate-700"
              } rounded-lg shadow p-4 gap-6`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl ${user.avatarColor}`}
              >
                {user.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white">
                    {user.name}
                  </span>
                  <Badge className="bg-military-gold text-military-navy font-bold uppercase">
                    {user.badge}
                  </Badge>
                </div>
                <div className="text-slate-400 text-sm mb-1">
                  {user.role} •{" "}
                  <span className="text-military-gold font-semibold">
                    {user.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-xs">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-lg text-military-gold">
                    {user.points}
                  </span>{" "}
                  points
                </div>
              </div>
              <div className="flex flex-col items-end">
                {idx === 0 && (
                  <Shield className="w-6 h-6 text-military-gold mb-2" />
                )}
                {idx === 1 && (
                  <Award className="w-6 h-6 text-military-olive mb-2" />
                )}
                {idx === 2 && (
                  <Users className="w-6 h-6 text-military-army mb-2" />
                )}
                <span className="text-xs text-slate-400">Rank #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
