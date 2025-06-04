"use client";

import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  MessageSquare,
  Eye,
  Video,
  Shield,
  User,
  Target,
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

interface User {
  id: number;
  name: string;
  avatarColor: string;
  badge?: string;
  isOP?: boolean;
}

interface Comment {
  id: number;
  user: User;
  content: string;
  upvotes: number;
  timestamp: string;
  replies?: Comment[];
}

const fakeUsers: User[] = [
  {
    id: 1,
    name: "WarfighterAlpha",
    avatarColor: "bg-military-gold",
    badge: "Verified DoD",
    isOP: true,
  },
  {
    id: 2,
    name: "PayloadMaster",
    avatarColor: "bg-military-olive",
    badge: "Industry",
  },
  {
    id: 3,
    name: "CyberOps",
    avatarColor: "bg-military-army",
    badge: "Verified DoD",
  },
  { id: 4, name: "NightHawk_Ops", avatarColor: "bg-military-gunmetal" },
  {
    id: 5,
    name: "CommsGuru",
    avatarColor: "bg-military-steelGray",
    badge: "Academia",
  },
  { id: 6, name: "NavAI_Tech", avatarColor: "bg-military-gold" },
  {
    id: 7,
    name: "EW_Specialist",
    avatarColor: "bg-military-olive",
    badge: "Verified DoD",
  },
  { id: 8, name: "UrbanDeliver", avatarColor: "bg-military-army" },
  { id: 9, name: "ArcticOps", avatarColor: "bg-military-gunmetal" },
  { id: 10, name: "Anonymous", avatarColor: "bg-gray-500" },
];

function generateFakeComments(count: number, opUser: User): Comment[] {
  // Realistic, context-aware comments for the Autonomous Resupply Drone Range Extension
  const commentPool = [
    {
      user: fakeUsers.find((u) => u.name === "CyberOps")!,
      content:
        "We've had success extending range by optimizing flight paths and reducing payload weight. Recommend looking into hybrid battery/fuel systems for longer missions.",
      upvotes: 88,
      timestamp: "2 hours ago",
      replies: [
        {
          user: fakeUsers.find((u) => u.name === "WarfighterAlpha")!,
          content:
            "Hybrid systems are promising, but maintenance in the field is a concern. Any COTS solutions you'd recommend?",
          upvotes: 9,
          timestamp: "10 hours ago",
        },
      ],
    },
    {
      user: fakeUsers.find((u) => u.name === "CommsGuru")!,
      content:
        "Have you considered mesh networking for mid-mission battery swaps? Could coordinate multiple drones for relay delivery.",
      upvotes: 18,
      timestamp: "2 hours ago",
    },
    {
      user: fakeUsers.find((u) => u.name === "NightHawk_Ops")!,
      content:
        "Weather resilience is a big challenge in our AO. We use heated battery enclosures for cold ops, but it adds weight.",
      upvotes: 56,
      timestamp: "12 hours ago",
    },
    {
      user: fakeUsers.find((u) => u.name === "Anonymous")!,
      content:
        "Appreciate the suggestions. Has anyone field-tested solar-assisted charging in contested environments?",
      upvotes: 68,
      timestamp: "1 hour ago",
    },
    {
      user: fakeUsers.find((u) => u.name === "PayloadMaster")!,
      content:
        "We're piloting a modular payload bay that allows for rapid battery swaps. Can share test data if interested.",
      upvotes: 99,
      timestamp: "1 hour ago",
    },
    {
      user: fakeUsers.find((u) => u.name === "EW_Specialist")!,
      content:
        "OPSEC note: Avoid discussing specific mission profiles here. For classified details, use the secure channel.",
      upvotes: 34,
      timestamp: "4 hours ago",
    },
    {
      user: fakeUsers.find((u) => u.name === "UrbanDeliver")!,
      content:
        "Obstacle avoidance is key for urban drops. We use LIDAR and real-time wind compensation.",
      upvotes: 46,
      timestamp: "9 hours ago",
    },
    {
      user: fakeUsers.find((u) => u.name === "NavAI_Tech")!,
      content:
        "Computer vision for landing zone selection has improved our drop accuracy by 30%.",
      upvotes: 11,
      timestamp: "11 hours ago",
    },
    {
      user: fakeUsers.find((u) => u.name === "CyberOps")!,
      content:
        "We're also testing encrypted comms for remote diagnostics. Early results are promising.",
      upvotes: 75,
      timestamp: "12 hours ago",
    },
    {
      user: fakeUsers.find((u) => u.name === "ArcticOps")!,
      content:
        "Extreme cold ops: recommend lithium-sulfur batteries for better performance below -20C.",
      upvotes: 76,
      timestamp: "12 hours ago",
    },
    // ...add more realistic comments as needed...
  ];
  // Repeat and shuffle to reach the desired count
  const comments: Comment[] = [];
  let i = 0;
  while (comments.length < count) {
    const base = commentPool[i % commentPool.length];
    const comment: Comment = {
      id: comments.length + 1,
      user: base.user,
      content: base.content,
      upvotes: base.upvotes + Math.floor(Math.random() * 10),
      timestamp: base.timestamp,
      replies: base.replies?.map((r, idx) => ({
        id: 1000 + comments.length + idx,
        user: r.user,
        content: r.content,
        upvotes: r.upvotes + Math.floor(Math.random() * 5),
        timestamp: r.timestamp,
      })),
    };
    comments.push(comment);
    i++;
  }
  return comments;
}

