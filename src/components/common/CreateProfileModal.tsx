import React, { useRef, useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: () => void;
}

export default function CreateProfileModal({
  open,
  onOpenChange,
  onCreate,
}: CreateProfileModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

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
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[calc(100%-2rem)] p-0 max-w-sm bg-white border-none shadow-2xl rounded-[2rem] max-h-[85vh] overflow-hidden">
        
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        <div className="flex flex-col max-h-[85vh]">

          {/* Top Accent */}
          <div className="h-1 w-full bg-primary/20" />

          <div className="relative flex-1 overflow-hidden">
            <motion.div
              ref={scrollRef}
              onScroll={checkScroll}
              className="overflow-y-auto no-scrollbar px-6 py-6"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Let's create your profile ✨
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Welcome! You're just one step away from a personalized experience and exclusive community access.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-3">

                {/* Card 1 */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/[0.03] border border-primary/10">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    <Users size={18} className="text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-800">Genuine Connections</span>
                    <span className="text-[11px] text-slate-600 leading-tight">
                      Find and interact with real, dedicated individuals who share your unique background and values.
                    </span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/[0.03] border border-primary/10">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    <Sparkles size={18} className="text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-800">Curated Matching</span>
                    <span className="text-[11px] text-slate-600 leading-tight">
                      Receive a personalized feed and connection suggestions tailored precisely to your cultural and traditional values.
                    </span>
                  </div>
                </div>

              </div>

              {/* Trust Line */}
              <p className="text-[10px] text-center font-medium text-slate-400 uppercase tracking-widest mt-6">
                A respectful space built on shared principles
              </p>

              <div className="h-2" />
            </motion.div>

            {/* Scroll Indicator */}
            <AnimatePresence>
              {showScrollIndicator && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-3 right-4"
                >
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="bg-primary text-white p-1 rounded-full shadow-lg"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-white">
            <div className="flex flex-col gap-3">
              <AlertDialogAction
                onClick={onCreate}
                className="h-12 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center gap-2 font-bold transition-transform active:scale-95 shadow-none border-none"
              >
                Create My Profile
                <ArrowRight size={18} />
              </AlertDialogAction>

              <AlertDialogCancel className="h-10 text-xs font-semibold text-slate-500 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 border-none rounded-xl transition-colors shadow-none">
                Maybe later
              </AlertDialogCancel>
            </div>
          </div>

        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}