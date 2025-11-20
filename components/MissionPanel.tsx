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
  // Rasmga asoslangan aniq ranglar
  const STYLES: Record<
    string,
    { badgeBg: string; badgeText: string; bar: string }
  > = {
    [TokenType.BJT]: {
      badgeBg: "bg-[#ff758f]",
      badgeText: "text-black",
      bar: "bg-[#bd52ff]",
    }, // Pushti Badge, Binafsha Bar
    [TokenType.FET]: {
      badgeBg: "bg-[#64dfdf]",
      badgeText: "text-black",
      bar: "bg-[#00ff9d]",
    }, // Havorang Badge, Yashil Bar
    [TokenType.GAIN]: {
      badgeBg: "bg-[#48cae4]",
      badgeText: "text-black",
      bar: "bg-[#ffb703]",
    }, // Ko'k Badge, Sariq Bar
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
      <div className="mb-6 w-full" key={type}>
        {/* Info Row */}
        <div className="flex items-center justify-between mb-2">
          {/* Left Side: Badge & Text */}
          <div className="flex items-center gap-4">
            {/* Badge */}
            <div
              className={`${style.badgeBg} ${style.badgeText} font-black font-orbitron text-[10px] px-2 py-0.5 rounded-[2px] min-w-[40px] text-center shadow-[0_0_8px_rgba(255,255,255,0.2)]`}
            >
              {type}
            </div>

            {/* Text Stack */}
            <div className="flex flex-col leading-tight">
              <span className="text-slate-400 text-[11px] font-inter tracking-wide">
                Collect
              </span>
              <span className="text-slate-200 text-sm font-inter font-medium tracking-wide">
                {type}
              </span>
            </div>
          </div>

          {/* Right Side: Counter */}
          <div className="font-orbitron text-lg tracking-widest font-bold flex items-baseline">
            <span className="text-white mr-1">{current}</span>
            <span className="text-slate-500 text-sm">/{total}</span>
          </div>
        </div>

        {/* Progress Bar (Background) */}
        <div className="w-full h-2 bg-[#1e1b2e] rounded-full overflow-hidden">
          {/* Active Bar */}
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
      w-full md:w-[320px] p-6 
      bg-[#100d1d] 
      border border-fuchsia-500/30
      rounded-2xl 
      shadow-[0_0_50px_rgba(15,10,30,0.8)]
      flex flex-col
      bg-[radial-gradient(circle_at_top_right,_rgba(50,20,80,0.2),_transparent)]
    "
    >
      {/* MAIN HEADER */}
      <div className="mb-8">
        <h2 className="font-orbitron text-[#ff2ec7] text-2xl font-black tracking-widest uppercase drop-shadow-[0_0_5px_rgba(255,46,199,0.6)]">
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
      <div className="h-px bg-[#ffffff]/10 w-full my-6"></div>

      {/* BONUS HEADER */}
      <div>
        <h3 className="font-orbitron text-[#00f0ff] text-lg font-bold mb-5 uppercase tracking-wider drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
          BONUS OBJECTIVES
        </h3>

        {/* BONUS LIST */}
        <div className="space-y-4 font-inter text-sm">
          {/* NOISE */}
          <div className="flex justify-between items-center group">
            <span className="text-slate-400 text-[13px] group-hover:text-white transition-colors">
              Destroy NOISE tokens
            </span>
            <span
              className={`font-orbitron font-bold text-lg ${
                bonusStats.noiseDestroyed >= 5
                  ? "text-[#ff2ec7]"
                  : "text-[#ff2ec7]"
              }`}
            >
              {Math.min(bonusStats.noiseDestroyed, 5)}/5
            </span>
          </div>

          {/* LOCK */}
          <div className="flex justify-between items-center group">
            <span className="text-slate-400 text-[13px] group-hover:text-white transition-colors">
              Unlock LOCK tokens
            </span>
            <span className="font-orbitron font-bold text-lg text-[#00f0ff]">
              {Math.min(bonusStats.locksUnlocked, 3)}/3
            </span>
          </div>

          {/* COMBO */}
          <div className="flex justify-between items-center group">
            <span className="text-slate-400 text-[13px] group-hover:text-white transition-colors">
              Achieve 5+ combo
            </span>
            <span className="flex items-center justify-end w-8">
              {bonusStats.maxCombo >= 5 ? (
                <Check className="w-6 h-6 text-[#00ff9d] stroke-[3] drop-shadow-[0_0_5px_rgba(0,255,157,0.8)]" />
              ) : (
                <span className="text-slate-700 font-bold text-xl">-</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
