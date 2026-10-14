import React, { useState } from 'react';
import { initialFaqs } from '../data/initialData';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  PhoneCall
} from 'lucide-react';

interface FaqSectionProps {
  hotlinePhone: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ hotlinePhone }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            자주 묻는 질문 (FAQ)
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            누수 탐지 정책, 출장 가능 지역, 보험 청구, 사후 보증에 대해 고객님들께서 가장 궁금해하시는 점들입니다.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {initialFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 font-black text-xs flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question.replace(/^Q\.\s*/, '')}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/40 animate-in fade-in-50 duration-200">
                    <div className="p-4 bg-white rounded-xl border border-slate-200/60 leading-relaxed">
                      {faq.answer.replace(/^A\.\s*/, '')}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Call Card */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-slate-900 text-sm">더 궁금하신 사항이 있으신가요?</div>
            <p className="text-xs text-slate-500 mt-0.5">전화 주시면 전문 엔지니어가 친절하고 상세하게 안내해 드립니다.</p>
          </div>
          <a
            href={`tel:${hotlinePhone}`}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>상담전화: {hotlinePhone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
