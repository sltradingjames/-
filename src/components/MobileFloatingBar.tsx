import React from 'react';
import { PhoneCall } from 'lucide-react';

interface MobileFloatingBarProps {
  hotlinePhone: string;
}

export const MobileFloatingBar: React.FC<MobileFloatingBarProps> = ({
  hotlinePhone,
}) => {
  return (
    <aside aria-label="빠른 전화상담 바로가기" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-2xl safe-area-pb">
      <div className="max-w-md mx-auto">
        <a
          href={`tel:${hotlinePhone}`}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 active:from-emerald-700 active:to-teal-700 text-white rounded-xl font-black text-sm shadow-md"
        >
          <PhoneCall className="w-4 h-4 animate-bounce" />
          <span>전화상담 바로연결 ({hotlinePhone})</span>
        </a>
      </div>
    </aside>
  );
};
