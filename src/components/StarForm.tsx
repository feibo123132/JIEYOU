import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import type { StarFormData, StarShape } from '../types/stars';

interface StarFormProps {
  onSubmit: (data: StarFormData) => void;
}

export const StarForm: React.FC<StarFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<StarFormData>({
    nickname: '',
    message: '',
    color: '#FFD700', // 默认金色
    shape: 'star',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllShapes, setShowAllShapes] = useState(false);
  
  // 常用颜色预设
  const colorPresets = [
    '#FFD700', '#FFFFFF', '#87CEEB', '#FF69B4', '#32CD32', '#FF6347',
    '#9370DB', '#FFA500', '#20B2AA', '#FF4500', '#98FB98', '#DDA0DD'
  ];
  
  // 创建80+种形状选项
  const allShapeOptions: { value: StarShape; label: string }[] = [
    { value: 'star', label: '星星' },
    { value: 'star-half-stroke', label: '半星' },
    { value: 'circle', label: '圆形' },
    { value: 'circle-half-stroke', label: '半圆' },
    { value: 'diamond', label: '钻石' },
    { value: 'heart', label: '爱心' },
    { value: 'heart-half-stroke', label: '半心' },
    { value: 'moon', label: '月亮' },
    { value: 'sun', label: '太阳' },
    { value: 'bolt', label: '闪电' },
    { value: 'star-of-david', label: '大卫星' },
    { value: 'asterisk', label: '星号' },
    { value: 'music', label: '音符' },
    { value: 'guitar', label: '吉他' },
    { value: 'microphone', label: '麦克风' },
    { value: 'palette', label: '调色板' },
    { value: 'brush', label: '画笔' },
    { value: 'camera', label: '相机' },
    { value: 'film', label: '胶卷' },
    { value: 'book', label: '书本' },
    { value: 'pencil', label: '铅笔' },
    { value: 'pen-fancy', label: '钢笔' },
    { value: 'feather', label: '羽毛' },
    { value: 'anchor', label: '船锚' },
    { value: 'cross', label: '十字' },
    { value: 'star-and-crescent', label: '星月' },
    { value: 'yin-yang', label: '阴阳' },
    { value: 'atom', label: '原子' },
    { value: 'dna', label: 'DNA' },
    { value: 'cloud', label: '云朵' },
    { value: 'cloud-rain', label: '雨云' },
    { value: 'snowflake', label: '雪花' },
    { value: 'droplet', label: '水滴' },
    { value: 'fire', label: '火焰' },
    { value: 'leaf', label: '树叶' },
    { value: 'flower', label: '花朵' },
    { value: 'carrot', label: '胡萝卜' },
    { value: 'apple-whole', label: '苹果' },
    { value: 'mushroom', label: '蘑菇' },
    { value: 'paw', label: '爪印' },
    { value: 'fish', label: '鱼' },
    { value: 'bird', label: '小鸟' },
    { value: 'cat', label: '猫咪' },
    { value: 'dog', label: '小狗' },
    { value: 'butterfly', label: '蝴蝶' },
    { value: 'dragon', label: '龙' },
    { value: 'unicorn', label: '独角兽' },
    { value: 'magic', label: '魔法' },
    { value: 'wand-magic-sparkles', label: '魔法棒' },
    { value: 'sparkles', label: '闪光' },
    { value: 'gem', label: '宝石' },
    { value: 'gem-dollar', label: '钱袋' },
    { value: 'coin', label: '硬币' },
    { value: 'gift', label: '礼物' },
    { value: 'bell', label: '铃铛' },
    { value: 'balloon', label: '气球' },
    { value: 'cake-candles', label: '蛋糕' },
    { value: 'confetti-ball', label: '彩球' },
    { value: 'tada', label: '庆祝' },
    { value: 'medal', label: '奖牌' },
    { value: 'trophy', label: '奖杯' },
    { value: 'thumbs-up', label: '点赞' },
    { value: 'thumbs-down', label: '点踩' },
    { value: 'hand-peace', label: '和平' },
    { value: 'hand-sparkles', label: '闪亮手' },
    { value: 'hand-heart', label: '爱心手' },
    { value: 'chevron-up', label: '上箭头' },
    { value: 'chevron-down', label: '下箭头' },
    { value: 'chevron-left', label: '左箭头' },
    { value: 'chevron-right', label: '右箭头' },
    { value: 'play', label: '播放' },
    { value: 'pause', label: '暂停' },
    { value: 'stop', label: '停止' },
    { value: 'volume-high', label: '音量高' },
    { value: 'volume-low', label: '音量低' },
    { value: 'volume-xmark', label: '静音' },
    { value: 'headphones', label: '耳机' },
    { value: 'radio', label: '收音机' },
    { value: 'record-vinyl', label: '唱片' },
    { value: 'compact-disc', label: '光盘' },
    { value: 'tape', label: '磁带' },
    { value: 'walkie-talkie', label: '对讲机' },
    { value: 'plane', label: '飞机' },
    { value: 'rocket', label: '火箭' },
    { value: 'spaceship', label: '飞船' },
    { value: 'ufo', label: '飞碟' },
    { value: 'satellite', label: '卫星' },
    { value: 'comet', label: '彗星' },
    { value: 'zodiac-aquarius', label: '水瓶' },
    { value: 'zodiac-pisces', label: '双鱼' },
    { value: 'zodiac-aries', label: '白羊' },
    { value: 'zodiac-taurus', label: '金牛' },
    { value: 'zodiac-gemini', label: '双子' },
    { value: 'zodiac-cancer', label: '巨蟹' },
    { value: 'zodiac-leo', label: '狮子' },
    { value: 'zodiac-virgo', label: '处女' },
    { value: 'zodiac-libra', label: '天秤' },
    { value: 'zodiac-scorpio', label: '天蝎' },
    { value: 'zodiac-sagittarius', label: '射手' },
    { value: 'zodiac-capricorn', label: '摩羯' }
  ];
  
  // 精选的常用形状（前16个）
  const featuredShapes = allShapeOptions.slice(0, 16);
  // 所有形状，用于展开时显示
  const shapeOptions = showAllShapes ? allShapeOptions : featuredShapes;
  
  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // 处理颜色选择
  const handleColorChange = (color: string) => {
    setFormData(prev => ({
      ...prev,
      color,
    }));
  };
  
  // 处理形状选择
  const handleShapeChange = (shape: StarShape) => {
    setFormData(prev => ({
      ...prev,
      shape,
    }));
  };
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.nickname.trim()) {
      toast.error('请输入星星的别称');
      return;
    }
    
    if (!formData.message.trim()) {
      toast.error('请在留言板中输入内容');
      return;
    }
    
    setIsSubmitting(true);
    
    // 模拟提交延迟
    setTimeout(() => {
      onSubmit(formData);
      
      // 重置表单
      setFormData({
        nickname: '',
        message: '',
        color: '#FFD700',
        shape: 'star',
      });
      setShowAllShapes(false);
      
      toast.success('您的星星已在宇宙中点亮！');
      setIsSubmitting(false);
    }, 500);
  };
  
  return (
    <motion.div
      className="bg-black/50 backdrop-blur-md rounded-xl p-5 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 text-white text-center">星星的足迹</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 昵称输入 */}
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-1">星星的别称</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="输入星星的别称"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            maxLength={20}
          />
        </div>
        
        {/* 留言输入 */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">留言板</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="星星此刻的心情、感受、想说的话或想听的歌…"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 h-24 resize-none"
            maxLength={100}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{formData.message.length}/100</p>
        </div>
        
        {/* 颜色选择器 - 支持无限颜色 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">选择星星颜色</label>
          <div className="flex gap-2 flex-wrap items-center">
            {/* 颜色预设 */}
            {colorPresets.map(color => (
              <motion.button
                key={color}
                type="button"
                className={`w-8 h-8 rounded-full ${formData.color === color ? 'ring-2 ring-white/50' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`选择${color}颜色`}
              />
            ))}
            
            {/* 自定义颜色输入 */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <input
                type="color"
                value={formData.color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-10 h-10 rounded-full cursor-pointer bg-transparent border border-white/20"
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs text-black font-bold">
                +
              </span>
            </motion.div>
          </div>
        </div>
        
        {/* 形状选择器 - 折叠式展示 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-300">选择星星形状</label>
            <motion.button
              type="button"
              className="text-xs text-gray-300 hover:text-white flex items-center gap-1"
              onClick={() => setShowAllShapes(!showAllShapes)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllShapes ? '收起' : '查看全部'}
              <i className={`fa-solid fa-chevron-${showAllShapes ? 'up' : 'down'} text-xs`}></i>
            </motion.button>
          </div>
          
          {/* 形状网格 - 使用折叠动画 */}
          <motion.div
            className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2"
            initial={false}
            animate={{ 
              height: showAllShapes ? 'auto' : '120px',
              overflow: showAllShapes ? 'visible' : 'hidden'
            }}
            transition={{ duration: 0.3 }}
          >
            {shapeOptions.map(shape => (
              <motion.button
                key={shape.value}
                type="button"
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors aspect-square ${
                  formData.shape === shape.value 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/15'
                }`}
                onClick={() => handleShapeChange(shape.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`选择${shape.label}形状`}
              >
                <i className={`fa-solid fa-${shape.value} text-lg mb-1`}></i>
                <span className="text-xs truncate max-w-full text-center">{shape.label}</span>
              </motion.button>
            ))}
            
            {/* 未展开时显示渐变遮罩 */}
            {!showAllShapes && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            )}
          </motion.div>
        </div>
        
        {/* 提交按钮 */}
        <motion.button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              正在点亮星星...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <i className="fa-solid fa-rocket mr-2"></i>
              点亮我的星星
            </span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};