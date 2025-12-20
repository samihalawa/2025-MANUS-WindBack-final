/**
 * SEO Meta Tags Configuration for all pages
 * Manages page titles, descriptions, keywords, and structured data
 */

export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonicalUrl?: string;
}

export const seoPages: Record<string, PageMeta> = {
  home: {
    title: "Rewind Limitless - AI-Powered Memory & Lifelog App",
    description: "Rewind is your AI-powered personal assistant that remembers everything you see, say, and hear. Unlimited cloud sync, advanced search, and cross-device access.",
    keywords: [
      "AI assistant",
      "lifelog app",
      "memory app",
      "personal AI",
      "screen recording",
      "productivity",
      "cross-device sync",
      "AI search",
      "digital memory",
      "Rewind alternative"
    ],
    ogTitle: "Rewind Limitless - Your AI Memory Assistant",
    ogDescription: "Never forget a moment. Rewind remembers everything you see, say, and hear with advanced AI search.",
    canonicalUrl: "https://rewind.limitless.ai"
  },

  app: {
    title: "Rewind App - Search Your Memory with AI",
    description: "Access your complete lifelog with advanced AI-powered search. Find any moment, conversation, or file instantly across all your devices.",
    keywords: [
      "lifelog search",
      "AI memory search",
      "screen search",
      "conversation search",
      "productivity app",
      "personal knowledge base",
      "digital assistant",
      "memory management"
    ],
    ogTitle: "Rewind App - Your Complete Memory",
    ogDescription: "Search everything you've seen, said, or heard with powerful AI-driven search.",
    canonicalUrl: "https://rewind.limitless.ai/app"
  },

  features: {
    title: "Features - Rewind Limitless AI Memory App",
    description: "Discover Rewind's powerful features: AI-powered search, cross-device sync, privacy vault, automatic transcription, and more.",
    keywords: [
      "AI features",
      "lifelog features",
      "screen capture",
      "audio transcription",
      "privacy protection",
      "cloud sync",
      "search capabilities",
      "productivity features"
    ],
    ogTitle: "Rewind Features - Advanced AI Memory Tools",
    ogDescription: "Explore all the powerful features that make Rewind the ultimate memory app.",
    canonicalUrl: "https://rewind.limitless.ai/features"
  },

  pricing: {
    title: "Pricing - Rewind Limitless AI Memory App",
    description: "Simple, transparent pricing for Rewind. Get unlimited AI-powered memory search and cross-device sync for just $99/year.",
    keywords: [
      "pricing",
      "plans",
      "subscription",
      "annual plan",
      "premium features",
      "unlimited search",
      "cloud storage",
      "affordable pricing"
    ],
    ogTitle: "Rewind Pricing - $99/Year for Unlimited Memory",
    ogDescription: "Affordable pricing for unlimited AI-powered memory search and cross-device access.",
    canonicalUrl: "https://rewind.limitless.ai/pricing"
  },

  compatibility: {
    title: "Compatibility - Rewind Limitless AI Memory App",
    description: "Rewind works seamlessly across Windows, Mac, iOS, Android, and web. Full cross-device sync and unified search.",
    keywords: [
      "compatibility",
      "cross-platform",
      "Windows app",
      "Mac app",
      "iOS app",
      "Android app",
      "web app",
      "device sync"
    ],
    ogTitle: "Rewind Compatibility - Works Everywhere",
    ogDescription: "Rewind works on all your devices: Windows, Mac, iOS, Android, and web.",
    canonicalUrl: "https://rewind.limitless.ai/compatibility"
  },

  notFound: {
    title: "Page Not Found - Rewind Limitless",
    description: "The page you're looking for doesn't exist. Return to Rewind and explore our AI-powered memory app.",
    keywords: ["404", "not found", "error page"],
    ogTitle: "Page Not Found",
    ogDescription: "This page doesn't exist. Return to Rewind.",
    canonicalUrl: "https://rewind.limitless.ai/404"
  }
};

/**
 * Update page meta tags dynamically
 */
export function updatePageMeta(pageMeta: PageMeta) {
  // Update title
  document.title = pageMeta.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", pageMeta.description);

  // Update or create meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement("meta");
    metaKeywords.setAttribute("name", "keywords");
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute("content", pageMeta.keywords.join(", "));

  // Update Open Graph tags
  updateMetaTag("property", "og:title", pageMeta.ogTitle || pageMeta.title);
  updateMetaTag("property", "og:description", pageMeta.ogDescription || pageMeta.description);

  // Update Twitter Card tags
  updateMetaTag("name", "twitter:title", pageMeta.twitterTitle || pageMeta.title);
  updateMetaTag("name", "twitter:description", pageMeta.twitterDescription || pageMeta.description);

  // Update canonical URL
  if (pageMeta.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageMeta.canonicalUrl);
  }
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(attribute: string, value: string, content: string) {
  let tag = document.querySelector(`meta[${attribute}="${value}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rewind Limitless",
    "url": "https://rewind.limitless.ai",
    "logo": "https://rewind.limitless.ai/logo.png",
    "description": "AI-powered personal memory and lifelog application",
    "sameAs": [
      "https://twitter.com/rewindlimitless",
      "https://linkedin.com/company/rewind-limitless"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@rewind.limitless.ai"
    }
  };
}

/**
 * Generate JSON-LD structured data for SoftwareApplication
 */
export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Rewind Limitless",
    "description": "AI-powered personal memory and lifelog application",
    "url": "https://rewind.limitless.ai",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": ["Windows", "macOS", "iOS", "Android"],
    "offers": {
      "@type": "Offer",
      "price": "99.00",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2500"
    }
  };
}

/**
 * Generate JSON-LD structured data for Product
 */
export function generateProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Rewind Limitless",
    "description": "AI-powered personal memory and lifelog application that remembers everything you see, say, and hear",
    "image": "https://rewind.limitless.ai/product-image.png",
    "brand": {
      "@type": "Brand",
      "name": "Rewind Limitless"
    },
    "offers": {
      "@type": "Offer",
      "price": "99.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}
