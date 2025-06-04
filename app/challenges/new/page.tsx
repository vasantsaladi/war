"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from "lucide-react";

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

export default function NewChallengePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [urgency, setUrgency] = useState("");
  const [trl, setTRL] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSensitive, setIsSensitive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get existing challenges
    const existingChallenges = JSON.parse(
      localStorage.getItem("challenges") || "[]"
    );

    // Create new challenge
    const newChallenge: Challenge = {
      id: Date.now(), // Use timestamp as unique ID
      title,
      description,
      author: "DemoWarfighter", // For demo purposes
      verified: true,
      anonymous: isAnonymous,
      urgency,
      trl,
      domain,
      tags,
      votes: 0,
      responses: 0,
      views: 0,
      timeAgo: "Just now",
      hasVideo: false,
      status: "active",
    };

    // Add to challenges array
    const updatedChallenges = [...existingChallenges, newChallenge];

    // Save to localStorage
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));

    // Redirect to challenges page
    router.push("/challenges");
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar activeTab="challenges" />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-2xl mb-2">
              Submit New Challenge
            </CardTitle>
            <CardDescription className="text-slate-300">
              Share your tactical challenge with the DroneWERX community to
              crowdsource innovative solutions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="text-yellow-500 font-semibold mb-1">
                    OPSEC Reminder
                  </h4>
                  <p className="text-slate-300 text-sm">
                    Do not include classified information, specific unit
                    designations, operational details, or sensitive location
                    data. All submissions are subject to moderation review.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">
                  Challenge Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">
                  Detailed Description *
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white min-h-[200px]"
                  required
                />
                <p className="text-slate-400 text-sm mt-1">
                  Be specific about operational context, technical constraints,
                  and success criteria.
                </p>
              </div>

              <div>
                <label className="block text-white mb-2">Domain *</label>
                <Select value={domain} onValueChange={setDomain} required>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select primary domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Counter-UAS">Counter-UAS</SelectItem>
                    <SelectItem value="ISR">ISR</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Electronic Warfare">
                      Electronic Warfare
                    </SelectItem>
                    <SelectItem value="Communications">
                      Communications
                    </SelectItem>
                    <SelectItem value="Payload Systems">
                      Payload Systems
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white mb-2">Urgency Level *</label>
                <Select value={urgency} onValueChange={setUrgency} required>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="URGENT">
                      URGENT - Immediate operational need
                    </SelectItem>
                    <SelectItem value="HIGH">
                      HIGH - Critical capability gap
                    </SelectItem>
                    <SelectItem value="MEDIUM">
                      MEDIUM - Important enhancement
                    </SelectItem>
                    <SelectItem value="LOW">
                      LOW - Future consideration
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white mb-2">
                  Target TRL Level *
                </label>
                <Select value={trl} onValueChange={setTRL} required>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select desired TRL level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">TRL 1-2: Basic Research</SelectItem>
                    <SelectItem value="3-4">
                      TRL 3-4: Proof of Concept
                    </SelectItem>
                    <SelectItem value="5-6">TRL 5-6: Prototype</SelectItem>
                    <SelectItem value="7-8">TRL 7-8: Field Testing</SelectItem>
                    <SelectItem value="9">TRL 9: Production Ready</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Add a tag"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-slate-700 text-slate-300"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-slate-600 bg-slate-700"
                  />
                  <label htmlFor="anonymous" className="text-white">
                    Submit anonymously (your identity will be hidden from other
                    users)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sensitive"
                    checked={isSensitive}
                    onChange={(e) => setIsSensitive(e.target.checked)}
                    className="rounded border-slate-600 bg-slate-700"
                  />
                  <label htmlFor="sensitive" className="text-white">
                    This challenge involves classified or sensitive information
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Challenge
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
