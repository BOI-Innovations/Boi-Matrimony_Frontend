import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Heart, Landmark, Sparkles, ArrowRight } from "lucide-react";

interface DonationPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DonationPopup({
  open,
  onOpenChange,
}: DonationPopupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const handleDonateClick = () => {
    window.open("https://rzp.io/rzp/Hqva97l", "_blank");
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isScrollable = scrollHeight > clientHeight;
      const isNotAtBottom = scrollTop + clientHeight < scrollHeight - 10;
      setShowScrollIndicator(isScrollable && isNotAtBottom);
    }
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(checkScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] p-0 max-w-sm bg-white border-none shadow-2xl rounded-[2rem] max-h-[85vh] overflow-hidden [&>button]:z-50 [&>button]:text-white [&>button]:top-5 [&>button]:right-5">
        
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        <div className="flex flex-col max-h-[85vh] bg-white relative">
          
          {/* HEADER */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-6 px-4 text-center shrink-0 z-10">
            <h3 className="text-xl font-bold tracking-tight px-6 leading-tight">
              हमारी संस्कृति, हमारी जिम्मेदारी ✨
            </h3>
          </div>

          {/* BODY */}
          <div className="relative flex-1 overflow-hidden flex flex-col">
            <motion.div
              ref={scrollRef}
              onScroll={checkScroll}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-y-auto no-scrollbar px-6 py-6 space-y-5"
            >
              
              {/* VERSE */}
              <div className="bg-orange-50/60 border-l-2 border-orange-500 p-4 rounded-r-xl">
                <p className="text-[13px] font-serif italic font-bold text-slate-800 leading-relaxed text-center">
                  “सम्राज्ञी श्वशुरे भव, सम्राज्ञी श्वश्र्वां भव। ननान्दरि सम्राज्ञी भव, सम्राज्ञी अधि देवरिषु॥”
                </p>
                <p className="text-[10px] text-slate-600 mt-2 text-center">
                  वधू अपने नए परिवार में सम्मान और सामंजस्य के साथ स्थापित हो।
                </p>
                <p className="text-[10px] text-orange-600 font-bold mt-1 text-center uppercase tracking-wider">
                  — ऋग्वेद 10.85.46
                </p>
              </div>

              {/* INTRO */}
              <p className="text-[11px] text-slate-600 leading-relaxed text-center px-2">
                यह वैदिक भावभूमि हमें याद दिलाती है कि विवाह केवल दो व्यक्तियों का नहीं,
                बल्कि दो परिवारों और संस्कृतियों का पवित्र मिलन है।
              </p>

              {/* PLATFORM DESC */}
              <p className="text-[11px] text-slate-600 leading-relaxed text-center px-2">
                <strong>BOI Matrimony</strong> एक ऐसा मंच है जहाँ ब्राह्मण समाज के संस्कार,
                परंपराएँ और जीवन मूल्य सुरक्षित रहते हुए योग्य जीवनसाथी का चयन संभव हो सके।
              </p>

              {/* CARDS */}
              <div className="grid grid-cols-1 gap-3">
                
                {/* CULTURE */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100/50">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0">
                    <Landmark size={18} className="text-orange-600" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-slate-800">सांस्कृतिक धरोहर</span>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      भगवान श्री परशुराम के आदर्शों से प्रेरित यह पहल हमारी परंपराओं को सुरक्षित रखने का प्रयास है।
                    </p>
                  </div>
                </div>

                {/* SUPPORT */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100/50">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0">
                    <Heart size={18} className="text-orange-600" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-slate-800">आपका सहयोग</span>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      आपका छोटा सा योगदान इस अभियान को निरंतर आगे बढ़ाने में महत्वपूर्ण भूमिका निभाता है।
                    </p>
                  </div>
                </div>

                {/* NEW CARD (VISION) */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100/50">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm shrink-0">
                    <Sparkles size={18} className="text-orange-600" />
                  </div>
                  <div>
                    <span className="text-[13px] font-bold text-slate-800">हमारा उद्देश्य</span>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      आने वाली पीढ़ियों के लिए एक संस्कारित, सशक्त और जागरूक समाज का निर्माण करना।
                    </p>
                  </div>
                </div>

              </div>

              {/* CLOSING LINE */}
              <p className="text-[11px] text-center font-semibold text-slate-700 pt-2">
                आपका सहयोग इस सांस्कृतिक यात्रा को और मजबूत बना सकता है।
              </p>

              <div className="h-2" />
            </motion.div>

            {/* SCROLL INDICATOR */}
            <AnimatePresence>
              {showScrollIndicator && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-4 right-6 z-20 flex flex-col items-center pointer-events-none"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="bg-orange-500 text-white p-2 rounded-full shadow-lg"
                  >
                    <ChevronDown size={18} strokeWidth={3} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER */}
          <div className="shrink-0 p-6 pt-2 bg-white border-t border-slate-100 relative">
            <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleDonateClick}
                className="h-12 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl flex items-center justify-center gap-2 font-bold border-none active:scale-95"
              >
                सहयोग प्रदान करें
                <ArrowRight size={18} />
              </Button>

              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-10 text-xs font-semibold text-slate-500 bg-slate-100 border-none rounded-xl"
              >
                Maybe later
              </Button>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}