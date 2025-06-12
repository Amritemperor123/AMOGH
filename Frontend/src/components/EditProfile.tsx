
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Trash2, X } from "lucide-react";

interface Project {
  id: string;
  name: string;
  field: string;
  description: string;
  link: string;
  tag: string;
}

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  avatar: string; //store image as URL
  location: string;
  website: string;
  projects: Project[];
}

interface EditProfileProps {
  profileData: ProfileData;
  onSave: (data: ProfileData) => void;
}

const PROJECT_TAGS = [
  "AI & Machine Learning",
  "Sustainable Tech", 
  "FinTech",
  "EdTech",
  "Health Tech",
  "IoT & Hardware",
  "Blockchain",
  "Mobile Apps"
];

export const EditProfile = ({ profileData, onSave }: EditProfileProps) => {
  const [editData, setEditData] = useState<ProfileData>(profileData);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    field: '',
    description: '',
    link: '',
    tag: ''
  });
  const [showAddProject, setShowAddProject] = useState(false);

  const handleSave = () => {
    onSave(editData);
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.field && newProject.description && newProject.tag) {
      const project: Project = {
        ...newProject,
        id: Date.now().toString()
      };
      setEditData(prev => ({
        ...prev,
        projects: [...prev.projects, project]
      }));
      setNewProject({
        name: '',
        field: '',
        description: '',
        link: '',
        tag: ''
      });
      setShowAddProject(false);
    }
  };

  const handleRemoveProject = (projectId: string) => {
    setEditData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  };

  const handleEditProject = (projectId: string, updatedProject: Omit<Project, 'id'>) => {
    setEditData(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === projectId ? { ...updatedProject, id: projectId } : p
      )
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and manage your projects
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editData.title}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editData.bio}
                onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editData.location}
                  onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={editData.website}
                  onChange={(e) => setEditData(prev => ({ ...prev, website: e.target.value }))}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your Projects</h3>
              <Button onClick={() => setShowAddProject(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            </div>
            
            {showAddProject && (
              <Card className="p-4 border-2 border-dashed">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Add New Project
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddProject(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input
                        id="project-name"
                        value={newProject.name}
                        onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-field">Field</Label>
                      <Input
                        id="project-field"
                        value={newProject.field}
                        onChange={(e) => setNewProject(prev => ({ ...prev, field: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="project-description">Short Description</Label>
                    <Textarea
                      id="project-description"
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project-link">Project Link</Label>
                      <Input
                        id="project-link"
                        value={newProject.link}
                        onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-tag">Tag</Label>
                      <Select
                        value={newProject.tag}
                        onValueChange={(value) => setNewProject(prev => ({ ...prev, tag: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROJECT_TAGS.map(tag => (
                            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button onClick={handleAddProject} className="w-full">
                    Add Project
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <div className="space-y-4">
              {editData.projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={(updatedProject) => handleEditProject(project.id, updatedProject)}
                  onDelete={() => handleRemoveProject(project.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Omit<Project, 'id'>) => void;
  onDelete: () => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editProject, setEditProject] = useState<Omit<Project, 'id'>>({
    name: project.name,
    field: project.field,
    description: project.description,
    link: project.link,
    tag: project.tag
  });

  const handleSave = () => {
    onEdit(editProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProject({
      name: project.name,
      field: project.field,
      description: project.description,
      link: project.link,
      tag: project.tag
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="p-4">
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Project Name</Label>
              <Input
                value={editProject.name}
                onChange={(e) => setEditProject(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label>Field</Label>
              <Input
                value={editProject.field}
                onChange={(e) => setEditProject(prev => ({ ...prev, field: e.target.value }))}
              />
            </div>
          </div>
          
          <div>
            <Label>Description</Label>
            <Textarea
              value={editProject.description}
              onChange={(e) => setEditProject(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Project Link</Label>
              <Input
                value={editProject.link}
                onChange={(e) => setEditProject(prev => ({ ...prev, link: e.target.value }))}
              />
            </div>
            <div>
              <Label>Tag</Label>
              <Select
                value={editProject.tag}
                onValueChange={(value) => setEditProject(prev => ({ ...prev, tag: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TAGS.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">Save</Button>
            <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <CardContent className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold">{project.name}</h4>
            <p className="text-sm text-muted-foreground">{project.field}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm">{project.description}</p>
        <div className="flex justify-between items-center">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {project.tag}
          </span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              View Project
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};