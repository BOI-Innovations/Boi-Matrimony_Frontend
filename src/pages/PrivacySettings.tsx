import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Edit, Save, Lock } from "lucide-react";

const PrivacySettings = () => {
  const defaultSettings = {
    profileVisibility: "ALL",
    showPhotosTo: "MATCHES",
    hideProfile: false,
  };

  const [settings, setSettings] = useState(defaultSettings);

  const [editProfile, setEditProfile] = useState(false);
  const [editPhotos, setEditPhotos] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const toTitleCase = (str: string) => {
    const result = str.replace(/([A-Z])/g, " $1").trim();
    return result
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      if (!token) {
        setSettings(defaultSettings);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/privacy-settings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 404) {
            setSettings(defaultSettings);
            setLoading(false);
            return;
          }
          throw new Error("Failed to fetch privacy settings");
        }

        const data = await res.json();
        setSettings(data?.payload || defaultSettings);
      } catch (err: any) {
        console.error(err);
        setSettings(defaultSettings);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (updated: typeof settings = settings, field: string) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast({ title: "Authentication", description: "Token not found. Please login to save changes.", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/privacy-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error("Failed to update settings");

      const data = await res.json();
      setSettings(data.payload);
      toast({
        title: "Settings saved",
        description: `${toTitleCase(field)} updated successfully.`,
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.message || "Failed to save settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (key: keyof typeof settings, checked: boolean, editable: boolean) => {
    if (!editable) return;
    const updatedSettings = { ...settings, [key]: checked };

    setSettings(updatedSettings);
    await handleSave(updatedSettings, key);
  };

  if (loading) return <div className="text-center py-10">Loading privacy settings...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-4">
          <div>
            <CardTitle className="text-2xl md:text-3xl">Privacy Settings</CardTitle>
            <p className="text-muted-foreground mt-1">Control who can see your information</p>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Visibility */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <CardTitle>Profile Visibility</CardTitle>
            </div>
            <CardDescription>Control who can view your profile</CardDescription>
          </div>
          {!editProfile ? (
            <Button onClick={() => setEditProfile(true)} className="bg-gradient-primary text-white">
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Button>
          ) : (
            <Button
              onClick={() => {
                setEditProfile(false);
                handleSave(undefined, "Profile Visibility");
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {saving ? (
                <span className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full inline-block"></span>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Who can see my profile?</Label>
            <Select
              disabled={!editProfile}
              value={settings.profileVisibility}
              onValueChange={(value) => setSettings({ ...settings, profileVisibility: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Members</SelectItem>
                <SelectItem value="MATCHES">My Matches Only</SelectItem>
                <SelectItem value="PREMIUM">Premium Members Only</SelectItem>
                <SelectItem value="NONE">No One (Hidden)</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </CardContent>
      </Card>

      {/* Photo Privacy */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Photo Privacy</CardTitle>
            <CardDescription>Manage who can see your photos</CardDescription>
          </div>
          {!editPhotos ? (
            <Button onClick={() => setEditPhotos(true)} className="bg-gradient-primary text-white">
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Button>
          ) : (
            <Button
              onClick={() => {
                setEditPhotos(false);
                handleSave(undefined, "Photo Privacy");
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {saving ? (
                <span className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full inline-block"></span>
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          <Label>Show my photos to</Label>
          <Select
            disabled={!editPhotos}
            value={settings.showPhotosTo}
            onValueChange={(value) => setSettings({ ...settings, showPhotosTo: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Everyone</SelectItem>
              <SelectItem value="MATCHES">My Matches Only</SelectItem>
              <SelectItem value="PREMIUM">Premium Members</SelectItem>
              <SelectItem value="ACCEPTED">Accepted Requests Only</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Hide Profile */}
      <Card className="border-0 shadow-medium bg-muted/50">
        <CardHeader>
          <CardTitle>Hide Profile Temporarily</CardTitle>
          <CardDescription>Your profile will be hidden from all searches and matches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hide-profile">Hide My Profile</Label>
              <p className="text-sm text-muted-foreground">Temporarily make your profile invisible</p>
            </div>
            <Switch
              id="hide-profile"
              checked={settings.hideProfile}
              onCheckedChange={(checked) => handleToggle("hideProfile", checked, true)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
