import { X } from "lucide-react";

interface FullImageViewerProps {
  imageUrl: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shape?: "circle" | "rectangle";
}

const FullImageViewer = ({
  imageUrl,
  open,
  onOpenChange,
  shape = "rectangle",
}: FullImageViewerProps) => {
  if (!imageUrl || !open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div className="relative w-full h-full flex justify-center items-center max-w-6xl max-h-screen">
        {shape === "circle" ? (
          <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden flex justify-center items-center">
            <img
              src={imageUrl}
              alt="Full view"
              className="w-full h-full object-cover rounded-full"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="absolute -top-12 -right-12 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200 text-black z-10"
              aria-label="Close image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full flex justify-center items-center">
            <img
              src={imageUrl}
              alt="Full view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200 text-black z-10"
              aria-label="Close image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullImageViewer;
