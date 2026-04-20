import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import logoImage from "@/assets/boilogo.png";

// Steps
import Step1AccountInfo from "@/components/signup/Step1AccountInfo";
import Step2BasicDetails from "@/components/signup/Step2BasicDetails";
import Step3Education from "@/components/signup/Step3Education";
import Step4Family from "@/components/signup/Step4Family";
import Step5Hobbies from "@/components/signup/Step5Hobbies";
import Step6PartnerPreferences from "@/components/signup/Step6PartnerPreferences";
import Step7Location from "@/components/signup/Step7Location";
import Step8Photos from "@/components/signup/Step8Photos";

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const totalSteps = 8;

  const steps = [
    { number: 1, title: "Social Account Info", component: Step1AccountInfo },
    { number: 2, title: "Basic Details", component: Step2BasicDetails },
    { number: 3, title: "Education & Occupation", component: Step3Education },
    { number: 4, title: "Family Details", component: Step4Family },
    { number: 5, title: "Hobbies & Interests", component: Step5Hobbies },
    { number: 6, title: "Partner Preferences", component: Step6PartnerPreferences },
    { number: 7, title: "Location Details", component: Step7Location },
    { number: 8, title: "Photos", component: Step8Photos },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit({ ...formData, ...data });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (finalData: any) => {
    console.log("Final form data:", finalData);
    toast({
      title: "Registration Successful!",
      description: "Welcome to BOI Matrimony. Let's find your perfect match!",
    });
    setTimeout(() => navigate("/login"), 1500);
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

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-warm py-8 px-4">
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Entire content inside single card */}
        <Card className="shadow-large border-0 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSupportOpen(true)}
            className="absolute top-4 right-4 z-10"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
          <CardHeader className="text-center space-y-4">
            {/* Header */}
            <Link to="/" className="inline-flex items-center justify-center mx-auto group">
              <img
                src={logoImage}
                alt="BOI Logo"
                className="w-40 h-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground">
              Create your profile to find your soulmate
            </p>

            {/* Progress Info */}
            <div className="text-left mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-muted-foreground">
                  {steps[currentStep - 1].title}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mt-6 overflow-x-auto pb-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col items-center min-w-[80px]"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-smooth ${
                      step.number < currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.number === currentStep
                        ? "bg-gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.number < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="text-sm mt-2 text-center hidden sm:block text-muted-foreground">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            <CardTitle className="text-xl font-semibold mt-6">
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>

          {/* Form and footer */}
          <CardContent className="space-y-6">
            <CurrentStepComponent
              data={formData}
              onNext={handleNext}
              onBack={handleBack}
              isFirstStep={currentStep === 1}
              isLastStep={currentStep === totalSteps}
            />

            {/* Footer inside card */}
            <p className="text-center text-sm text-muted-foreground pt-6 border-t border-muted">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark font-medium transition-smooth"
              >
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
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
      </div>
    </div>
  );
};

export default Signup;
