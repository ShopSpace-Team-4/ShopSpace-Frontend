export const allEndPoints = {
  listing: "/listings/meta",
  listings: "/listings",
  myListings: "/listings/my-listings",
  listingById: (id: string) => `/listings/${id}`,
  listingMedia: (id: string) => `/listings/${id}/media`,
  listingStatus: (id: string) => `/listings/${id}/status`,
} as const;