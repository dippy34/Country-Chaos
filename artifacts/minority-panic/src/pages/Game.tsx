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
} from "../game/engine";

type GamePhase =
  | "intro"
  | "rule_reveal"
  | "sorting"
  | "countdown"
  | "eliminating"
  | "result"
  | "skipped"
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
}

const BALL_SIZE = 44;
const LERP_SPEED = 0.07;
const ARENA_PAD = 70;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function useArenaSize() {
  const [size, setSize] = useState({ w: 900, h: 600 });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setSize({ w: rect.width, h: rect.height });
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

function randomArenaPos(w: number, h: number) {
  return {
    x: ARENA_PAD + Math.random() * (w - ARENA_PAD * 2),
    y: ARENA_PAD + Math.random() * (h - ARENA_PAD * 2),
  };
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
  const [eliminatedThisRound, setEliminatedThisRound] = useState<string[]>([]);
  const [leaderboard, setLeaderboard] = useState<
    Array<{ code: string; flag: string; name: string; rank: number }>
  >([]);
  const [winner, setWinner] = useState<{
    code: string;
    flag: string;
    name: string;
  } | null>(null);
  const [showZoneLabels, setShowZoneLabels] = useState(false);
  const [zonePositions, setZonePositions] = useState<
    Array<{ x: number; y: number; w: number; h: number }>
  >([]);
  const [eliminatingZones, setEliminatingZones] = useState<string[]>([]);
  const [skipReason, setSkipReason] = useState("");

  const ballsRef = useRef<CountryBall[]>([]);
  const [ballsRender, setBallsRender] = useState<CountryBall[]>([]);

  const setPhaseSync = (p: GamePhase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  useEffect(() => {
    const loop = () => {
      let changed = false;
      ballsRef.current = ballsRef.current.map((b) => {
        if (b.eliminated) {
          if (b.elimAnim < 1) {
            changed = true;
            return { ...b, elimAnim: Math.min(1, b.elimAnim + 0.03) };
          }
          return b;
        }
        const dx = b.targetX - b.x;
        const dy = b.targetY - b.y;
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          changed = true;
          return {
            ...b,
            x: lerp(b.x, b.targetX, LERP_SPEED),
            y: lerp(b.y, b.targetY, LERP_SPEED),
          };
        }
        return b;
      });
      if (changed) setBallsRender([...ballsRef.current]);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const runRoundRef = useRef<(rn: number, surviving: string[]) => void>(null!);

  runRoundRef.current = (rn: number, surviving: string[]) => {
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

    const config = generateRound(surviving, rn);
    const configWithZones = assignCountriesToZones(COUNTRIES, config, surviving);
    const filteredZones = configWithZones.zones.filter(
      (z) => z.countries.length > 0
    );
    const zonePosArr = getZonePositions(filteredZones.length, w, arenaH);

    setZonePositions(zonePosArr);
    setRound({ ...configWithZones, zones: filteredZones });
    setRoundNumber(rn + 1);
    setEliminatingZones([]);
    setEliminatedThisRound([]);
    setShowZoneLabels(false);

    // PHASE 1: Show the rule as a big overlay for 3 seconds
    setPhaseSync("rule_reveal");

    setTimeout(() => {
      // PHASE 2: Balls start moving to their zones
      setShowZoneLabels(true);
      setPhaseSync("sorting");

      filteredZones.forEach((zone, zi) => {
        const zp = zonePosArr[zi];
        if (!zp) return;
        const positions = placeCountriesInZone(zone.countries, zp);
        ballsRef.current = ballsRef.current.map((b) => {
          if (zone.countries.includes(b.code) && !b.eliminated) {
            const pos = positions[b.code];
            if (!pos) return b;
            return { ...b, zoneId: zone.id, targetX: pos.x, targetY: pos.y };
          }
          return b;
        });
      });

      // Handle last-second swap chaos
      if (config.chaosType === "lastswap") {
        setTimeout(() => {
          const numSwap = Math.max(2, Math.floor(surviving.length * 0.1));
          const toSwap = shuffle(surviving).slice(0, numSwap);
          const swapPairs: [string, string][] = [];
          for (let i = 0; i < toSwap.length - 1; i += 2) {
            swapPairs.push([toSwap[i], toSwap[i + 1]]);
          }

          // Mark as swapping for visual highlight
          ballsRef.current = ballsRef.current.map((b) => ({
            ...b,
            swapping: toSwap.includes(b.code),
          }));

          const updatedZones = [...filteredZones];
          swapPairs.forEach(([ca, cb]) => {
            const ballA = ballsRef.current.find((x) => x.code === ca);
            const ballB = ballsRef.current.find((x) => x.code === cb);
            if (!ballA || !ballB) return;
            const aZoneIdx = filteredZones.findIndex((z) =>
              z.countries.includes(ca)
            );
            const bZoneIdx = filteredZones.findIndex((z) =>
              z.countries.includes(cb)
            );
            if (aZoneIdx === -1 || bZoneIdx === -1 || aZoneIdx === bZoneIdx)
              return;
            const tmpX = ballA.targetX;
            const tmpY = ballA.targetY;
            const tmpZone = ballA.zoneId;
            ballsRef.current = ballsRef.current.map((b) => {
              if (b.code === ca)
                return { ...b, targetX: ballB.targetX, targetY: ballB.targetY, zoneId: ballB.zoneId };
              if (b.code === cb)
                return { ...b, targetX: tmpX, targetY: tmpY, zoneId: tmpZone };
              return b;
            });
            updatedZones[aZoneIdx] = {
              ...updatedZones[aZoneIdx],
              countries: updatedZones[aZoneIdx].countries.map((c) => (c === ca ? cb : c)),
            };
            updatedZones[bZoneIdx] = {
              ...updatedZones[bZoneIdx],
              countries: updatedZones[bZoneIdx].countries.map((c) => (c === cb ? ca : c)),
            };
          });
          setRound((prev) =>
            prev ? { ...prev, zones: updatedZones } : prev
          );
        }, 2500);
      }

      // PHASE 3: Countdown starts after balls have settled
      const countdownDelay = config.chaosType === "lastswap" ? 4500 : 3000;
      setTimeout(() => {
        setCountdown(3);
        setPhaseSync("countdown");
        let cnt = 3;
        const tick = setInterval(() => {
          cnt -= 1;
          setCountdown(cnt);
          if (cnt <= 0) {
            clearInterval(tick);
            doEliminate(
              configWithZones,
              filteredZones,
              rn,
              surviving,
              config.chaosType
            );
          }
        }, 1200);
      }, countdownDelay);
    }, 3000); // Stay on rule_reveal for 3 seconds
  };

  const doEliminate = (
    _config: RoundConfig,
    filteredZones: Zone[],
    rn: number,
    surviving: string[],
    chaosType: string
  ) => {
    if (chaosType === "fakeout") {
      setPhaseSync("result");
      setEliminatedThisRound([]);
      setEliminatingZones([]);
      setTimeout(() => {
        disperseBalls();
        setTimeout(() => runRoundRef.current(rn + 1, surviving), 1200);
      }, 3500);
      return;
    }

    const toElim = findEliminatedZones(filteredZones, chaosType === "double");
    const elimCodes = toElim.flatMap((z) => z.countries);
    const elimZoneIds = toElim.map((z) => z.id);

    // If no elimination is possible (all in one zone), skip this round
    if (elimCodes.length === 0) {
      setSkipReason("All countries were in the same group — no one eliminated this round!");
      setPhaseSync("skipped");
      setTimeout(() => {
        disperseBalls();
        setTimeout(() => runRoundRef.current(rn + 1, surviving), 1000);
      }, 3000);
      return;
    }

    setEliminatingZones(elimZoneIds);
    setPhaseSync("eliminating");

    // Give a moment for the red zone highlight to register before exploding
    setTimeout(() => {
      ballsRef.current = ballsRef.current.map((b) => {
        if (elimCodes.includes(b.code)) {
          return { ...b, eliminated: true, eliminatedRound: rn + 1, elimAnim: 0 };
        }
        return b;
      });

      const nextSurviving = surviving.filter((c) => !elimCodes.includes(c));
      const newElimEntries = elimCodes.map((code, idx) => {
        const ball = ballsRef.current.find((b) => b.code === code);
        return {
          code,
          flag: ball?.flag ?? "🏴",
          name: ball?.name ?? code,
          rank: surviving.length - idx,
        };
      });

      setLeaderboard((prev) => [...newElimEntries, ...prev]);
      setEliminatedThisRound(elimCodes);
      setPhaseSync("result");

      // Show result for 3.5 seconds before next round
      setTimeout(() => {
        if (nextSurviving.length <= 1) {
          const last = nextSurviving[0];
          const ball = ballsRef.current.find((b) => b.code === last);
          if (ball)
            setWinner({ code: ball.code, flag: ball.flag, name: ball.name });
          setPhaseSync("winner");
        } else {
          disperseBalls();
          setTimeout(() => runRoundRef.current(rn + 1, nextSurviving), 1200);
        }
      }, 3500);
    }, 1200);
  };

  const disperseBalls = () => {
    const w = sizeRef.current.w || 900;
    const h = sizeRef.current.h || 600;
    setShowZoneLabels(false);
    setEliminatingZones([]);
    ballsRef.current = ballsRef.current.map((b) => {
      if (!b.eliminated) {
        const pos = randomArenaPos(w, (h - 130));
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
      const pos = randomArenaPos(w, h - 130);
      return {
        code: c.code,
        flag: c.flag,
        name: c.name,
        x: pos.x,
        y: pos.y,
        targetX: pos.x,
        targetY: pos.y,
        zoneId: null,
        eliminated: false,
        eliminatedRound: -1,
        swapping: false,
        elimAnim: 0,
      };
    });
    setBallsRender([...ballsRef.current]);
    setLeaderboard([]);
    setWinner(null);
    setRoundNumber(0);
    setEliminatingZones([]);
    setEliminatedThisRound([]);
    setShowZoneLabels(false);
    setRound(null);
    setTimeout(() => runRoundRef.current(0, startCountries.map((c) => c.code)), 600);
  };

  const surviving = ballsRender.filter((b) => !b.eliminated);
  const isEndgame =
    surviving.length <= 10 &&
    phase !== "intro" &&
    phase !== "winner" &&
    phase !== "leaderboard";

  const getPhaseLabel = () => {
    switch (phase) {
      case "rule_reveal": return { text: "📢 RULE ANNOUNCED", color: "text-yellow-400" };
      case "sorting": return { text: "🔀 SORTING...", color: "text-blue-400" };
      case "countdown": return { text: "⏱️ COUNTDOWN", color: "text-orange-400" };
      case "eliminating": return { text: "💀 ELIMINATING!", color: "text-red-400" };
      case "result": return { text: "✅ RESULT", color: "text-green-400" };
      case "skipped": return { text: "⏭️ SKIPPED", color: "text-gray-400" };
      default: return null;
    }
  };

  const phaseLabel = getPhaseLabel();

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden select-none">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight">
            🌍 <span className="text-yellow-400">MINORITY</span>{" "}
            <span className="text-red-500">PANIC</span>
          </span>
          <span className="text-gray-500 text-xs hidden sm:block">Country Chaos</span>
        </div>
        <div className="flex items-center gap-4">
          {phase !== "intro" && phase !== "winner" && phase !== "leaderboard" && (
            <>
              {phaseLabel && (
                <span className={`text-xs font-bold ${phaseLabel.color} hidden sm:block`}>
                  {phaseLabel.text}
                </span>
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500 text-xs">Round</span>
                <span className="text-white font-black">{roundNumber}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-bold text-sm">
                  {surviving.length} left
                </span>
              </div>
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

      <div className="flex flex-1 min-h-0">
        {/* Arena */}
        <div className="flex-1 relative" ref={arenaRef}>

          {/* INTRO SCREEN */}
          {phase === "intro" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-20 bg-gray-950">
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-black mb-2 leading-none">
                  <span className="text-yellow-400">MINORITY</span>{" "}
                  <span className="text-red-500">PANIC</span>
                </h1>
                <p className="text-base text-gray-400 font-semibold">Country Chaos</p>
              </div>
              <div className="text-gray-300 text-center max-w-md text-sm leading-relaxed px-6 space-y-2">
                <p>60 country flags compete in a shared arena.</p>
                <p>Each round, a rule splits them into groups.</p>
                <p>The <span className="text-red-400 font-bold">smallest group</span> is eliminated. Last one standing wins! 🏆</p>
              </div>
              <button
                onClick={startGame}
                className="px-10 py-4 bg-yellow-400 text-black font-black text-2xl rounded-full hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-yellow-400/25 cursor-pointer"
              >
                ▶ PLAY NOW
              </button>
              <div className="flex flex-wrap gap-4 justify-center text-xs text-gray-500">
                <span>⚡ Fast-paced</span>
                <span>💥 Double eliminations</span>
                <span>🔄 Last-second swaps</span>
                <span>🎭 Fake-outs</span>
              </div>
            </div>
          )}

          {/* RULE REVEAL — Big overlay for 3 seconds */}
          {phase === "rule_reveal" && round && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gray-950/90 gap-5">
              <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                Round {roundNumber}
              </div>
              <div className="text-center px-6">
                <div className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
                  {round.title.replace(/^[💥🔄⚡🎭]\s*/, "")}
                </div>
                {round.chaosType === "double" && (
                  <div className="inline-block px-4 py-1.5 bg-red-500 text-white font-black text-sm rounded-full animate-pulse">
                    💥 DOUBLE ELIMINATION — TWO groups get cut!
                  </div>
                )}
                {round.chaosType === "fakeout" && (
                  <div className="inline-block px-4 py-1.5 bg-yellow-500 text-black font-black text-sm rounded-full animate-pulse">
                    🎭 WARNING: This might be a FAKEOUT!
                  </div>
                )}
                {round.chaosType === "lastswap" && (
                  <div className="inline-block px-4 py-1.5 bg-orange-500 text-black font-black text-sm rounded-full animate-pulse">
                    🔄 LAST SECOND SWAP — some will switch sides!
                  </div>
                )}
                {round.chaosType === "normal" && (
                  <div className="text-gray-400 text-sm mt-2">
                    The smallest group gets eliminated ☠️
                  </div>
                )}
              </div>
              <div className="flex gap-3 flex-wrap justify-center">
                {round.zones.map((z) => (
                  <div
                    key={z.id}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold text-black"
                    style={{ backgroundColor: z.color }}
                  >
                    {z.label}
                  </div>
                ))}
              </div>
              <div className="text-gray-500 text-xs mt-2 animate-pulse">
                Countries sorting in a moment...
              </div>
            </div>
          )}

          {/* WINNER SCREEN */}
          {phase === "winner" && winner && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 bg-gray-950/95">
              <div className="text-8xl animate-bounce">{winner.flag}</div>
              <div className="text-4xl font-black text-yellow-400">
                {winner.name} WINS!
              </div>
              <div className="text-5xl">🏆</div>
              <div className="text-gray-300 text-sm">
                Last country standing after {roundNumber} rounds!
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setPhase("leaderboard")}
                  className="px-6 py-2.5 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-colors text-sm cursor-pointer"
                >
                  📊 See Rankings
                </button>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 bg-yellow-400 text-black font-black rounded-full hover:bg-yellow-300 transition-colors text-sm cursor-pointer"
                >
                  🔁 New Game
                </button>
              </div>
            </div>
          )}

          {/* LEADERBOARD SCREEN */}
          {phase === "leaderboard" && (
            <div className="absolute inset-0 flex flex-col items-center z-20 bg-gray-950/98 overflow-y-auto py-6 px-4">
              <h2 className="text-3xl font-black text-white mb-1">
                Final Rankings
              </h2>
              <p className="text-gray-400 text-sm mb-5">
                {winner && (
                  <span>
                    {winner.flag}{" "}
                    <strong className="text-yellow-400">{winner.name}</strong>{" "}
                    won in {roundNumber} rounds!
                  </span>
                )}
              </p>
              <div className="w-full max-w-sm space-y-1.5">
                {winner && (
                  <div className="flex items-center gap-3 bg-yellow-400/20 border border-yellow-400/30 rounded-lg px-4 py-2.5">
                    <span className="text-yellow-400 font-black text-lg w-8">
                      🏆
                    </span>
                    <span className="text-2xl">{winner.flag}</span>
                    <span className="font-bold text-white">{winner.name}</span>
                    <span className="ml-auto text-yellow-400 font-black text-sm">
                      WINNER!
                    </span>
                  </div>
                )}
                {leaderboard.map((entry, idx) => (
                  <div
                    key={entry.code + idx}
                    className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-4 py-2"
                  >
                    <span className="text-gray-500 font-bold text-sm w-8">
                      #{entry.rank}
                    </span>
                    <span className="text-xl">{entry.flag}</span>
                    <span className="font-medium text-gray-200 text-sm">
                      {entry.name}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={startGame}
                className="mt-6 px-8 py-3 bg-yellow-400 text-black font-black rounded-full hover:bg-yellow-300 transition-colors cursor-pointer"
              >
                🔁 New Game
              </button>
            </div>
          )}

          {/* ZONE BOXES */}
          {round &&
            showZoneLabels &&
            zonePositions.length > 0 &&
            phase !== "intro" &&
            phase !== "rule_reveal" &&
            phase !== "winner" &&
            phase !== "leaderboard" && (
              <>
                {round.zones.map((zone, zi) => {
                  const zp = zonePositions[zi];
                  if (!zp) return null;
                  const isEliminating = eliminatingZones.includes(zone.id);
                  return (
                    <div
                      key={zone.id}
                      className="absolute rounded-xl border-2 transition-all duration-500 pointer-events-none"
                      style={{
                        left: zp.x,
                        top: zp.y,
                        width: zp.w,
                        height: zp.h,
                        borderColor: isEliminating
                          ? "#ef4444"
                          : zone.color + "60",
                        backgroundColor: isEliminating
                          ? "#ef444418"
                          : zone.color + "10",
                        boxShadow: isEliminating
                          ? `0 0 40px ${zone.color}60`
                          : "none",
                        transition: "border-color 0.4s, background-color 0.4s, box-shadow 0.4s",
                      }}
                    >
                      <div
                        className="absolute -top-4 left-3 px-2.5 py-0.5 rounded-full text-xs font-black shadow-lg"
                        style={{
                          backgroundColor: isEliminating
                            ? "#ef4444"
                            : zone.color,
                          color: "#000",
                        }}
                      >
                        {zone.label}
                        <span className="ml-1 opacity-80">
                          ({zone.countries.length})
                        </span>
                      </div>
                      {isEliminating && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-red-400 font-black text-xl opacity-80 animate-pulse">
                            ☠️ SMALLEST GROUP
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}

          {/* COUNTRY BALLS */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: "100%", height: "100%", zIndex: 5 }}
          >
            {ballsRender.map((ball) => {
              if (ball.eliminated) {
                const opacity = Math.max(0, 1 - ball.elimAnim);
                const scale = 1 + ball.elimAnim * 1.8;
                return (
                  <g
                    key={ball.code}
                    transform={`translate(${ball.x}, ${ball.y})`}
                    opacity={opacity}
                  >
                    <text
                      x={0}
                      y={0}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={BALL_SIZE * scale}
                    >
                      💥
                    </text>
                  </g>
                );
              }

              const isElimZone = ball.zoneId
                ? eliminatingZones.includes(ball.zoneId)
                : false;
              const isSwapping = ball.swapping;

              return (
                <g
                  key={ball.code}
                  transform={`translate(${ball.x}, ${ball.y})`}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={BALL_SIZE / 2}
                    fill={isElimZone ? "#3b0000" : "#1e293b"}
                    stroke={
                      isElimZone
                        ? "#ef4444"
                        : isSwapping
                        ? "#fbbf24"
                        : "#334155"
                    }
                    strokeWidth={isElimZone ? 2.5 : isSwapping ? 2.5 : 1}
                  />
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isEndgame ? 24 : 18}
                  >
                    {ball.flag}
                  </text>
                  {isEndgame && (
                    <text
                      x={0}
                      y={BALL_SIZE / 2 + 11}
                      textAnchor="middle"
                      dominantBaseline="hanging"
                      fontSize={9}
                      fill="#64748b"
                    >
                      {ball.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* SORTING BANNER (shown while balls move) */}
          {(phase === "sorting") && round && (
            <div className="absolute inset-x-0 bottom-4 flex justify-center z-10">
              <div
                className="px-5 py-3 rounded-2xl text-center shadow-2xl max-w-lg mx-4"
                style={{
                  background: "rgba(0,0,0,0.9)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-base font-black text-white mb-1">
                  {round.title.replace(/^[💥🔄⚡🎭]\s*/, "")}
                </div>
                <div className="text-gray-400 text-xs">
                  Watch the countries sort into their groups...
                </div>
                {round.chaosType === "lastswap" && (
                  <div className="text-orange-400 text-xs font-bold mt-1 animate-pulse">
                    🔄 Some will swap sides at the last second — stay alert!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* COUNTDOWN BANNER */}
          {phase === "countdown" && round && (
            <div className="absolute inset-x-0 bottom-4 flex flex-col items-center z-10 gap-2">
              <div
                className="px-5 py-2.5 rounded-2xl text-center shadow-2xl max-w-lg mx-4"
                style={{
                  background: "rgba(0,0,0,0.9)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-sm font-bold text-gray-300">
                  Which group is smallest?
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  That group gets eliminated!
                </div>
              </div>
              <div className="text-7xl font-black text-yellow-400 drop-shadow-2xl leading-none" style={{ textShadow: "0 0 40px rgba(250,204,21,0.5)" }}>
                {countdown}
              </div>
            </div>
          )}

          {/* RESULT BANNER */}
          {phase === "result" && (
            <div className="absolute inset-x-0 bottom-4 flex flex-col items-center z-10">
              <div
                className="px-6 py-4 rounded-2xl text-center shadow-2xl max-w-lg mx-4"
                style={{
                  background: "rgba(0,0,0,0.92)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {eliminatedThisRound.length === 0 ? (
                  <>
                    <div className="text-2xl font-black text-yellow-400 animate-pulse mb-1">
                      😅 FAKEOUT!
                    </div>
                    <div className="text-gray-300 text-sm">
                      Nobody was eliminated this round. Phew!
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-red-400 font-black text-lg mb-2">
                      ☠️ ELIMINATED — {eliminatedThisRound.length}{" "}
                      {eliminatedThisRound.length === 1 ? "country" : "countries"} gone!
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-center mb-2">
                      {eliminatedThisRound.slice(0, 20).map((code) => {
                        const ball = ballsRef.current.find((b) => b.code === code);
                        return (
                          <span key={code} className="text-2xl" title={ball?.name}>
                            {ball?.flag}
                          </span>
                        );
                      })}
                      {eliminatedThisRound.length > 20 && (
                        <span className="text-gray-400 text-xs self-center">
                          +{eliminatedThisRound.length - 20} more
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {surviving.length} countries remain...
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* SKIPPED ROUND */}
          {phase === "skipped" && (
            <div className="absolute inset-x-0 bottom-4 flex justify-center z-10">
              <div
                className="px-6 py-4 rounded-2xl text-center shadow-2xl max-w-sm mx-4"
                style={{
                  background: "rgba(0,0,0,0.9)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="text-lg font-black text-gray-300 mb-1">⏭️ Round Skipped</div>
                <div className="text-sm text-gray-500">{skipReason}</div>
              </div>
            </div>
          )}

          {/* ENDGAME BADGE */}
          {isEndgame && phase !== "winner" && phase !== "leaderboard" && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
              <div className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 text-xs font-black animate-pulse">
                🔥 FINAL {surviving.length} — ENDGAME!
              </div>
            </div>
          )}
        </div>

        {/* Sidebar leaderboard */}
        {leaderboard.length > 0 &&
          phase !== "leaderboard" &&
          phase !== "intro" && (
            <div className="w-40 bg-gray-900 border-l border-gray-800 overflow-y-auto shrink-0 py-2">
              <div className="px-3 mb-1.5 text-xs font-black text-gray-600 uppercase tracking-wider">
                Eliminated
              </div>
              <div className="space-y-0.5">
                {leaderboard.slice(0, 50).map((entry, idx) => (
                  <div
                    key={entry.code + idx}
                    className="flex items-center gap-2 px-3 py-0.5"
                  >
                    <span className="text-gray-600 text-xs w-5 shrink-0">
                      #{entry.rank}
                    </span>
                    <span className="text-base shrink-0">{entry.flag}</span>
                    <span className="text-gray-500 text-xs truncate">
                      {entry.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
