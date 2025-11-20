import React from 'react';
import { Tile as TileType, TokenType } from '../types';
import { TOKEN_COLORS } from '../constants';
import { Activity, Zap, TrendingUp, Shield, ToggleRight, XOctagon, Lock, Anchor } from 'lucide-react';

interface TileProps {
  tile: TileType;
  isSelected: boolean;
  onClick: () => void;
}

export const Tile: React.FC<TileProps> = ({ tile, isSelected, onClick }) => {
  const colorClass = TOKEN_COLORS[tile.type] || 'text-white';
  
  const getIcon = () => {
    switch (tile.type) {
      case TokenType.BJT: return <Activity className="w-8 h-8" />;
      case TokenType.FET: return <Zap className="w-8 h-8" />;
      case TokenType.GAIN: return <TrendingUp className="w-8 h-8" />;
      case TokenType.HIGH_Z: return <Shield className="w-8 h-8" />;
      case TokenType.SWITCH: return <ToggleRight className="w-8 h-8" />;
      case TokenType.NOISE: return <XOctagon className="w-8 h-8 opacity-50" />;
      case TokenType.LOCK: return <Lock className="w-8 h-8" />;
      case TokenType.STATIC_FIELD: return <Anchor className="w-8 h-8" />;
      default: return null;
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative w-full h-full flex items-center justify-center
        transition-all duration-300 cursor-pointer
        ${isSelected ? 'scale-110 z-10' : 'scale-100'}
        ${tile.isMatched ? 'animate-ping opacity-0' : 'opacity-100'}
      `}
    >
      <div className={`
        relative flex items-center justify-center
        w-10 h-10 md:w-14 md:h-14 rounded-xl
        bg-slate-900/80 backdrop-blur-sm border border-slate-700/50
        shadow-lg transition-all
        ${isSelected ? 'border-neon-cyan shadow-[0_0_15px_#00E5FF]' : ''}
        ${tile.locked ? 'border-red-500/50' : ''}
        hover:bg-slate-800
      `}>
        <div className={`${colorClass} ${tile.locked ? 'opacity-30' : ''}`}>
            {getIcon()}
        </div>
        {tile.locked && (
            <div className="absolute inset-0 flex items-center justify-center text-red-500 drop-shadow-lg">
                <Lock className="w-6 h-6" />
            </div>
        )}
      </div>
    </div>
  );
};
