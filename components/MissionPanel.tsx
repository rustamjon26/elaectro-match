import React from "react";
import { TokenType, BonusStats } from "../types";
import { Check } from "lucide-react";

interface MissionPanelProps {
  goals: Record<string, number>;
  collected: Record<string, number>;
  bonusStats: BonusStats;
}

export const MissionPanel: React.FC<MissionPanelProps> = ({
  goals,
  collected,
  bonusStats,
}) => {
  // Rasmga asoslangan ranglar
  const STYLES: Record<
    string,
    { badgeBg: string; badgeText: string; bar: string }
  > = {
    [TokenType.BJT]: {
      badgeBg: "bg-[#ff6b6b]",
      badgeText: "text-white",
      bar: "bg-[#ce42f5]",
    }, // Pushti badge, Binafsha bar
    [TokenType.FET]: {
      badgeBg: "bg-[#5be0c4]",
      badgeText: "text-black",
      bar: "bg-[#00ff88]",
    }, // Turkuaz badge, Yashil bar
    [TokenType.GAIN]: {
      badgeBg: "bg-[#5da8cc]",
      badgeText: "text-white",
      bar: "bg-[#ffaa00]",
    }, // Ko'k badge, Sariq bar
  };

  const renderGoalRow = (type: string) => {
    const current = collected[type] || 0;
    const remaining = goals[type] || 0;
    const total = current + remaining;

    if (total === 0) return null;

    const percent = Math.min(100, (current / total) * 100);
    const style = STYLES[type] || {
      badgeBg: "bg-gray-500",
      badgeText: "text-white",
      bar: "bg-gray-500",
    };

    return (
      <div className="mb-5 w-full" key={type}>
        {/* Info Row */}
        <div className="flex items-center justify-between mb-1.5">
          {/* Left Side: Badge & Text */}
          <div className="flex items-center gap-3">
            {/* Badge */}
            <div
              className={`${style.badgeBg} ${style.badgeText} font-bold font-orbitron text-[11px] px-2 py-0.5 rounded-sm min-w-[45px] text-center shadow-md`}
            >
              {type}
            </div>

            {/* Text Stack */}
            <div className="flex flex-col leading-none">
              <span className="text-slate-400 text-[10px] font-inter mb-0.5">
                Collect
              </span>
              <span className="text-slate-200 text-sm font-inter font-medium">
                {type}
              </span>
            </div>
          </div>

          {/* Right Side: Counter */}
          <div className="font-orbitron text-lg tracking-widest font-bold">
            <span className="text-white">{current}</span>
            <span className="text-slate-500 text-sm">/{total}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
          <div
            className={`h-full ${style.bar} shadow-[0_0_10px_currentColor] transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="
      w-full md:w-[340px] p-6 
      bg-[#131122] 
      border border-pink-500/40 
      rounded-xl 
      shadow-[0_0_40px_rgba(100,0,200,0.2)]
      flex flex-col
    "
    >
      {/* MAIN HEADER */}
      <div className="mb-8">
        <h2 className="font-orbitron text-[#ff40c9] text-2xl font-bold tracking-wider uppercase drop-shadow-[0_0_2px_rgba(255,64,201,0.8)]">
          MISSION GOALS
        </h2>
      </div>

      {/* GOALS LIST */}
      <div className="flex flex-col mb-2">
        {renderGoalRow(TokenType.BJT)}
        {renderGoalRow(TokenType.FET)}
        {renderGoalRow(TokenType.GAIN)}
      </div>

      {/* DIVIDER LINE */}
      <div className="h-px bg-[#7d2cff]/30 w-full my-6"></div>

      {/* BONUS HEADER */}
      <div>
        <h3 className="font-orbitron text-cyan-400 text-lg font-bold mb-5 uppercase tracking-wide drop-shadow-[0_0_5px_rgba(34,211,238,0.6)]">
          BONUS OBJECTIVES
        </h3>

        {/* BONUS LIST */}
        <div className="space-y-4 font-inter text-sm">
          {/* NOISE */}
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[13px]">
              Destroy NOISE tokens
            </span>
            <span
              className={`font-orbitron font-bold text-lg ${
                bonusStats.noiseDestroyed >= 5
                  ? "text-[#ff40c9]"
                  : "text-[#ff40c9]"
              }`}
            >
              {bonusStats.noiseDestroyed >= 5 ? (
                <span className="text-[#ff40c9]">5/5</span> // Rasmda 3/5 pushti edi
              ) : (
                `${Math.min(bonusStats.noiseDestroyed, 5)}/5`
              )}
            </span>
          </div>

          {/* LOCK */}
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[13px]">
              Unlock LOCK tokens
            </span>
            <span className={`font-orbitron font-bold text-lg text-cyan-400`}>
              {Math.min(bonusStats.locksUnlocked, 3)}/3
            </span>
          </div>

          {/* COMBO */}
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-[13px]">Achieve 5+ combo</span>
            <span className="flex items-center justify-end w-8">
              {bonusStats.maxCombo >= 5 ? (
                <Check className="w-5 h-5 text-[#00ff88] stroke-[3]" />
              ) : (
                <span className="text-slate-600 font-bold">-</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
