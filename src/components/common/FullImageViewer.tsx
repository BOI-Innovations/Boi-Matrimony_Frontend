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
      onClick={() => onOpenChange(false)}
    >
      {shape === "circle" ? (
        <div 
          className="relative w-[400px] h-[400px]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt="Full view"
            className="w-full h-full object-cover rounded-full"
          />
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200 text-black"
            aria-label="Close image"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div 
          className="relative max-w-5xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt="Full view"
            className="w-full h-full object-contain rounded-lg"
          />
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors duration-200 text-black"
            aria-label="Close image"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FullImageViewer;
