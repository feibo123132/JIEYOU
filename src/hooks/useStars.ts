// src/hooks/useStars.ts (已改造为使用 Firebase Firestore)

import { useState, useEffect } from 'react';
import { db } from '../firebase'; // 引入我们配置好的 Firebase 数据库实例
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  Timestamp, // 用于处理时间戳
  query,
  orderBy // 用于排序
} from 'firebase/firestore';
import type { StarData, StarFormData } from '../types/stars';

// 指向我们数据库里的 "stars" 集合（可以理解为一张数据表）
const starsCollectionRef = collection(db, 'stars');

export function useStars() {
  const [stars, setStars] = useState<StarData[]>([]);

  // ---- 核心改造：从 Firestore 实时加载和监听星星数据 ----
  // 这个 useEffect 会在组件加载时运行，并且会一直监听云端数据的任何变化
  useEffect(() => {
    // 创建一个查询，按时间戳升序排序，确保新星星出现在后面
    const q = query(starsCollectionRef, orderBy('timestamp', 'asc'));

    // onSnapshot 是一个实时监听器
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedStars = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id, // Firestore 文档的 ID
          // 将 Firestore 的 Timestamp 对象转换为 JavaScript Date 对象
          timestamp: (data.timestamp as Timestamp)?.toDate().toISOString() || new Date().toISOString()
        } as StarData;
      });
      setStars(fetchedStars);
    });

    // 组件卸载时，取消监听，避免内存泄漏
    return () => unsubscribe();
  }, []); // 空依赖数组，确保这个 effect 只运行一次

  // ---- 添加新星 (已改造为写入 Firestore) ----
  const addStar = async (formData: StarFormData): Promise<StarData> => {
    // 准备要存入数据库的数据
    const newStarData = {
      ...formData,
      timestamp: new Date(), // 使用服务器时间戳更佳，但客户端时间也足够用
      position: {
        x: Math.random() * 100,
        y: Math.random() * 100,
      },
      size: Math.random() * 10 + 10,
      twinkleRate: Math.random() * 2 + 1,
    };
    
    // 使用 addDoc 将数据添加到 Firestore，它会自动生成一个唯一的 ID
    const docRef = await addDoc(starsCollectionRef, newStarData);

    // 返回包含新 ID 的完整星星对象，用于即时反馈
    return {
      ...newStarData,
      id: docRef.id,
      timestamp: newStarData.timestamp.toISOString(),
    };
  };

  // ---- 删除星星 (已改造为从 Firestore 删除) ----
  const deleteStar = async (starId: string) => {
    // 创建一个指向特定星星文档的引用
    const starDoc = doc(db, 'stars', starId);
    // 从数据库删除该文档
    await deleteDoc(starDoc);
  };

  // ---- 获取所有星星 (无需改动) ----
  const getAllStars = () => stars;

  // ---- 清空所有星星 (已改造为清空 Firestore 集合) ----
  const clearStars = async () => {
    // 注意：这个操作会删除数据库中的所有星星，请谨慎使用！
    const querySnapshot = await getDocs(starsCollectionRef);
    // 遍历所有文档并逐个删除
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, 'stars', document.id));
    });
  };

  // ---- 根据昵称筛选星星 (无需改动，仍在客户端进行) ----
  const filterStarsByNickname = (nickname: string) => {
    if (!nickname.trim()) {
      return stars;
    }
    const lowerCaseNickname = nickname.toLowerCase();
    return stars.filter(star =>
      star.nickname.toLowerCase().includes(lowerCaseNickname)
    );
  };

  // 返回的接口和之前保持一致，组件无需修改
  return {
    stars,
    addStar,
    deleteStar,
    getAllStars,
    clearStars,
    filterStarsByNickname,
  };
}