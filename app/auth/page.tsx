"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Building, User } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [userType, setUserType] = useState("warfighter")
  const [verificationStep, setVerificationStep] = useState(1)

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">DroneWERX</span>
          </Link>
          <p className="text-slate-400">Secure access to the warfighter collaboration platform</p>
        </div>

        <Tabs defaultValue="signin" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="signin" className="data-[state=active]:bg-slate-700">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-slate-700">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Welcome Back</CardTitle>
                <CardDescription className="text-slate-400">Sign in to access challenges and solutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@mil"
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-slate-300">
                    Password
                  </Label>
                  <Input id="password" type="password" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-slate-300 text-sm">
                    Remember me
                  </Label>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign In</Button>
                <div className="text-center">
                  <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                    Forgot your password?
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Create Account</CardTitle>
                <CardDescription className="text-slate-400">Join the DroneWERX community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Type Selection */}
                <div>
                  <Label className="text-slate-300">Account Type</Label>
                  <Select value={userType} onValueChange={setUserType}>
                    <SelectTrigger className="mt-1 bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warfighter">
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          Warfighter (DoD Personnel)
                        </div>
                      </SelectItem>
                      <SelectItem value="industry">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2" />
                          Industry Partner
                        </div>
                      </SelectItem>
                      <SelectItem value="academic">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Academic/Researcher
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-300">
                      First Name
                    </Label>
                    <Input id="firstName" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-300">
                      Last Name
                    </Label>
                    <Input id="lastName" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={userType === "warfighter" ? "your.name@mil" : "your.email@company.com"}
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-slate-300">
                    Password
                  </Label>
                  <Input id="password" type="password" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                </div>

                {/* Warfighter-specific fields */}
                {userType === "warfighter" && (
                  <>
                    <Alert className="border-blue-600 bg-blue-600/10">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <AlertDescription className="text-blue-200">
                        DoD personnel require additional verification. You'll receive verification instructions via your
                        .mil email address after registration.
                      </AlertDescription>
                    </Alert>

                    <div>
                      <Label htmlFor="branch" className="text-slate-300">
                        Service Branch
                      </Label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="army">U.S. Army</SelectItem>
                          <SelectItem value="navy">U.S. Navy</SelectItem>
                          <SelectItem value="airforce">U.S. Air Force</SelectItem>
                          <SelectItem value="marines">U.S. Marines</SelectItem>
                          <SelectItem value="spaceforce">U.S. Space Force</SelectItem>
                          <SelectItem value="coastguard">U.S. Coast Guard</SelectItem>
                          <SelectItem value="socom">USSOCOM</SelectItem>
                          <SelectItem value="other">Other DoD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="clearance" className="text-slate-300">
                        Security Clearance Level
                      </Label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Select clearance level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public-trust">Public Trust</SelectItem>
                          <SelectItem value="confidential">Confidential</SelectItem>
                          <SelectItem value="secret">Secret</SelectItem>
                          <SelectItem value="top-secret">Top Secret</SelectItem>
                          <SelectItem value="ts-sci">TS/SCI</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Industry-specific fields */}
                {userType === "industry" && (
                  <>
                    <div>
                      <Label htmlFor="company" className="text-slate-300">
                        Company/Organization
                      </Label>
                      <Input id="company" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                    </div>

                    <div>
                      <Label htmlFor="role" className="text-slate-300">
                        Role/Title
                      </Label>
                      <Input id="role" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                    </div>

                    <Alert className="border-yellow-600 bg-yellow-600/10">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <AlertDescription className="text-yellow-200">
                        Industry partners require company verification and may have restricted access to certain
                        classified challenges.
                      </AlertDescription>
                    </Alert>
                  </>
                )}

                {/* Academic-specific fields */}
                {userType === "academic" && (
                  <>
                    <div>
                      <Label htmlFor="institution" className="text-slate-300">
                        Institution
                      </Label>
                      <Input id="institution" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                    </div>

                    <div>
                      <Label htmlFor="department" className="text-slate-300">
                        Department/Field
                      </Label>
                      <Input id="department" className="mt-1 bg-slate-700 border-slate-600 text-white" />
                    </div>
                  </>
                )}

                {/* Terms and Conditions */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" />
                    <Label htmlFor="terms" className="text-slate-300 text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="#" className="text-blue-400 hover:text-blue-300">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-blue-400 hover:text-blue-300">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="opsec" className="mt-1" />
                    <Label htmlFor="opsec" className="text-slate-300 text-sm leading-relaxed">
                      I understand and agree to comply with OPSEC guidelines and will not share classified or sensitive
                      information
                    </Label>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Verification Status */}
        <Card className="mt-6 bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-slate-300 text-sm">Platform Status</span>
              </div>
              <Badge className="bg-green-600">OPERATIONAL</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              All systems operational. New user verification typically takes 24-48 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
