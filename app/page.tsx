import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Users, Zap, Search, MessageSquare, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DroneWERX</span>
              <Badge variant="outline" className="text-xs border-blue-500 text-blue-400">
                BETA
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/challenges" className="text-slate-300 hover:text-white transition-colors">
                Challenges
              </Link>
              <Link href="/solutions" className="text-slate-300 hover:text-white transition-colors">
                Solutions
              </Link>
              <Link href="/leaderboard" className="text-slate-300 hover:text-white transition-colors">
                Leaderboard
              </Link>
              <Button asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              The Warfighter's
              <span className="text-blue-400 block">Collaboration Hub</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Connecting tactical challenges with innovative solutions. A secure platform where warfighters meet
              technologists to advance drone capabilities and emerging defense technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/challenges">
                  Browse Challenges <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <Link href="/submit">Submit Challenge</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Platform Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built specifically for defense innovation with security, collaboration, and rapid solution development in
              mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Shield className="w-8 h-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">Secure Submissions</CardTitle>
                <CardDescription className="text-slate-400">
                  Anonymous or verified challenge submission with OPSEC compliance and moderation workflows.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Users className="w-8 h-8 text-green-400 mb-2" />
                <CardTitle className="text-white">Community Driven</CardTitle>
                <CardDescription className="text-slate-400">
                  Upvoting, tagging, TRL levels, urgency labels, and collaborative problem-solving features.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <Search className="w-8 h-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">Smart Matching</CardTitle>
                <CardDescription className="text-slate-400">
                  AI-powered matching between challenges and solutions with searchable historical archives.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">247</div>
              <div className="text-slate-400">Active Challenges</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">1,832</div>
              <div className="text-slate-400">Solutions Submitted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">89</div>
              <div className="text-slate-400">Verified DoD Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">156</div>
              <div className="text-slate-400">Industry Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Recent Activity</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-600">URGENT</Badge>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    TRL 3-4
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg">Counter-UAS Swarm Detection</CardTitle>
                <CardDescription className="text-slate-400">
                  Need rapid detection system for coordinated drone swarms in urban environments...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      23 responses
                    </span>
                    <span className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      847 votes
                    </span>
                  </div>
                  <span>2 hours ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-yellow-600">MEDIUM</Badge>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    TRL 6-7
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg">Autonomous Resupply Drones</CardTitle>
                <CardDescription className="text-slate-400">
                  Looking for solutions to extend operational range of supply missions...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      41 responses
                    </span>
                    <span className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      1,203 votes
                    </span>
                  </div>
                  <span>6 hours ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">DroneWERX</span>
            </div>
            <div className="text-slate-400 text-sm text-center md:text-right">
              <p>A collaboration between USNDA, SCSP, NCS, Tesseract Ventures, and USSOCOM</p>
              <p className="mt-1">Secure • Compliant • Innovation-Focused</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
