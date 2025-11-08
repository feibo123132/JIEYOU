import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import type { StarData } from '../types/stars';

interface InteractiveStarProps {
  star: StarData;
  onDelete: (starId: string) => void;
  onFocus?: (starId: string) => void;
  isHighlighted?: boolean;
}

export const InteractiveStar: React.FC<InteractiveStarProps> = ({ 
  star, 
  onDelete,
  onFocus,
  isHighlighted = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // 格式化时间戳为可读时间
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // 处理删除确认
  const handleDeleteConfirm = () => {
    onDelete(star.id);
    toast.success(`已删除 ${star.nickname} 的星星`);
    setShowDeleteConfirm(false);
  };
  
  // 处理点击星星
  const handleClick = (e: React.MouseEvent) => {
    // 如果点击的是删除相关按钮，不触发聚焦
    if (e.target instanceof HTMLElement && e.target.closest('.delete-controls')) {
      return;
    }
    
    if (onFocus) {
      onFocus(star.id);
    }
  };
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${star.position.x}%`,
        top: `${star.position.y}%`,
        zIndex: 10,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        transition: { 
          duration: 0.5,
          type: "spring" 
        }
      }}
      whileHover={{ scale: isHighlighted ? 1.4 : 1.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleClick}
    >
      {/* 星星图标 */}
      <motion.div
        className={`relative ${isHighlighted ? 'ring-4 ring-white/30 rounded-full' : ''}`}
        style={{ color: star.color }}
        animate={{
          scale: [1, isHighlighted ? 1.2 : 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: star.twinkleRate,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <i 
          className={`fa-solid fa-${star.shape}`}
          style={{ fontSize: `${star.size}px` }}
        ></i>
        
        {/* 点击星星时显示的详情卡片 */}
        {isHovered && (
          <motion.div
            className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs p-2 rounded-md w-48 shadow-lg z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setShowDeleteConfirm(false);
            }}
          >
            <p className="font-bold mb-1">{star.nickname}</p>
            <p className="mb-1 text-gray-300 text-[10px]">{formatTimestamp(star.timestamp)}</p>
            <p className="text-[10px] mb-2">{star.message}</p>
            
            {/* 删除控制按钮 */}
            <div className="delete-controls flex justify-end mt-1 gap-2">
              <button
                onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                className="text-[10px] px-2 py-1 bg-red-500/20 hover:bg-red-500/30 rounded"
              >
                <i className="fa-solid fa-trash-can mr-1"></i>
                删除
              </button>
            </div>
            
            {/* 删除确认对话框 */}
            {showDeleteConfirm && (
              <motion.div
                className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-black/90 border border-red-500/50 text-white text-[10px] p-2 rounded-md z-30 w-40"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setShowDeleteConfirm(false);
                }}
              >
                <p className="mb-2">确认删除这颗星星吗？</p>
                <div className="flex gap-1">
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 text-[10px] px-2 py-1 bg-red-500 hover:bg-red-600 rounded"
                  >
                    确认
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 text-[10px] px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded"
                  >
                    取消
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};