import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit,
  MapPin,
  Briefcase,
  GraduationCap,
  Loader2,
  Upload,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FullImageViewer from "@/components/common/FullImageViewer";
import { useNavigate } from "react-router-dom";
import CreateProfileModal from "@/components/common/CreateProfileModal";

const maritalStatusMap: { [key: string]: string } = {
  UNMARRIED: "Unmarried",
  WIDOW_WIDOWER: "Widow / Widower",
  DIVORCED: "Divorced",
  SEPARATED: "Separated",
  DOESNT_MATTER: "Doesn't Matter",
};

const religionMap: { [key: string]: string } = {
  HINDU: "Hindu",
  MUSLIM: "Muslim",
  CHRISTIAN: "Christian",
  SIKH: "Sikh",
  BUDDHIST: "Buddhist",
  JAIN: "Jain",
  OTHER: "Other",
  PREFER_NOT_TO_SAY: "Prefer not to say",
};

const ProfileInfo = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Helper function to format value or show fallback
  const formatValue = (value: any, fallback: string = "Not specified") => {
    return value && value !== "NA" && value !== null && value !== undefined 
      ? value 
      : fallback;
  };

  // Fetch profile and profile image
  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token not found in sessionStorage");
        setLoading(false);
        return;
      }

      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/api/profiles/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
          if (res.ok && data.payload) {
          const p = data.payload;
          setUser({
            firstName: p.firstName,
            lastName: p.lastName,
            username: p.username,
            city: p.locationResponse?.city,
            state: p.locationResponse?.state,
            occupation: p.educationOccupationDetailsResponse?.occupation,
            highestEducation:
              p.educationOccupationDetailsResponse?.highestEducation,
            religion: p.religion,
            caste: p.caste,
            about: p.about,
            heightIn: p.heightIn,
            dateOfBirth: p.dateOfBirth,
            maritalStatus: p.maritalStatus,
            motherTongue: p.motherTongue,
          });
          await fetchProfileImage(token);
        } else {
          // If profile not found or other error, show NA values
          setUser({
            firstName: "NA",
            lastName: "NA",
            username: "NA",
            city: "NA",
            state: "NA",
            occupation: "NA",
            highestEducation: "NA",
            religion: "NA",
            caste: "NA",
            about: "NA",
            heightIn: "NA",
            dateOfBirth: "NA",
            maritalStatus: "NA",
            motherTongue: "NA",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setUser({
          firstName: "NA",
          lastName: "NA",
          username: "NA",
          city: "NA",
          state: "NA",
          occupation: "NA",
          highestEducation: "NA",
          religion: "NA",
          caste: "NA",
          about: "NA",
          heightIn: "NA",
          dateOfBirth: "NA",
          maritalStatus: "NA",
          motherTongue: "NA",
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchProfileImage = async (token: string) => {
      try {
        const imgRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/images/getLoggedUserProfileImage`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!imgRes.ok) throw new Error("Failed to load profile image");

        const blob = await imgRes.blob();
        const imgUrl = URL.createObjectURL(blob);
        setProfileImage(imgUrl);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle profile picture upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast({ description: "User not authenticated!", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      setUploading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/images/uploadOrUpdateProfilePicture`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok && data.statusCode === 200) {
        toast({ description: "Profile picture updated successfully!" });
        const imgUrl = URL.createObjectURL(file);
        setProfileImage(imgUrl);
      } else {
        if (data.statusCode === 404 && data.message === "Profile not found") {
          setShowCreateProfileModal(true);
        } else {
          toast({
            description: data.message || "Failed to upload image",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      toast({ description: "Error uploading image", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleButtonClick = () => fileInputRef.current?.click();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-4">
          <div className="flex flex-row items-center justify-between w-full">
            <CardTitle className="text-2xl md:text-3xl">Profile Info</CardTitle>
            <Button
              className="bg-gradient-primary w-auto"
              onClick={handleButtonClick}
              disabled={uploading}
            >
              <Edit className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Information */}
      <Card className="border-0 shadow-large">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary bg-gray-100 cursor-pointer hover:opacity-90 transition"
                onClick={() => profileImage && setIsImageOpen(true)}
              >
                {uploading ? (
                  <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                ) : profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                )}
              </div>

              {/* Full Image Viewer (circle mode) */}
              <FullImageViewer
                imageUrl={profileImage}
                open={isImageOpen}
                onOpenChange={setIsImageOpen}
                shape="rectangle"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />

              <Button
                variant="outline"
                size="sm"
                onClick={handleButtonClick}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading... (अपलोड हो रहा है...)
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" /> Upload Photo
                  </>
                )}
              </Button>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold">
                  {formatValue(user.firstName)} {formatValue(user.lastName)}
                </h2>
                <p className="text-lg text-muted-foreground">
                  User ID: {formatValue(user.username)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location (स्थान)</p>
                    <p className="font-medium">
                      {user.city && user.city !== "NA" && user.state && user.state !== "NA" 
                        ? `${user.city}, ${user.state}`
                        : formatValue(user.city || user.state, "Not specified")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupation (व्यवसाय)</p>
                    <p className="font-medium">{formatValue(user.occupation)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Education (शिक्षा)</p>
                    <p className="font-medium">{formatValue(user.highestEducation)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary">🕉</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Religion (धर्म)</p>
                    <p className="font-medium">
                      {religionMap[user.religion] || formatValue(user.religion)}, {formatValue(user.caste)}
                    </p>
                  </div>
                </div>
              </div>

              {user.about && user.about !== "NA" && user.about !== "" && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">About Me (मेरे बारे में)</h3>
                  <p className="text-muted-foreground">{user.about}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="border-0 shadow-soft hover:shadow-medium transition-smooth">
    <CardContent className="pt-4 md:pt-6">
      <div className="text-center">
        <p className="text-xl md:text-2xl font-bold text-primary truncate px-2" title={formatValue(user.heightIn)}>
          {formatValue(user.heightIn)}
        </p>
        <p className="text-xs md:text-sm text-muted-foreground">Height (कद)</p>
      </div>
    </CardContent>
  </Card>

        <Card className="border-0 shadow-soft hover:shadow-medium transition-smooth">
          <CardContent className="pt-4 md:pt-6">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-primary">
                {user.dateOfBirth && user.dateOfBirth !== "NA" 
                  ? new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear() 
                  : "Not specified"}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">Age (आयु)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft hover:shadow-medium transition-smooth">
          <CardContent className="pt-4 md:pt-6">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-primary truncate px-2">
                {maritalStatusMap[user.maritalStatus] || formatValue(user.maritalStatus)}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">Status (स्थिति)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft hover:shadow-medium transition-smooth">
          <CardContent className="pt-4 md:pt-6">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold text-primary truncate px-2">{formatValue(user.motherTongue)}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Language (भाषा)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Profile Modal */}
      <CreateProfileModal
        open={showCreateProfileModal}
        onOpenChange={setShowCreateProfileModal}
        onCreate={() => {
          setShowCreateProfileModal(false);
          navigate("/dashboard?section=basic-info");
        }}
      />
    </div>
  );
};

export default ProfileInfo;