function addReplyRecursive(
  comments: Comment[],
  parentId: number,
  newReply: Comment
): Comment[] {
  return comments.map((c) => {
    if (c.id === parentId) {
      return {
        ...c,
        replies: c.replies ? [...c.replies, newReply] : [newReply],
      };
    } else if (c.replies && c.replies.length > 0) {
      return {
        ...c,
        replies: addReplyRecursive(c.replies, parentId, newReply),
      };
    }
    return c;
  });
}

function getSignedInUser() {
  const user = localStorage.getItem("signedInUser");
  return user ? JSON.parse(user) : null;
}

export default function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortOrder, setSortOrder] = useState<"best" | "newest" | "oldest">(
    "best"
  );
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    // Get challenge from localStorage
    let challenges = JSON.parse(localStorage.getItem("challenges") || "[]");
    let foundChallenge = challenges.find((c: Challenge) => c.id === Number(id));
    if (!foundChallenge) {
      // Repopulate with latest mock data if not found
      challenges = [
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
          tags: [
            "autonomous",
            "resupply",
            "range-extension",
            "weather-resistant",
          ],
          votes: 1203,
          responses: 44,
          views: 4567,
          timeAgo: "6 hours ago",
          hasVideo: false,
          status: "active",
        },
        // ... (repeat for all 10+ mock challenges as in app/challenges/page.tsx) ...
      ];
      localStorage.setItem("challenges", JSON.stringify(challenges));
      foundChallenge = challenges.find((c: Challenge) => c.id === Number(id));
    }
    if (foundChallenge) {
      setChallenge(foundChallenge);
      // Increment views
      const updatedChallenges = challenges.map((c: Challenge) => {
        if (c.id === Number(id)) {
          return { ...c, views: c.views + 1 };
        }
        return c;
      });
      localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      // Generate comments for this challenge
      const opUser =
        fakeUsers.find((u) => u.name === foundChallenge.author) || fakeUsers[0];
      setComments(generateFakeComments(foundChallenge.responses, opUser));
    } else {
      setChallenge(null);
    }
  }, [id]);

  const handleVote = () => {
    if (!challenge) return;

    const challenges = JSON.parse(localStorage.getItem("challenges") || "[]");
    const updatedChallenges = challenges.map((c: Challenge) => {
      if (c.id === challenge.id) {
        return { ...c, votes: c.votes + 1 };
      }
      return c;
    });
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
    setChallenge({ ...challenge, votes: challenge.votes + 1 });
  };

  const handleCommentVote = (comment: Comment, vote: number) => {
    const updatedComments = comments.map((c) => {
      if (c.id === comment.id) {
        return { ...c, upvotes: c.upvotes + vote };
      }
      return c;
    });
    setComments(updatedComments);
  };

  const handleReply = (comment: Comment) => {
    setReplyingTo(comment.id);
    setReplyText("");
  };

  const handlePostReply = (parentId: number) => {
    if (!replyText.trim()) return;
    const signedInUser = getSignedInUser();
    if (!signedInUser) {
      window.location.href = "/auth";
      return;
    }
    const newReply = {
      id: Date.now(),
      user: signedInUser,
      content: replyText,
      upvotes: 0,
      timestamp: "Just now",
      replies: [],
    };
    setComments((prevComments) =>
      addReplyRecursive(prevComments, parentId, newReply)
    );
    setReplyingTo(null);
    setReplyText("");
  };

  // Helper to render user avatar
  function UserAvatar({ user }: { user: User }) {
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg ${user.avatarColor}`}
      >
        {user.name === "Anonymous" ? (
          <span>?</span>
        ) : (
          user.name.split(" ")[0][0]
        )}
      </div>
    );
  }

  // Helper to render badges
  function UserBadge({ user }: { user: User }) {
    if (user.badge) {
      return (
        <span className="ml-2 px-2 py-0.5 rounded bg-military-gold text-military-navy text-xs font-bold uppercase">
          {user.badge}
        </span>
      );
    }
    return null;
  }

  // Helper to render OP badge
  function OPBadge({ user }: { user: User }) {
    if (user.isOP) {
      return (
        <span className="ml-2 px-2 py-0.5 rounded bg-military-olive text-military-gold text-xs font-bold uppercase">
          OP
        </span>
      );
    }
    return null;
  }

  // Helper to render a comment (with nested replies)
  function CommentThread({
    comment,
    depth = 0,
  }: {
    comment: Comment;
    depth?: number;
  }) {
    return (
      <div
        className={`flex flex-col ${
          depth > 0 ? "ml-8 border-l-2 border-military-gold pl-4" : ""
        } mb-4`}
      >
        <div className="flex items-start gap-3">
          <UserAvatar user={comment.user} />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-military-gold">
                {comment.user.name}
              </span>
              <UserBadge user={comment.user} />
              <OPBadge user={comment.user} />
              <span className="text-xs text-military-steelGray ml-2">
                {comment.timestamp}
              </span>
            </div>
            <div className="text-slate-200 mb-1">{comment.content}</div>
            <div className="flex items-center gap-3 text-xs text-military-steelGray">
              <button
                className="flex items-center gap-1 hover:text-military-gold"
                onClick={() => handleCommentVote(comment, 1)}
              >
                <span className="font-bold">▲</span> {comment.upvotes}
              </button>
              <button
                className="flex items-center gap-1 hover:text-military-gold"
                onClick={() => handleCommentVote(comment, -1)}
              >
                <span className="font-bold">▼</span>
              </button>
              <button
                className="hover:text-military-gold"
                onClick={() => handleReply(comment)}
              >
                Reply
              </button>
            </div>
            {/* Reply input box */}
            {replyingTo === comment.id && (
              <div className="mt-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full bg-slate-800 border-military-gold text-military-gold rounded px-2 py-1"
                />
                <button
                  className="mt-2 bg-slate-800 border-military-gold text-military-gold rounded px-2 py-1"
                  onClick={() => handlePostReply(comment.id)}
                >
                  Post Reply
                </button>
                <button
                  className="ml-2 text-xs text-military-steelGray hover:text-military-gold"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <CommentThread key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (challenge === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">
          Challenge not found. Please return to the challenge list.
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar activeTab="challenges" />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/challenges"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Challenges
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">{challenge.title}</h1>
            <div className="flex items-center space-x-4">
              <Badge className={getUrgencyColor(challenge.urgency)}>
                {challenge.urgency}
              </Badge>
              <Badge variant="outline" className={getTRLColor(challenge.trl)}>
                TRL {challenge.trl}
              </Badge>
            </div>
          </div>
        </div>

        {/* OP Post */}
        <Card className="bg-slate-800 border-military-gold mb-8">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
              <UserAvatar
                user={{
                  name: challenge.anonymous ? "Anonymous" : challenge.author,
                  avatarColor: challenge.anonymous
                    ? "bg-gray-500"
                    : "bg-military-gold",
                  badge: challenge.verified ? "Verified DoD" : undefined,
                  isOP: true,
                  id: 0,
                }}
              />
              <div>
                <span className="font-bold text-military-gold text-lg">
                  {challenge.anonymous ? "Anonymous" : challenge.author}
                </span>
                {challenge.verified && (
                  <UserBadge user={{ badge: "Verified DoD" } as User} />
                )}
                <span className="ml-2 text-xs text-military-steelGray">
                  {challenge.timeAgo}
                </span>
              </div>
              <span className="ml-auto px-2 py-0.5 rounded bg-military-olive text-military-gold text-xs font-bold uppercase">
                OP
              </span>
            </div>
            <CardTitle className="text-white text-2xl mb-2">
              {challenge.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getUrgencyColor(challenge.urgency)}>
                {challenge.urgency}
              </Badge>
              <Badge variant="outline" className={getTRLColor(challenge.trl)}>
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
                  <Video className="w-3 h-3 mr-1" /> Video
                </Badge>
              )}
            </div>
            <CardDescription className="text-slate-300 text-base leading-relaxed mb-2">
              {challenge.description}
            </CardDescription>
            <div className="flex flex-wrap gap-2 mb-2">
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
            {/* Moderation/OPSEC Badge */}
            <div className="flex items-center gap-2 mt-2">
              <Shield className="w-4 h-4 text-military-gold" />
              <span className="text-xs text-military-gold font-bold uppercase">
                OPSEC Cleared • Moderation Workflow Active
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Comments Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-military-gold">
              Comments ({comments.length})
            </h2>
            {/* Sort by dropdown (mock) */}
            <select
              className="bg-slate-800 border-military-gold text-military-gold rounded px-2 py-1"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
            >
              <option value="best">Best</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div>
            {comments.map((comment) => (
              <CommentThread key={comment.id} comment={comment} />
            ))}
          </div>
        </div>

        {/* Post a Comment Box */}
        <div className="mt-8">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full bg-slate-800 border-military-gold text-military-gold rounded px-2 py-1"
          />
          <button
            className="mt-2 bg-slate-800 border-military-gold text-military-gold rounded px-2 py-1"
            onClick={() => handleReply(comments[0])}
          >
            Post Reply
          </button>
        </div>
      </div>
    </div>
  );
}
