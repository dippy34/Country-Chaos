import { Country, COUNTRIES } from "../data/countries";

export type RoundCategory =
  | "landlocked"
  | "climate"
  | "population"
  | "continent"
  | "gdp"
  | "alphabet"
  | "island"
  | "monarchy"
  | "nukes"
  | "drives"
  | "g20"
  | "hemisphere"
  | "eu"
  | "namelength"
  | "lastvowel";

export type ChaosType = "normal" | "double" | "lastswap";

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

const POP_THRESHOLD_LOW = 50;
const POP_THRESHOLD_MED = 200;
const VOWELS = new Set(["a", "e", "i", "o", "u"]);

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
      const map: Record<string, number> = {
        Africa: 0, Asia: 1, Europe: 2,
        "North America": 3, "South America": 4, Oceania: 5,
      };
      return zones[(map[country.continent] ?? 0) % zones.length].id;
    }

    case "gdp":
      if (country.gdpTier === "low") return zones[0].id;
      if (country.gdpTier === "medium") return zones[1].id;
      return zones[2]?.id ?? zones[1].id;

    case "alphabet":
      return country.name.charAt(0).toUpperCase() <= "M" ? zones[0].id : zones[1].id;

    case "island":
      return country.isIsland ? zones[0].id : zones[1].id;

    case "monarchy":
      return country.isMonarchy ? zones[0].id : zones[1].id;

    case "nukes":
      return country.hasNukes ? zones[0].id : zones[1].id;

    case "drives":
      return country.drivesLeft ? zones[0].id : zones[1].id;

    case "g20":
      return country.isG20 ? zones[0].id : zones[1].id;

    case "hemisphere":
      return country.isSouth ? zones[0].id : zones[1].id;

    case "eu":
      return country.inEU ? zones[0].id : zones[1].id;

    case "namelength": {
      const len = country.name.replace(/[^a-zA-Z]/g, "").length;
      if (len <= 5) return zones[0].id;
      if (len <= 8) return zones[1].id;
      return zones[2]?.id ?? zones[1].id;
    }

    case "lastvowel": {
      const last = country.name.trim().replace(/[^a-zA-Z]/g, "").slice(-1).toLowerCase();
      return VOWELS.has(last) ? zones[0].id : zones[1].id;
    }

    default:
      return zones[0].id;
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ALL_CATEGORIES: RoundCategory[] = [
  "landlocked", "climate", "population", "continent", "gdp", "alphabet",
  "island", "monarchy", "nukes", "drives", "g20", "hemisphere", "eu",
  "namelength", "lastvowel",
];

export function generateRound(
  survivingCodes: string[],
  roundNumber: number,
  lastCategory: RoundCategory | null
): RoundConfig {
  const surviving = COUNTRIES.filter((c) => survivingCodes.includes(c.code));

  // Try categories in random order, skip if would create only 1 group or same as last
  const candidates = shuffle(ALL_CATEGORIES).filter((c) => c !== lastCategory);

  for (const category of candidates) {
    const testConfig = buildConfig(category, "normal");
    const zoneCounts = testConfig.zones.map((z) => {
      const id = z.id;
      const dummyConfig = { ...testConfig, category };
      return surviving.filter((c) => getCountryZone(c, dummyConfig) === id).length;
    });
    const nonEmptyGroups = zoneCounts.filter((n) => n > 0).length;
    if (nonEmptyGroups >= 2) {
      const chaosType = pickChaos(roundNumber);
      return buildConfig(category, chaosType);
    }
  }

  // Fallback: continent always creates multiple groups
  return buildConfig("continent", "normal");
}

function pickChaos(roundNumber: number): ChaosType {
  if (roundNumber <= 2) return "normal";
  const roll = Math.random();
  if (roll < 0.20) return "double";
  if (roll < 0.35) return "lastswap";
  return "normal";
}

