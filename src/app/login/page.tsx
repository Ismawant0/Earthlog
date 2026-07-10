"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, ArrowLeft, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate API call for magic link login
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        router.push("/community");
      }, 2000);
    }, 1200);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-background py-16 px-6">
        <div className="w-full max-w-[400px] bg-white border border-border rounded-xl p-8 shadow-card space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2 select-none">
            <Link href="/" className="inline-flex items-center gap-1.5 justify-center font-semibold text-lg text-foreground group">
              <span>Earthlog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </Link>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Sign In</h2>
            <p className="text-xs text-foreground-sub">
              Access your personal action logs and contribution registry.
            </p>
          </div>

          {sent ? (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center space-y-3 select-none animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
              <h3 className="text-sm font-bold text-foreground">Magic Link Sent</h3>
              <p className="text-xs text-foreground-sub leading-relaxed">
                We sent a temporary sign-in link to <span className="font-semibold">{email}</span>. Redirecting you...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-error/5 border border-error/20 text-error text-[11px] font-semibold rounded-lg p-3 flex gap-2 items-center select-none">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-foreground-sub">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <Mail className="w-4 h-4 text-foreground-sub/60 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm hover:bg-primary-hover disabled:opacity-50 transition-colors select-none cursor-pointer"
              >
                {loading ? "Sending..." : "Send Magic Link"}
              </button>
            </form>
          )}

          <div className="border-t border-border pt-4 text-center select-none">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-foreground-sub hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
