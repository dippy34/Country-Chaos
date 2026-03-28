import { useState, useEffect, useRef } from "react";
import { COUNTRIES } from "../data/countries";
import {
  generateRound,
  assignCountriesToZones,
  findEliminatedZones,
  getZonePositions,
  placeCountriesInZone,
  Zone,
  RoundConfig,
  RoundCategory,
} from "../game/engine";

type GamePhase =
  | "intro"
  | "rule_reveal"
  | "sorting"
  | "countdown"
  | "eliminating"
  | "result"
  | "skipped"
  | "duel_reveal"
  | "duel_fight"
  | "duel_result"
  | "winner"
  | "leaderboard";

interface CountryBall {
  code: string;
  flag: string;
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  zoneId: string | null;
  eliminated: boolean;
  eliminatedRound: number;
  swapping: boolean;
  elimAnim: number;
  hasShield: boolean;
}

const BALL_R = 22;
const BALL_SIZE = BALL_R * 2;
const LERP = 0.07;
const ARENA_PAD = 60;

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function useArenaSize() {
  const [size, setSize] = useState({ w: 900, h: 600 });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        setSize({ w: r.width, h: r.height });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return { ref, size };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rndPos(w: number, h: number) {
  return {
    x: ARENA_PAD + Math.random() * (w - ARENA_PAD * 2),
    y: ARENA_PAD + Math.random() * (h - ARENA_PAD * 2),
  };
}

function flagUrl(code: string) {
  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
}

export default function Game() {
  const { ref: arenaRef, size } = useArenaSize();
  const sizeRef = useRef(size);
  sizeRef.current = size;
  const animRef = useRef<number | null>(null);

  const [phase, setPhase] = useState<GamePhase>("intro");
  const phaseRef = useRef<GamePhase>("intro");

  const [roundNumber, setRoundNumber] = useState(0);
  const [round, setRound] = useState<RoundConfig | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [duelCountdown, setDuelCountdown] = useState(5);
  const [eliminatedThisRound, setEliminatedThisRound] = useState<string[]>([]);
  const [shieldedThisRound, setShieldedThisRound] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<
    Array<{ code: string; flag: string; name: string; rank: number }>
  >([]);
  const [winner, setWinner] = useState<{ code: string; flag: string; name: string } | null>(null);
  const [duelPair, setDuelPair] = useState<[CountryBall, CountryBall] | null>(null);
  const [duelWinner, setDuelWinner] = useState<CountryBall | null>(null);
  const [showZoneLabels, setShowZoneLabels] = useState(false);
  const [zonePositions, setZonePositions] = useState<Array<{ x: number; y: number; w: number; h: number }>>([]);
  const [eliminatingZones, setEliminatingZones] = useState<string[]>([]);
  const [skipReason, setSkipReason] = useState("");
  const [donationInput, setDonationInput] = useState("");
  const [donationMsg, setDonationMsg] = useState("");
  const [showDonation, setShowDonation] = useState(false);
  const [lastCategory, setLastCategory] = useState<RoundCategory | null>(null);

  const ballsRef = useRef<CountryBall[]>([]);
  const [ballsRender, setBallsRender] = useState<CountryBall[]>([]);

  const setPhaseSync = (p: GamePhase) => { phaseRef.current = p; setPhase(p); };

  // Animation loop
  useEffect(() => {
    const loop = () => {
      let changed = false;
      ballsRef.current = ballsRef.current.map((b) => {
        if (b.eliminated) {
          if (b.elimAnim < 1) {
            changed = true;
            return { ...b, elimAnim: Math.min(1, b.elimAnim + 0.025) };
          }
          return b;
        }
        const dx = b.targetX - b.x;
        const dy = b.targetY - b.y;
        if (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4) {
          changed = true;
          return { ...b, x: lerp(b.x, b.targetX, LERP), y: lerp(b.y, b.targetY, LERP) };
        }
        return b;
      });
      if (changed) setBallsRender([...ballsRef.current]);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const runRoundRef = useRef<(rn: number, surviving: string[], lastCat: RoundCategory | null) => void>(null!);
  const runDuelRef = useRef<(a: CountryBall, b: CountryBall) => void>(null!);

  // ——— DUEL ———
  runDuelRef.current = (ballA: CountryBall, ballB: CountryBall) => {
    const w = sizeRef.current.w || 900;
    const arenaH = (sizeRef.current.h || 600) - 130;

    setDuelPair([ballA, ballB]);
    setDuelWinner(null);
    setPhaseSync("duel_reveal");

    // Move both balls to dramatic positions
    ballsRef.current = ballsRef.current.map((b) => {
      if (b.code === ballA.code) return { ...b, targetX: w * 0.22, targetY: arenaH * 0.5 };
      if (b.code === ballB.code) return { ...b, targetX: w * 0.78, targetY: arenaH * 0.5 };
      return b;
    });

    setTimeout(() => {
      setPhaseSync("duel_fight");
      let cnt = 5;
      setDuelCountdown(5);
      const tick = setInterval(() => {
        cnt--;
        setDuelCountdown(cnt);
        if (cnt <= 0) {
          clearInterval(tick);
          // Pick random winner
          const winnerBall = Math.random() < 0.5 ? ballA : ballB;
          const loserBall = winnerBall.code === ballA.code ? ballB : ballA;

          setDuelWinner(winnerBall);
          setPhaseSync("duel_result");

          // Eliminate the loser dramatically
          setTimeout(() => {
            ballsRef.current = ballsRef.current.map((b) =>
              b.code === loserBall.code ? { ...b, eliminated: true, elimAnim: 0 } : b
            );
            setLeaderboard((prev) => [
              { code: loserBall.code, flag: loserBall.flag, name: loserBall.name, rank: 2 },
              ...prev,
            ]);
          }, 500);

          // Declare winner
          setTimeout(() => {
            setWinner({ code: winnerBall.code, flag: winnerBall.flag, name: winnerBall.name });
            setPhaseSync("winner");
          }, 3000);
        }
      }, 900);
    }, 3000);
  };

  // ——— MAIN ROUND LOOP ———
  runRoundRef.current = (rn: number, surviving: string[], lastCat: RoundCategory | null) => {
    const w = sizeRef.current.w || 900;
    const h = sizeRef.current.h || 600;
    const arenaH = h - 130;

    if (surviving.length <= 1) {
      const last = surviving[0];
      const ball = ballsRef.current.find((b) => b.code === last);
      if (ball) setWinner({ code: ball.code, flag: ball.flag, name: ball.name });
      setPhaseSync("winner");
      return;
    }

    // ⚔️ DUEL when exactly 2 remain
    if (surviving.length === 2) {
      const [a, b] = surviving.map((code) => ballsRef.current.find((bl) => bl.code === code)!);
      if (a && b) {
        setTimeout(() => runDuelRef.current(a, b), 600);
        return;
      }
    }

    const config = generateRound(surviving, rn, lastCat);
    setLastCategory(config.category);
    const configWithZones = assignCountriesToZones(COUNTRIES, config, surviving);
    const filteredZones = configWithZones.zones.filter((z) => z.countries.length > 0);
    const zonePosArr = getZonePositions(filteredZones.length, w, arenaH);

    setZonePositions(zonePosArr);
    setRound({ ...configWithZones, zones: filteredZones });
    setRoundNumber(rn + 1);
    setEliminatingZones([]);
    setEliminatedThisRound([]);
    setShieldedThisRound([]);
    setShowZoneLabels(false);

    // PHASE 1: Rule reveal overlay (3 seconds)
    setPhaseSync("rule_reveal");

    setTimeout(() => {
      setShowZoneLabels(true);
      setPhaseSync("sorting");

      // Move balls to their zones
      filteredZones.forEach((zone, zi) => {
        const zp = zonePosArr[zi];
        if (!zp) return;
        const positions = placeCountriesInZone(zone.countries, zp);
        ballsRef.current = ballsRef.current.map((b) => {
          if (zone.countries.includes(b.code) && !b.eliminated) {
            const pos = positions[b.code];
            return pos ? { ...b, zoneId: zone.id, targetX: pos.x, targetY: pos.y } : b;
          }
          return b;
        });
      });

      // Last-second swap chaos
      if (config.chaosType === "lastswap") {
        setTimeout(() => {
          const numSwap = Math.max(2, Math.floor(surviving.length * 0.1));
          const toSwap = shuffle(surviving).slice(0, numSwap);
          const updatedZones = [...filteredZones];

          for (let i = 0; i < toSwap.length - 1; i += 2) {
            const ca = toSwap[i];
            const cb = toSwap[i + 1];
            const ballA = ballsRef.current.find((x) => x.code === ca);
            const ballB = ballsRef.current.find((x) => x.code === cb);
            if (!ballA || !ballB) continue;
            const aZI = filteredZones.findIndex((z) => z.countries.includes(ca));
            const bZI = filteredZones.findIndex((z) => z.countries.includes(cb));
            if (aZI === -1 || bZI === -1 || aZI === bZI) continue;

            const tmpX = ballA.targetX, tmpY = ballA.targetY, tmpZ = ballA.zoneId;
            ballsRef.current = ballsRef.current.map((b) => {
              if (b.code === ca) return { ...b, targetX: ballB.targetX, targetY: ballB.targetY, zoneId: ballB.zoneId, swapping: true };
              if (b.code === cb) return { ...b, targetX: tmpX, targetY: tmpY, zoneId: tmpZ, swapping: true };
              return b;
            });
            updatedZones[aZI] = { ...updatedZones[aZI], countries: updatedZones[aZI].countries.map((c) => (c === ca ? cb : c)) };
            updatedZones[bZI] = { ...updatedZones[bZI], countries: updatedZones[bZI].countries.map((c) => (c === cb ? ca : c)) };
          }
          setRound((prev) => (prev ? { ...prev, zones: updatedZones } : prev));
        }, 2500);
      }

      // PHASE 2: Countdown after balls have settled
      const cdDelay = config.chaosType === "lastswap" ? 4500 : 3200;
      setTimeout(() => {
        setCountdown(3);
        setPhaseSync("countdown");
        let cnt = 3;
        const tick = setInterval(() => {
          cnt--;
          setCountdown(cnt);
          if (cnt <= 0) {
            clearInterval(tick);
            doEliminate(configWithZones, filteredZones, rn, surviving, config.chaosType, config.category);
          }
        }, 1200);
      }, cdDelay);
    }, 3000);
  };

  const doEliminate = (
    _config: RoundConfig,
    filteredZones: Zone[],
    rn: number,
    surviving: string[],
    chaosType: string,
    category: RoundCategory
  ) => {
    const toElim = findEliminatedZones(filteredZones, chaosType === "double");
    const rawElimCodes = toElim.flatMap((z) => z.countries);
    const elimZoneIds = toElim.map((z) => z.id);

    if (rawElimCodes.length === 0) {
      setSkipReason("All countries landed in the same group — no one eliminated this round!");
      setPhaseSync("skipped");
      setTimeout(() => {
        disperseBalls();
        setTimeout(() => runRoundRef.current(rn + 1, surviving, category), 1200);
      }, 3000);
      return;
    }

    // Shield check: remove shield, save the country
    const savedByCodes: string[] = [];
    const finalElimCodes = rawElimCodes.filter((code) => {
      const ball = ballsRef.current.find((b) => b.code === code);
      if (ball?.hasShield) {
        savedByCodes.push(code);
        ballsRef.current = ballsRef.current.map((b) =>
          b.code === code ? { ...b, hasShield: false } : b
        );
        return false;
      }
      return true;
    });

    setEliminatingZones(elimZoneIds);
    setPhaseSync("eliminating");
    setShieldedThisRound(savedByCodes);

    setTimeout(() => {
      if (finalElimCodes.length === 0) {
        // Everyone in the zone was shielded!
        setEliminatedThisRound([]);
        setPhaseSync("result");
        setTimeout(() => {
          disperseBalls();
          setTimeout(() => runRoundRef.current(rn + 1, surviving, category), 1200);
        }, 3500);
        return;
      }

      ballsRef.current = ballsRef.current.map((b) =>
        finalElimCodes.includes(b.code)
          ? { ...b, eliminated: true, eliminatedRound: rn + 1, elimAnim: 0 }
          : b
      );

      const nextSurviving = surviving.filter((c) => !finalElimCodes.includes(c));
      const newElimEntries = finalElimCodes.map((code, idx) => {
        const ball = ballsRef.current.find((b) => b.code === code);
        return { code, flag: ball?.flag ?? "🏴", name: ball?.name ?? code, rank: surviving.length - idx };
      });

      setLeaderboard((prev) => [...newElimEntries, ...prev]);
      setEliminatedThisRound(finalElimCodes);
      setPhaseSync("result");

      setTimeout(() => {
        if (nextSurviving.length <= 1) {
          const last = nextSurviving[0];
          const ball = ballsRef.current.find((b) => b.code === last);
          if (ball) setWinner({ code: ball.code, flag: ball.flag, name: ball.name });
          setPhaseSync("winner");
        } else {
          disperseBalls();
          setTimeout(() => runRoundRef.current(rn + 1, nextSurviving, category), 1200);
        }
      }, 3500);
    }, 1000);
  };

  const disperseBalls = () => {
    const w = sizeRef.current.w || 900;
    const h = sizeRef.current.h || 600;
    setShowZoneLabels(false);
    setEliminatingZones([]);
    ballsRef.current = ballsRef.current.map((b) => {
      if (!b.eliminated) {
        const pos = rndPos(w, h - 130);
        return { ...b, targetX: pos.x, targetY: pos.y, zoneId: null, swapping: false };
      }
      return b;
    });
  };

  const startGame = () => {
    const w = sizeRef.current.w || 900;
    const h = sizeRef.current.h || 600;
    const startCountries = shuffle(COUNTRIES).slice(0, 60);
    ballsRef.current = startCountries.map((c) => {
      const pos = rndPos(w, h - 130);
      return { code: c.code, flag: c.flag, name: c.name, x: pos.x, y: pos.y, targetX: pos.x, targetY: pos.y, zoneId: null, eliminated: false, eliminatedRound: -1, swapping: false, elimAnim: 0, hasShield: false };
    });
    setBallsRender([...ballsRef.current]);
    setLeaderboard([]);
    setWinner(null);
    setDuelPair(null);
    setDuelWinner(null);
    setRoundNumber(0);
    setLastCategory(null);
    setEliminatingZones([]);
    setEliminatedThisRound([]);
    setShieldedThisRound([]);
    setShowZoneLabels(false);
    setRound(null);
    setDonationMsg("");
    setTimeout(() => runRoundRef.current(0, startCountries.map((c) => c.code), null), 600);
  };

  // ——— DONATION / SHIELD / REVIVAL ———
  const handleDonation = () => {
    const query = donationInput.trim().toLowerCase();
    if (!query) return;

    const match = ballsRef.current.find(
      (b) => b.name.toLowerCase().includes(query) || b.code.toLowerCase() === query
    );

    if (!match) {
      setDonationMsg(`❓ No country found matching "${donationInput}"`);
      setTimeout(() => setDonationMsg(""), 3000);
      setDonationInput("");
      return;
    }

    if (match.eliminated) {
      // REVIVE
      const w = sizeRef.current.w || 900;
      const h = sizeRef.current.h || 600;
      const pos = rndPos(w, h - 130);
      ballsRef.current = ballsRef.current.map((b) =>
        b.code === match.code
          ? { ...b, eliminated: false, elimAnim: 0, x: pos.x, y: pos.y, targetX: pos.x, targetY: pos.y, zoneId: null }
          : b
      );
      setBallsRender([...ballsRef.current]);
      setLeaderboard((prev) => prev.filter((e) => e.code !== match.code));
      setDonationMsg(`🔥 ${match.name} has been REVIVED!`);
    } else {
      // SHIELD
      ballsRef.current = ballsRef.current.map((b) =>
        b.code === match.code ? { ...b, hasShield: true } : b
      );
      setBallsRender([...ballsRef.current]);
      setDonationMsg(`🛡️ ${match.name} is now SHIELDED!`);
    }

    setTimeout(() => setDonationMsg(""), 4000);
    setDonationInput("");
  };

  const surviving = ballsRender.filter((b) => !b.eliminated);
  const isEndgame = surviving.length <= 10 && phase !== "intro" && phase !== "winner" && phase !== "leaderboard" && phase !== "duel_reveal" && phase !== "duel_fight" && phase !== "duel_result";

  const isDuelPhase = phase === "duel_reveal" || phase === "duel_fight" || phase === "duel_result";

  const phaseInfo = (() => {
    switch (phase) {
      case "rule_reveal":  return { text: "📢 RULE", color: "text-yellow-400" };
      case "sorting":      return { text: "🔀 SORTING", color: "text-blue-400" };
      case "countdown":    return { text: "⏱️ COUNTDOWN", color: "text-orange-400" };
      case "eliminating":  return { text: "💀 ELIMINATING", color: "text-red-400" };
      case "result":       return { text: "✅ RESULT", color: "text-green-400" };
      case "skipped":      return { text: "⏭️ SKIPPED", color: "text-gray-400" };
      case "duel_reveal":
      case "duel_fight":
      case "duel_result":  return { text: "⚔️ DUEL", color: "text-yellow-400" };
      default:             return null;
    }
  })();

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden select-none">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight">
            🌍 <span className="text-yellow-400">MINORITY</span>{" "}
            <span className="text-red-500">PANIC</span>
          </span>
          <span className="text-gray-600 text-xs hidden sm:block">Country Chaos</span>
        </div>
        <div className="flex items-center gap-4">
          {phase !== "intro" && phase !== "winner" && phase !== "leaderboard" && (
            <>
              {phaseInfo && (
                <span className={`text-xs font-bold ${phaseInfo.color} hidden sm:block`}>
                  {phaseInfo.text}
                </span>
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 text-xs">Rd</span>
                <span className="font-black">{roundNumber}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-bold text-sm">{surviving.length} left</span>
              </div>
              <button
                onClick={() => setShowDonation((s) => !s)}
                className="px-3 py-1 bg-pink-600/20 border border-pink-500/30 text-pink-400 font-bold text-xs rounded-full hover:bg-pink-600/30 transition-colors cursor-pointer"
              >
                💖 DONATE
              </button>
            </>
          )}
          {(phase === "winner" || phase === "leaderboard" || phase === "intro") && (
            <button
              onClick={startGame}
              className="px-4 py-1.5 bg-yellow-400 text-black font-black text-sm rounded-full hover:bg-yellow-300 transition-colors cursor-pointer"
            >
              {phase === "intro" ? "▶ START" : "🔁 NEW GAME"}
            </button>
          )}
        </div>
      </header>

      {/* Donation Panel */}
      {showDonation && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 border-b border-gray-700 z-10 shrink-0 flex-wrap">
          <span className="text-pink-400 text-xs font-bold shrink-0">💖 Donation action:</span>
          <input
            type="text"
            value={donationInput}
            onChange={(e) => setDonationInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleDonation()}
            placeholder="Type a country name..."
            className="flex-1 min-w-0 px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
          />
          <button
            onClick={handleDonation}
            className="px-4 py-1 bg-pink-500 text-white font-bold text-sm rounded-lg hover:bg-pink-400 transition-colors cursor-pointer shrink-0"
          >
            Revive / Shield
          </button>
          {donationMsg && (
            <span className="text-yellow-300 text-sm font-bold shrink-0">{donationMsg}</span>
          )}
          <div className="text-gray-500 text-xs shrink-0 hidden md:block">
            Dead country → REVIVED · Alive → SHIELDED (blocks 1 elim)
          </div>
        </div>
      )}

      <div className="flex flex-1 min-h-0">
        {/* Arena */}
        <div className="flex-1 relative" ref={arenaRef}>

          {/* INTRO */}
          {phase === "intro" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-20 bg-gray-950">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-black mb-2 leading-none">
                  <span className="text-yellow-400">MINORITY</span>{" "}
                  <span className="text-red-500">PANIC</span>
                </h1>
                <p className="text-gray-400 text-base font-semibold">Country Chaos</p>
              </div>
              <div className="text-gray-300 text-sm text-center max-w-md leading-relaxed px-6 space-y-1.5">
                <p>60 country flags compete in a shared arena.</p>
                <p>Each round a rule splits them — <span className="text-red-400 font-bold">smallest group eliminated!</span></p>
                <p>Last country standing wins the crown 🏆</p>
              </div>
              <button
                onClick={startGame}
                className="px-10 py-4 bg-yellow-400 text-black font-black text-2xl rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-yellow-400/20 cursor-pointer"
              >
                ▶ PLAY NOW
              </button>
              <div className="flex flex-wrap gap-4 justify-center text-xs text-gray-500">
                <span>⚡ 15 categories</span>
                <span>💥 Double eliminations</span>
                <span>🔄 Last-second swaps</span>
                <span>💖 Donation revivals</span>
                <span>⚔️ Final duel</span>
              </div>
            </div>
          )}

          {/* RULE REVEAL */}
          {phase === "rule_reveal" && round && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gray-950/92 gap-4">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                Round {roundNumber}
              </div>
              <div className="text-center px-6">
                <div className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
                  {round.title.replace(/^[💥🔄⚡🎭]\s*(DOUBLE ELIM:|LAST SWAP:)?\s*/i, "").trim()}
                </div>
                {round.chaosType === "double" && (
                  <div className="inline-block px-4 py-1.5 bg-red-500 text-white font-black text-sm rounded-full animate-pulse">
                    💥 DOUBLE ELIMINATION — TWO groups get cut!
                  </div>
                )}
                {round.chaosType === "lastswap" && (
                  <div className="inline-block px-4 py-1.5 bg-orange-500 text-black font-black text-sm rounded-full animate-pulse">
                    🔄 LAST SECOND SWAP — some will switch sides!
                  </div>
                )}
                {round.chaosType === "normal" && (
                  <div className="text-gray-400 text-sm">The smallest group gets eliminated ☠️</div>
                )}
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {round.zones.map((z) => (
                  <div key={z.id} className="px-3 py-1.5 rounded-lg text-xs font-bold text-black" style={{ backgroundColor: z.color }}>
                    {z.label}
                  </div>
                ))}
              </div>
              <div className="text-gray-600 text-xs animate-pulse">Sorting in a moment...</div>
            </div>
          )}

          {/* DUEL SCREEN */}
          {isDuelPhase && duelPair && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gray-950/95">
              <div className="text-yellow-400 font-black text-xl mb-6 tracking-widest uppercase">
                ⚔️ Final Duel — Last 2 Standing!
              </div>
              <div className="flex items-center gap-8 md:gap-20">
                {/* Contestant A */}
                <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${duelWinner && duelWinner.code !== duelPair[0].code ? "opacity-25 scale-75" : ""}`}>
                  <img
                    src={flagUrl(duelPair[0].code)}
                    alt={duelPair[0].name}
                    className={`w-28 h-20 object-cover rounded-xl shadow-2xl border-4 ${duelWinner?.code === duelPair[0].code ? "border-yellow-400 shadow-yellow-400/50" : "border-gray-600"}`}
                  />
                  <div className="font-black text-lg text-white">{duelPair[0].name}</div>
                  {duelWinner?.code === duelPair[0].code && (
                    <div className="text-yellow-400 font-black text-2xl animate-bounce">🏆 WINNER!</div>
                  )}
                </div>

                {/* VS */}
                <div className="flex flex-col items-center">
                  {phase === "duel_fight" && (
                    <div className="text-7xl font-black text-red-400 leading-none mb-2" style={{ textShadow: "0 0 40px rgba(239,68,68,0.6)" }}>
                      {duelCountdown > 0 ? duelCountdown : "GO!"}
                    </div>
                  )}
                  {phase === "duel_reveal" && (
                    <div className="text-4xl font-black text-gray-400 animate-pulse">VS</div>
                  )}
                  {phase === "duel_result" && !duelWinner && (
                    <div className="text-4xl font-black text-yellow-400 animate-pulse">⚔️</div>
                  )}
                </div>

                {/* Contestant B */}
                <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${duelWinner && duelWinner.code !== duelPair[1].code ? "opacity-25 scale-75" : ""}`}>
                  <img
                    src={flagUrl(duelPair[1].code)}
                    alt={duelPair[1].name}
                    className={`w-28 h-20 object-cover rounded-xl shadow-2xl border-4 ${duelWinner?.code === duelPair[1].code ? "border-yellow-400 shadow-yellow-400/50" : "border-gray-600"}`}
                  />
                  <div className="font-black text-lg text-white">{duelPair[1].name}</div>
                  {duelWinner?.code === duelPair[1].code && (
                    <div className="text-yellow-400 font-black text-2xl animate-bounce">🏆 WINNER!</div>
                  )}
                </div>
              </div>
              {phase === "duel_reveal" && (
                <div className="text-gray-500 text-sm mt-8 animate-pulse">Get ready...</div>
              )}
            </div>
          )}

          {/* WINNER */}
          {phase === "winner" && winner && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 bg-gray-950/96">
              <img
                src={flagUrl(winner.code)}
                alt={winner.name}
                className="w-36 h-24 object-cover rounded-2xl shadow-2xl border-4 border-yellow-400 animate-bounce"
              />
              <div className="text-4xl font-black text-yellow-400">{winner.name} WINS! 🏆</div>
              <div className="text-gray-400 text-sm">Last country standing after {roundNumber} rounds!</div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setPhase("leaderboard")} className="px-6 py-2.5 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-colors text-sm cursor-pointer">
                  📊 Rankings
                </button>
                <button onClick={startGame} className="px-6 py-2.5 bg-yellow-400 text-black font-black rounded-full hover:bg-yellow-300 transition-colors text-sm cursor-pointer">
                  🔁 New Game
                </button>
              </div>
            </div>
          )}

          {/* LEADERBOARD */}
          {phase === "leaderboard" && (
            <div className="absolute inset-0 flex flex-col items-center z-20 bg-gray-950 overflow-y-auto py-6 px-4">
              <h2 className="text-3xl font-black text-white mb-1">Final Rankings</h2>
              {winner && (
                <p className="text-gray-400 text-sm mb-5">
                  <img src={flagUrl(winner.code)} alt={winner.name} className="w-6 h-4 object-cover rounded inline mr-1" />
                  <strong className="text-yellow-400">{winner.name}</strong> won in {roundNumber} rounds!
                </p>
              )}
              <div className="w-full max-w-sm space-y-1.5">
                {winner && (
                  <div className="flex items-center gap-3 bg-yellow-400/20 border border-yellow-400/30 rounded-lg px-4 py-2.5">
                    <span className="text-yellow-400 font-black w-8">🏆</span>
                    <img src={flagUrl(winner.code)} alt={winner.name} className="w-8 h-5 object-cover rounded shrink-0" />
                    <span className="font-bold text-white">{winner.name}</span>
                    <span className="ml-auto text-yellow-400 font-black text-sm">WINNER!</span>
                  </div>
                )}
                {leaderboard.map((entry, idx) => (
                  <div key={entry.code + idx} className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-4 py-2">
                    <span className="text-gray-500 font-bold text-sm w-8">#{entry.rank}</span>
                    <img src={flagUrl(entry.code)} alt={entry.name} className="w-8 h-5 object-cover rounded shrink-0" />
                    <span className="font-medium text-gray-200 text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
              <button onClick={startGame} className="mt-6 px-8 py-3 bg-yellow-400 text-black font-black rounded-full hover:bg-yellow-300 transition-colors cursor-pointer">
                🔁 New Game
              </button>
            </div>
          )}

          {/* ZONE BOXES */}
          {round && showZoneLabels && zonePositions.length > 0 && !isDuelPhase &&
            phase !== "intro" && phase !== "rule_reveal" && phase !== "winner" && phase !== "leaderboard" && (
              round.zones.map((zone, zi) => {
                const zp = zonePositions[zi];
                if (!zp) return null;
                const isElim = eliminatingZones.includes(zone.id);
                return (
                  <div
                    key={zone.id}
                    className="absolute rounded-xl border-2 pointer-events-none transition-all duration-400"
                    style={{
                      left: zp.x, top: zp.y, width: zp.w, height: zp.h,
                      borderColor: isElim ? "#ef4444" : zone.color + "55",
                      backgroundColor: isElim ? "#ef444412" : zone.color + "0e",
                      boxShadow: isElim ? `0 0 32px ${zone.color}55` : "none",
                    }}
                  >
                    <div
                      className="absolute -top-4 left-3 px-2.5 py-0.5 rounded-full text-xs font-black shadow-lg text-black"
                      style={{ backgroundColor: isElim ? "#ef4444" : zone.color }}
                    >
                      {zone.label} ({zone.countries.length})
                    </div>
                    {isElim && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-red-400 font-black text-base opacity-70 animate-pulse">☠️ ELIMINATED</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}

          {/* FLAG BALLS — SVG */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%", zIndex: 5 }}
          >
            <defs>
              {ballsRender.filter((b) => !b.eliminated).map((b) => (
                <clipPath key={`clip-${b.code}`} id={`clip-${b.code}`}>
                  <circle cx="0" cy="0" r={BALL_R - 1} />
                </clipPath>
              ))}
            </defs>

            {ballsRender.map((ball) => {
              if (ball.eliminated) {
                const opacity = Math.max(0, 1 - ball.elimAnim * 2);
                if (opacity <= 0) return null;
                const scale = 1 + ball.elimAnim * 2;
                return (
                  <g key={ball.code} transform={`translate(${ball.x}, ${ball.y})`} opacity={opacity}>
                    <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontSize={BALL_SIZE * scale}>💥</text>
                  </g>
                );
              }

              const isElimZone = ball.zoneId ? eliminatingZones.includes(ball.zoneId) : false;
              const isSwap = ball.swapping;
              const hasShield = ball.hasShield;

              return (
                <g key={ball.code} transform={`translate(${ball.x}, ${ball.y})`}>
                  {/* Shield glow ring */}
                  {hasShield && (
                    <circle cx={0} cy={0} r={BALL_R + 5} fill="none" stroke="#eab308" strokeWidth={3} opacity={0.8}
                      style={{ filter: "drop-shadow(0 0 6px #eab308)" }} />
                  )}
                  {/* Elim zone red ring */}
                  {isElimZone && (
                    <circle cx={0} cy={0} r={BALL_R + 3} fill="none" stroke="#ef4444" strokeWidth={2} opacity={0.7} />
                  )}
                  {/* Ball background */}
                  <circle cx={0} cy={0} r={BALL_R}
                    fill={isElimZone ? "#1a0000" : "#0f172a"}
                    stroke={isSwap ? "#fbbf24" : isElimZone ? "#ef4444" : "#1e293b"}
                    strokeWidth={isElimZone || isSwap ? 2 : 1}
                  />
                  {/* Flag image clipped to circle */}
                  <image
                    href={flagUrl(ball.code)}
                    x={-BALL_R} y={-BALL_R}
                    width={BALL_SIZE} height={BALL_SIZE}
                    clipPath={`url(#clip-${ball.code})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                  {/* Shield badge */}
                  {hasShield && (
                    <text x={BALL_R - 3} y={-BALL_R + 8} textAnchor="middle" fontSize={12}>🛡️</text>
                  )}
                  {/* Name label in endgame */}
                  {isEndgame && (
                    <text x={0} y={BALL_R + 11} textAnchor="middle" dominantBaseline="hanging" fontSize={9} fill="#64748b">
                      {ball.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* SORTING BANNER */}
          {phase === "sorting" && round && (
            <div className="absolute inset-x-0 bottom-3 flex justify-center z-10">
              <div className="px-5 py-3 rounded-2xl text-center shadow-2xl max-w-lg mx-4" style={{ background: "rgba(0,0,0,0.88)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-sm font-black text-white mb-0.5">
                  {round.title.replace(/^[💥🔄]\s*(DOUBLE ELIM:|LAST SWAP:)?\s*/i, "")}
                </div>
                <div className="text-gray-500 text-xs">Countries sorting into groups...</div>
                {round.chaosType === "lastswap" && (
                  <div className="text-orange-400 text-xs font-bold mt-1 animate-pulse">🔄 Watch for last-second swaps!</div>
                )}
              </div>
            </div>
          )}

          {/* COUNTDOWN BANNER */}
          {phase === "countdown" && (
            <div className="absolute inset-x-0 bottom-3 flex flex-col items-center z-10 gap-2">
              <div className="px-5 py-2 rounded-2xl text-center shadow-2xl" style={{ background: "rgba(0,0,0,0.88)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-xs text-gray-400">Which group is smallest? That group is OUT!</div>
              </div>
              <div
                className="text-8xl font-black text-yellow-400 leading-none"
                style={{ textShadow: "0 0 60px rgba(250,204,21,0.5)" }}
              >
                {countdown}
              </div>
            </div>
          )}

          {/* RESULT BANNER */}
          {phase === "result" && (
            <div className="absolute inset-x-0 bottom-3 flex flex-col items-center z-10">
              <div className="px-6 py-4 rounded-2xl text-center shadow-2xl max-w-lg mx-4" style={{ background: "rgba(0,0,0,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {shieldedThisRound.length > 0 && (
                  <div className="text-yellow-400 font-bold text-sm mb-2">
                    🛡️ Shielded: {shieldedThisRound.map((c) => ballsRef.current.find((b) => b.code === c)?.name).join(", ")} — saved!
                  </div>
                )}
                {eliminatedThisRound.length === 0 ? (
                  <div className="text-yellow-300 font-black text-xl">
                    🛡️ Everyone in the eliminated zone was SHIELDED! Nobody out!
                  </div>
                ) : (
                  <>
                    <div className="text-red-400 font-black text-base mb-2">
                      ☠️ ELIMINATED — {eliminatedThisRound.length} {eliminatedThisRound.length === 1 ? "country" : "countries"} gone!
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-center mb-2">
                      {eliminatedThisRound.slice(0, 24).map((code) => (
                        <img key={code} src={flagUrl(code)} alt={code} className="w-8 h-5 object-cover rounded" title={ballsRef.current.find((b) => b.code === code)?.name} />
                      ))}
                      {eliminatedThisRound.length > 24 && (
                        <span className="text-gray-500 text-xs self-center">+{eliminatedThisRound.length - 24} more</span>
                      )}
                    </div>
                    <div className="text-gray-500 text-xs">{surviving.length} countries remain...</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* SKIPPED */}
          {phase === "skipped" && (
            <div className="absolute inset-x-0 bottom-3 flex justify-center z-10">
              <div className="px-6 py-4 rounded-2xl text-center shadow-2xl max-w-sm mx-4" style={{ background: "rgba(0,0,0,0.88)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-base font-black text-gray-300 mb-1">⏭️ Round Skipped</div>
                <div className="text-sm text-gray-500">{skipReason}</div>
              </div>
            </div>
          )}

          {/* ENDGAME BADGE */}
          {isEndgame && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
              <div className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 text-xs font-black animate-pulse">
                🔥 FINAL {surviving.length} — ENDGAME!
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — eliminated list */}
        {leaderboard.length > 0 && phase !== "leaderboard" && phase !== "intro" && (
          <div className="w-36 bg-gray-900 border-l border-gray-800 overflow-y-auto shrink-0 py-2">
            <div className="px-3 mb-1.5 text-xs font-black text-gray-600 uppercase tracking-wider">Out</div>
            <div className="space-y-0.5">
              {leaderboard.slice(0, 55).map((entry, idx) => (
                <div key={entry.code + idx} className="flex items-center gap-2 px-2 py-0.5">
                  <span className="text-gray-600 text-xs w-5 shrink-0">#{entry.rank}</span>
                  <img src={flagUrl(entry.code)} alt={entry.name} className="w-7 h-4.5 object-cover rounded shrink-0" style={{ height: "18px" }} />
                  <span className="text-gray-500 text-xs truncate">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
