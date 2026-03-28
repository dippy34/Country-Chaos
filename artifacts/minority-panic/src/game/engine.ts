import { Country, COUNTRIES } from "../data/countries";

export type RoundCategory =
  | "landlocked"
  | "climate"
  | "population"
  | "continent"
  | "gdp"
  | "alphabet";

export type ChaosType = "normal" | "fakeout" | "double" | "merge" | "lastswap";

export interface Zone {
  id: string;
  label: string;
  color: string;
  countries: string[];
}

export interface RoundConfig {
  category: RoundCategory;
  chaosType: ChaosType;
  title: string;
  zones: Zone[];
  eliminateSmallest: boolean;
  doubleEliminate: boolean;
}

export interface CountryState {
  code: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  zoneId: string | null;
  eliminated: boolean;
  eliminatedRound: number;
  swapped: boolean;
}

const POP_THRESHOLD_LOW = 50;
const POP_THRESHOLD_MED = 200;

export function getCountryZone(country: Country, config: RoundConfig): string {
  const zones = config.zones;

  switch (config.category) {
    case "landlocked":
      return country.isLandlocked ? zones[0].id : zones[1].id;

    case "climate":
      if (country.climate === "hot") return zones[0].id;
      if (country.climate === "cold") return zones[1].id;
      return zones[2]?.id ?? zones[0].id;

    case "population":
      if (country.population < POP_THRESHOLD_LOW) return zones[0].id;
      if (country.population < POP_THRESHOLD_MED) return zones[1].id;
      return zones[2]?.id ?? zones[1].id;

    case "continent": {
      const continentMap: Record<string, number> = {
        Africa: 0,
        Asia: 1,
        Europe: 2,
        "North America": 3,
        "South America": 4,
        Oceania: 5,
      };
      const idx = continentMap[country.continent] ?? 0;
      return zones[idx % zones.length].id;
    }

    case "gdp":
      if (country.gdpTier === "low") return zones[0].id;
      if (country.gdpTier === "medium") return zones[1].id;
      return zones[2]?.id ?? zones[1].id;

    case "alphabet": {
      const code = country.name.charAt(0).toUpperCase();
      return code <= "M" ? zones[0].id : zones[1].id;
    }

    default:
      return zones[0].id;
  }
}

export function generateRound(
  survivingCodes: string[],
  roundNumber: number
): RoundConfig {
  const categories: RoundCategory[] = [
    "landlocked",
    "climate",
    "population",
    "continent",
    "gdp",
    "alphabet",
  ];

  const category = categories[Math.floor(Math.random() * categories.length)];

  let chaosType: ChaosType = "normal";
  const chaoRoll = Math.random();
  if (roundNumber > 2) {
    if (chaoRoll < 0.15) chaosType = "fakeout";
    else if (chaoRoll < 0.30) chaosType = "double";
    else if (chaoRoll < 0.40) chaosType = "lastswap";
  }

  return buildConfig(category, chaosType, survivingCodes);
}

function buildConfig(
  category: RoundCategory,
  chaosType: ChaosType,
  _survivingCodes: string[]
): RoundConfig {
  let title = "";
  let zones: Zone[] = [];

  switch (category) {
    case "landlocked":
      title = "🏔️ Landlocked vs Coastal";
      zones = [
        { id: "landlocked", label: "Landlocked", color: "#f59e0b", countries: [] },
        { id: "coastal", label: "Coastal", color: "#3b82f6", countries: [] },
      ];
      break;

    case "climate":
      title = "🌡️ Climate Zones";
      zones = [
        { id: "hot", label: "🔥 Hot Climate", color: "#ef4444", countries: [] },
        { id: "cold", label: "❄️ Cold Climate", color: "#6366f1", countries: [] },
        { id: "temperate", label: "🌤️ Temperate", color: "#22c55e", countries: [] },
      ];
      break;

    case "population":
      title = `👥 Population Tiers`;
      zones = [
        { id: "small", label: `< ${POP_THRESHOLD_LOW}M`, color: "#a855f7", countries: [] },
        { id: "medium", label: `${POP_THRESHOLD_LOW}–${POP_THRESHOLD_MED}M`, color: "#f97316", countries: [] },
        { id: "large", label: `> ${POP_THRESHOLD_MED}M`, color: "#ec4899", countries: [] },
      ];
      break;

    case "continent":
      title = "🌍 By Continent";
      zones = [
        { id: "Africa", label: "🌍 Africa", color: "#f59e0b", countries: [] },
        { id: "Asia", label: "🌏 Asia", color: "#ef4444", countries: [] },
        { id: "Europe", label: "🌍 Europe", color: "#3b82f6", countries: [] },
        { id: "North America", label: "🌎 N. America", color: "#22c55e", countries: [] },
        { id: "South America", label: "🌎 S. America", color: "#a855f7", countries: [] },
        { id: "Oceania", label: "🌊 Oceania", color: "#06b6d4", countries: [] },
      ];
      break;

    case "gdp":
      title = "💰 GDP Tiers";
      zones = [
        { id: "low", label: "💸 Low GDP", color: "#ef4444", countries: [] },
        { id: "medium", label: "💵 Medium GDP", color: "#f59e0b", countries: [] },
        { id: "high", label: "💎 High GDP", color: "#22c55e", countries: [] },
      ];
      break;

    case "alphabet":
      title = "🔤 A–M vs N–Z";
      zones = [
        { id: "am", label: "A–M", color: "#6366f1", countries: [] },
        { id: "nz", label: "N–Z", color: "#ec4899", countries: [] },
      ];
      break;
  }

  if (chaosType === "fakeout") {
    title = "⚡ " + title + " [FAKEOUT?]";
  } else if (chaosType === "double") {
    title = "💥 DOUBLE ELIMINATION: " + title;
  } else if (chaosType === "merge") {
    title = "🔀 MERGE: " + title;
  } else if (chaosType === "lastswap") {
    title = "🔄 LAST SECOND SWAP: " + title;
  }

  return {
    category,
    chaosType,
    title,
    zones,
    eliminateSmallest: chaosType !== "fakeout",
    doubleEliminate: chaosType === "double",
  };
}

