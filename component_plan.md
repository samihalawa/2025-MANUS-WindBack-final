# Rewind.ai UI Clone: Component Architecture & Design Plan

Based on the visual analysis of Rewind.ai and the "Obsidian Minimalist" design philosophy, the application will be structured as a single-page React application with a focus on dark mode, high-density information, and fluid interactions.

## 1. Core Layout Structure

The interface will mimic a desktop application overlay, utilizing a fixed-position layout to ensure the search and timeline remain accessible while browsing content.

| Component | Description | Key Features |
| :--- | :--- | :--- |
| **MainLayout** | The root wrapper for the application. | Dark background, custom scrollbars, and global font settings. |
| **MenuBarOverlay** | A glassmorphism container that mimics the Mac menu bar app. | Blurred background, subtle borders, and rounded corners. |
| **SearchHeader** | The top section containing the primary search input. | Instant search feedback, filter toggles (App, Time, Type). |
| **ContentStage** | The central area displaying the active screenshot or search results. | Smooth transitions between "Live View" and "Search Results". |
| **TimelineScrubber** | The bottom horizontal navigation bar. | Scrollable time-axis, app activity icons, and time labels. |

## 2. Component Breakdown

### Search & Filtering
- **SearchInput**: A prominent, borderless input field with a custom search icon.
- **FilterBar**: A row of pill-shaped buttons for filtering by application (e.g., Slack, Chrome, Safari).
- **ResultCard**: A list item showing a screenshot thumbnail, timestamp, app icon, and OCR text snippet.

### Timeline Visualization
- **TimelineAxis**: A horizontal line with vertical markers for hours and minutes.
- **ActivityMarker**: Small app icons placed on the timeline indicating when an app was active.
- **TimeCursor**: A vertical line indicating the currently viewed moment in time.

### Content Display
- **ScreenshotViewer**: A high-resolution image display with zoom and "Open in Browser" capabilities.
- **MetadataPanel**: A sidebar or overlay showing detailed info about the current moment (URL, App, Window Title).

## 3. Design Tokens (Tailwind CSS)

The following tokens will be implemented in `client/src/index.css` to ensure a cohesive "Obsidian" look.

- **Background**: `oklch(0.12 0.01 285)` (Deep Charcoal)
- **Surface**: `oklch(0.18 0.01 285)` (Elevated cards/panels)
- **Primary**: `oklch(0.65 0.15 250)` (Electric Blue for active states)
- **Text Primary**: `oklch(0.98 0.01 285)` (Crisp white)
- **Text Secondary**: `oklch(0.70 0.01 285)` (Muted gray)

## 4. Interaction & Animation Strategy

- **Search Entry**: Search results will use a staggered fade-in animation using `framer-motion`.
- **Timeline Scrubbing**: The timeline will use a "momentum scroll" feel, with the `TimeCursor` snapping to activity markers.
- **Screenshot Pop**: Clicking a moment in the timeline will trigger a scale-up transition for the screenshot.

## 5. Mock Data Strategy

To demonstrate the UI, a `mockData.ts` file will be created containing:
- A series of "Moments" with timestamps, app names, window titles, and placeholder screenshot URLs.
- A list of "Apps" with corresponding Lucide icons or custom SVG paths.
