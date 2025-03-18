// pages/settings.tsx
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

// Phosphor Icons
import { Lock, Bell, Gear, SignOut, Trash, Calendar, PencilSimple, Sun, Moon } from '@phosphor-icons/react';

const SettingsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "Jahanvi",
    lastName: "Singh",
    bio: "I write about art, design and products\nConnect with me — linktr.ee/iamjahanvi",
    email: "iamjahanvi@gmail.com",
    username: "iamjahanvi",
    profilePicture: "/avatar-placeholder.jpg",
    language: "english",
    theme: "light",
    dob: "1995-05-15",
    notifications: {
      email: true,
      push: true,
      marketing: false,
      digest: true,
    }
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileUpdate = () => {
    toast.success("Profile updated", {
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords don't match", {
        description: "New password and confirm password must match.",
      });
      return;
    }
    toast.success("Password updated", {
      description: "Your password has been updated successfully.",
    });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({
          ...user,
          profilePicture: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setUser({
      ...user,
      profilePicture: null,
    });
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="container  mx-auto p-4 sm:p-6">
      <div className="space-y-6">
      <div className="flex justify-between items-center">

      <div className="space-y-2">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and security</p>
        </div>
        <Button 
            variant="ghost" 
            className="text-red-500 w-full sm:w-auto hover:bg-destructive hover:text-background hover:font-semibold" 
            onClick={handleLogout}
          >
            <SignOut size={16} weight="duotone" className="mr-2" />
            Log out
          </Button>
      </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-6 bg-muted/25 border">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <PencilSimple size={16} />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock size={16} />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Gear size={16} />
              Preferences
            </TabsTrigger>
          </TabsList>

          <Card>
            <CardContent className="p-6">
              <TabsContent value="profile">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={user.profilePicture} alt={user.firstName} />
                        <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <label htmlFor="profile-picture" className="absolute bottom-0 right-0 cursor-pointer">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                          <PencilSimple size={16} />
                        </div>
                        <input
                          id="profile-picture"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfilePictureChange}
                        />
                      </label>
                    </div>
                    <Button variant="outline" size="sm" onClick={removeProfilePicture}>
                      <Trash size={16} className="mr-2" />
                      Remove Picture
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name" 
                        value={user.firstName} 
                        onChange={(e) => setUser({...user, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name" 
                        value={user.lastName} 
                        onChange={(e) => setUser({...user, lastName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={user.username} 
                        onChange={(e) => setUser({...user, username: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        value={user.bio} 
                        onChange={(e) => setUser({...user, bio: e.target.value})}
                        className="min-h-[100px]"
                      />
                      <p className="text-sm text-muted-foreground text-right">{user.bio.length}/160</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
                        <Input 
                          id="dob" 
                          type="date" 
                          value={user.dob} 
                          onChange={(e) => setUser({...user, dob: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleProfileUpdate}>Save Changes</Button>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="current-password" 
                          type="password" 
                          value={passwords.current}
                          onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          value={passwords.new}
                          onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button onClick={handlePasswordChange}>Update Password</Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Management</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium text-destructive">Danger Zone</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4">
                            <h5 className="font-medium">Deactivate Account</h5>
                            <p className="text-sm text-muted-foreground mb-4">Temporarily deactivate your account</p>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" className="text-amber-600 border-amber-600">
                                  Deactivate
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Deactivate account?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    You can reactivate by signing back in.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-amber-600">Deactivate</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                          <div className="border rounded-lg p-4">
                            <h5 className="font-medium">Delete Account</h5>
                            <p className="text-sm text-muted-foreground mb-4">Permanently delete your account</p>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" className="text-red-600 border-red-600">
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete account?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action is permanent and cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-600">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Activity notifications via email</p>
                      </div>
                      <Switch 
                        checked={user.notifications.email}
                        onCheckedChange={(checked) => setUser({
                          ...user,
                          notifications: { ...user.notifications, email: checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Browser push notifications</p>
                      </div>
                      <Switch 
                        checked={user.notifications.push}
                        onCheckedChange={(checked) => setUser({
                          ...user,
                          notifications: { ...user.notifications, push: checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Promotional emails</p>
                      </div>
                      <Switch 
                        checked={user.notifications.marketing}
                        onCheckedChange={(checked) => setUser({
                          ...user,
                          notifications: { ...user.notifications, marketing: checked }
                        })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Digest</Label>
                        <p className="text-sm text-muted-foreground">Weekly activity summary</p>
                      </div>
                      <Switch 
                        checked={user.notifications.digest}
                        onCheckedChange={(checked) => setUser({
                          ...user,
                          notifications: { ...user.notifications, digest: checked }
                        })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleProfileUpdate}>Save Preferences</Button>
                </div>
              </TabsContent>

              <TabsContent value="preferences">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Language</h3>
                    <Select 
                      value={user.language} 
                      onValueChange={(value) => setUser({...user, language: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <RadioGroup 
                      value={user.theme}
                      onValueChange={(value) => setUser({...user, theme: value})}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                        <Label 
                          htmlFor="light"
                          className="flex flex-col items-center p-4 border-2 rounded-md cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary"
                        >
                          <Sun size={24} className="mb-2" />
                          <span>Light</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                        <Label 
                          htmlFor="dark"
                          className="flex flex-col items-center p-4 border-2 rounded-md cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary"
                        >
                          <Moon size={24} className="mb-2" />
                          <span>Dark</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="system" id="system" className="peer sr-only" />
                        <Label 
                          htmlFor="system"
                          className="flex flex-col items-center p-4 border-2 rounded-md cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary"
                        >
                          <div className="flex mb-2">
                            <Sun size={20} />
                            <span className="mx-1">/</span>
                            <Moon size={20} />
                          </div>
                          <span>System</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Accessibility</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Reduce Motion</Label>
                          <p className="text-sm text-muted-foreground">Minimize animations</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>High Contrast</Label>
                          <p className="text-sm text-muted-foreground">Increase element contrast</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleProfileUpdate}>Save Preferences</Button>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground pt-4">

          <div className="flex flex-col sm:flex-row gap-4 text-center">
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;