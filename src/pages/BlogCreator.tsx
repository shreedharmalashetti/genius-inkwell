import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { BlogPreview } from "@/components/BlogPreview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  images?: string[];
  timestamp: Date;
}

interface BlogData {
  title: string;
  content: string;
  tags: string[];
  estimatedReadTime: number;
  createdAt: Date;
}

type TabType = 'chat' | 'preview';

const BlogCreator = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  const handleGenerateBlog = async (messages: Message[]) => {
    setIsGenerating(true);
    
    // Simulate API call to generate blog
    setTimeout(() => {
      const userMessages = messages.filter(m => m.type === 'user');
      const lastUserMessage = userMessages[userMessages.length - 1];
      
      const sampleBlog: BlogData = {
        title: "Creating Amazing Blog Posts with AI: A Comprehensive Guide",
        content: `# Introduction

Welcome to the future of content creation! In today's digital landscape, artificial intelligence has revolutionized how we approach blog writing. Whether you're a seasoned blogger or just starting your content journey, AI can be your powerful ally in creating engaging, well-structured, and compelling blog posts.

## Why AI-Powered Blog Creation Matters

The integration of AI in content creation isn't just a trend—it's a game-changer. Here's why:

### 1. Enhanced Creativity
AI doesn't replace human creativity; it amplifies it. By providing fresh perspectives and unexpected angles, AI helps break through writer's block and introduces ideas you might never have considered.

### 2. Improved Efficiency
What used to take hours can now be accomplished in minutes. AI can help with:
- Research and fact-checking
- Content structure and organization
- Grammar and style improvements
- SEO optimization

### 3. Consistency in Quality
AI ensures that your content maintains a consistent tone, style, and quality across all your blog posts, helping to establish your brand voice.

## Best Practices for AI Blog Creation

### Start with Clear Intent
Before engaging with AI, define:
- Your target audience
- The main message you want to convey
- The desired tone and style
- Key points you want to cover

### Collaborate, Don't Delegate
Think of AI as your writing partner, not your replacement. The best results come from a collaborative approach where you guide the AI with your expertise and vision.

### Review and Refine
Always review AI-generated content carefully. Add your personal touch, verify facts, and ensure the content aligns with your brand voice.

## The Future of Content Creation

As we look ahead, the synergy between human creativity and artificial intelligence will only grow stronger. This partnership opens up exciting possibilities:

- Personalized content at scale
- Real-time content optimization
- Advanced audience targeting
- Multilingual content creation

## Conclusion

AI-powered blog creation represents a significant leap forward in how we approach content marketing. By embracing these tools while maintaining our human touch, we can create more engaging, effective, and impactful content than ever before.

The key is to view AI not as a replacement for human creativity, but as a powerful amplifier that helps us reach new heights in our content creation journey.

---

*Ready to start your AI-powered blogging journey? The future of content creation is here, and it's more exciting than ever!*`,
        tags: ["AI", "Content Creation", "Blogging", "Technology", "Writing"],
        estimatedReadTime: 8,
        createdAt: new Date(),
      };
      
      setBlogData(sampleBlog);
      setIsGenerating(false);
      // Switch to preview tab when blog is generated
      setActiveTab('preview');
    }, 3000);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Mobile Header */}
      <header className="border-b border-border bg-card px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">AI Blog Creator</h1>
              </div>
            </div>
          </div>
          
          {blogData && (
            <Badge variant="secondary" className="text-xs">
              Generated
            </Badge>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <ChatInterface onGenerateBlog={handleGenerateBlog} />
        ) : (
          <BlogPreview blogData={blogData} isGenerating={isGenerating} />
        )}
      </div>

      {/* Bottom Navigation Tabs */}
      <div className="border-t border-border bg-card px-4 py-2 flex-shrink-0">
        <div className="flex gap-1">
          <Button
            variant={activeTab === 'chat' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('chat')}
            className={cn(
              "flex-1 h-12 flex flex-col gap-1 rounded-xl",
              activeTab === 'chat' 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-medium">Chat</span>
          </Button>
          
          <Button
            variant={activeTab === 'preview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('preview')}
            className={cn(
              "flex-1 h-12 flex flex-col gap-1 rounded-xl relative",
              activeTab === 'preview' 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs font-medium">Preview</span>
            {blogData && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full"></div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCreator;