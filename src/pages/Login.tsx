import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Loader2, AlertTriangle, X, HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import bannerImage from "@/images/banner.png";
import logoImage from "@/assets/boilogo.png";
import indianWeddingImage from "@/assets/IndianWedding.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportPhoneNumber, setSupportPhoneNumber] = useState("");

  useEffect(() => {
    setShowNotice(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      if (data.statusCode === 200 && data.payload?.token) {
        sessionStorage.setItem("token", data.payload.token);
        sessionStorage.setItem("refreshToken", data.payload.refreshToken);
        sessionStorage.setItem("username", data.payload.username);
        sessionStorage.setItem("email", data.payload.email);
        sessionStorage.setItem("fullName", data.payload.fullName);
        sessionStorage.setItem("phoneNumber", data.payload.phoneNumber);
        sessionStorage.setItem("roles", JSON.stringify(data.payload.roles));

        toast({
          title: "Welcome back!",
          description: data.message || "Login successful",
        });

        navigate("/dashboard");
      } else {
        throw new Error(data.message || "Unexpected response");
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials or server error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users/raiseTicket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: supportName,
          email: supportEmail,
          subject: supportSubject,
          message: supportMessage,
          phoneNumber: supportPhoneNumber,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: data.message || "Help request submitted successfully",
        });
        setIsSupportOpen(false);
        setSupportName("");
        setSupportEmail("");
        setSupportSubject("");
        setSupportMessage("");
        setSupportPhoneNumber("");
      } else {
        throw new Error(data.message || "Failed to submit support request");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 to-rose-100">
      {/* Important Notice Popup */}
      {showNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg lg:max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-orange-50 border-b border-orange-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-orange-900">Important Notice</h3>
              <button
                onClick={() => setShowNotice(false)}
                className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* English */}
              <p className="leading-relaxed text-justify font-semibold">
                This platform has been established as a selfless social service for the Brahmin community, with the purpose of protecting, preserving, and promoting eternal culture, scriptural traditions, and family values.
              </p>

              <p className="leading-relaxed text-justify mt-3 font-semibold">
                Only individuals belonging to the Brahmin community will be allowed to register and use this platform. It is mandatory that every piece of information provided during registration is true, accurate, and authentic.
              </p>

              <p className="leading-relaxed text-justify mt-3 font-semibold">
                Providing any false, misleading, or unverified information, or registering without belonging to the Brahmin community, will be considered a serious violation of the platform’s rules. In such a case, the concerned account may be suspended or canceled without prior notice, and legal action may be taken under the prevailing law if necessary.
              </p>

              {/* Hindi */}
              <p className="leading-relaxed text-justify text-gray-700 mt-6 font-semibold">
                यह प्लेटफ़ॉर्म ब्राह्मण समाज हेतु एक निःस्वार्थ सामाजिक सेवा के रूप में स्थापित किया गया है, जिसका उद्देश्य सनातन संस्कृति, शास्त्रीय परंपराओं एवं पारिवारिक मूल्यों की रक्षा, संरक्षण और संवर्धन करना है।
              </p>

              <p className="leading-relaxed text-justify text-gray-700 mt-3 font-semibold">
                इस मंच पर केवल ब्राह्मण समुदाय से संबंधित व्यक्तियों को ही पंजीकरण एवं उपयोग की अनुमति प्राप्त होगी। पंजीकरण के दौरान प्रस्तुत की गई प्रत्येक जानकारी का सत्य, सटीक और प्रमाणिक होना अनिवार्य है।
              </p>

              <p className="leading-relaxed text-justify text-gray-700 mt-3 font-semibold">
                किसी भी प्रकार की असत्य, भ्रामक अथवा तथ्यहीन जानकारी देना, या ब्राह्मण समुदाय से संबंधित न होते हुए पंजीकरण करना, प्लेटफ़ॉर्म के नियमों का गंभीर उल्लंघन माना जाएगा। ऐसी स्थिति में संबंधित खाता बिना पूर्व सूचना निलंबित अथवा निरस्त किया जा सकता है तथा आवश्यक होने पर प्रचलित विधि के अंतर्गत कानूनी कार्रवाई भी की जा सकती है।
              </p>

              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <Button
                  onClick={() => setShowNotice(false)}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  I Understand
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow flex items-center justify-center p-6">
        <div
          className="flex flex-col lg:flex-row w-full max-w-5xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden bg-white animate-fade-in relative"
          style={{ maxHeight: "520px" }}
        >
          {/* LEFT IMAGE SECTION (hidden on small screens) */}
          <div className="hidden lg:flex lg:w-1/2 h-full">
            <img
              src={indianWeddingImage}
              alt="Matrimony Love"
              className="object-cover w-full h-full"
            />
          </div>

          {/* RIGHT FORM SECTION */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md space-y-6"
            >
              <div className="text-center space-y-3">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={logoImage}
                      alt="BOI Logo"
                      className="w-40 h-auto object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Find your perfect life partner 💕
                  </p>
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Welcome Back
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Sign in to your account to continue
                  </CardDescription>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-medium">
                    Username or Email
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11 border-gray-300 focus:ring-2 focus:ring-rose-400 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Password
                    </Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-rose-500 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 border-gray-300 focus:ring-2 focus:ring-rose-400 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-2">
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <p className="text-sm text-center text-gray-500">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-rose-600 font-medium hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSupportOpen(true)}
              className="absolute top-4 right-4"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
      <Dialog open={isSupportOpen} onOpenChange={setIsSupportOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <div>
              <Label htmlFor="support-name">Name</Label>
              <Input
                id="support-name"
                value={supportName}
                onChange={(e) => setSupportName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="support-email">Email</Label>
              <Input
                id="support-email"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="support-phone">Phone Number</Label>
              <Input
                id="support-phone"
                type="tel"
                value={supportPhoneNumber}
                onChange={(e) => setSupportPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="support-subject">Subject</Label>
              <Input
                id="support-subject"
                value={supportSubject}
                onChange={(e) => setSupportSubject(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="support-message">Message</Label>
              <Textarea
                id="support-message"
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <footer className="w-full py-4 px-6 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © 2026 BOI Matrimony. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;
