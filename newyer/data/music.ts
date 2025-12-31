// ========================================================================
// CẤU HÌNH NHẠC NỀN (MUSIC CONFIGURATION)
// ========================================================================

export interface SongConfig {
  title: string;      // Tên bài hát hiển thị
  artist: string;     // Tên ca sĩ/nhạc sĩ
  source: string;     // Đường dẫn file nhạc (URL hoặc đường dẫn local)
}

export const BACKGROUND_MUSIC: SongConfig = {
  // BẠN CÓ THỂ SỬA THÔNG TIN Ở ĐÂY
  title: "Tết Bình An - 2026",
  artist: "Tết 2026 Collection",
  
  // HƯỚNG DẪN DÙNG NHẠC LOCAL (OFFLINE):
  // 1. Copy file nhạc (ví dụ: nhac-tet.mp3) vào thư mục 'public' của dự án.
  // 2. Sửa dòng source bên dưới thành: source: "/nhac-tet.mp3",
  
  source: "./tetbinhan.mp3" 
};
