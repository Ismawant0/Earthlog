"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ACTION_CATEGORIES, saveAction } from "@/lib/actions";
import { Upload, CheckCircle2, AlertCircle, Leaf } from "lucide-react";

export default function SubmitActionPage() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [category, setCategory] = useState(ACTION_CATEGORIES[0]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState(today);
  const [photo, setPhoto] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setError("Please select an image smaller than 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!photo) {
      setError("Please upload a photo of your action.");
      return;
    }
    if (!title.trim()) {
      setError("Please enter a title for your action.");
      return;
    }
    if (!story.trim()) {
      setError("Please describe what you did.");
      return;
    }

    try {
      saveAction({
        category,
        title: title.trim(),
        story: story.trim(),
        photo,
        country: country.trim() || "Unknown",
        location: city.trim() || undefined,
        date,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/community");
      }, 1800);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background text-foreground py-16 md:py-24">
        <div className="max-w-[600px] mx-auto px-6 space-y-10">

          {/* Header */}
          <div className="space-y-4 border-b border-border pb-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary select-none flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              Environmental Registry
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Log a New Action</h1>
            <p className="text-sm text-foreground-sub leading-relaxed">
              Document a small positive action you performed for the planet. Your entry will appear in the global community feed.
            </p>
          </div>

          {success ? (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-10 text-center space-y-4 select-none">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <h3 className="font-bold text-lg text-foreground">Action Logged Successfully</h3>
              <p className="text-sm text-foreground-sub leading-relaxed">
                Thank you for leaving your mark. Redirecting you to the community feed...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex gap-2 items-start text-xs font-semibold select-none">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Photo Upload — Required */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                  Photo <span className="text-primary">*</span>
                </label>
                <div className="flex flex-col items-center justify-center border border-dashed border-border rounded-xl p-6 bg-white hover:bg-[#f5f5f2] transition-colors relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {photo ? (
                    <div className="space-y-2 text-center w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo}
                        alt="Preview"
                        className="max-h-44 mx-auto rounded-lg object-cover border border-border shadow-sm"
                      />
                      <span className="text-xs text-primary font-bold">Photo loaded — click to replace</span>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 py-4 select-none">
                      <Upload className="w-8 h-8 text-foreground-sub/40 mx-auto" />
                      <div className="text-xs font-semibold text-foreground">Click to upload a photo</div>
                      <div className="text-[10px] text-foreground-sub/70">JPEG, PNG, or WEBP · max 3MB</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                  Category <span className="text-primary">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
                >
                  {ACTION_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                  Title <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  placeholder="e.g. Planted two mango trees with my father"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Story */}
              <div className="space-y-2">
                <label htmlFor="story" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                  What did you do? <span className="text-primary">*</span>
                </label>
                <textarea
                  id="story"
                  required
                  rows={5}
                  placeholder="Describe your action simply and honestly. No markdown, no formatting — just your story."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Country & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="country" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                    Country <span className="text-foreground-sub/50 font-normal normal-case">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    placeholder="e.g. Indonesia"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                    City <span className="text-foreground-sub/50 font-normal normal-case">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="e.g. Malang"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  max={today}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between select-none border-t border-border pt-6">
                <span className="text-[11px] text-foreground-sub/60 italic">
                  <span className="text-primary font-bold">*</span> Required fields
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-bold text-sm rounded-md shadow-sm hover:bg-primary-hover transition-colors cursor-pointer tracking-wide"
                >
                  Log Action
                </button>
              </div>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
