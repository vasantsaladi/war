"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, FileVideo, X } from "lucide-react"
import Link from "next/link"

export default function SubmitChallengePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    urgency: "",
    trlLevel: "",
    tags: [] as string[],
    anonymous: false,
    hasClassified: false,
    videoFile: null as File | null,
  })

  const [currentTag, setCurrentTag] = useState("")
  const [showOpsecWarning, setShowOpsecWarning] = useState(false)

  const domains = [
    "Counter-UAS",
    "Logistics",
    "ISR (Intelligence, Surveillance, Reconnaissance)",
    "Electronic Warfare",
    "Communications",
    "Navigation",
    "Payload Systems",
    "Autonomous Systems",
    "Cybersecurity",
    "Other",
  ]

  const urgencyLevels = [
    { value: "urgent", label: "URGENT - Immediate operational need", color: "bg-red-600" },
    { value: "high", label: "HIGH - Critical capability gap", color: "bg-orange-600" },
    { value: "medium", label: "MEDIUM - Important enhancement", color: "bg-yellow-600" },
    { value: "low", label: "LOW - Future consideration", color: "bg-green-600" },
  ]

  const trlLevels = [
    {
      value: "1-2",
      label: "TRL 1-2: Basic Research",
      description: "Scientific research begins to be translated into applied research and development",
    },
    {
      value: "3-4",
      label: "TRL 3-4: Applied Research",
      description: "Active R&D is initiated with analytical and laboratory studies",
    },
    {
      value: "5-6",
      label: "TRL 5-6: Technology Development",
      description: "Technology is tested in relevant environment",
    },
    {
      value: "7-8",
      label: "TRL 7-8: Technology Demonstration",
      description: "System prototype demonstration in operational environment",
    },
    {
      value: "9",
      label: "TRL 9: System Operations",
      description: "Actual system proven through successful mission operations",
    },
  ]

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, videoFile: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Submitting challenge:", formData)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DW</span>
              </div>
              <span className="text-xl font-bold text-white">DroneWERX</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/challenges" className="text-slate-300 hover:text-white transition-colors">
                Challenges
              </Link>
              <Link href="/solutions" className="text-slate-300 hover:text-white transition-colors">
                Solutions
              </Link>
              <Link href="/submit" className="text-blue-400 font-medium">
                Submit
              </Link>
              <Button size="sm">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Submit New Challenge</h1>
          <p className="text-slate-400">
            Share your tactical challenge with the DroneWERX community to crowdsource innovative solutions.
          </p>
        </div>

        {/* OPSEC Warning */}
        <Alert className="mb-6 border-yellow-600 bg-yellow-600/10">
          <Shield className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-200">
            <strong>OPSEC Reminder:</strong> Do not include classified information, specific unit designations,
            operational details, or sensitive location data. All submissions are subject to moderation review.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Challenge Details</CardTitle>
              <CardDescription className="text-slate-400">
                Provide a clear and concise description of your tactical challenge.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-slate-300">
                  Challenge Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief, descriptive title of your challenge"
                  className="mt-2 bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-slate-300">
                  Detailed Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide detailed context, constraints, requirements, and desired outcomes. Include technical specifications if relevant."
                  className="mt-2 bg-slate-700 border-slate-600 text-white min-h-[120px]"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Be specific about operational context, technical constraints, and success criteria.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-slate-300">Domain *</Label>
                  <Select
                    value={formData.domain}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, domain: value }))}
                  >
                    <SelectTrigger className="mt-2 bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Select primary domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map((domain) => (
                        <SelectItem key={domain} value={domain.toLowerCase().replace(/\s+/g, "-")}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-slate-300">Urgency Level *</Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                    className="mt-2"
                  >
                    {urgencyLevels.map((level) => (
                      <div key={level.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={level.value} id={level.value} />
                        <Label htmlFor={level.value} className="text-slate-300 text-sm">
                          <Badge className={`${level.color} mr-2`}>{level.value.toUpperCase()}</Badge>
                          {level.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Requirements */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Technical Requirements</CardTitle>
              <CardDescription className="text-slate-400">
                Specify the technology readiness level and add relevant tags.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-slate-300">Target TRL Level *</Label>
                <Select
                  value={formData.trlLevel}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, trlLevel: value }))}
                >
                  <SelectTrigger className="mt-2 bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select desired TRL level" />
                  </SelectTrigger>
                  <SelectContent>
                    {trlLevels.map((trl) => (
                      <SelectItem key={trl.value} value={trl.value}>
                        <div>
                          <div className="font-medium">{trl.label}</div>
                          <div className="text-xs text-slate-400">{trl.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Tags</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add relevant tags (e.g., ai-ml, sensors, autonomous)"
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-300">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-red-400">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Supporting Media</CardTitle>
              <CardDescription className="text-slate-400">
                Upload a video overview to provide additional context (optional).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" id="video-upload" />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <FileVideo className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 mb-2">
                    {formData.videoFile ? formData.videoFile.name : "Click to upload video overview"}
                  </p>
                  <p className="text-xs text-slate-500">
                    MP4, MOV, AVI up to 100MB. Keep under 5 minutes for best engagement.
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Privacy & Security</CardTitle>
              <CardDescription className="text-slate-400">
                Configure how your challenge will be displayed and moderated.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={formData.anonymous}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, anonymous: !!checked }))}
                />
                <Label htmlFor="anonymous" className="text-slate-300">
                  Submit anonymously (your identity will be hidden from other users)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="classified"
                  checked={formData.hasClassified}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, hasClassified: !!checked }))
                    setShowOpsecWarning(!!checked)
                  }}
                />
                <Label htmlFor="classified" className="text-slate-300">
                  This challenge involves classified or sensitive information
                </Label>
              </div>

              {showOpsecWarning && (
                <Alert className="border-red-600 bg-red-600/10">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-200">
                    <strong>Warning:</strong> Challenges involving classified information require additional review and
                    may be restricted to verified users only. Ensure all details comply with security protocols before
                    submission.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700">
              Submit Challenge
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href="/challenges">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
