# Practical 5: Implementing Infinite Scroll with TanStack Query

## Overview
Implement infinite scrolling functionality in the TikTok application using TanStack Query (formerly React Query) with cursor-based pagination. This provides a smooth, endless scrolling experience similar to the real TikTok platform.

## Key Concepts

### Cursor-Based Pagination vs. Offset-Based Pagination

**Offset-Based Pagination:**
- Uses `page` and `limit` parameters (e.g., "give me page 3 with 10 items per page")
- Simple to implement but has limitations with large datasets
- Can lead to issues when items are added or removed during pagination

**Cursor-Based Pagination:**
- Uses a unique identifier (cursor) as a reference point (e.g., "give me 10 items after item with ID 1234")
- More efficient for large datasets
- Provides consistent results even when data changes
- Better suited for infinite scroll interfaces

**Why Cursor-Based for Our App:**
- Smoother user experience
- Handles new content being added correctly
- More efficient when dealing with thousands of videos

### Technologies Used

**TanStack Query (React Query)**
- Automatically manages pagination state
- Handles loading and error states
- Provides `useInfiniteQuery` hook for infinite scrolling
- Maintains a cache of fetched data

**Intersection Observer API**
- Efficiently detects when elements enter/exit the viewport
- More performant than scroll event listeners
- Provides clean way to trigger loading more content

## Implementation Steps

### Part 1: Backend Implementation

#### Step 1: Update Video Controller (`src/controllers/videoController.js`)
Modify the `getAllVideos` function to support cursor-based pagination:
- Change query parameters from `page` and `limit` to `cursor` and `limit`
- Use Prisma's `cursor` and `skip` for efficient pagination
- Implement the "n+1 pattern" to determine if more items exist
- Return response with `nextCursor` and `hasNextPage` instead of page numbers

#### Step 2: Update Following Videos Controller (`src/controllers/videoController.js`)
Similarly, update the `getFollowingVideos` function to use cursor-based pagination with the same approach

### Part 2: Frontend Implementation

#### Step 1: Install Dependencies
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

#### Step 2: Set Up Query Client Provider
Update `src/app/layout.js` to wrap the application with `QueryClientProvider`:
- Initialize a QueryClient instance
- Wrap the component tree with QueryClientProvider
- Include ReactQueryDevtools for development

#### Step 3: Update Video Service (`src/services/videoService.js`)
Modify the video service to support cursor-based pagination:
- Update `getAllVideos()` to accept cursor and limit parameters
- Update `getFollowingVideos()` for cursor-based pagination
- Return data with `nextCursor` and `hasNextPage` properties

#### Step 4: Create Intersection Observer Hook (`src/hooks/useIntersectionObserver.js`)
Create a custom hook that:
- Detects when an element enters the viewport
- Takes a callback function to execute when triggered
- Cleans up observers on unmount
- Works with Next.js SSR

#### Step 5: Update VideoFeed Component (`src/components/ui/VideoFeed.jsx`)
Implement infinite scroll in the VideoFeed component:
- Replace `useQuery` with `useInfiniteQuery`
- Use the Intersection Observer hook to detect bottom of feed
- Call `fetchNextPage()` when user scrolls to bottom
- Render loading state while fetching more videos
- Handle error states gracefully
- Flatten and display all pages of videos

## Key Implementation Differences

### Backend Changes
1. **Query Parameters:** `cursor` and `limit` instead of `page` and `limit`
2. **Response Format:** Includes `nextCursor` and `hasNextPage` instead of page numbers
3. **Database Queries:** Use Prisma's cursor and skip for efficient pagination
4. **Extra Item Pattern:** Fetch n+1 items to determine if more exist

### Frontend Changes
1. **React Query Hook:** Use `useInfiniteQuery` instead of `useQuery`
2. **Intersection Observer:** Detect when user reaches bottom of feed
3. **Cursor Management:** Handle cursor-based navigation instead of page numbers
4. **Data Flattening:** Combine multiple pages into a single list for display

## Project Structure

```
TikTok_Frontend-main/
├── src/
│   ├── app/
│   │   ├── layout.js (Add QueryClientProvider)
│   │   └── ...
│   ├── components/
│   │   └── ui/
│   │       └── VideoFeed.jsx (Implement infinite scroll)
│   ├── hooks/
│   │   └── useIntersectionObserver.js (Create)
│   └── services/
│       └── videoService.js (Update for cursor pagination)
└── ...

TikTok_Server-main/
├── src/
│   ├── controllers/
│   │   └── videoController.js (Update for cursor pagination)
│   └── ...
└── ...
```

## Setup & Running

### Backend
```bash
cd TikTok_Server-main
npm install
npm run dev
```

### Frontend
```bash
cd TikTok_Frontend-main
npm install
npm run dev
```

Visit `http://localhost:3000` to see the infinite scroll in action.

## Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [useInfiniteQuery Guide](https://tanstack.com/query/latest/docs/react/guides/infinite-queries)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Prisma Cursor-Based Pagination](https://www.prisma.io/docs/orm/prisma-client/queries/pagination#cursor-based-pagination)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)

## Testing Checklist

- [ ] Backend returns cursor and hasNextPage correctly
- [ ] Frontend loads initial videos on page load
- [ ] Scrolling to bottom triggers loading more videos
- [ ] Loading indicator appears while fetching
- [ ] Videos load smoothly without duplicates
- [ ] Errors are handled gracefully
- [ ] DevTools show query cache being managed correctly

## Common Issues & Solutions

**Prisma Client Not Initialized:**
```bash
npx prisma generate
```

**Missing Dependencies:**
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

**Cursor Not Updating:**
- Ensure backend returns `nextCursor` correctly
- Verify Intersection Observer is detecting bottom element
- Check that `fetchNextPage()` is being called

---

Created for WEB101 Practical 5 | May 2026
