import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Image as ImageIcon, Paperclip, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  images?: string[];
  timestamp: Date;
}

interface ChatInterfaceProps {
  onGenerateBlog: (messages: Message[]) => void;
}

export const ChatInterface = ({ onGenerateBlog }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI blog assistant. Tell me what you\'d like to write about, and I\'ll help you create an amazing blog post. You can also upload images to include in your blog!',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive",
        });
        return false;
      }
      return file.type.startsWith('image/');
    });
    setSelectedImages(prev => [...prev, ...validFiles]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (!inputValue.trim() && selectedImages.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      images: selectedImages.length > 0 ? selectedImages.map(file => URL.createObjectURL(file)) : undefined,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setSelectedImages([]);
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Great! I can help you create a blog post about that topic. ${selectedImages.length > 0 ? 'I see you\'ve included some images - those will make your blog post more engaging!' : ''} Would you like me to generate a full blog post now, or do you have more details to add?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleGenerateBlog = () => {
    onGenerateBlog(messages);
    toast({
      title: "Generating blog post",
      description: "Your blog post is being created based on our conversation!",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-chat-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">AI Blog Assistant</h2>
              <p className="text-sm text-muted-foreground">Ready to help create your blog</p>
            </div>
          </div>
          <Button onClick={handleGenerateBlog} className="animate-pulse-glow">
            Generate Blog
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-chat-background">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-fade-up",
              message.type === 'user' ? "justify-end" : "justify-start"
            )}
          >
            {message.type === 'ai' && (
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className={cn(
              "max-w-[70%] space-y-2",
              message.type === 'user' ? "order-last" : ""
            )}>
              <Card className={cn(
                "p-3",
                message.type === 'user' 
                  ? "bg-chat-user-bubble border-chat-border" 
                  : "bg-chat-ai-bubble border-chat-border"
              )}>
                <p className="text-sm text-foreground whitespace-pre-wrap">{message.content}</p>
                {message.images && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {message.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className="rounded-md max-h-32 object-cover"
                      />
                    ))}
                  </div>
                )}
              </Card>
              <span className="text-xs text-muted-foreground px-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {message.type === 'user' && (
              <Avatar className="w-8 h-8 mt-1 order-last">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 animate-fade-up">
            <Avatar className="w-8 h-8 mt-1">
              <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <Card className="bg-chat-ai-bubble border-chat-border p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-chat-border bg-card p-4">
        {selectedImages.length > 0 && (
          <div className="flex gap-2 mb-3 p-2 bg-muted rounded-lg">
            {selectedImages.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tell me about your blog idea..."
              className="min-h-[44px] max-h-32 resize-none pr-20 bg-background border-input"
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2 flex gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="h-8 w-8 p-0"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSend}
            disabled={isLoading || (!inputValue.trim() && selectedImages.length === 0)}
            className="h-11 w-11 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};