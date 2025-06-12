import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { Camera, Instagram, Twitter, Linkedin, Youtube, Facebook, Mail, Globe, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, Calendar, Award, TrendingUp, BookOpen, Target } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import BackgroundUpload from "@/components/BackgroundUpload";
import RecentProjects from "@/components/RecentProjects";
import QuickActions from "@/components/QuickActions";
import RecentActivity from "@/components/RecentActivity";
import SkillsSection from '@/components/Skillssection';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80"
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setUserData({});
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        setLoading(false);
      } else {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No user data found");
            setUserData({});
          }
        } catch (err) {
          console.error("Error fetching user data", err);
          setUserData({});
        }
      }
      setLoading(false);
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-xl font-semibold text-slate-700 animate-pulse">
          Loading your profile...
        </div>
      </div>
    );
  }

  const fullName =
    `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "Unnamed User";

  const profile = isLoggedIn
    ? {
        name: fullName,
        title: userData.title || "New Member",
        bio: userData.bio || "This is a new profile. Update your bio!",
        avatar: userData.avatar || "",
        stats: {
          followers: 0,
          following: 0,
          projects: 0,
          likes: 0,
        },
      }
    : {
        name: "Guest",
        title: "Digital Creator & Entrepreneur",
        bio: "Passionate about technology, design, and creating meaningful connections. Building the future one project at a time.",
        avatar: "",
        stats: {
          followers: 12,
          following: 850,
          projects: 45,
          likes: 2.5,
        },
      };

  const handleBackgroundChange = (newImageUrl: string) => {
    setBackgroundImage(newImageUrl);
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section with Background */}
      <div className="relative h-96 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${backgroundImage})`
 }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
        {/* Background Upload Component */}
        <BackgroundUpload onBackgroundChange={handleBackgroundChange} />
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 rounded-md bg-transparent my-[99px] py-[34px] px-[23px]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end gap-6">
              {/* Avatar */}
              <div className="relative">
                <img src={profileData.avatar} alt={profileData.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover justify-center flex items-center " />
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors">
                  <Camera className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              
              {/* Profile Text */}
              <div className="flex-1 text-white">
                <h1 className="text-4xl font-bold mb-2 drop-shadow-lg flex items-center mb-1.5 ">{profileData.name}</h1>
                <p className="text-xl text-slate-200 drop-shadow-md">{profileData.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Stats Section - positioned near profile */}
      <div className="max-w-7xl mx-auto px-8 -mt-8 relative z-10">
        <Card className="p-4 shadow-lg border-0 backdrop-blur-sm transition-all duration-300 hover:shadow-xl bg-blue-50">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">12K</div>
              <div className="text-sm text-slate-600">Followers</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">850</div>
              <div className="text-sm text-slate-600">Following</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">45</div>
              <div className="text-sm text-slate-600">Projects</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">2.5K</div>
              <div className="text-sm text-slate-600">Likes</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column - Bio, Projects, and Social Links */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <Card className="p-8 shadow-lg border-0 backdrop-blur-sm bg-[#f0ebe3]/70 my-0 mx-0 px-[34px] py-[32px] rounded-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">About Me</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {profileData.bio}
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Contact Me
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg transition-all duration-300">
                  Download CV
                </Button>
              </div>
            </Card>

            {/* Recent Projects */}
            <RecentProjects />

            {/* Social Links */}
            <SocialLinks socialLinks={socialLinks} />
          </div>

          {/* Right Column - Quick Actions and Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <QuickActions />

             {/* Skills Section */}
          <SkillsSection />


            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;