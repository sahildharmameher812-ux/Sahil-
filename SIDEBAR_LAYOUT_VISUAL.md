# Sidebar Navigation - Visual Layout Guide

## Desktop View Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🇮🇳 Ministry of Home Affairs, Govt of India  |  📞 1930  |  🟢 Active  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🛡️ CWRI Portal    [Nav Items...]    🔍 Search    ⋮  📊  🔔  👤      │
│                                                    ↑                     │
│                                            Three-Dot Menu               │
│                                          (Click to open sidebar)        │
└─────────────────────────────────────────────────────────────────────────┘
```

## Sidebar Open State

```
┌────────────────────────┐  ┌──────────────────────────────────────────┐
│  🛡️ Navigation    ✕   │  │  🇮🇳 Ministry of Home Affairs           │
├────────────────────────┤  ├──────────────────────────────────────────┤
│   CWRI Portal          │  │                                          │
├────────────────────────┤  │  🛡️ CWRI Portal    [Nav]   ⋮  📊  🔔  👤│
│                        │  │                                          │
│ 📊 Dashboard          │  │  [Main Content Area]                     │
│ 🗺️ Risk Heatmap LIVE │  │                                          │
│ 🔔 Alerts         47   │  │                                          │
│ 🧠 AI Models      AI   │  │                                          │
│ 🧠 Intelligence        │  │                                          │
│ 💼 Cases               │  │                                          │
│ 📄 Complaints          │  │                                          │
│ 🏢 Banks               │  │                                          │
│ 📊 Reports             │  │                                          │
│ ⚙️  Admin              │  │                                          │
│ ✅ Audit               │  │                                          │
│                        │  │                                          │
│                        │  │                                          │
├────────────────────────┤  └──────────────────────────────────────────┘
│ 👤 Admin User          │       ↑
│    I4C Admin           │       Dark Overlay (Click to close)
│                        │
│ [🚪 Logout]            │
└────────────────────────┘
     ↑
   Sidebar (320px width)
   Slides in from left
```

## Component Breakdown

### 1. Header (Always Visible)
```
┌──────────────────────────────────────────────────────────────────┐
│ Logo/Title         Navigation Menu          Search    Actions    │
│                                                                   │
│ 🛡️ CWRI Portal    [Dashboard] [Alerts]...   🔍        ⋮ 📊 🔔 👤│
└──────────────────────────────────────────────────────────────────┘
```

### 2. Three-Dot Button (⋮)
```
┌─────┐
│  ⋮  │  ← Click this to open sidebar
└─────┘
   ↓
Rotates 90° on hover
Blue background (#1e3a8a)
White icon
```

### 3. Sidebar Panel
```
┌──────────────────────┐
│ ╔═══════════════════╗│
│ ║  🛡️ Navigation ✕ ║│ ← Header (Gradient)
│ ║  CWRI Portal      ║│
│ ╚═══════════════════╝│
│                      │
│ ┌──────────────────┐ │
│ │ 📊 Dashboard     │ │ ← Nav Item
│ └──────────────────┘ │
│                      │
│ ┌──────────────────┐ │
│ │ 🗺️ Risk Heatmap │ │
│ │              LIVE│ │ ← Badge
│ └──────────────────┘ │
│                      │
│ ┌──────────────────┐ │
│ │ 🔔 Alerts    47  │ │
│ └──────────────────┘ │
│                      │
│        ...           │
│                      │
│ ╔═══════════════════╗│
│ ║ 👤 Admin User     ║│ ← Footer
│ ║    I4C Admin      ║│
│ ║                   ║│
│ ║ [🚪 Logout]       ║│
│ ╚═══════════════════╝│
└──────────────────────┘
```

## Interaction States

### State 1: Sidebar Closed (Default)
```
[Three-dot button visible in header]
[Sidebar hidden off-screen to the left]
[No overlay visible]
```

### State 2: Sidebar Opening
```
[Three-dot button clicked]
[Dark overlay fades in]
[Sidebar slides in from left (300ms animation)]
[Menu items animate in with stagger effect]
```

### State 3: Sidebar Open
```
[Sidebar fully visible on left]
[Dark overlay covers main content]
[All menu items visible]
[Active page highlighted]
```

### State 4: Sidebar Closing
```
[User clicks overlay/X button/menu item]
[Sidebar slides out to left (300ms animation)]
[Dark overlay fades out]
[Back to State 1]
```

## Active Page Highlighting

### Inactive Item
```
┌────────────────────┐
│ 📊 Dashboard       │  ← Gray text (#374151)
└────────────────────┘     White background
     Hover: Light blue background
```

### Active Item
```
╔════════════════════╗
║ 📊 Dashboard       ║  ← White text
╚════════════════════╝     Gradient background
     (indigo → blue → cyan → orange)
```

## Responsive Behavior

### Desktop (> 1280px)
- Top navigation visible
- Three-dot button visible
- Sidebar slides over content
- 320px sidebar width

### Tablet (768px - 1279px)
- Top navigation hidden
- Three-dot button visible
- Sidebar slides over content
- 320px sidebar width

### Mobile (< 768px)
- Top navigation hidden
- Three-dot button visible
- Sidebar slides over content
- Full-width overlay

## Color Reference

### Sidebar Header
- Background: `linear-gradient(135deg, #1e3a8a 0%, #3b82f6 40%, #0ea5e9 70%, #f97316 100%)`
- Text: White (#ffffff)

### Navigation Items
- Inactive: Text #374151, Background white
- Hover: Text #1e3a8a, Background #eff6ff
- Active: Text white, Background gradient

### Three-Dot Button
- Background: #1e3a8a (Primary blue)
- Icon: White
- Hover: #1e40af (Darker blue)

### Overlay
- Background: rgba(0, 0, 0, 0.5)
- Backdrop: Semi-transparent black

## Animation Timing

```
Sidebar slide:     300ms ease-in-out
Overlay fade:      300ms ease-out
Item stagger:      50ms delay per item
Button rotation:   300ms ease-in-out
```

## Z-Index Layers

```
Layer 4: Sidebar (z-50)
Layer 3: Overlay (z-40)
Layer 2: Header (z-30)
Layer 1: Main Content (z-0)
```

## Accessibility Features

- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ ARIA labels
- ✅ Screen reader friendly
- ✅ Clear visual indicators
- ✅ High contrast ratios
- ✅ Touch-friendly hit areas (48px minimum)

## Key Features Summary

### Opening Mechanisms
1. Click three-dot button (⋮)

### Closing Mechanisms
1. Click X button in sidebar header
2. Click dark overlay
3. Click any navigation link (auto-navigate)
4. Click three-dot button again (toggle)

### Navigation Benefits
- Quick access to all 11 pages
- Visual indication of current page
- Badge notifications (Live, AI, counts)
- Smooth animations
- User profile always visible
- One-click logout

---

**Pro Tip**: The sidebar is designed to be intuitive. Users can click anywhere outside the sidebar to close it, making for a seamless experience.
