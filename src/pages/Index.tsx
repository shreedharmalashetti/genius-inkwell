import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, MessageSquare, ImageIcon, Zap, ArrowRight, Bot, PenTool } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-chat-background relative overflow-hidden">
      {/* Fire animation background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary to-primary-glow rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-primary-glow to-primary rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-primary to-primary-glow rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="relative z-10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-glow rounded-full px-6 py-2 mb-6 animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">AI-Powered Blog Creation</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-up">
            Create Amazing
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Blogs </span>
            with AI
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Experience the future of content creation. Chat with our AI assistant, upload images, and generate 
            professional blog posts in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/create">
              <Button size="lg" className="h-12 px-8 text-base group">
                Start Creating
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              <MessageSquare className="mr-2 w-4 h-4" />
              See Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-chat-border bg-card/50 backdrop-blur-sm hover:bg-card transition-colors animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">AI Chat Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Chat naturally with our AI assistant. Describe your ideas, ask questions, and get intelligent 
                responses that help shape your blog content.
              </p>
            </CardContent>
          </Card>

          <Card className="border-chat-border bg-card/50 backdrop-blur-sm hover:bg-card transition-colors animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">Image Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload images directly in the chat to enhance your blog posts. Our AI understands visual context 
                and incorporates images seamlessly.
              </p>
            </CardContent>
          </Card>

          <Card className="border-chat-border bg-card/50 backdrop-blur-sm hover:bg-card transition-colors animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center mb-4">
                <PenTool className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">Smart Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Generate complete, well-structured blog posts with proper formatting, engaging content, 
                and SEO-friendly structure in seconds.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4 animate-fade-up">How It Works</h2>
          <p className="text-muted-foreground mb-12 animate-fade-up">Simple steps to create your perfect blog post</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Chat & Share</h3>
              <p className="text-muted-foreground">
                Start a conversation with our AI. Share your ideas, upload images, and discuss your blog topic.
              </p>
            </div>
            
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Generation</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your conversation and generates a comprehensive, engaging blog post.
              </p>
            </div>
            
            <div className="text-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Edit & Export</h3>
              <p className="text-muted-foreground">
                Review, edit, and export your blog post. Copy, download, or share your content instantly.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-chat-border bg-gradient-to-r from-primary/5 to-primary-glow/5 text-center p-8 animate-fade-up">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Your Content Creation?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of creators who are already using AI to produce amazing blog content.
            </p>
            <Link to="/create">
              <Button size="lg" className="h-12 px-8 text-base animate-pulse-glow">
                <Zap className="mr-2 w-4 h-4" />
                Start Creating Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default Index;
