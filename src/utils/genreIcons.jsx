// src/utils/genreIcons.jsx
import {
  Award,
  Film,
  Ghost,
  Heart,
  Laugh,
  Sparkles,
  Star,
  Sword,
  TrendingUp,
  Tv,
  Zap,
} from 'lucide-react'

/**
 * Map slug thể loại → icon
 * Slug lấy từ API /the-loai
 */
export const genreIcons = {
  all: <Film size={16} />,
  'hanh-dong': <Zap size={16} />,
  'hanh-dong-phieu-luu': <Zap size={16} />,
  hai: <Laugh size={16} />,
  'chinh-kich': <Award size={16} />,
  drama: <Award size={16} />,
  'vien-tuong': <Sparkles size={16} />,
  'khoa-hoc-vien-tuong': <Sparkles size={16} />,
  'kinh-di': <Ghost size={16} />,
  'lang-man': <Heart size={16} />,
  'lang-mang': <Heart size={16} />,
  'vo-thuat': <Sword size={16} />,
  'vo-hiep': <Sword size={16} />,
  'kiem-hiep': <Sword size={16} />,
  'tien-hiep': <Star size={16} />,
  'toi-pham': <TrendingUp size={16} />,
  'hinh-su': <TrendingUp size={16} />,
  'hoat-hinh': <Tv size={16} />,
}

// Default icon nếu không có trong map
export const defaultGenreIcon = <Film size={16} />

export const getGenreIcon = (slug) => {
  return genreIcons[slug] || defaultGenreIcon
}
