import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SocialShare from "@/components/blog/SocialShare";
import RelatedPosts from "@/components/blog/RelatedPosts";

const BlogDetail = () => {
  const { id } = useParams();
  const currentPost = blogPosts.find((p) => p.id === Number(id)) || blogPosts[0];
  const otherPosts = blogPosts.filter((p) => p.id !== currentPost.id);

  return (
    <div className="min-h-screen pt-24">
      <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block w-72">
        <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Quick Navigation</h3>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {otherPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.id}`} 
                className="group flex gap-3 transition-all duration-300"
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-16 h-16 rounded object-cover flex-shrink-0 group-hover:ring-2 group-hover:ring-primary transition-all" 
                />
                <div>
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{post.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <div className="container-fluid">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs uppercase mb-6 rounded-full">
              {currentPost.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{currentPost.title}</h1>
            <div className="flex gap-6 text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />{currentPost.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />{currentPost.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />{currentPost.readTime}
              </span>
            </div>
            <img 
              src={currentPost.image} 
              alt={currentPost.title} 
              className="w-full h-96 rounded-lg object-cover mb-8" 
            />
          </header>
          
          <article 
            className="prose prose-invert prose-lg max-w-none mb-16" 
            dangerouslySetInnerHTML={{ __html: currentPost.content }} 
          />

          {/* Social Share */}
          <div className="mt-12 pt-8 border-t border-border">
            <SocialShare
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title={currentPost.title}
            />
          </div>

        {/* Related Posts */}
        <RelatedPosts
          currentPostId={currentPost.id}
          posts={blogPosts}
          category={currentPost.category}
        />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
