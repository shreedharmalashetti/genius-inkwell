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
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Blog Preview</h2>
            <Badge variant="secondary" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              Preview
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="h-8"
            >
              <Edit3 className="w-3 h-3 mr-1" />
              {isEditing ? 'Save' : 'Edit'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8"
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="h-8"
            >
              <Download className="w-3 h-3 mr-1" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="h-8"
            >
              <Share2 className="w-3 h-3 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Blog Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
              {blogData.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {blogData.createdAt.toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blogData.estimatedReadTime} min read
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {blogData.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator className="my-6" />
          </div>

          {/* Blog Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full min-h-[400px] p-4 border border-input rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Edit your blog content..."
              />
            ) : (
              <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                {blogData.content}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};