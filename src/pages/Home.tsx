import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StarBackground } from '../components/StarBackground';
import { StarForm } from '../components/StarForm';
import { InteractiveStar } from '../components/InteractiveStar';
import { useStars } from '../hooks/useStars';
import { toast } from 'sonner';
import type { StarFormData } from '../types/stars';

export default function Home() {
  const { stars, addStar, deleteStar, filterStarsByNickname } = useStars();
  const [showForm, setShowForm] = useState(false);
  const [visibleStars, setVisibleStars] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedStarId, setHighlightedStarId] = useState<string | null>(null);
  const [filteredStars, setFilteredStars] = useState(stars);
  
  // 处理添加星星
  const handleAddStar = (formData: StarFormData) => {
    const newStar = addStar(formData);
    setShowForm(false);
    
    // 添加动画效果：星星逐个显示
    setTimeout(() => {
      setVisibleStars(prev => [...prev, newStar.id]);
    }, 100);
  };
  
  // 处理删除星星
  const handleDeleteStar = (starId: string) => {
    deleteStar(starId);
    setVisibleStars(prev => prev.filter(id => id !== starId));
    
    // 如果删除的是当前高亮的星星，清除高亮
    if (highlightedStarId === starId) {
      setHighlightedStarId(null);
    }
  };
  
  // 处理搜索筛选
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      const results = filterStarsByNickname(value);
      setFilteredStars(results);
      
      // 如果有搜索结果，高亮第一个匹配的星星
      if (results.length > 0) {
        setHighlightedStarId(results[0].id);
        
        // 滚动到高亮的星星（如果需要）
        const starElement = document.querySelector(`[data-star-id="${results[0].id}"]`);
        if (starElement) {
          starElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setHighlightedStarId(null);
        toast.info('没有找到匹配的星星');
      }
    } else {
      setFilteredStars(stars);
      setHighlightedStarId(null);
    }
  };
  
  // 清除搜索
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredStars(stars);
    setHighlightedStarId(null);
  };
  
  // 初始化时显示所有已存在的星星
  useEffect(() => {
    if (stars.length > 0) {
      // 延迟显示，创造逐个出现的效果
      const timer = setTimeout(() => {
        setVisibleStars(stars.map(star => star.id));
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [stars]); // 添加stars作为依赖项，确保星星数据变化时重新执行
  
  // 当星星数据变化时，更新筛选结果
  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredStars(filterStarsByNickname(searchTerm));
    } else {
      setFilteredStars(stars);
    }
  }, [stars, searchTerm, filterStarsByNickname]);
  
  // 格式化当前日期和时间
  const getCurrentDateTime = () => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden relative">
      {/* 星空背景 */}
      <StarBackground className="fixed inset-0 z-0" />
      
      {/* 主内容容器 */}
      <div className="relative z-10 container mx-auto px-4 py-10 flex flex-col min-h-screen">
        {/* 页面标题和介绍 */}
        <motion.div 
          className="text-center mb-6 pt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            我们的JIEYOU宇宙
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            我们在此刻相遇，你抬起手，在宇宙中点亮了一颗，独属于自己的星星
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {getCurrentDateTime()} · 第 {stars.length} 颗星星
          </p>
        </motion.div>
        
        {/* 搜索框 */}
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="搜索星星别称..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <i className="fa-solid fa-times-circle"></i>
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-xs text-gray-400 mt-1 text-right">
              找到 {filteredStars.length} 个匹配结果
            </p>
          )}
        </motion.div>
        
        {/* 星星展示区域 */}
        <div className="relative flex-grow min-h-[400px] w-full my-8">
          {/* 显示筛选后的星星或所有星星 */}
          {(searchTerm ? filteredStars : stars).map((star) => (
            visibleStars.includes(star.id) && (
              <div key={star.id} data-star-id={star.id}>
                <InteractiveStar 
                  star={star} 
                  onDelete={handleDeleteStar}
                  onFocus={() => setHighlightedStarId(star.id)}
                  isHighlighted={highlightedStarId === star.id}
                />
              </div>
            )
          ))}
          
          {/* 空状态提示 */}
          {stars.length === 0 && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="text-6xl mb-4 text-gray-600">
                <i className="fa-solid fa-star"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">暂无星星</h3>
              <p className="text-gray-400 max-w-md mb-6">
                成为第一个在这片星空留下印记的人吧！点击下方按钮，点亮属于您的星星。
              </p>
            </motion.div>
          )}
          
          {/* 搜索无结果提示 */}
          {searchTerm && filteredStars.length === 0 && stars.length > 0 && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-6xl mb-4 text-gray-600">
                <i className="fa-solid fa-search"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">未找到匹配的星星</h3>
              <p className="text-gray-400 max-w-md mb-6">
                尝试使用不同的关键词搜索，或者清除搜索条件查看所有星星。
              </p>
              <button
                onClick={clearSearch}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
              >
                <i className="fa-solid fa-times mr-1"></i>
                清除搜索
              </button>
            </motion.div>
          )}
        </div>
        
        {/* 控制区域 */}
        <div className="mb-12 max-w-md mx-auto">
          {!showForm ? (
            <motion.button
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl text-white font-bold text-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30"
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <i className="fa-solid fa-plus-circle mr-2"></i>
              点亮一颗星星
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-6"
            >
              <StarForm onSubmit={handleAddStar} />
              <button
                className="w-full mt-4 py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setShowForm(false)}
              >
                <i className="fa-solid fa-times mr-1"></i>
                取消
              </button>
            </motion.div>
          )}
        </div>
        
        {/* 页脚 */}
        <footer className="text-center text-gray-500 text-sm py-6">
          <p>星空印记 · 记录每一次美好的相遇</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <i className="fa-brands fa-weixin"></i>
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <i className="fa-brands fa-weibo"></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}