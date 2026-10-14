import React, { useState } from 'react';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1914' || password === 'admin') {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-100 text-slate-800 rounded-xl">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">관리자 인증</h3>
              <p className="text-[11px] text-slate-500">울산누수종합방수설비 CMS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>비밀번호가 올바르지 않습니다. 다시 입력해 주세요.</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
              <span>관리자 비밀번호</span>
            </label>
            <input
              type="password"
              autoFocus
              required
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-[11px] text-blue-800 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>초기 관리자 접속 안내</span>
            </div>
            <p>초기 관리자 기본 비밀번호는 <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-blue-900 border border-blue-200">admin1914</code> 입니다.</p>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              취소
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              대시보드 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
