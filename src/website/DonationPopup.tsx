import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DonationPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DonationPopup: React.FC<DonationPopupProps> = ({ open, onOpenChange }) => {

  const handleDonateClick = () => {
    window.open("https://rzp.io/rzp/Hqva97l", "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:w-full max-w-md md:max-w-lg lg:max-w-2xl p-0 overflow-hidden rounded-2xl max-h-[95vh]">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-h-[90vh] overflow-y-auto"
        >

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 px-4 text-center">
            <h2 className="text-xl font-semibold mb-1">
              हमारी संस्कृति, हमारी जिम्मेदारी
            </h2>
            <p className="text-xs opacity-90">
              संस्कृति • संस्कार • परंपरा
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-1 bg-orange-400 mx-auto my-3 rounded-full"></div>

          {/* Content */}
          <div className="p-6 pt-4 text-center lg:text-left">

            {/* Shloka */}
            <p className="text-xs text-gray-500 italic mb-3 leading-relaxed">
              “सम्राज्ञी श्वशुरे भव, सम्राज्ञी श्वश्र्वां भव।  
              ननान्दरि सम्राज्ञी भव, सम्राज्ञी अधि देवरिषु॥”
              <br /> (ऋग्वेद 10.85.46)
            </p>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              यह वैदिक मंत्र वधू के उस आदर्श स्थान को दर्शाता है, जहाँ वह अपने नए परिवार में सम्मान, सामंजस्य और प्रतिष्ठा के साथ स्थापित होती है।
            </p>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              <strong>BOI Matrimony</strong> इसी वैदिक भावभूमि पर आधारित एक समर्पित मंच है, जहाँ ब्राह्मण समाज के योग्य वर-वधू अपने संस्कारों, परंपराओं और मूल्यों के अनुरूप जीवनसाथी का चयन कर सकते हैं।
            </p>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              यह केवल एक मैट्रिमोनियल प्लेटफॉर्म नहीं, बल्कि उन आदर्शों का माध्यम है, जहाँ विवाह को दो व्यक्तियों नहीं, बल्कि दो परिवारों और संस्कृतियों के पवित्र मिलन के रूप में देखा जाता है।
            </p>

            {/* Emotional Highlight */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4 text-sm text-orange-700">
              भगवान श्री परशुराम के आदर्शों से प्रेरित यह पहल हमारी संस्कृति, संस्कारों और परंपराओं को आने वाली पीढ़ियों तक सुरक्षित पहुँचाने का एक विनम्र प्रयास है।
            </div>

            <p className="text-sm text-gray-700 mb-4 font-medium">
              आपका सहयोग इस सांस्कृतिक अभियान को और सशक्त बना सकता है।
            </p>

            {/* Donate CTA */}
            <Button
              onClick={handleDonateClick}
              className="w-full py-3 text-base font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition"
            >
              ✨ संस्कृति संरक्षण में योगदान करें
            </Button>

            {/* Secondary CTA */}
            <Button
              variant="outline"
              onClick={() => window.open("https://boimatrimony.com/#/login", "_blank")}
              className="w-full mt-2"
            >
              Visit & Join Platform
            </Button>

            {/* Trust */}
            <p className="text-xs text-gray-500 mt-4 text-center lg:text-left">
              आपका योगदान पूर्णतः सुरक्षित एवं पारदर्शी है।
            </p>

          </div>

        </motion.div>

      </DialogContent>
    </Dialog>
  );
};

export default DonationPopup;