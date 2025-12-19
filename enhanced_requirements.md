# Enhanced Rewind.ai UI Clone: Functional & Technical Requirements

This document synthesizes the requirements extracted from Notion notes, Gmail communications, and visual analysis to guide the enhancement of the Rewind.ai UI clone.

## 1. Core Functionality Enhancements

The following features will be integrated to achieve functional parity with the original Rewind.ai application.

| Feature | Description | Implementation Detail |
| :--- | :--- | :--- |
| **Continuous Audio Search** | Search through transcribed audio chunks. | Add "Audio" and "Both" options to the search content picker. |
| **Ask Rewind AI** | A dedicated AI assistant for querying past data. | Implement a side panel or overlay for natural language queries. |
| **Meeting Detection** | Automatic identification of meeting events. | Add a "Meeting" tag and specific visual markers on the timeline. |
| **Gesture-Based Navigation** | Scroll-wheel/trackpad navigation for the timeline. | Implement horizontal scroll listeners for frame-by-frame scrubbing. |
| **Advanced Shortcuts** | System-wide shortcuts for quick access. | Simulate shortcut behavior (e.g., `⌘+⇧+Space` to open search). |

## 2. UI/UX Refinements

The user interface will be updated to support the new functionalities while maintaining the "Obsidian Minimalist" aesthetic.

- **Content Picker**: A dropdown or toggle in the search bar to switch between "Screens", "Audio", and "Both".
- **Timeline Scrubber**: A more detailed visual bar at the bottom with color-coded activity (e.g., blue for screen, purple for audio).
- **Ask Rewind Panel**: A chat-like interface that slides in from the right, allowing users to ask questions like "What did I discuss in the meeting yesterday?".
- **Metadata Overlays**: Enhanced display of OCR text, app names, and timestamps on the main content stage.

## 3. Technical Specifications

- **Audio Chunking**: Mock data will include audio transcript snippets associated with specific timestamps.
- **FTS (Full-Text Search)**: The search logic will be updated to query both OCR text and audio transcripts.
- **Privacy Controls**: Add a "Privacy" settings section to toggle recording states (simulated).

## 4. User Notes & Preferences

- **Shortcuts**: `⌘ + ⇧ + Scroll` (Open blank), `⌘ + ⇧ + Space` (Open last search), `⌘ + ⇧ + /` (Ask Rewind).
- **Design**: Minimalist, dark mode, focus on content, no fancy gradients.
- **Autopilot Mode**: Proceed with systematic enhancements and verification without seeking approval.