export function assignCountriesToZones(
  countries: Country[],
  config: RoundConfig,
  survivingCodes: string[]
): RoundConfig {
  const surviving = countries.filter((c) => survivingCodes.includes(c.code));
  const zones = config.zones.map((z) => ({ ...z, countries: [] as string[] }));

  for (const country of surviving) {
    const zoneId = getCountryZone(country, config);
    const zone = zones.find((z) => z.id === zoneId);
    if (zone) zone.countries.push(country.code);
  }

  return { ...config, zones };
}

export function findEliminatedZones(
  zones: Zone[],
  doubleEliminate: boolean
): Zone[] {
  const nonEmpty = zones.filter((z) => z.countries.length > 0);

  // Safety: need at least 2 groups to eliminate one — can't wipe everyone out
  if (nonEmpty.length <= 1) return [];

  const sorted = [...nonEmpty].sort(
    (a, b) => a.countries.length - b.countries.length
  );

  if (doubleEliminate) {
    // For double: need at least 3 groups so at least 1 survives
    if (sorted.length >= 3) return [sorted[0], sorted[1]];
    // Fallback to single elimination if only 2 groups
    return [sorted[0]];
  }

  // Never eliminate a group that would wipe out everyone:
  // Only eliminate if the remaining groups (after elimination) have at least 1 country
  const smallestZone = sorted[0];
  const totalAfter = nonEmpty
    .filter((z) => z.id !== smallestZone.id)
    .reduce((sum, z) => sum + z.countries.length, 0);
  if (totalAfter === 0) return [];

  return [smallestZone];
}

export function getZonePositions(
  zoneCount: number,
  arenaW: number,
  arenaH: number
): Array<{ x: number; y: number; w: number; h: number }> {
  if (zoneCount === 2) {
    const w = arenaW * 0.45;
    const h = arenaH * 0.7;
    return [
      { x: arenaW * 0.05, y: arenaH * 0.15, w, h },
      { x: arenaW * 0.5, y: arenaH * 0.15, w, h },
    ];
  } else if (zoneCount === 3) {
    const w = arenaW * 0.29;
    const h = arenaH * 0.7;
    return [
      { x: arenaW * 0.02, y: arenaH * 0.15, w, h },
      { x: arenaW * 0.35, y: arenaH * 0.15, w, h },
      { x: arenaW * 0.68, y: arenaH * 0.15, w, h },
    ];
  } else if (zoneCount === 4) {
    const w = arenaW * 0.22;
    const h = arenaH * 0.7;
    return [
      { x: arenaW * 0.01, y: arenaH * 0.15, w, h },
      { x: arenaW * 0.26, y: arenaH * 0.15, w, h },
      { x: arenaW * 0.51, y: arenaH * 0.15, w, h },
      { x: arenaW * 0.76, y: arenaH * 0.15, w, h },
    ];
  } else if (zoneCount >= 5) {
    const cols = 3;
    const rows = 2;
    const w = arenaW / (cols + 0.5);
    const h = arenaH * 0.42;
    const positions: Array<{ x: number; y: number; w: number; h: number }> = [];
    for (let i = 0; i < zoneCount && i < cols * rows; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      positions.push({
        x: arenaW * 0.02 + col * (arenaW * 0.33),
        y: arenaH * 0.05 + row * (arenaH * 0.52),
        w,
        h,
      });
    }
    return positions;
  }
  return [{ x: 0, y: 0, w: arenaW, h: arenaH }];
}

export function placeCountriesInZone(
  codes: string[],
  zonePos: { x: number; y: number; w: number; h: number },
  padding = 30
): Record<string, { x: number; y: number }> {
  const result: Record<string, { x: number; y: number }> = {};
  const cols = Math.ceil(Math.sqrt(codes.length * 1.5));
  const cellW = (zonePos.w - padding * 2) / Math.max(cols, 1);
  const cellH = Math.min(50, (zonePos.h - padding * 2) / Math.ceil(codes.length / cols));

  codes.forEach((code, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jitter = (Math.random() - 0.5) * 10;
    result[code] = {
      x: zonePos.x + padding + col * cellW + cellW / 2 + jitter,
      y: zonePos.y + padding + row * cellH + cellH / 2 + jitter,
    };
  });

  return result;
}

export const ALL_COUNTRIES_MAP: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c])
);
