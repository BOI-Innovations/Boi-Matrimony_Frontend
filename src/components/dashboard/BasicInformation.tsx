import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Save, X, User, Heart, Activity, MessageCircle, Coffee, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DECLARATION_TEXT = "I hereby declare that the information provided above is true and accurate to the best of my knowledge, and I will be liable for any action if the details are incorrect.";

// Required fields (all except star and rashi)
const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "gender",
  "profileCreatedFor",
  "dateOfBirth",
  "religion",
  "caste",
  "subCaste",
  "maritalStatus",
  "physicalStatus",
  "gothra",
  "dietaryHabits",
  "drinkingHabits",
  "smokingHabits",
  "hasDisease",
];

const FIELD_LABELS: Record<string, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  gender: "Gender",
  profileCreatedFor: "Profile Created For",
  dateOfBirth: "Date of Birth",
  timeOfBirth: "Time of Birth",
  placeOfBirth: "Place of Birth",
  religion: "Religion",
  caste: "Caste",
  subCaste: "Sub Caste",
  maritalStatus: "Marital Status",
  heightIn: "Height",
  weight: "Weight",
  physicalStatus: "Physical Status",
  motherTongue: "Mother Tongue",
  gothra: "Gothra",
  manglik: "Manglik",
  dietaryHabits: "Dietary Habits",
  drinkingHabits: "Drinking Habits",
  smokingHabits: "Smoking Habits",
  hasDisease: "Has Disease",
  diseaseDetails: "Disease Details",
  about: "About Me",
  languagesKnown: "Languages Known",
};

