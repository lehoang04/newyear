import { Wish } from './types';

// ==========================================
// KHI MUỐN CHỈNH SỬA NỘI DUNG, HÃY SỬA Ở ĐÂY
// ==========================================

// Ngày đếm ngược (Năm mới 2026)
export const TARGET_DATE = new Date('2026-01-01T00:00:00');

// Danh sách các lời chúc (Bạn có thể thêm/sửa/xóa tùy ý)
export const WISHES: Wish[] = [
  {
    id: '1',
    sender: 'Anh Tuấn',
    recipient: 'Gia Đình',
    message: 'Chúc mừng năm mới 2026! Chúc bố mẹ luôn mạnh khỏe, vui vẻ và hạnh phúc bên con cháu. Mong năm nay nhà mình sẽ có thêm nhiều chuyến du lịch cùng nhau!',
    color: 'shadow-pink-500/50',
    image: 'https://picsum.photos/600/400?random=1'
  },
  {
    id: '2',
    sender: 'Tuấn',
    recipient: 'Vợ Yêu',
    message: 'Năm mới đến rồi, cảm ơn em đã luôn bên cạnh anh. Chúc em năm 2026 luôn xinh đẹp, rạng rỡ và đạt được mọi ước mơ của mình. Yêu em nhiều!',
    color: 'shadow-cyan-400/50',
    image: 'https://picsum.photos/600/400?random=2'
  },
  {
    id: '3',
    sender: 'Sếp',
    recipient: 'Team Marketing',
    message: 'Năm 2025 chúng ta đã làm rất tốt. Chúc toàn team năm 2026 bùng nổ doanh số, idea ngập tràn và bonus ngập tài khoản!',
    color: 'shadow-yellow-400/50',
    image: 'https://picsum.photos/600/400?random=3'
  },
  {
    id: '4',
    sender: 'Bạn thân',
    recipient: 'Hội Ế',
    message: 'Chúc mừng năm mới! Năm nay nhất định phải có người yêu nhé các bạn tôi ơi. Không thì chúng ta lại đi du lịch cùng nhau tiếp!',
    color: 'shadow-purple-500/50',
    image: 'https://picsum.photos/600/400?random=4'
  }
];

export const APP_COLORS = {
  primary: '#d946ef', // Fuchsia 500
  secondary: '#22d3ee', // Cyan 400
  accent: '#facc15', // Yellow 400
};