function buildConfig(category: RoundCategory, chaosType: ChaosType): RoundConfig {
  let title = "";
  let zones: Zone[] = [];

  switch (category) {
    case "landlocked":
      title = "🏔️ Landlocked vs Coastal";
      zones = [
        { id: "landlocked", label: "🏔️ Landlocked", color: "#f59e0b", countries: [] },
        { id: "coastal",    label: "🌊 Coastal",     color: "#3b82f6", countries: [] },
      ];
      break;

    case "climate":
      title = "🌡️ Climate Zones";
      zones = [
        { id: "hot",       label: "🔥 Hot",       color: "#ef4444", countries: [] },
        { id: "cold",      label: "❄️ Cold",      color: "#6366f1", countries: [] },
        { id: "temperate", label: "🌤️ Temperate", color: "#22c55e", countries: [] },
      ];
      break;

    case "population":
      title = "👥 Population Tiers";
      zones = [
        { id: "small",  label: `< ${POP_THRESHOLD_LOW}M`,                                  color: "#a855f7", countries: [] },
        { id: "medium", label: `${POP_THRESHOLD_LOW}–${POP_THRESHOLD_MED}M`,               color: "#f97316", countries: [] },
        { id: "large",  label: `> ${POP_THRESHOLD_MED}M`,                                  color: "#ec4899", countries: [] },
      ];
      break;

    case "continent":
      title = "🌍 By Continent";
      zones = [
        { id: "Africa",        label: "🌍 Africa",    color: "#f59e0b", countries: [] },
        { id: "Asia",          label: "🌏 Asia",      color: "#ef4444", countries: [] },
        { id: "Europe",        label: "🌍 Europe",    color: "#3b82f6", countries: [] },
        { id: "North America", label: "🌎 N.America", color: "#22c55e", countries: [] },
        { id: "South America", label: "🌎 S.America", color: "#a855f7", countries: [] },
        { id: "Oceania",       label: "🌊 Oceania",   color: "#06b6d4", countries: [] },
      ];
      break;

    case "gdp":
      title = "💰 GDP Tiers";
      zones = [
        { id: "low",    label: "💸 Low GDP",    color: "#ef4444", countries: [] },
        { id: "medium", label: "💵 Medium GDP", color: "#f59e0b", countries: [] },
        { id: "high",   label: "💎 High GDP",   color: "#22c55e", countries: [] },
      ];
      break;

    case "alphabet":
      title = "🔤 A–M vs N–Z";
      zones = [
        { id: "am", label: "A–M", color: "#6366f1", countries: [] },
        { id: "nz", label: "N–Z", color: "#ec4899", countries: [] },
      ];
      break;

    case "island":
      title = "🏝️ Island Nation vs Mainland";
      zones = [
        { id: "island",   label: "🏝️ Island Nation", color: "#06b6d4", countries: [] },
        { id: "mainland", label: "🗺️ Mainland",       color: "#78716c", countries: [] },
      ];
      break;

    case "monarchy":
      title = "👑 Monarchy vs Republic";
      zones = [
        { id: "monarchy", label: "👑 Monarchy", color: "#eab308", countries: [] },
        { id: "republic", label: "🏛️ Republic",  color: "#64748b", countries: [] },
      ];
      break;

    case "nukes":
      title = "☢️ Nuclear Power vs Non-Nuclear";
      zones = [
        { id: "nukes",    label: "☢️ Has Nukes",    color: "#ef4444", countries: [] },
        { id: "nonukes",  label: "☮️ No Nukes",     color: "#22c55e", countries: [] },
      ];
      break;

    case "drives":
      title = "🚗 Drives Left vs Drives Right";
      zones = [
        { id: "left",  label: "⬅️ Drives Left",  color: "#8b5cf6", countries: [] },
        { id: "right", label: "➡️ Drives Right", color: "#f97316", countries: [] },
      ];
      break;

    case "g20":
      title = "🌐 G20 Member vs Non-Member";
      zones = [
        { id: "g20",    label: "🌐 G20 Member",  color: "#0ea5e9", countries: [] },
        { id: "nong20", label: "📦 Non-G20",      color: "#6b7280", countries: [] },
      ];
      break;

    case "hemisphere":
      title = "🌍 Northern vs Southern Hemisphere";
      zones = [
        { id: "south", label: "🌏 Southern Hemisphere", color: "#f97316", countries: [] },
        { id: "north", label: "❄️ Northern Hemisphere", color: "#3b82f6", countries: [] },
      ];
      break;

    case "eu":
      title = "🇪🇺 EU Member vs Non-EU";
      zones = [
        { id: "eu",   label: "🇪🇺 EU Member", color: "#1d4ed8", countries: [] },
        { id: "noeu", label: "🚫 Non-EU",      color: "#6b7280", countries: [] },
      ];
      break;

    case "namelength":
      title = "🔡 Name Length";
      zones = [
        { id: "short",  label: "Short (≤5 letters)", color: "#22c55e", countries: [] },
        { id: "medium", label: "Medium (6–8)",        color: "#f59e0b", countries: [] },
        { id: "long",   label: "Long (9+ letters)",   color: "#ec4899", countries: [] },
      ];
      break;

    case "lastvowel":
      title = "🔤 Name Ends in Vowel vs Consonant";
      zones = [
        { id: "vowel",     label: "🔤 Ends in Vowel",     color: "#a855f7", countries: [] },
        { id: "consonant", label: "🔡 Ends in Consonant", color: "#14b8a6", countries: [] },
      ];
      break;
  }

  if (chaosType === "double") {
    title = "💥 DOUBLE ELIM: " + title;
  } else if (chaosType === "lastswap") {
    title = "🔄 LAST SWAP: " + title;
  }

  return {
    category,
    chaosType,
    title,
    zones,
    eliminateSmallest: true,
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

export function findEliminatedZones(zones: Zone[], doubleEliminate: boolean): Zone[] {
  const nonEmpty = zones.filter((z) => z.countries.length > 0);
  if (nonEmpty.length <= 1) return [];

  const sorted = [...nonEmpty].sort((a, b) => a.countries.length - b.countries.length);

  if (doubleEliminate) {
    if (sorted.length >= 3) return [sorted[0], sorted[1]];
    return [sorted[0]];
  }

  const smallest = sorted[0];
  const totalAfter = nonEmpty.filter((z) => z.id !== smallest.id).reduce((s, z) => s + z.countries.length, 0);
  if (totalAfter === 0) return [];
  return [smallest];
}

export function getZonePositions(
  zoneCount: number,
  arenaW: number,
  arenaH: number
): Array<{ x: number; y: number; w: number; h: number }> {
  if (zoneCount === 2) {
    const w = arenaW * 0.45;
    const h = arenaH * 0.72;
    return [
      { x: arenaW * 0.03, y: arenaH * 0.14, w, h },
      { x: arenaW * 0.52, y: arenaH * 0.14, w, h },
    ];
  }
  if (zoneCount === 3) {
    const w = arenaW * 0.30;
    const h = arenaH * 0.72;
    return [
      { x: arenaW * 0.01, y: arenaH * 0.14, w, h },
      { x: arenaW * 0.34, y: arenaH * 0.14, w, h },
      { x: arenaW * 0.67, y: arenaH * 0.14, w, h },
    ];
  }
  if (zoneCount === 4) {
    const w = arenaW * 0.23;
    const h = arenaH * 0.72;
    return [
      { x: arenaW * 0.00, y: arenaH * 0.14, w, h },
      { x: arenaW * 0.25, y: arenaH * 0.14, w, h },
      { x: arenaW * 0.50, y: arenaH * 0.14, w, h },
      { x: arenaW * 0.75, y: arenaH * 0.14, w, h },
    ];
  }
  // 5-6 zones: 3x2 grid
  const cols = 3;
  const w = arenaW * 0.31;
  const h = arenaH * 0.44;
  return Array.from({ length: Math.min(zoneCount, 6) }, (_, i) => ({
    x: arenaW * 0.01 + (i % cols) * (arenaW * 0.33),
    y: arenaH * 0.04 + Math.floor(i / cols) * (arenaH * 0.52),
    w,
    h,
  }));
}

export function placeCountriesInZone(
  codes: string[],
  zonePos: { x: number; y: number; w: number; h: number },
  padding = 28
): Record<string, { x: number; y: number }> {
  const result: Record<string, { x: number; y: number }> = {};
  const cols = Math.ceil(Math.sqrt(codes.length * 1.5));
  const cellW = (zonePos.w - padding * 2) / Math.max(cols, 1);
  const cellH = Math.min(50, (zonePos.h - padding * 2) / Math.ceil(codes.length / cols));

  codes.forEach((code, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jx = (Math.random() - 0.5) * 8;
    const jy = (Math.random() - 0.5) * 8;
    result[code] = {
      x: zonePos.x + padding + col * cellW + cellW / 2 + jx,
      y: zonePos.y + padding + row * cellH + cellH / 2 + jy,
    };
  });

  return result;
}
