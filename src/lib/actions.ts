export interface UserAction {
  id: string;
  category: string;
  title: string;
  story: string;
  photo: string;
  country: string;
  location?: string;
  date: string;
}

export const MOCK_ACTIONS: UserAction[] = [
  {
    id: "mock-1",
    category: "Plant a Tree",
    title: "Mango Trees in Malang",
    story: "I planted two mango trees with my family in our backyard to help green our neighborhood and provide future fruit.",
    photo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    country: "Indonesia",
    location: "Malang, East Java",
    date: "2026-07-09",
  },
  {
    id: "mock-2",
    category: "Pick Up Trash",
    title: "Oregon Coastal Clean",
    story: "Walked the shoreline this morning and collected over 12kg of washed-up marine plastic, fishing ropes, and stray bottles.",
    photo: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
    country: "United States",
    location: "Canon Beach, Oregon",
    date: "2026-07-08",
  },
  {
    id: "mock-3",
    category: "Reduce Plastic",
    title: "Zero Waste Food Prep",
    story: "Transitioned all our dry storage containers to glass jars and bought ingredients in bulk, completely avoiding single-use bags this week.",
    photo: "https://images.unsplash.com/photo-1526951521990-620dc14c214b?auto=format&fit=crop&w=800&q=80",
    country: "Germany",
    location: "Munich, Bavaria",
    date: "2026-07-07",
  },
  {
    id: "mock-4",
    category: "Bike Instead",
    title: "Car-Free Week Commute",
    story: "Cycled 42 kilometers back and forth to my office this week instead of taking the car, saving around 8kg of CO2.",
    photo: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    country: "Japan",
    location: "Kyoto",
    date: "2026-07-06",
  },
  {
    id: "mock-5",
    category: "Protect Wildlife",
    title: "Bird Nesting Box",
    story: "Assembled and mounted a custom cedar nesting box for native bluebirds in our garden to help during their breeding season.",
    photo: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80",
    country: "Canada",
    location: "Victoria, BC",
    date: "2026-07-05",
  },
  {
    id: "mock-6",
    category: "Save Water",
    title: "Rain Catchment Setup",
    story: "Set up a 200-liter rain collection barrel connected to our roof gutter to irrigate our vegetable garden sustainably.",
    photo: "https://images.unsplash.com/photo-1548858860-82e3f24bfcca?auto=format&fit=crop&w=800&q=80",
    country: "Kenya",
    location: "Nairobi",
    date: "2026-07-04",
  },
];

export const ACTION_CATEGORIES = [
  "Plant a Tree",
  "Pick Up Trash",
  "Save Water",
  "Bike Instead",
  "Reduce Plastic",
  "Protect Wildlife",
  "Plant Flowers",
  "Community Cleanup",
];

export function getActions(): UserAction[] {
  if (typeof window === "undefined") {
    return MOCK_ACTIONS;
  }

  const stored = localStorage.getItem("earthlog_actions");
  if (!stored) {
    return MOCK_ACTIONS;
  }

  try {
    const parsed = JSON.parse(stored) as UserAction[];
    return [...parsed, ...MOCK_ACTIONS];
  } catch (e) {
    return MOCK_ACTIONS;
  }
}

export function saveAction(action: Omit<UserAction, "id" | "date">) {
  if (typeof window === "undefined") return;

  const current = getActions().filter(a => !a.id.startsWith("mock-"));
  const newAction: UserAction = {
    ...action,
    id: `action-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
  };

  localStorage.setItem("earthlog_actions", JSON.stringify([newAction, ...current]));
}
