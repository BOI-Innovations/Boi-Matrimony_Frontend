import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Mail, Phone, Loader2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ContactDetailsData {
  parentsContactNo?: string;
  contactDetails?: {
    id: number;
    mobileNumber?: string;
    email?: string;
  };
}

const ContactDetails = () => {
  const [contactData, setContactData] = useState<ContactDetailsData | null>(null);
  const [formData, setFormData] = useState<ContactDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());

  // Fetch contact details
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        // If no token, treat as "no data yet" so the UI still renders editable form
        if (!token) {
          console.error("Token not found in sessionStorage");
          setContactData({});
          setFormData({});
          setLoading(false);
          return;
        }

        const response = await fetch(`${baseUrl}/api/contact`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        // Treat 404 or empty payload as empty record so UI renders form with N/A
        if (!response.ok) {
          if (response.status === 404) {
            setContactData({});
            setFormData({});
            setLoading(false);
            return;
          } else {
            throw new Error(data?.message || "Failed to fetch contact details");
          }
        }

        if (!data?.payload) {
          setContactData({});
          setFormData({});
          setLoading(false);
          return;
        }

        setContactData(data.payload);
        setFormData(data.payload);
      } catch (error) {
        console.error("Error fetching contact details:", error);
        // keep the UI usable by showing empty form when fetch fails
        setContactData({});
        setFormData({});
        toast({
          title: "Error",
          description: "Something went wrong while fetching contact details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  // Handle edit toggle
  const handleEditToggle = () => {
    setEditMode(!editMode);
    setFormData(contactData);
    setValidationErrors(new Set());
  };

  // Validation helper for email
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

  // Validation helper for phone number
  const validatePhoneNumber = (value: string, fieldName: string): string | null => {
    if (!value || value.trim() === "") {
      return `${fieldName} is required.`;
    }
    if (value.length < 10) {
      return `${fieldName} must be at least 10 characters long.`;
    }
    if (value.length > 20) {
      return `${fieldName} cannot exceed 20 characters.`;
    }
    // Allow digits, spaces, hyphens, parentheses, and plus sign
    if (!/^[+\d\s\-()]*$/.test(value)) {
      return `${fieldName} can only contain digits, spaces, hyphens, and plus sign.`;
    }
    return null;
  };

  // Handle field changes
  const handleChange = (field: string, value: string) => {
    if (!formData) return;
    if (field === "parentsContactNo") {
      setFormData((prev) => ({ ...prev, parentsContactNo: value }));
    } else if (field === "email" || field === "mobileNumber") {
      setFormData((prev) => ({
        ...prev,
        contactDetails: {
          ...prev?.contactDetails,
          [field]: value,
        },
      }));
    }
    // Clear error for this field when user starts typing
    if (validationErrors.has(field)) {
      setValidationErrors((prev) => {
        const newErrors = new Set(prev);
        newErrors.delete(field);
        return newErrors;
      });
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!formData) return;

    // Validate all fields
    const errors = new Set<string>();

    // Validate email
    const emailError = validateEmail(formData.contactDetails?.email || "");
    if (emailError) {
      errors.add("email");
      toast({
        title: "Validation Error",
        description: emailError,
        variant: "destructive",
      });
    }

    // Validate mobile number
    const mobileError = validatePhoneNumber(formData.contactDetails?.mobileNumber || "", "Contact Number");
    if (mobileError) {
      errors.add("mobileNumber");
      toast({
        title: "Validation Error",
        description: mobileError,
        variant: "destructive",
      });
    }

    // Validate parent's contact number if provided
    if (formData.parentsContactNo) {
      const parentContactError = validatePhoneNumber(formData.parentsContactNo, "Parent's Contact Number");
      if (parentContactError) {
        errors.add("parentsContactNo");
        toast({
          title: "Validation Error",
          description: parentContactError,
          variant: "destructive",
        });
      }
    }

    // If there are validation errors, stop here
    if (errors.size > 0) {
      setValidationErrors(errors);
      return;
    }

    setSaving(true);
    const token = sessionStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      // 1️⃣ Update contact email & mobile
      const contactRes = await fetch(`${baseUrl}/api/contact`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mobileNumber: formData.contactDetails?.mobileNumber,
          email: formData.contactDetails?.email,
        }),
      });

      const contactDataRes = await contactRes.json();

      if (!contactRes.ok || contactDataRes.statusCode !== 200) {
        throw new Error(contactDataRes.message || "Failed to update contact details.");
      }

      // 2️⃣ Update parent's contact number (only if present)
      if (formData.parentsContactNo) {
        const familyRes = await fetch(
          `${baseUrl}/api/family/parents/contact?contactDetails=${formData.parentsContactNo}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const familyDataRes = await familyRes.json();
        if (!familyRes.ok || familyDataRes.statusCode !== 200) {
          throw new Error(familyDataRes.message || "Failed to update parent's contact.");
        }
      }

      // ✅ Update local state
      setContactData(formData);
      setEditMode(false);
      setValidationErrors(new Set());
      toast({
        title: "Updated Successfully",
        description: "Your contact details have been saved.",
      });
    } catch (err: any) {
      console.error("Error updating contact details:", err);
      toast({
        title: "Update Failed",
        description: err.message || "Unable to save changes right now.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
        <p className="text-muted-foreground">Loading contact details...</p>
      </div>
    );
  }

  const { contactDetails, parentsContactNo } = formData || {};

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-2xl md:text-3xl">Contact Details</CardTitle>

            {!editMode ? (
              <Button
                onClick={handleEditToggle}
                className="bg-gradient-primary"
              >
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Contact Info */}
      <Card className="border-0 shadow-medium mt-2">
        <CardContent className="space-y-6 pt-6">
          {/* Email */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Email Address (ईमेल पता)</p>
              {editMode ? (
                <Input
                  type="email"
                  value={contactDetails?.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={cn(
                    "w-full sm:w-[70%]",
                    validationErrors.has("email") && "border-red-500 border-2 focus:border-red-500"
                  )}
                />
              ) : (
                <p className="font-semibold text-lg">{contactDetails?.email || "Not provided"}</p>
              )}
            </div>
          </div>

          {/* Contact Number */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Contact Number (संपर्क नंबर)</p>
              {editMode ? (
                <Input
                  type="tel"
                  value={contactDetails?.mobileNumber || ""}
                  onChange={(e) => handleChange("mobileNumber", e.target.value)}
                  className={cn(
                    "w-full sm:w-[70%]",
                    validationErrors.has("mobileNumber") && "border-red-500 border-2 focus:border-red-500"
                  )}
                />
              ) : (
                <p className="font-semibold text-lg">
                  {contactDetails?.mobileNumber || "Not provided"}
                </p>
              )}
            </div>
          </div>

          {/* Parent's Contact */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Parent's Contact Number (माता-पिता का संपर्क नंबर)</p>
              {editMode ? (
                <Input
                  type="tel"
                  value={parentsContactNo || ""}
                  onChange={(e) => handleChange("parentsContactNo", e.target.value)}
                  className={cn(
                    "w-full sm:w-[70%]",
                    validationErrors.has("parentsContactNo") && "border-red-500 border-2 focus:border-red-500"
                  )}
                />
              ) : (
                <p className="font-semibold text-lg">{parentsContactNo || "Not provided"}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactDetails;
