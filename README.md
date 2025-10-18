# Virtualized Search Component

## Key Features

- **Custom Virtualized List** - Renders only visible items even with 100+ results
- **LRU Cache** - Stores 20 recent searches to avoid redundant API calls
- **Debounced Search** - 300ms delay prevents excessive API requests
- **Highlight Pattern Matching** - Search terms are visually highlighted in results
- **Search Suggestions** - Live suggestions as you type
- **Testing** - 10 essential tests covering critical functionality

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/developedbyflow/virtualized-search.git
cd virtualized-search
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## IMPORTANT
If the Algolia API is not working change the function `getDataFromAlgolia` to `getDataFromAPI` that uses dummyjson.com API, this is the fallback.

---

## How to Use

1. **Type in the search box** - Try "T-shirt", "Hoodie"
2. **See highlighted matches** - Your search terms are highlighted in yellow
3. **Test the cache** - Search "T-shirt", clear the input, then search "T-shirt" again (instant results - check console to see the chache)
4. **Scroll results** - Only 6-7 items render at a time, even with 100+ results

---

## Testing

```bash
npm test          
```

**Tests include:** LRU cache logic, debounce timing, user interactions

---

## Technical Architecture

**Custom Virtualized List** - Only renders visible items (performance optimization)  
**LRU Cache** - Stores 20 recent searches with automatic eviction  
**Debounce Hook** - 300ms delay to reduce API calls  
**Highlight Pattern Matching** - Dynamically highlights search terms in results  
**TypeScript** - Full type safety throughout the codebase

---


## Tech Stack

React 19 • TypeScript • Vite • Jest • React Testing Library • Algolia API

**Built by Florin-Eugen Ionescu** | [GitHub](https://github.com/developedbyflow) | MIT License
