This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# E-commerce website on Next.js

## Routing
- File based routing
- All routes must be inside /src/app directory
- Every route must have page.js
- Every folder represents url segment

1. Simple route
/src/app/about/page.js

2. Nested route
/src/app/courses/designing/photoshop/page.js
/src/app/courses/designing/web-design/page.js

3. Dynamic routes
/src/app/products/[productId]/page.js

4. Nested dynamic routes
/src/app/products/[productId]/reviews/[reviewId]/page.js

5. Catch all segments
/src/app/news/[...slug]/page.js

6. Private folders
/src/app/_components

7. Route groups
/src/app/(auth)/...

## Layouts
- UI components that are shared among pages.

## Nested layout

# Files
- page.js
- layout.js
- not-found.js
- template.js : similar to layout.js file but it doesn't preserve state
- loading.js
- error.js (client component)
- global-error.js: To catch error of root level layouts, only works in prod

## Params & Search params
- params resolves into route parameters
- searchParams resolves into query parameters

/news/sports?year=2025&game=football
/news -> route
/sports -> route params
?year=2025&game=football -> Query params

## Metadata
- Metadata api used to define metadata in each page.
- Used for search engine
- layout.js & page.js

## Client side rendering
- Generate HTML on client (browser)

## Server side rendering
- Generate HTML on server

## RSC - React server component
1. Client component - Rendered in browser, can also be rendered in server
    - "use client"
    - Browser API access
    - State management
    - User interactivity
2. Server component - Rendered in server, made to operate in server
    - data fetch
    - direct access to server
