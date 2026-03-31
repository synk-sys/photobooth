import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, ExternalLink, Calendar, Newspaper } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  image_url: string | null;
  source_name: string | null;
  published_at: string;
  created_at: string;
}

const RealEstateNews = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch news from database
  const { data: articles, isLoading, refetch } = useQuery({
    queryKey: ['real-estate-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) throw error;
      return data as NewsArticle[];
    },
  });

  // Fetch new articles from edge function
  const fetchNewArticles = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-real-estate-news');

      if (error) throw error;

      if (data?.newArticlesCount > 0) {
        toast({
          title: "News Updated",
          description: `Found ${data.newArticlesCount} new articles!`,
        });
      }

      refetch();
    } catch (error: any) {
      console.error('Error fetching news:', error);
      toast({
        title: "Error",
        description: "Failed to fetch latest news. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch, toast]);

  // Auto-fetch on first load if no articles
  useEffect(() => {
    if (!isLoading && (!articles || articles.length === 0)) {
      fetchNewArticles();
    }
  }, [isLoading, articles, fetchNewArticles]);

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(fetchNewArticles, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNewArticles]);

  // Refresh when user returns to the tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refetch();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refetch]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container">
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="secondary" className="mb-4">
                  <Newspaper className="mr-1 h-3 w-3" />
                  Canadian Real Estate
                </Badge>
                <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                  Real Estate News
                </h1>
                <p className="mt-2 text-lg text-primary-foreground/80">
                  Stay updated with the latest Canadian real estate market news
                </p>
              </div>
              <Button 
                onClick={fetchNewArticles} 
                disabled={isRefreshing}
                variant="secondary"
                className="hidden md:flex"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh News
              </Button>
            </div>
          </div>
        </section>

        {/* Mobile Refresh Button */}
        <div className="container py-4 md:hidden">
          <Button 
            onClick={fetchNewArticles} 
            disabled={isRefreshing}
            className="w-full"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh News
          </Button>
        </div>

        {/* News Grid */}
        <section className="py-8">
          <div className="container">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <Skeleton className="h-48 w-full" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Card key={article.id} className="group overflow-hidden transition-shadow hover:shadow-lg">
                    {article.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {article.source_name && (
                          <Badge variant="outline" className="text-xs">
                            {article.source_name}
                          </Badge>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(article.published_at), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2 text-lg">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {article.description && (
                        <CardDescription className="line-clamp-3 mb-4">
                          {article.description}
                        </CardDescription>
                      )}
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Read Full Article
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Newspaper className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="text-xl font-semibold">No News Articles Yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Click the refresh button to fetch the latest Canadian real estate news.
                </p>
                <Button onClick={fetchNewArticles} className="mt-4" disabled={isRefreshing}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Fetch News
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RealEstateNews;
