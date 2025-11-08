// 定义星星相关的类型接口
export type StarShape = 
  | 'star' | 'star-half-stroke' | 'circle' | 'circle-half-stroke' | 'diamond' 
  | 'heart' | 'heart-half-stroke' | 'moon' | 'sun' | 'bolt' | 'star-of-david' 
  | 'asterisk' | 'music' | 'guitar' | 'microphone' | 'palette' | 'brush' 
  | 'camera' | 'film' | 'book' | 'pencil' | 'pen-fancy' | 'feather' 
  | 'anchor' | 'cross' | 'star-and-crescent' | 'yin-yang' | 'atom' 
  | 'dna' | 'cloud' | 'cloud-rain' | 'snowflake' | 'droplet' | 'fire' 
  | 'leaf' | 'flower' | 'carrot' | 'apple-whole' | 'mushroom' | 'paw' 
  | 'fish' | 'bird' | 'cat' | 'dog' | 'butterfly' | 'dragon' | 'unicorn' 
  | 'magic' | 'wand-magic-sparkles' | 'sparkles' | 'gem' | 'gem-dollar' 
  | 'coin' | 'gift' | 'bell' | 'balloon' | 'cake-candles' | 'confetti-ball' 
  | 'tada' | 'medal' | 'trophy' | 'thumbs-up' | 'thumbs-down' | 'hand-peace' 
  | 'hand-sparkles' | 'hand-heart' | 'chevron-up' | 'chevron-down' | 'chevron-left' | 'chevron-right' 
  | 'play' | 'pause' | 'stop' | 'volume-high' | 'volume-low' | 'volume-xmark' 
  | 'headphones' | 'radio' | 'record-vinyl' | 'compact-disc' | 'tape' | 'walkie-talkie'
  | 'plane' | 'rocket' | 'spaceship' | 'ufo' | 'satellite' | 'comet'
  | 'zodiac-aquarius' | 'zodiac-pisces' | 'zodiac-aries' | 'zodiac-taurus' 
  | 'zodiac-gemini' | 'zodiac-cancer' | 'zodiac-leo' | 'zodiac-virgo' 
  | 'zodiac-libra' | 'zodiac-scorpio' | 'zodiac-sagittarius' | 'zodiac-capricorn';

export interface StarData {
  id: string;
  nickname: string;
  message: string;
  timestamp: string;
  color: string;
  shape: StarShape;
  position: {
    x: number;
    y: number;
  };
  size: number;
  twinkleRate: number;
}

export interface StarFormData {
  nickname: string;
  message: string;
  color: string;
  shape: StarShape;
}