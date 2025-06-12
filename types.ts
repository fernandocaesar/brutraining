export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogArticle {
  id: number;
  title: string;
  slug: string; 
  description: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  content: string; // Full content for detail page
}

export interface Testimonial {
  quote: string;
  name: string;
  age?: number;
  imageUrl: string;
}

export interface MentoriaPlan {
  id: string;
  name: string;
  price: string;
  priceDetails?: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  highlightClass?: string;
  buttonClass?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface ClientResultImage {
  id: number;
  imageUrl: string;
  altText: string;
}