import { IFactResult } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function persistToLocalStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function removeFromLocalStorage(key: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

export function storeFactResult(result: IFactResult) {
  const existingResults = getFromLocalStorage<IFactResult[]>("factResult") || [];
  const updatedResults = [result, ...existingResults].slice(0, 5);
  persistToLocalStorage("factResult", updatedResults);
}

export function getFactResults(): IFactResult[] | null {
  return getFromLocalStorage("factResult");
}

export function clearHistory() {
  removeFromLocalStorage("factResult");
}


export function removeFactResultFromHistory(id: string) {
  const existingResults = getFromLocalStorage<IFactResult[]>("factResult") || [];
  const updatedResults = existingResults.filter((result) => result.id !== id);
  persistToLocalStorage("factResult", updatedResults);
}