import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { BlogPreview } from "@/components/BlogPreview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, FileText, Sparkles, ArrowLeft, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();

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
      {/* Theme toggle at top right */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 p-0 rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Main Content Area with consistent spacing */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' ? (
          <ChatInterface 
            onGenerateBlog={handleGenerateBlog} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            blogData={blogData}
          />
        ) : (
          <BlogPreview blogData={blogData} isGenerating={isGenerating} />
        )}
      </div>

    </div>
  );
};

export default BlogCreator;