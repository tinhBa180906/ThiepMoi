/**
 * App.jsx - Entry point của ứng dụng
 * Cấu hình React Router để xử lý URL param ?guest=TênKháchMời
 * BrowserRouter bao bọc toàn bộ app để useSearchParams() hoạt động.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvitationPage from './views/pages/InvitationPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route duy nhất - toàn bộ logic URL param xử lý bên trong */}
        <Route path="/" element={<InvitationPage />} />

        {/* Fallback cho bất kỳ route nào không khớp */}
        <Route path="*" element={<InvitationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
