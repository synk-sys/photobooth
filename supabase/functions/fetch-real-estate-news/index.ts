import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image_url: string | null;
  source_name: string;
  published_at: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Fetching Canadian real estate news...');

    // Use GNews API (free tier available) for Canadian real estate news
    const gnewsApiKey = Deno.env.get('GNEWS_API_KEY');
    
    let articles: NewsArticle[] = [];
    
    if (gnewsApiKey) {
      // Use GNews API — multiple queries to get broader coverage
      const queries = [
        'real estate canada housing market',
        'canada mortgage rates home prices',
        'ontario housing market toronto real estate',
        'canada home sales property market',
      ];

      for (const query of queries) {
        try {
          const response = await fetch(
            `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&country=ca&lang=en&max=10&apikey=${gnewsApiKey}`
          );
          if (response.ok) {
            const data = await response.json();
            const batch = (data.articles?.map((article: any) => ({
              title: article.title,
              description: article.description,
              content: article.content,
              url: article.url,
              image_url: article.image,
              source_name: article.source?.name || 'Unknown',
              published_at: article.publishedAt,
            })) || []).filter((a: NewsArticle) => !!a.image_url);
            articles.push(...batch);
          }
        } catch (e) {
          console.error(`GNews query failed: ${query}`, e);
        }
      }
      // Deduplicate by URL
      articles = articles.filter((a, i, arr) => arr.findIndex(b => b.url === a.url) === i);
    } else {
      // Fallback: Use RSS feeds converted to JSON via rss2json service
      console.log('No GNews API key found, using RSS fallback...');

      // Canadian real estate news RSS feeds
      const rssFeeds = [
        'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/real-estate/',
        'https://financialpost.com/category/real-estate/feed',
        'https://www.cbc.ca/cmlink/rss-business',
        'https://nationalpost.com/category/real-estate/feed',
        'https://torontostar.com/business/real-estate/rss.xml',
        'https://storeys.com/feed/',
        'https://renx.ca/feed/',
        'https://betterdwelling.com/feed/',
        'https://livabl.com/feed/',
        'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/business/',
        'https://financialpost.com/feed',
        'https://bnnbloomberg.ca/feed',
      ];

      for (const feedUrl of rssFeeds) {
        try {
          const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
          const response = await fetch(rss2jsonUrl);
          
          if (response.ok) {
            const data = await response.json();
            if (data.status === 'ok' && data.items) {
              const feedArticles = data.items
                .filter((item: any) => {
                  const titleLower = (item.title || '').toLowerCase();
                  const descLower = (item.description || '').toLowerCase();
                  return titleLower.includes('real estate') || 
                         titleLower.includes('housing') || 
                         titleLower.includes('home') ||
                         titleLower.includes('mortgage') ||
                         titleLower.includes('property') ||
                         descLower.includes('real estate') ||
                         descLower.includes('housing market');
                })
                .map((item: any) => ({
                  title: item.title,
                  description: item.description?.replace(/<[^>]*>/g, '').substring(0, 500) || '',
                  content: item.content?.replace(/<[^>]*>/g, '').substring(0, 1000) || '',
                  url: item.link,
                  image_url: item.enclosure?.link || item.thumbnail || null,
                  source_name: data.feed?.title || 'News Source',
                  published_at: item.pubDate || new Date().toISOString(),
                }))
                .filter((a: NewsArticle) => !!a.image_url);
              
              articles.push(...feedArticles);
            }
          }
        } catch (feedError) {
          console.error(`Error fetching feed ${feedUrl}:`, feedError);
        }
      }
    }

    console.log(`Found ${articles.length} articles`);

    // Insert new articles (ignore duplicates based on URL)
    let insertedCount = 0;
    for (const article of articles) {
      const { error } = await supabase
        .from('news_articles')
        .upsert(
          {
            title: article.title,
            description: article.description,
            content: article.content,
            url: article.url,
            image_url: article.image_url,
            source_name: article.source_name,
            published_at: article.published_at,
            fetched_at: new Date().toISOString(),
          },
          { onConflict: 'url', ignoreDuplicates: true }
        );

      if (!error) {
        insertedCount++;
      } else if (!error.message?.includes('duplicate')) {
        console.error('Error inserting article:', error);
      }
    }

    console.log(`Inserted/updated ${insertedCount} articles`);

    // Fetch all articles from database
    const { data: allArticles, error: fetchError } = await supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(200);

    if (fetchError) {
      throw fetchError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        articles: allArticles,
        newArticlesCount: insertedCount 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in fetch-real-estate-news:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
