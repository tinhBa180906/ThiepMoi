/**
 * VIEW/COMPONENT: GoldDivider.jsx
 * Divider trang trí bằng đường kẻ vàng và biểu tượng hoa.
 */

const GoldDivider = ({ icon = '✦' }) => (
  <div className="flex items-center gap-4 my-8">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
    <span className="text-[#c9a84c] text-sm tracking-widest opacity-80">{icon}</span>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a84c]" />
  </div>
);

export default GoldDivider;
