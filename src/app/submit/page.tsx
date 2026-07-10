"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ACTION_CATEGORIES, saveAction } from "@/lib/actions";
import { Upload, MapPin, CheckCircle, AlertCircle, Leaf } from "lucide-react";

// Helper category image fallbacks
const CATEGORY_FALLBACKS: Record<string, string> = {
  "Plant a Tree": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  "Pick Up Trash": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
  "Save Water": "https://images.unsplash.com/photo-1548858860-82e3f24bfcca?auto=format&fit=crop&w=800&q=80",
  "Bike Instead": "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
  "Reduce Plastic": "https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&w=800&q=80",
  "Protect Wildlife": "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80",
  "Plant Flowers": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
  "Community Cleanup": "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=800&q=80",
};

export default function SubmitActionPage() {
  const router = useRouter();
  const [category, setCategory] = useState(ACTION_CATEGORIES[0]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [photo, setPhoto] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (under 2MB to fit local storage limit)
    if (file.size > 2 * 1024 * 1024) {
      setError("Please select an image smaller than 2MB to store locally.");
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

    if (!title.trim() || !story.trim() || !country.trim()) {
      setError("Please fill out all required fields: Title, Story, and Country.");
      return;
    }

    try {
      // Determine photo
      const finalPhoto = photo || CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS["Plant a Tree"];

      saveAction({
        category,
        title: title.trim(),
        story: story.trim(),
        photo: finalPhoto,
        country: country.trim(),
        location: location.trim() || undefined,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/community");
      }, 1500);
    } catch (err) {
      setError("An error occurred while saving your action. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-background text-foreground py-16 md:py-24">
        <div className="max-w-[620px] mx-auto px-6 space-y-10">
          
          {/* Header */}
          <div className="space-y-4 border-b border-border pb-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary select-none flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5" />
              Environmental Registry
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Log a New Action</h1>
            <p className="text-sm text-foreground-sub leading-relaxed">
              Quietly document a small positive action you performed for the planet. Your entry will be added to the global feed and contribution grid.
            </p>
          </div>

          {success ? (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center space-y-4 select-none">
              <CheckCircle className="w-12 h-12 text-primary mx-auto" />
              <h3 className="font-semibold text-lg text-foreground">Action Logged Successfully</h3>
              <p className="text-sm text-foreground-sub">
                Thank you for leaving your mark. Redirecting you to the feed...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-error/5 border border-error/20 text-error rounded-lg p-4 flex gap-2 items-start text-xs font-semibold select-none">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                  Action Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
                >
                  {ACTION_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                  Title / Label *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  placeholder="e.g. Cleared plastics at Malibu Beach"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              {/* Story */}
              <div className="space-y-2">
                <label htmlFor="story" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                  Your Story *
                </label>
                <textarea
                  id="story"
                  required
                  rows={5}
                  placeholder="Describe your action. Keep it simple and direct. Avoid exaggerated or promotional language."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Country & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="country" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    required
                    placeholder="e.g. United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                    City / Specific Location (Optional)
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="e.g. Malibu, California"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground-sub">
                  Upload Photo (Optional)
                </label>
                
                <div className="flex flex-col items-center justify-center border border-dashed border-border rounded-lg p-6 bg-white hover:bg-border/10 transition-colors relative cursor-pointer">
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
                        alt="Uploaded preview" 
                        className="max-h-36 mx-auto rounded-md object-cover border border-border"
                      />
                      <span className="text-xs text-primary font-bold">Image loaded successfully</span>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 select-none">
                      <Upload className="w-8 h-8 text-foreground-sub/40 mx-auto" />
                      <div className="text-xs font-semibold text-foreground">Click to upload or drag image</div>
                      <div className="text-[10px] text-foreground-sub/70">JPEG, PNG, or WEBP up to 2MB (if empty, category default is used)</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between select-none border-t border-border pt-6">
                <span className="text-[11px] text-foreground-sub/60 italic">* Required fields</span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-semibold text-sm rounded-md shadow-sm hover:bg-primary-hover transition-colors cursor-pointer"
                >
                  Submit Action
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
