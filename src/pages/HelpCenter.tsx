import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, MessageCircle, Mail, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const HelpCenter = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());
  // const [requests, setRequests] = useState<any[]>([]);
  // const [statusFilter, setStatusFilter] = useState("OPEN"); // Default filter to OPEN

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Validation helper for Full Name
  const validateName = (value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Full Name is required.";
    }
    if (value.length < 2) {
      return "Full Name must be at least 2 characters long.";
    }
    if (value.length > 100) {
      return "Full Name cannot exceed 100 characters.";
    }
    // Allow only letters and spaces
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return "Full Name can only contain letters and spaces.";
    }
    return null;
  };

  // Validation helper for Email
  const validateEmail = (value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Email is required.";
    }
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  // Validation helper for Subject
  const validateSubject = (value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Subject is required.";
    }
    if (value.length < 5) {
      return "Subject must be at least 5 characters long.";
    }
    if (value.length > 150) {
      return "Subject cannot exceed 150 characters.";
    }
    return null;
  };

  // ✅ Fetch help requests of the logged-in user
  // const fetchHelpRequests = async () => {
  //   const token = sessionStorage.getItem("token");

  //   if (!token) {
  //     console.error("Token not found in sessionStorage");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await fetch(`${baseUrl}/api/help-requests/my-requests`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await response.json();
  //     if (response.ok && data.payload) {
  //       setRequests(data.payload);
  //     } else {
  //       toast({
  //         title: "Error fetching requests",
  //         description: data.message || "Something went wrong.",
  //         variant: "destructive",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching help requests:", error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to load help requests.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchHelpRequests();
  // }, []);

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationErrors(new Set());

    // Validate Full Name
    const nameError = validateName(formData.name);
    if (nameError) {
      setValidationErrors(new Set(["name"]));
      toast({
        title: "Validation Error",
        description: nameError,
        variant: "destructive",
      });
      return;
    }

    // Validate Email
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setValidationErrors(new Set(["email"]));
      toast({
        title: "Validation Error",
        description: emailError,
        variant: "destructive",
      });
      return;
    }

    // Validate Subject
    const subjectError = validateSubject(formData.subject);
    if (subjectError) {
      setValidationErrors(new Set(["subject"]));
      toast({
        title: "Validation Error",
        description: subjectError,
        variant: "destructive",
      });
      return;
    }

    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("Token not found in sessionStorage");
      toast({
        title: "Error",
        description: "User not authenticated.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/help-requests/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent",
          description: "Our support team will get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setValidationErrors(new Set());
        // fetchHelpRequests(); // refresh table (commented out: no API calls / table refresh)
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send help request.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending help request:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Commented out: filteredRequests derived value (no table display)
  // const filteredRequests =
  //   statusFilter === "ALL"
  //     ? requests
  //     : requests.filter((req) => req.status === statusFilter);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-2xl md:text-3xl">24×5 Help Center</CardTitle>
          <p className="text-muted-foreground mt-1">
            We're here to help you find your perfect match
          </p>
        </CardHeader>
      </Card>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-medium hover:shadow-large transition-smooth">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monday to Friday<br />9:00 AM - 6:00 PM
            </p>
            <a href="tel:+91-9811424141" className="font-semibold text-primary hover:underline">
              +91-9811424141
            </a>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-medium hover:shadow-large transition-smooth">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We'll respond within 24 hours
            </p>
            <a href="mailto:boindia18@gmail.com" className="font-semibold text-primary hover:underline">
              boindia18@gmail.com
            </a>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-medium hover:shadow-large transition-smooth">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">WhatsApp Chat</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Chat with our support team
            </p>
            
            <a href="https://wa.me/919811424141" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="mt-2 bg-green-50 hover:bg-green-100 border-green-200">
                Start WhatsApp Chat
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Send Message Form */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    // Clear error when user starts typing
                    if (validationErrors.has("name")) {
                      setValidationErrors(new Set(Array.from(validationErrors).filter(f => f !== "name")));
                    }
                  }}
                  className={cn(
                    validationErrors.has("name") && "border-red-500 border-2 focus:border-red-500"
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    // Clear error when user starts typing
                    if (validationErrors.has("email")) {
                      setValidationErrors(new Set(Array.from(validationErrors).filter(f => f !== "email")));
                    }
                  }}
                  className={cn(
                    validationErrors.has("email") && "border-red-500 border-2 focus:border-red-500"
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="How can we help?"
                required
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  // Clear error when user starts typing
                  if (validationErrors.has("subject")) {
                    setValidationErrors(new Set(Array.from(validationErrors).filter(f => f !== "subject")));
                  }
                }}
                className={cn(
                  validationErrors.has("subject") && "border-red-500 border-2 focus:border-red-500"
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue or question in detail..."
                rows={6}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <Button
              type="submit"
              className="w-full md:w-auto bg-gradient-primary"
              disabled={loading}
            >
              <Send className="w-4 h-4 mr-2" />{" "}
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Help Requests Table (commented out while not showing requests / hitting API) */}
      {/* 
      <Card className="border-0 shadow-medium">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>My Help Requests</CardTitle>
            <CardDescription>View all your raised help tickets</CardDescription>
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="CLOSED">Closed</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : filteredRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-2 px-3">S.No</th>
                    <th className="text-left py-2 px-3">Subject</th>
                    <th className="text-left py-2 px-3">Message</th>
                    <th className="text-left py-2 px-3">Status</th>
                    <th className="text-left py-2 px-3">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((req, index) => (
                    <tr
                      key={req.id}
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-2 px-3">{index + 1}</td>
                      <td className="py-2 px-3 font-medium">{req.subject}</td>
                      <td className="py-2 px-3 text-muted-foreground">
                        {req.message}
                      </td>
                      <td
                        className={`py-2 px-3 font-semibold ${
                          req.status === "OPEN"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {req.status}
                      </td>
                      <td className="py-2 px-3 text-muted-foreground">
                        {new Date(req.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No help requests found.
            </p>
          )}
        </CardContent>
      </Card>
      */}

      {/* Common Issues */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Common Issues</CardTitle>
          <CardDescription>
            Quick solutions to frequent problems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-1">Can't login to my account?</h4>
            <p className="text-sm text-muted-foreground">
              Try resetting your password using the "Forgot Password" link on
              the login page.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">How do I update my profile?</h4>
            <p className="text-sm text-muted-foreground">
              Navigate to any profile section from your dashboard and click the
              "Edit" button.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">
              Not receiving match notifications?
            </h4>
            <p className="text-sm text-muted-foreground">
              Check your notification settings and ensure your email address is
              verified.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCenter;
