
import { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';  

interface BackgroundUploadProps {
  onBackgroundChange: (imageUrl: string) => void;
}

const BackgroundUpload = ({ onBackgroundChange }: BackgroundUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>({});

  const [profileData, setProfileData] = useState({
    name: 'Alex Rivera',
    title: 'Digital Creator & Entrepreneur',
    bio: 'Passionate about technology, design, and creating meaningful connections. Building the future one project at a time.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    location: 'London',
    website: 'https://github.com',
    projects: []
  });
  
  const predefinedBackgrounds = [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1920&q=80',
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onBackgroundChange(imageUrl);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundSelect = (imageUrl: string) => {
    onBackgroundChange(imageUrl);
  };

  const handleProfileSave = (updatedData: any) => {
    setProfileData(updatedData);
    // Here you would typically save to Firebase/database
    console.log("Profile updated:", updatedData);
  };

  const profile = isLoggedIn
    ? {
        name: profileData.name,
        title: profileData.title,
        bio: profileData.bio,
        avatar: userData.avatar || "",
        stats: {
          followers: 0,
          following: 0,
          projects: profileData.projects.length,
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

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg justify-between">
        <div className="flex items-center gap-2 mb-3">
          <Camera className="w-5 h-5 text-slate-600" />
          <span className="text-xs font-medium text-slate-700">Change Background</span>
        </div>
        
        {/* Upload Button */}
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          size="sm"
        >
          <Upload className="w-4 h-4 mr-2 text-xs" />
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        {/* Predefined Backgrounds */}
        <div className="space-y-2">
          <span className="text-xs text-slate-600">Or choose preset:</span>
          <div className="grid grid-cols-2 gap-2">
            {predefinedBackgrounds.map((bg, index) => (
              <button
                key={index}
                onClick={() => handleBackgroundSelect(bg)}
                className="w-12 h-12 rounded-lg bg-cover bg-center border-2 border-white hover:border-blue-400 transition-all duration-200 hover:scale-110 shadow-md"
                style={{ backgroundImage: `url(${bg})` }}
                title={`Background ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundUpload;
