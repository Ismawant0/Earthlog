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

// MVP categories as specified
export const ACTION_CATEGORIES = [
  "Plant Tree",
  "Cleanup",
  "Recycle",
  "Water Saving",
  "Energy Saving",
  "Gardening",
  "Wildlife",
  "Other",
];

/**
 * Load actions from localStorage only.
 * Returns an empty array when there are no real actions — no mock data.
 */
export function getActions(): UserAction[] {
  if (typeof window === "undefined") {
    return [];
  }
  const stored = localStorage.getItem("earthlog_actions");
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored) as UserAction[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAction(action: Omit<UserAction, "id" | "date"> & { date?: string }) {
  if (typeof window === "undefined") return;

  const current = getActions();
  const newAction: UserAction = {
    ...action,
    id: `action-${Date.now()}`,
    date: action.date || new Date().toISOString().split("T")[0],
  };

  localStorage.setItem("earthlog_actions", JSON.stringify([newAction, ...current]));
}