const BasicInformation = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set());

  // Dropdown option states (lazy loaded)
  const [createdForOptions, setCreatedForOptions] = useState<any[]>([]);
  const [casteOptions, setCasteOptions] = useState<any[]>([]);
  const [subCasteOptions, setSubCasteOptions] = useState<any[]>([]);
  const [heightOptions, setHeightOptions] = useState<any[]>([]);
  const [weightOptions, setWeightOptions] = useState<any[]>([]);
  const [motherTongueOptions, setMotherTongueOptions] = useState<any[]>([]);
  const [gothraOptions, setGothraOptions] = useState<any[]>([]);
  const [starOptions, setStarOptions] = useState<any[]>([]);
  const [rashiOptions, setRashiOptions] = useState<any[]>([]);
  const [loadingDropdown, setLoadingDropdown] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:9090";

  // Hardcoded options for new dropdowns
  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
    { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
  ];

  const manglikOptions = [
    { value: "YES", label: "Yes" },
    { value: "NO", label: "No" },
  ];

  const dietaryHabitsOptions = [
    { value: "VEGETARIAN", label: "Vegetarian" },
    { value: "NON_VEGETARIAN", label: "Non-Vegetarian" },
    { value: "EGGETARIAN", label: "Eggetarian" },
    { value: "VEGAN", label: "Vegan" },
    { value: "DOESNT_MATTER", label: "Doesn't Matter" },
  ];

  const drinkingHabitsOptions = [
    { value: "NON_DRINKER", label: "Non-Drinker" },
    { value: "LIGHT_SOCIAL_DRINKER", label: "Light/Social Drinker" },
    { value: "REGULAR_DRINKER", label: "Regular Drinker" },
    { value: "DOESNT_MATTER", label: "Doesn't Matter" },
  ];

  const smokingHabitsOptions = [
    { value: "NON_SMOKER", label: "Non-Smoker" },
    { value: "LIGHT_SOCIAL_SMOKER", label: "Light/Social Smoker" },
    { value: "REGULAR_SMOKER", label: "Regular Smoker" },
    { value: "DOESNT_MATTER", label: "Doesn't Matter" },
  ];

  // Hardcoded Marital Status options
  const maritalStatusOptions = [
    { value: "UNMARRIED", label: "Unmarried" },
    { value: "WIDOW_WIDOWER", label: "Widow/Widower" },
    { value: "DIVORCED", label: "Divorced" },
    { value: "SEPARATED", label: "Separated" },
    { value: "DOESNT_MATTER", label: "Doesn't Matter" },
  ];

  // Hardcoded Physical Status options
  const physicalStatusOptions = [
    { value: "NORMAL", label: "Normal" },
    { value: "PHYSICALLY_CHALLENGED", label: "Physically Challenged" },
  ];

  // Add this with other options constants
  const religionOptions = [
    { value: "HINDU", label: "Hindu" },
    { value: "MUSLIM", label: "Muslim" },
    { value: "CHRISTIAN", label: "Christian" },
    { value: "SIKH", label: "Sikh" },
    { value: "BUDDHIST", label: "Buddhist" },
    { value: "JAIN", label: "Jain" },
    { value: "OTHER", label: "Other" },
    { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
  ];

  // Lazy fetch utility
  const fetchOptions = async (
    endpoint: string,
    setter: (data: any[]) => void,
    key: string
  ) => {
    try {
      setLoadingDropdown(key);
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          accept: "application/json",
        },
      });
      const data = await response.json();
      if (data.statusCode === 200 || data.statusCode === "OK" || response.ok) {
        setter(data.payload || []);
      } else {
        toast({
          title: "Failed to load options",
          description: data.message || "Could not fetch dropdown data.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load dropdown options.",
        variant: "destructive",
      });
    } finally {
      setLoadingDropdown(null);
    }
  };

  // Prefetch options for fields that already have values so Select shows labels immediately when edit opens
  const prefetchOptionsForCurrentValues = () => {
    if (!user) return;
    if (user.profileCreatedFor && createdForOptions.length === 0) {
      fetchOptions("/api/created-for", setCreatedForOptions, "createdFor");
    }
    if (user.caste && casteOptions.length === 0) {
      fetchOptions("/api/castes", setCasteOptions, "caste");
    }
    if (user.subCaste && subCasteOptions.length === 0) {
      fetchOptions("/api/sub-caste", setSubCasteOptions, "subCaste");
    }
    if (user.heightIn && heightOptions.length === 0) {
      fetchOptions("/api/heights", setHeightOptions, "height");
    }
    if (user.weight && weightOptions.length === 0) {
      fetchOptions("/api/weight/kgs", setWeightOptions, "weight");
    }
    if (
      (user.motherTongue || (user.languagesKnown && user.languagesKnown.length)) &&
      motherTongueOptions.length === 0
    ) {
      fetchOptions("/api/mother-tongues", setMotherTongueOptions, "motherTongue");
    }
    if (user.gothra && gothraOptions.length === 0) {
      fetchOptions("/api/gothras", setGothraOptions, "gothra");
    }
    if (user.star && starOptions.length === 0) {
      fetchOptions("/api/stars", setStarOptions, "star");
    }
    if (user.rashi && rashiOptions.length === 0) {
      fetchOptions("/api/raasi", setRashiOptions, "rashi");
    }
  };

  // Languages multi-select helper
  const handleLanguageSelect = (language: string) => {
    const current = Array.isArray(formData.languagesKnown)
      ? formData.languagesKnown
      : [];
    if (current.includes(language)) {
      setFormData({
        ...formData,
        languagesKnown: current.filter((l: string) => l !== language),
      });
    } else {
      setFormData({
        ...formData,
        languagesKnown: [...current, language],
      });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found in sessionStorage");
        // Show empty form even without token so user can fill it
        setUser({});
        setFormData({});
        setLoading(false);
        return;
      }

      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/api/profiles/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        // Handle "not found" (404) or empty payload as "no data yet"
        if (!res.ok) {
          if (res.status === 404) {
            // Treat as empty record so UI shows fields with N/A and user can edit
            setUser({ declarationText: DECLARATION_TEXT });
            setFormData({ declarationText: DECLARATION_TEXT });
            setLoading(false);
            return;
          } else {
            throw new Error(data.message || "Failed to fetch profile");
          }
        }

        // If response ok but payload is null/empty, treat as empty record
        if (!data.payload) {
          setUser({ declarationText: DECLARATION_TEXT });
          setFormData({ declarationText: DECLARATION_TEXT });
          setLoading(false);
          return;
        }

        const p = data.payload;
        const userData = {
          id: p.id,
          firstName: p.firstName,
          lastName: p.lastName,
          gender: p.gender,
          profileCreatedFor: p.profileCreatedFor, // ✅ renamed correctly
          dateOfBirth: p.dateOfBirth,
          timeOfBirth: p.timeOfBirth,
          placeOfBirth: p.placeOfBirth,
          religion: p.religion || "HINDU",
          caste: p.caste,
          subCaste: p.subCaste,
          maritalStatus: p.maritalStatus,
          heightIn: p.heightIn,
          weight: p.weight,
          physicalStatus: p.physicalStatus,
          motherTongue: p.motherTongue,
          gothra: p.gothra,
          star: p.star,
          rashi: p.rashi,
          manglik: p.manglik,
          dietaryHabits: p.dietaryHabits,
          drinkingHabits: p.drinkingHabits,
          smokingHabits: p.smokingHabits,
          about: p.about,
          languagesKnown: p.languagesKnown || [],
          hasDisease: p.hasDisease,
          diseaseDetails: p.diseaseDetails,
          declarationAccepted: p.declarationAccepted,
          declarationText: DECLARATION_TEXT,
        };
        setUser(userData);
        setFormData(userData);
      } catch (err) {
        console.error("Error fetching profile:", err);
        // Keep UI usable by showing empty form when fetch fails
        setUser({ declarationText: DECLARATION_TEXT });
        setFormData({ declarationText: DECLARATION_TEXT });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    // Toggle edit mode and populate formData
    const enteringEdit = !editMode;
    setEditMode(enteringEdit);
    setFormData(user);
    // If entering edit mode, prefetch option lists needed to display selected labels
    if (enteringEdit) {
      prefetchOptionsForCurrentValues();
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Validation helper for name fields (First Name, Last Name)
  const validateNameField = (value: string, fieldName: string, minLength: number = 3, maxLength: number = 100): string | null => {
    if (!value || value.trim() === "") {
      return `${fieldName} is required.`;
    }
    if (value.length < minLength) {
      return `${fieldName} must be at least ${minLength} characters long.`;
    }
    if (value.length > maxLength) {
      return `${fieldName} cannot exceed ${maxLength} characters.`;
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return `${fieldName} can only contain letters and spaces.`;
    }
    return null;
  };

  // Validation helper for Place of Birth
  const validatePlaceOfBirth = (value: string): string | null => {
    if (!value || value.trim() === "") {
      return null; 
    }
    if (value.length < 3) {
      return "Place of Birth must be at least 3 characters long.";
    }
    if (value.length > 150) {
      return "Place of Birth cannot exceed 150 characters.";
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return "Place of Birth can only contain letters and spaces.";
    }
    return null;
  };

  // Validation function
  const validateForm = (data = formData) => {
    const errors = new Set<string>();

    // Validate First Name
    const firstNameError = validateNameField(data.firstName, "First Name");
    if (firstNameError) {
      errors.add("firstName");
    }

    // Validate Last Name
    const lastNameError = validateNameField(data.lastName, "Last Name");
    if (lastNameError) {
      errors.add("lastName");
    }

    // Validate Place of Birth
    const placeOfBirthError = validatePlaceOfBirth(data.placeOfBirth);
    if (placeOfBirthError) {
      errors.add("placeOfBirth");
    }

    // generic required fields (diseaseDetails handled separately)
    REQUIRED_FIELDS.forEach((field) => {
      const value = data[field];
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errors.add(field);
      }
    });

    // diseaseDetails required only when hasDisease is true
    const hasDisease =
      data.hasDisease === true || data.hasDisease === "true";
    if (hasDisease && !data.diseaseDetails) {
      errors.add("diseaseDetails");
    }

    setValidationErrors(errors);
    return errors;
  };

  const handleSave = async () => {
    // Ensure religion is always set to "HINDU"
    const formDataWithReligion = {
      ...formData,
      religion: "HINDU",
    };

    // Validate form first
    const errors = validateForm(formDataWithReligion);
    if (errors.size > 0) {
      const firstErrorField = Array.from(errors)[0];
      const label = FIELD_LABELS[firstErrorField] || firstErrorField;
      
      // Scroll to the first error field
      const errorElement = document.querySelector(`[data-field="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      toast({
        title: "Validation Error",
        description: `${label} is required.`,
        variant: "destructive",
      });
      return;
    }

    if (!formDataWithReligion.declarationAccepted) {
      toast({
        title: "Validation Error",
        description: "You must accept the declaration before saving.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    const token = sessionStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // ✅ ensure correct key name and handle array format
    const updatedData = {
      ...formDataWithReligion,
      manglik: formDataWithReligion.manglik || null,
      profileCreatedFor: formDataWithReligion.profileCreatedFor || user.profileCreatedFor,
      languagesKnown:
        typeof formDataWithReligion.languagesKnown === "string"
          ? formDataWithReligion.languagesKnown
              .split(",")
              .map((lang: string) => lang.trim())
              .filter((l: string) => l !== "")
          : formDataWithReligion.languagesKnown,
      religion: "HINDU", // Explicitly include religion in the payload
    };

    try {
     const res = await fetch(`${baseUrl}/api/profiles/update`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(updatedData),
});


      const data = await res.json();
      if (res.ok && data.payload) {
        setUser(data.payload);
        setEditMode(false);
        setValidationErrors(new Set());
        toast({
          title: "Profile updated successfully",
          description: "Your changes have been saved.",
        });
      } else {
        toast({
          title: "Update failed",
          description: data.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast({
        title: "Error",
        description: "Unable to save changes right now.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Add these helper functions at the top of the component
  const getReadableValue = (field: string, value: string | null | undefined) => {
    if (!value) return "N/A";
    
    switch (field) {
      case "gender":
        return genderOptions.find(opt => opt.value === value)?.label || value;
      case "manglik":
        return manglikOptions.find(opt => opt.value === value)?.label || value;
      case "dietaryHabits":
        return dietaryHabitsOptions.find(opt => opt.value === value)?.label || value;
      case "drinkingHabits":
        return drinkingHabitsOptions.find(opt => opt.value === value)?.label || value;
      case "smokingHabits":
        return smokingHabitsOptions.find(opt => opt.value === value)?.label || value;
      case "maritalStatus":
        return maritalStatusOptions.find(opt => opt.value === value)?.label || value;
      case "physicalStatus":
        return physicalStatusOptions.find(opt => opt.value === value)?.label || value;
      case "weight":
        return weightOptions.find(opt => opt.weightInKgs === value)?.weightInKgs || value;
      default:
        return value;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const infoItems = [
    { label: "First Name (नाम)", field: "firstName" },
    { label: "Last Name (उपनाम)", field: "lastName" },
    { label: "Gender (लिंग)", field: "gender" },
    { label: "Profile Created For (प्रोफ़ाइल किसके लिए)", field: "profileCreatedFor" },
    { label: "Date of Birth (जन्म तिथि)", field: "dateOfBirth" },
    { label: "Time of Birth (जन्म समय)", field: "timeOfBirth" },
    { label: "Place of Birth (जन्म स्थान)", field: "placeOfBirth" },
    { label: "Caste (जाति)", field: "caste" },
    { label: "Sub Caste (उप जाति)", field: "subCaste" },
    { label: "Marital Status (वैवाहिक स्थिति)", field: "maritalStatus" },
    { label: "Height (कद)", field: "heightIn" },
    { label: "Weight (वजन)", field: "weight" },
    { label: "Physical Status (शारीरिक स्थिति)", field: "physicalStatus" },
    { label: "Mother Tongue (मातृभाषा)", field: "motherTongue" },
    { label: "Languages Known (ज्ञात भाषाएं)", field: "languagesKnown" },
    { label: "Gothra (गोत्र)", field: "gothra" },
    { label: "Star (नक्षत्र)", field: "star" },
    { label: "Rashi (राशि)", field: "rashi" },
    { label: "Manglik (मांगलिक)", field: "manglik" },
    { label: "Dietary Habits (खान-पान की आदतें)", field: "dietaryHabits" },
    { label: "Drinking Habits (पीने की आदतें)", field: "drinkingHabits" },
    { label: "Smoking Habits (धूम्रपान की आदतें)", field: "smokingHabits" },
    { label: "Has Disease? (क्या कोई बीमारी है?)", field: "hasDisease" },
    { label: "Disease Details (बीमारी का विवरण)", field: "diseaseDetails" },
  ];

  // Group items for cards
  const personalItems = infoItems.slice(0, 7);
  const religiousItems = [infoItems[7], infoItems[8], infoItems[15], infoItems[16], infoItems[17], infoItems[18]];
  const physicalItems = [infoItems[9], infoItems[10], infoItems[11], infoItems[12]];
  const languageItems = [infoItems[13], infoItems[14]];
  const lifestyleItems = [infoItems[19], infoItems[20], infoItems[21], infoItems[22], infoItems[23]];

  // Helper function to render items
  const renderItems = (items: typeof infoItems) => {
    return items.map((item, index) => {
      if (item.field === "diseaseDetails" && !formData.hasDisease) return null;
      // Skip religion field if it appears in items
      if (item.field === "religion") return null;
      
      return (
        <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth" data-field={item.field}>
          <span className="font-medium text-muted-foreground text-sm">
            {item.label}
            {(REQUIRED_FIELDS.includes(item.field) || (item.field === "diseaseDetails" && formData.hasDisease)) && (
              <span className="text-red-600 ml-1">*</span>
            )}
          </span>
          {editMode ? (
            (item.field === "profileCreatedFor" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.profileCreatedFor ?? ""}
                  onValueChange={(v) => {
                    handleChange("profileCreatedFor", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("profileCreatedFor");
                        return newErrors;
                      });
                    }
                  }}
                  onOpenChange={(open) => {
                    if (open && createdForOptions.length === 0) {
                      fetchOptions("/api/created-for", setCreatedForOptions, "createdFor");
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("profileCreatedFor") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "createdFor" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      createdForOptions.map((it) => (
                        <SelectItem key={it.id} value={it.targetPerson}>
                          {it.targetPerson}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "caste" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.caste ?? ""}
                  onValueChange={(v) => {
                    handleChange("caste", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("caste");
                        return newErrors;
                      });
                    }
                  }}
                  onOpenChange={(open) => {
                    if (open && casteOptions.length === 0) {
                      fetchOptions("/api/castes", setCasteOptions, "caste");
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("caste") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select caste" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "caste" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      casteOptions.map((it) => (
                        <SelectItem key={it.id} value={it.casteName}>
                          {it.casteName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "subCaste" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.subCaste ?? ""}
                  onValueChange={(v) => {
                    handleChange("subCaste", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("subCaste");
                        return newErrors;
                      });
                    }
                  }}
                  onOpenChange={(open) => {
                    if (open && subCasteOptions.length === 0) {
                      fetchOptions("/api/sub-caste", setSubCasteOptions, "subCaste");
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("subCaste") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select sub-caste" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "subCaste" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      subCasteOptions.map((it) => (
                        <SelectItem key={it.id} value={it.subCasteName}>
                          {it.subCasteName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "heightIn" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.heightIn ?? ""}
                  onValueChange={(v) => {
                    handleChange("heightIn", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("heightIn");
                        return newErrors;
                      });
                    }
                  }}
                  onOpenChange={(open) => {
                    if (open && heightOptions.length === 0) {
                      fetchOptions("/api/heights", setHeightOptions, "height");
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("heightIn") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select height" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "height" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      heightOptions.map((it) => (
                        <SelectItem key={it.id} value={it.height}>
                          {it.height}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "weight" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.weight ?? ""}
                  onValueChange={(v) => {
                    handleChange("weight", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("weight");
                        return newErrors;
                      });
                    }
                  }}
                  onOpenChange={(open) => {
                    if (open && weightOptions.length === 0) {
                      fetchOptions("/api/weight/kgs", setWeightOptions, "weight");
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("weight") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "weight" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      weightOptions.map((it) => (
                        <SelectItem key={it.id} value={it.weightInKgs}>
                          {it.weightInKgs}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "motherTongue" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.motherTongue ?? ""}
                  onValueChange={(v) => {
                    handleChange("motherTongue", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("motherTongue");
                        return newErrors;
                      });
                    }
                  }}
                  onOpenChange={(open) => {
                    if (open && motherTongueOptions.length === 0) {
                      fetchOptions("/api/mother-tongues", setMotherTongueOptions, "motherTongue");
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("motherTongue") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "motherTongue" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      motherTongueOptions.map((it) => (
                        <SelectItem key={it.id} value={it.languageName}>
                          {it.languageName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "languagesKnown" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  onOpenChange={(open) => {
                    if (open && motherTongueOptions.length === 0) {
                      fetchOptions("/api/mother-tongues", setMotherTongueOptions, "motherTongue");
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("languagesKnown") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select languages" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "motherTongue" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      motherTongueOptions.map((it) => (
                        <div
                          key={it.id}
                          className={`px-3 py-2 cursor-pointer rounded-md ${
                            (Array.isArray(formData.languagesKnown) &&
                            formData.languagesKnown.includes(it.languageName))
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleLanguageSelect(it.languageName)}
                        >
                          {it.languageName}
                        </div>
                      ))
                    )}
                  </SelectContent>
                </Select>

                {Array.isArray(formData.languagesKnown) && formData.languagesKnown.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.languagesKnown.map((lang: string) => (
                      <div
                        key={lang}
                        className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full"
                      >
                        <span className="mr-2">{lang}</span>
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => handleLanguageSelect(lang)}
                          aria-hidden
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )) ||
            (item.field === "gothra" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.gothra ?? ""}
                  onValueChange={(v) => {
                    handleChange("gothra", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("gothra");
                        return newErrors;
                      });
                    }
                  }}
                  onOpenChange={(open) => {
                    if (open && gothraOptions.length === 0) {
                      fetchOptions("/api/gothras", setGothraOptions, "gothra");
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("gothra") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select gothra" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "gothra" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      gothraOptions.map((it) => (
                        <SelectItem key={it.id} value={it.gothraName}>
                          {it.gothraName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "star" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.star ?? ""}
                  onValueChange={(v) => handleChange("star", v)}
                  onOpenChange={(open) => {
                    if (open && starOptions.length === 0) {
                      fetchOptions("/api/stars", setStarOptions, "star");
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select star (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "star" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      starOptions.map((it) => (
                        <SelectItem key={it.id} value={it.starName}>
                          {it.starName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "rashi" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.rashi ?? ""}
                  onValueChange={(v) => handleChange("rashi", v)}
                  onOpenChange={(open) => {
                    if (open && rashiOptions.length === 0) {
                      fetchOptions("/api/raasi", setRashiOptions, "rashi");
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rashi (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingDropdown === "rashi" ? (
                      <div className="flex justify-center py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      rashiOptions.map((it) => (
                        <SelectItem key={it.id} value={it.name || it.rashiName}>
                          {it.name || it.rashiName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "gender" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.gender ?? ""}
                  onValueChange={(v) => {
                    handleChange("gender", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("gender");
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("gender") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "manglik" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.manglik ?? ""}
                  onValueChange={(v) => {
                    handleChange("manglik", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("manglik");
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("manglik") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select manglik status" />
                  </SelectTrigger>
                  <SelectContent>
                    {manglikOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "dietaryHabits" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.dietaryHabits ?? ""}
                  onValueChange={(v) => {
                    handleChange("dietaryHabits", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("dietaryHabits");
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("dietaryHabits") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select dietary habits" />
                  </SelectTrigger>
                  <SelectContent>
                    {dietaryHabitsOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "drinkingHabits" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.drinkingHabits ?? ""}
                  onValueChange={(v) => {
                    handleChange("drinkingHabits", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("drinkingHabits");
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("drinkingHabits") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select drinking habits" />
                  </SelectTrigger>
                  <SelectContent>
                    {drinkingHabitsOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "smokingHabits" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.smokingHabits ?? ""}
                  onValueChange={(v) => {
                    handleChange("smokingHabits", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("smokingHabits");
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("smokingHabits") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select smoking habits" />
                  </SelectTrigger>
                  <SelectContent>
                    {smokingHabitsOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "maritalStatus" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.maritalStatus ?? ""}
                  onValueChange={(v) => {
                    handleChange("maritalStatus", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("maritalStatus");
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("maritalStatus") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    {maritalStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "physicalStatus" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.physicalStatus ?? ""}
                  onValueChange={(v) => {
                    handleChange("physicalStatus", v);
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("physicalStatus");
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("physicalStatus") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select physical status" />
                  </SelectTrigger>
                  <SelectContent>
                    {physicalStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )) ||
            (item.field === "hasDisease" && (
              <div className="w-full sm:w-[60%]">
                <Select
                  value={formData.hasDisease === undefined || formData.hasDisease === null ? "" : String(formData.hasDisease)}
                  onValueChange={(v) => {
                    handleChange("hasDisease", v === "true");
                    if (v) {
                      setValidationErrors(prev => {
                        const newErrors = new Set(prev);
                        newErrors.delete("hasDisease");
                        return newErrors;
                      });
                    }
                  }}
                >
                  <SelectTrigger className={validationErrors.has("hasDisease") ? "border-red-500 border-2" : ""}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )) || (
              <Input
                value={
                  item.field === "languagesKnown"
                    ? Array.isArray(formData.languagesKnown)
                      ? formData.languagesKnown.join(", ")
                      : formData.languagesKnown || ""
                    : item.field === "dateOfBirth"
                    ? formData.dateOfBirth || ""
                    : item.field === "timeOfBirth"
                    ? formData.timeOfBirth || ""
                    : formData[item.field] || ""
                }
                onChange={(e) => {
                  handleChange(item.field, e.target.value);
                  if (e.target.value.trim()) {
                    setValidationErrors(prev => {
                      const newErrors = new Set(prev);
                      newErrors.delete(item.field);
                      return newErrors;
                    });
                  }
                }}
                className={cn(
                  "w-full sm:w-[60%]",
                  validationErrors.has(item.field) && "border-red-500 border-2 focus:border-red-500"
                )}
                type={
                  item.field === "dateOfBirth"
                    ? "date"
                    : item.field === "timeOfBirth"
                    ? "time"
                    : undefined
                }
              />
            )
          ) : (
             <span className="font-semibold text-foreground text-sm sm:text-base break-all">
               {item.field === "dateOfBirth"
                 ? new Date(formData[item.field]).toLocaleDateString()
                 : item.field === "languagesKnown"
                 ? Array.isArray(formData.languagesKnown)
                   ? formData.languagesKnown.join(", ")
                   : formData.languagesKnown || "N/A"
                 : (item.field === "hasDisease" || item.field === "declarationAccepted")
                 ? (formData[item.field] ? "Yes" : "No")
                 : getReadableValue(item.field, formData[item.field])}
             </span>
           )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex flex-row items-center justify-between w-full">
            <CardTitle className="text-2xl md:text-3xl">
              Basic Information
            </CardTitle>

            {!editMode ? (
              <Button
                onClick={handleEditToggle}
                className="bg-gradient-primary w-auto"
              >
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 w-auto flex items-center justify-center"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {renderItems(personalItems)}
          </div>
        </CardContent>
      </Card>

      {/* Religious & Cultural Background */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Religious & Cultural Background</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Religion field - hardcoded as Hindu */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
              <span className="font-medium text-muted-foreground text-sm">
                Religion (धर्म)
                <span className="text-red-600 ml-1">*</span>
              </span>
              <span className="font-semibold text-foreground text-sm sm:text-base break-all">
                Hindu
              </span>
            </div>
            {renderItems(religiousItems)}
          </div>
        </CardContent>
      </Card>

      {/* Physical Attributes */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Physical Attributes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {renderItems(physicalItems)}
          </div>
        </CardContent>
      </Card>

      {/* Language & Communication */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Language & Communication</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {renderItems(languageItems)}
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle & Health */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Lifestyle & Health</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {renderItems(lifestyleItems)}
          </div>
        </CardContent>
      </Card>

      {/* About Me */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">About Me</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3 text-lg">About Me (मेरे बारे में)</h3>
            {editMode ? (
              <textarea
                value={formData.about || ""}
                onChange={(e) => {
                  handleChange("about", e.target.value);
                  if (e.target.value.trim()) {
                    setValidationErrors(prev => {
                      const newErrors = new Set(prev);
                      newErrors.delete("about");
                      return newErrors;
                    });
                  }
                }}
                className={`w-full border rounded-md p-3 min-h-[100px] ${validationErrors.has("about") ? "border-red-500 border-2" : ""}`}
              />
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                {user.about || "N/A"}
              </p>
            )}
          </div>

          {/* Declaration block */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3 text-lg">Declaration Text (घोषणा पाठ) <span className="text-red-500">*</span></h3>

            <div className="text-muted-foreground leading-relaxed">
              <p className="text-muted-foreground leading-relaxed">{DECLARATION_TEXT}</p>

              <div className="mt-4">
                {editMode ? (
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!formData.declarationAccepted}
                      onChange={(e) => handleChange("declarationAccepted", e.target.checked)}
                      className="w-4 h-4 rounded border"
                    />
                    <span className="text-sm">I have read and accept the declaration</span>
                  </label>
                ) : (
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!formData.declarationAccepted}
                      readOnly
                      disabled
                      className="w-4 h-4 rounded border"
                    />
                    <span className="text-sm font-semibold">
                      {formData.declarationAccepted ? "Accepted" : "Not accepted"}
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInformation;