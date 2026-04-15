import { X, CheckCircle, ShieldCheck, ArrowRight, Landmark, Users, Infinity as InfinityIcon, Lock, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import bannerImage from "@/assets/community-support-banner.png";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal = ({ isOpen, onClose }: SubscriptionModalProps) => {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [planAmount, setPlanAmount] = useState<number>(2100);
  const [planCurrency, setPlanCurrency] = useState<string>("INR");

  useEffect(() => {
    if (isOpen) {
      setPaymentSuccess(false);

      const token = sessionStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      if (!token || !baseUrl) return;

      fetch(`${baseUrl}/api/subscription-plans/getSubscriptionPlanById/PLAN_BASIC_1M`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.statusCode === 200 && data.payload) {
            setPlanAmount(data.payload.price ?? 2100);
            setPlanCurrency(data.payload.currency ?? "INR");
          }
        })
        .catch((error) => {
          console.error("Failed to load subscription plan:", error);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Load Razorpay script dynamically
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Payment handler
  const handlePayment = async (planId: string, planName: string, amount: number) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    let userDetails = {
      name: sessionStorage.getItem("fullName") || "",
      email: sessionStorage.getItem("email") || "",
      contact: sessionStorage.getItem("phoneNumber") || "",
    };
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      userDetails = {
        name: sessionStorage.getItem("fullName") || payload.name || "",
        email: sessionStorage.getItem("email") || payload.email || "",
        contact: sessionStorage.getItem("phoneNumber") || "",
      };
    } catch (error) {
      console.error("Error decoding token:", error);
    }

    setLoadingPlanId(planId);

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoadingPlanId(null);
        return;
      }

      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      // Create order on backend
      const orderResponse = await fetch(`${baseUrl}/api/payments/create-order?planId=${planId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const orderData = await orderResponse.json();
      if (orderData.statusCode !== 200) {
        alert("Failed to create order");
        setLoadingPlanId(null);
        return;
      }

      const { orderId, currency } = orderData.payload;

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.payload.amount,
        currency,
        name: "Matrimonial App",
        description: planName,
        order_id: orderId,
        // config: {
        //   display: {
        //     hide: [
        //       { method: "emi" },
        //       { method: "paylater" },
        //       { method: "wallet" },
        //     ],
        //   },
        // },
        handler: async function (response: any) {
          // Verify payment
          const verifyResponse = await fetch(`${baseUrl}/api/payments/verify-payment`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              method: "card",
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.statusCode === 200) {
            setPaymentSuccess(true);
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.contact,
        },
        theme: {
          color: "#b5173cff",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while processing payment");
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative flex w-full max-w-md lg:max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-2xl shadow-2xl transition-all">

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 z-50 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white touch-none"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">

          {paymentSuccess ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center min-h-[400px]">
              <div className="mb-6 rounded-full bg-green-100 p-4 dark:bg-green-900/30">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="mb-2 text-3xl font-bold text-[#181611] dark:text-white">Payment Successful!</h2>
              <p className="mb-8 max-w-md text-[#897c61] dark:text-gray-400">
                Thank you for supporting the community. Your membership is now active, and you can start exploring profiles right away.
              </p>
              <button
                onClick={onClose}
                className="rounded-xl bg-[#eead2b] px-8 py-3 font-bold text-[#181611] transition-colors hover:bg-[#e0a025] shadow-lg shadow-[#eead2b]/20"
              >
                Continue
              </button>
            </div>
          ) : (
            <>
              {/* The Card */}
              <div className="w-full bg-white dark:bg-[#2a2418] rounded-2xl shadow-sm overflow-hidden border border-[#e6e2db] dark:border-[#3a332a] flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="relative h-48 w-full lg:h-auto lg:w-5/12">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                  <img
                    src={bannerImage}
                    alt="Community Support"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#eead2b] text-[#181611] text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
                      Best Value
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-6 lg:w-7/12">
                  <div className="text-center pb-4 border-b border-[#e6e2db] dark:border-[#3a332a]">
                    <h1 className="text-lg font-bold text-center flex-1 truncate px-2 text-[#181611] dark:text-white">Community Support Membership</h1>
                    <div className="flex items-baseline justify-center gap-1 text-[#eead2b]">
                      <span className="text-4xl font-extrabold">
                        {planCurrency === "INR" ? "₹" : `${planCurrency} `}{planAmount}
                      </span>
                    </div>
                    <p className="text-[#897c61] dark:text-gray-400 text-sm mt-1">One-time payment until you find your life partner</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Feature 1 */}
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 mt-0.5 text-[#eead2b]">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#181611] dark:text-white">Brahmin Families</span>
                        <span className="text-xs text-[#897c61] dark:text-gray-400">Browse Brahmin family profiles available on the platform.</span>
                      </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 mt-0.5 text-[#eead2b]">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#181611] dark:text-white">Culturally Aligned</span>
                        <span className="text-xs text-[#897c61] dark:text-gray-400">Discover profiles aligned with shared traditions and cultural values.</span>
                      </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 mt-0.5 text-[#eead2b]">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#181611] dark:text-white">Advanced Filters</span>
                        <span className="text-xs text-[#897c61] dark:text-gray-400">Apply advanced filters to find profiles that match your preferences.</span>
                      </div>
                    </div>
                    {/* Feature 4 */}
                    <div className="flex gap-3 items-start">
                      <div className="flex-shrink-0 mt-0.5 text-[#eead2b]">
                        <InfinityIcon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#181611] dark:text-white">Lifetime Access</span>
                        <span className="text-xs text-[#897c61] dark:text-gray-400">Full access until you find your life partner</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      disabled={!!loadingPlanId}
                      onClick={() => handlePayment("PLAN_BASIC_1M", "Community Support Membership", 2100)}
                      className="w-full bg-[#eead2b] hover:bg-[#e0a025] active:scale-[0.98] transition-all duration-200 text-[#181611] font-bold text-lg h-14 rounded-xl shadow-lg shadow-[#eead2b]/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span>{loadingPlanId ? "Processing..." : "Become a Member"}</span>
                      {!loadingPlanId && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                    <p className="text-center text-[10px] text-[#897c61] dark:text-gray-500 mt-3">
                      Secure payment via UPI, Cards, or Netbanking
                    </p>
                  </div>
                </div>
              </div>

            </>
          )}
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
        }
      `}</style>
    </div>
  );
};