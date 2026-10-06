/* ============================================================
   🎬 BANNER MOVIES - Phim hiển thị trên slider banner
   ============================================================ */
export const bannerMovies = [
  {
    id: 1,
    title: 'Avengers: Endgame',
    year: 2019,
    rating: 8.4,
    duration: '181 phút',
    genre: ['Hành động', 'Phiêu lưu', 'Khoa học viễn tưởng'],
    description:
      'Sau những biến cố của Avengers: Infinity War, các siêu anh hùng còn sống sót cùng nhau lên kế hoạch để đảo ngược hành động của Thanos.',
    banner: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Spider-Man: No Way Home',
    year: 2021,
    rating: 8.7,
    duration: '148 phút',
    genre: ['Hành động', 'Phiêu lưu'],
    description:
      'Peter Parker phải đối mặt với hậu quả khi danh tính của mình bị lộ, và anh tìm đến sự giúp đỡ của Doctor Strange để sửa chữa mọi chuyện.',
    banner: 'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Dune: Part Two',
    year: 2024,
    rating: 8.9,
    duration: '166 phút',
    genre: ['Khoa học viễn tưởng', 'Phiêu lưu'],
    description:
      'Paul Atreides tiếp tục cuộc hành trình trên hành tinh Arrakis, nơi anh phải đối mặt với những thử thách mới và kẻ thù nguy hiểm.',
    banner: 'https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    isFeatured: true,
  },
  {
    id: 4,
    title: 'The Batman',
    year: 2022,
    rating: 8.5,
    duration: '176 phút',
    genre: ['Hành động', 'Tội phạm'],
    description:
      'Batman phải đối mặt với một kẻ sát nhân bí ẩn đang khủng bố thành phố Gotham, và phải điều tra mối liên hệ với quá khứ đen tối của chính mình.',
    banner: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    isFeatured: false,
  },
  {
    id: 5,
    title: 'Oppenheimer',
    year: 2023,
    rating: 8.6,
    duration: '180 phút',
    genre: ['Tiểu sử', 'Lịch sử'],
    description:
      'Câu chuyện về J. Robert Oppenheimer và vai trò của ông trong việc phát triển bom nguyên tử trong Thế chiến II.',
    banner: 'https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    isFeatured: false,
  },
]

/* ============================================================
   🎬 MOVIES - Danh sách phim mới cập nhật / đề xuất
   ============================================================ */
export const movies = [
  {
    id: 1,
    title: 'Spider-Man: No Way Home',
    year: 2021,
    rating: 8.7,
    duration: '148 phút',
    genre: ['Hành động', 'Phiêu lưu'],
    image: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    isNew: true,
    isHot: true,
  },
  {
    id: 2,
    title: 'Dune: Part Two',
    year: 2024,
    rating: 8.9,
    duration: '166 phút',
    genre: ['Khoa học viễn tưởng', 'Phiêu lưu'],
    image: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
    isNew: true,
  },
  {
    id: 3,
    title: 'The Batman',
    year: 2022,
    rating: 8.5,
    duration: '176 phút',
    genre: ['Hành động', 'Tội phạm'],
    image: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    isHot: true,
  },
  {
    id: 4,
    title: 'Oppenheimer',
    year: 2023,
    rating: 8.6,
    duration: '180 phút',
    genre: ['Tiểu sử', 'Lịch sử'],
    image: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  },
  {
    id: 5,
    title: 'Barbie',
    year: 2023,
    rating: 7.8,
    duration: '114 phút',
    genre: ['Hài', 'Phiêu lưu'],
    image: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    isNew: true,
  },
  {
    id: 6,
    title: 'The Flash',
    year: 2023,
    rating: 7.2,
    duration: '144 phút',
    genre: ['Hành động', 'Khoa học viễn tưởng'],
    image: 'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
  },
]

/* ============================================================
   🏆 TOP MOVIES - Phim đánh giá cao nhất
   ============================================================ */
export const topMovies = [
  {
    id: 7,
    title: 'The Shawshank Redemption',
    year: 1994,
    rating: 9.3,
    image: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
  },
  {
    id: 8,
    title: 'The Godfather',
    year: 1972,
    rating: 9.2,
    image: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
  },
  {
    id: 9,
    title: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
]

/* ============================================================
   🏷️ GENRES - Thể loại phim (dùng cho filter tab)
   Lưu ý: icon là JSX nên đặt trong file .jsx hoặc import ở component
   => Ở đây chỉ export data thuần, icon sẽ map ở Home.jsx
   ============================================================ */
export const genres = [
  { id: 'all', name: 'Tất cả' },
  { id: 'action', name: 'Hành động' },
  { id: 'comedy', name: 'Hài' },
  { id: 'drama', name: 'Tâm lý' },
  { id: 'scifi', name: 'Viễn tưởng' },
]
