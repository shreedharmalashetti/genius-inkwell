import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, Download, Edit3, Share2, Calendar, Clock, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BlogData {
  title: string;
  content: string;
  tags: string[];
  estimatedReadTime: number;
  createdAt: Date;
}

interface BlogPreviewProps {
  blogData: BlogData | null;
  isGenerating: boolean;
}

export const BlogPreview = ({ blogData, isGenerating }: BlogPreviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(blogData?.content || '');

  const handleCopy = () => {
    if (blogData) {
      navigator.clipboard.writeText(blogData.content);
      toast({
        title: "Copied to clipboard",
        description: "Blog content has been copied successfully!",
      });
    }
  };

  const handleDownload = () => {
    if (blogData) {
      const element = document.createElement('a');
      const file = new Blob([blogData.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${blogData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: "Downloaded",
        description: "Your blog post has been downloaded!",
      });
    }
  };

  const handleShare = () => {
    if (blogData && navigator.share) {
      navigator.share({
        title: blogData.title,
        text: blogData.content,
      });
    } else {
      handleCopy();
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing && blogData) {
      // Save edited content (in real app, this would call an API)
      toast({
        title: "Changes saved",
        description: "Your blog post has been updated!",
      });
    }
  };

  if (isGenerating) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center py-12">
          <div className="animate-pulse-glow mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full mx-auto flex items-center justify-center">
              <Edit3 className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Generating your blog post...</h3>
          <p className="text-muted-foreground">Our AI is crafting the perfect content for you</p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!blogData) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
            <Edit3 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No blog post yet</h3>
          <p className="text-muted-foreground">Start chatting with the AI to generate your first blog post!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col animate-fade-up">
      <CardHeader className="border-b border-border p-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Preview</h2>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-7 px-2 text-xs"
            >
              <Edit3 className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="h-7 px-2 text-xs"
            >
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 mobile-scroll">
        <div className="max-w-full mx-auto">{/* Removed max-w-4xl for mobile */}
          {/* Blog Header - Mobile optimized */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
              {blogData.title}
            </h1>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {blogData.createdAt.toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {blogData.estimatedReadTime} min read
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {blogData.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator className="my-4" />
          </div>

          {/* Blog Content - Mobile optimized */}
          <div className="prose prose-sm prose-gray dark:prose-invert max-w-none">
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full min-h-[300px] p-3 border border-input rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                placeholder="Edit your blog content..."
              />
            ) : (
              <div 
                className="leading-relaxed text-foreground text-sm prose prose-sm prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blogData.content }}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};