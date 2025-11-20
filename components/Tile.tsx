import React from "react";
import { Tile as TileType, TokenType } from "../types";
import { TOKEN_COLORS } from "../constants";
import {
  Activity,
  Zap,
  TrendingUp,
  Shield,
  ToggleRight,
  XOctagon,
  Lock,
  Anchor,
} from "lucide-react";

interface TileProps {
  tile: TileType;
  isSelected: boolean;
  onClick: () => void;
}

export const Tile: React.FC<TileProps> = ({ tile, isSelected, onClick }) => {
  const colorClass = TOKEN_COLORS[tile.type] || "text-white";

  const getIcon = () => {
    // Icon o'lchamlarini foiz yoki 'w-3/4' kabi beramiz, shunda kichik ekranda ham sig'adi
    const iconClass = "w-[70%] h-[70%]";

    switch (tile.type) {
      case TokenType.BJT:
        return <Activity className={iconClass} />;
      case TokenType.FET:
        return <Zap className={iconClass} />;
      case TokenType.GAIN:
        return <TrendingUp className={iconClass} />;
      case TokenType.HIGH_Z:
        return <Shield className={iconClass} />;
      case TokenType.SWITCH:
        return <ToggleRight className={iconClass} />;
      case TokenType.NOISE:
        return <XOctagon className={`${iconClass} opacity-50`} />;
      case TokenType.LOCK:
        return <Lock className={iconClass} />;
      case TokenType.STATIC_FIELD:
        return <Anchor className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative w-full h-full p-1
        transition-transform duration-200 cursor-pointer
        ${isSelected ? "scale-90" : "scale-100 hover:scale-105"}
        ${tile.isMatched ? "scale-0 opacity-0" : "opacity-100"}
      `}
    >
      <div
        className={`
        w-full h-full rounded-lg md:rounded-xl flex items-center justify-center
        bg-slate-900/80 backdrop-blur-sm border 
        shadow-lg
        ${
          isSelected
            ? "border-neon-cyan shadow-[0_0_15px_#00E5FF] bg-slate-800"
            : "border-slate-700/50 hover:bg-slate-800"
        }
        ${tile.locked ? "border-red-500/50" : ""}
      `}
      >
        <div
          className={`${colorClass} w-full h-full flex items-center justify-center ${
            tile.locked ? "opacity-30" : ""
          }`}
        >
          {getIcon()}
        </div>

        {tile.locked && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 drop-shadow-lg z-10">
            <Lock className="w-1/2 h-1/2" />
          </div>
        )}
      </div>
    </div>
  );
};
