import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const CommunicationSettings = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Default settings: hidden ones set to false
  const defaultSettings = {
    emailNotifications: true,
    smsNotifications: false,          // Hidden for now
    matchAlerts: false,               // Hidden for now
    messageNotifications: false,      // Hidden for now
    profileViewAlerts: false,         // Hidden for now
    weeklyDigest: true,
    promotionalEmails: false,
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(false);

  // Fetch current settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setSettings(defaultSettings);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/communication-settings`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 404) {
            setSettings(defaultSettings);
            return;
          } else {
            throw new Error(data?.message || "Failed to fetch settings");
          }
        }

        if (!data?.payload) {
          setSettings(defaultSettings);
          return;
        }

        // Override hidden fields to false no matter what backend sends
        const sanitizedData = {
          ...data.payload,
          smsNotifications: false,
          matchAlerts: false,
          messageNotifications: false,
          profileViewAlerts: false,
        };

        setSettings(sanitizedData);
      } catch (error: any) {
        toast({
          title: "Error fetching settings",
          description: error.message || "Something went wrong.",
          variant: "destructive",
        });
        setSettings(defaultSettings);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [baseUrl]);

  // Update setting dynamically on toggle
  const handleToggle = async (key: keyof typeof settings, checked: boolean) => {
    const prevSettings = settings;
    const updatedSettings = { ...prevSettings, [key]: checked };
    setSettings(updatedSettings);

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast({
        title: "Authorization Error",
        description: "Token not found in sessionStorage.",
        variant: "destructive",
      });
      setSettings(prevSettings);
      return;
    }

    const formatKey = (k: string) => {
      const spaced = k.replace(/([A-Z])/g, " $1");
      return spaced.charAt(0).toUpperCase() + spaced.slice(1);
    };

    try {
      const res = await fetch(`${baseUrl}/api/communication-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedSettings),
      });

      const data = await res.json();

      if (data?.statusCode === 200 && data?.payload) {
        setSettings(data.payload);
        toast({
          title: "Settings Updated",
          description: `${formatKey(key)} ${
            checked ? "enabled" : "disabled"
          } successfully.`,
        });
      } else {
        throw new Error(data?.message || "Failed to update settings");
      }
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
      setSettings(prevSettings);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-0 shadow-medium">
        <CardHeader className="pb-4">
          <div>
            <CardTitle className="text-2xl md:text-3xl">
              Communication Settings
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Control how we communicate with you
            </p>
          </div>
        </CardHeader>
      </Card>

      {loading ? (
        <div className="text-center text-muted-foreground py-8">
          Loading settings...
        </div>
      ) : (
        <>
          {/* Notification Channels */}
          <Card className="border-0 shadow-medium">
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notif"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleToggle("emailNotifications", checked)
                  }
                />
              </div>

              {/* SMS Notifications hidden for now */}
              {false && (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notif">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via text message
                    </p>
                  </div>
                  <Switch
                    id="sms-notif"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) =>
                      handleToggle("smsNotifications", checked)
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Alerts hidden for now */}
          {false && (
            <Card className="border-0 shadow-medium">
              <CardHeader>
                <CardTitle>Activity Alerts</CardTitle>
                <CardDescription>
                  Get notified about important activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="match-alerts">New Match Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      When you get a new match
                    </p>
                  </div>
                  <Switch
                    id="match-alerts"
                    checked={settings.matchAlerts}
                    onCheckedChange={(checked) =>
                      handleToggle("matchAlerts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="message-notif">Message Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone sends you a message
                    </p>
                  </div>
                  <Switch
                    id="message-notif"
                    checked={settings.messageNotifications}
                    onCheckedChange={(checked) =>
                      handleToggle("messageNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profile-view">Profile View Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone views your profile
                    </p>
                  </div>
                  <Switch
                    id="profile-view"
                    checked={settings.profileViewAlerts}
                    onCheckedChange={(checked) =>
                      handleToggle("profileViewAlerts", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Email Preferences */}
          <Card className="border-0 shadow-medium">
            <CardHeader>
              <CardTitle>Email Preferences</CardTitle>
              <CardDescription>Manage your email subscriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-digest">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Summary of your weekly activity
                  </p>
                </div>
                <Switch
                  id="weekly-digest"
                  checked={settings.weeklyDigest}
                  onCheckedChange={(checked) =>
                    handleToggle("weeklyDigest", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="promo-emails">Promotional Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Offers, tips, and special promotions
                  </p>
                </div>
                <Switch
                  id="promo-emails"
                  checked={settings.promotionalEmails}
                  onCheckedChange={(checked) =>
                    handleToggle("promotionalEmails", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CommunicationSettings;
