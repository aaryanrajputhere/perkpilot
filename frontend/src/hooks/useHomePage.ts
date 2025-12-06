import { HOMEPAGE_API } from "../config/backend";
import type { Deal } from "./useDeals";

export interface ToolMentioned {
  toolName: string;
  toolLogo?: string;
  toolCategory?: string;
}

export interface Comparison {
  _id: string;
  heroHeading: string;
  heroBody?: string;
  sectionHeadline?: string;
  toolsMentioned?: ToolMentioned[];
  blogCategory?: string;
  author?: string;
  readingTime?: string;
  slug?: string;
  isPublished?: boolean;
  viewCount?: number;
}

export interface Review {
  _id: string;
  userName?: string;
  userTitle?: string;
  userAvatar?: string;
  date?: string;
  verified?: boolean;
  reviewText?: string;
  rating?: number;
  helpful?: number;
  notHelpful?: number;
  productName?: string;
  productType?: string;
  avatarUrl?: string;
  description?: string;
  overview?: string;
  features?: string[];
  pricing?: string;
  alternatives?: string[];
  aggregateRating?: number;
  ratingCount?: number;
  ratingBreakdown?: {
    stars: number;
    count: number;
  }[];
  pros?: string[];
  cons?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  useCases?: string[];
  integrations?: string[];
  productReviews?: Array<{
    userName: string;
    userAvatar?: string;
    rating: number;
    reviewText: string;
    date: string;
  }>;
}

export interface HomePageData {
  _id?: string;
  hero?: {
    topTagline?: string;
    mainHeadline?: string;
    subHeadline?: string;
    ctaText?: string;
    ctaLink?: string;
    heroImage?: string;
  };
  discountedIcons?: {
    topTagline?: string;
    mainHeadline?: string;
    subHeadline?: string;
    ctaText?: string;
    ctaLink?: string;
    icons?: Array<{
      name: string;
      iconUrl: string;
    }>;
  };
  stats?: Array<{
    numberValue: string;
    message: string;
    _id?: string;
  }>;
  topPicks?: {
    sectionTitle?: string;
    body?: string;
    deals?: Deal[];
  };
  softwareComparisons?: {
    sectionTitle?: string;
    comparisons?: Comparison[];
  };
  topReviews?: {
    sectionTitle?: string;
    body?: string;
    reviews?: Review[];
  };
  status?: string;
}

const DEFAULT_URL = HOMEPAGE_API;
const DEFAULT_TIMEOUT = 10000; // 10s

export async function fetchHomePage(
  url: string = DEFAULT_URL,
  timeoutMs = DEFAULT_TIMEOUT,
  retries = 2
): Promise<HomePageData> {
  const supportsAbort = typeof AbortController !== 'undefined';
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = supportsAbort ? new AbortController() : null;
    const id = supportsAbort 
      ? setTimeout(() => controller?.abort(), timeoutMs)
      : null;

    try {
      const fetchOptions: RequestInit = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        mode: 'cors',
      };

      if (supportsAbort && controller) {
        fetchOptions.signal = controller.signal;
      }

      const res = await fetch(url, fetchOptions);

      if (supportsAbort && id) {
        clearTimeout(id);
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        const errorMessage = `Failed to fetch homepage: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`;
        console.error('Homepage fetch error:', errorMessage);
        
        if (attempt < retries && (res.status >= 500 || res.status === 0)) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          console.warn(`Homepage fetch attempt ${attempt + 1} failed, retrying...`);
          continue;
        }
        
        throw new Error(errorMessage);
      }

      const data = await res.json();
      return data as HomePageData;
    } catch (err) {
      if (supportsAbort && err instanceof DOMException && err.name === "AbortError") {
        const errorMessage = `Request timed out after ${timeoutMs}ms`;
        console.error('Homepage fetch timeout:', errorMessage);

        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          console.warn(`Homepage fetch attempt ${attempt + 1} timed out, retrying...`);
          continue;
        }
        
        throw new Error(errorMessage);
      }
      
      if (err instanceof Error) {
        console.error('Homepage fetch error:', err.message, err);
        
        if (attempt < retries && (
          err.message.includes('Failed to fetch') || 
          err.message.includes('NetworkError') ||
          err.message.includes('Network request failed')
        )) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          console.warn(`Homepage fetch attempt ${attempt + 1} failed with network error, retrying...`);
          continue;
        }
        
        throw err;
      }
      
      const errorMessage = "An unexpected error occurred while fetching homepage";
      console.error('Homepage fetch unexpected error:', err);
      
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        console.warn(`Homepage fetch attempt ${attempt + 1} failed with unexpected error, retrying...`);
        continue;
      }
      
      throw new Error(errorMessage);
    }
  }
  
  throw new Error('Failed to fetch homepage after all retries');
}

export default fetchHomePage;
