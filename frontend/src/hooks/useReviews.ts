import { REVIEWS_API, REVIEWPAGE_API } from "../config/backend";

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
  productName: string;
  productType?: string;
  avatarUrl?: string;
  description?: string;
  overview?: string;
  features?: Array<{
    title: string;
    description?: string;
  }>;
  pricing?: Array<{
    plan: string;
    amount: string;
    note?: string;
  }>;
  alternatives?: Array<{
    name: string;
    type?: string;
    avatarUrl?: string;
    price?: string;
    rating?: number;
    reviewCount?: number;
    compareNote?: string;
  }>;
  userCount?: string;
  foundedYear?: number;
  employeeRange?: string;
  headquarters?: string;
  lastUpdated?: string;
  upvotes?: number;
  shareCount?: number;
  tryForFreeLink?: string;
  aggregateRating?: number;
  ratingCount?: number;
  ratingCategories?: Array<{
    category: string;
    value: number;
    outOf?: number;
  }>;
  pros?: string[];
  cons?: string[];
  faqs?: Array<{
    question?: string;
    answer?: string;
  }>;
  useCases?: Array<{
    title: string;
    description?: string;
    rating?: number;
  }>;
  integrations?: string[];
  productReviews?: Array<{
    userName: string;
    userTitle?: string;
    userAvatar?: string;
    date?: string;
    verified?: boolean;
    rating: number;
    reviewText: string;
    helpful?: number;
    notHelpful?: number;
  }>;
  ratingBreakdown?: {
    fiveStars?: number;
    fourStars?: number;
    threeStars?: number;
    twoStars?: number;
    oneStars?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewsResponse {
  data: Review[];
  pagination: {
    current: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface FetchReviewsParams {
  page?: number;
  limit?: number;
  productName?: string;
  sortBy?: string;
}

export const fetchReviews = async (
  params: FetchReviewsParams = {}
): Promise<ReviewsResponse> => {
  const { page = 1, limit = 20, productName, sortBy = "-createdAt" } = params;

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());
  queryParams.append("sortBy", sortBy);
  if (productName) {
    queryParams.append("productName", productName);
  }

  const url = `${REVIEWS_API}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
  }

  return response.json();
};

export const fetchReviewById = async (id: string): Promise<Review> => {
  const response = await fetch(`${REVIEWS_API}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch review: ${response.statusText}`);
  }

  return response.json();
};

export interface ReviewPageSettings {
  _id?: string;
  reviewPageStatus?: "live" | "maintenance";
  reviewPageTopTagline?: string;
  reviewPageHeading?: string;
  reviewPageSubheading?: string;
  reviewPageTags?: string[];
  featuredReviews?: string[] | Review[];
}

export const fetchReviewPageSettings = async (): Promise<ReviewPageSettings> => {
  const response = await fetch(REVIEWPAGE_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch review page settings: ${response.statusText}`);
  }

  return response.json();
};

export const incrementReviewUpvotes = async (id: string): Promise<Review> => {
  const response = await fetch(`${REVIEWS_API}/${id}/upvote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to increment upvotes: ${response.statusText}`);
  }

  return response.json();
};


export const updateReviewUpvotes = async (id: string, upvotes: number): Promise<Review> => {
  return incrementReviewUpvotes(id);
};

export const updateReviewShareCount = async (id: string, shareCount: number): Promise<Review> => {
  const response = await fetch(`${REVIEWS_API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shareCount }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update share count: ${response.statusText}`);
  }

  return response.json();
};
