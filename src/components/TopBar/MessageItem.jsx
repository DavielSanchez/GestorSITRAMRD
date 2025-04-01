export default function MessageItem({ user }) {
    return (
      <div className="flex items-start gap-2">
        {/* Avatar circular gris */}
        <div className="w-10 h-10 rounded-full bg-[#d9d9d9] flex-shrink-0" />
  
        {/* Texto del mensaje */}
        <div className="leading-5">
          <div className="text-[#212121] text-sm font-bold">{user}</div>
          <div className="text-[#212121] text-xs">Mensaje</div>
          <div className="text-[#9e9e9e] text-xs">Hace 5 minutos</div>
        </div>
      </div>
    );
  }
  