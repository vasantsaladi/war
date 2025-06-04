"use client";
import Link from "next/link";
import { Button } from "./button";
import { Badge } from "./badge";
import { useEffect, useState } from "react";

interface User {
  name: string;
  badge?: string;
  avatarColor?: string;
}

export default function Navbar({ activeTab }: { activeTab?: string }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem("signedInUser");
    setUser(stored ? JSON.parse(stored) : null);
  }, []);
  function handleSignOut() {
    localStorage.removeItem("signedInUser");
    window.location.href = "/";
  }
  return (
    <header className="border-b border-military-gold bg-military-navy sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {/* Military Shield Logo */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="8"
                y="4"
                width="32"
                height="40"
                rx="8"
                fill="#3A4D39"
                stroke="#FFD700"
                strokeWidth="3"
              />
              <path d="M24 12L32 20H16L24 12Z" fill="#FFD700" />
              <circle
                cx="24"
                cy="28"
                r="6"
                fill="#556B2F"
                stroke="#FFD700"
                strokeWidth="2"
              />
            </svg>
            <span className="text-xl font-bold text-military-gold tracking-wide">
              DroneWERX
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/challenges"
              className={`font-medium transition-colors ${
                activeTab === "challenges"
                  ? "text-military-gold"
                  : "text-military-steelGray hover:text-military-gold"
              }`}
            >
              Challenges
            </Link>
            <Link
              href="/solutions"
              className={`font-medium transition-colors ${
                activeTab === "solutions"
                  ? "text-military-gold"
                  : "text-military-steelGray hover:text-military-gold"
              }`}
            >
              Solutions
            </Link>
            <Link
              href="/leaderboard"
              className={`font-medium transition-colors ${
                activeTab === "leaderboard"
                  ? "text-military-gold"
                  : "text-military-steelGray hover:text-military-gold"
              }`}
            >
              Leaderboard
            </Link>
            <Link
              href="/submit"
              className={`font-medium transition-colors ${
                activeTab === "submit"
                  ? "text-military-gold"
                  : "text-military-steelGray hover:text-military-gold"
              }`}
            >
              Submit
            </Link>
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    user.avatarColor || "bg-military-olive"
                  }`}
                >
                  {user.name[0]}
                </div>
                <span className="text-military-gold font-semibold">
                  {user.name}
                </span>
                {user.badge && (
                  <span className="ml-1 px-2 py-0.5 rounded bg-military-gold text-military-navy text-xs font-bold uppercase">
                    {user.badge}
                  </span>
                )}
                <Button
                  size="sm"
                  className="border border-military-gold text-military-gold bg-transparent hover:bg-military-gold hover:text-military-navy transition-colors"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="border border-military-gold text-military-gold bg-transparent hover:bg-military-gold hover:text-military-navy transition-colors"
                asChild
              >
                <Link href="/auth">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
