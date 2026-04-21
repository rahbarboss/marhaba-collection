# Design Brief — Rahbar Luxury E-Commerce

## Purpose & Context
Premium mobile e-commerce platform inspired by Amazon but elevated with luxury aesthetics, dark theme, and refined interactions. Users shop high-end products in a 9:16 mobile-first experience with smooth animations.

## Tone
Luxury refined, premium tech, editorial sophistication. Bold accent colors against deep dark. No generic gradients — intentional, high-contrast, exclusive.

## Color Palette

| Token | OKLCH | Hex | Purpose |
|-------|-------|-----|---------|
| Background | 0.08 0 0 | #0f172a | Deep dark, primary surface |
| Card | 0.12 0 0 | #1a2940 | Elevated surfaces, content containers |
| Foreground | 0.95 0 0 | #f5f5f5 | Primary text, high contrast |
| Primary (Teal) | 0.675 0.25 178 | #00d4c8 | CTAs, highlights, nav focus |
| Secondary (Gold) | 0.72 0.26 90 | #f5c242 | Deals, badges, secondary accents |
| Muted | 0.22 0 0 | #334155 | Disabled state, secondary text |
| Border | 0.25 0 0 | #3d4652 | Card borders, dividers |
| Destructive | 0.65 0.19 22 | #e74c3c | Errors, delete actions |

## Typography

| Use | Font | Weight | Size |
|-----|------|--------|------|
| Display (H1, brand) | Bricolage Grotesque | 600–800 | 28–36px |
| Headers (H2–H4) | Bricolage Grotesque | 600 | 20–24px |
| Body text | General Sans | 400 | 14–16px |
| UI labels | General Sans | 500 | 12–14px |
| Mono (prices, codes) | Geist Mono | 500 | 14px |

## Shape Language
- Card corners: `rounded-lg` (10px)
- Button corners: `rounded-lg` (10px)
- LED strip animation: 1px border, continuous gradient flow
- Shadows: elevated (0 8px 16px teal @ 10% opacity), glow-teal (0 0 20px teal @ 30%)

## Structural Zones

| Zone | Treatment | Notes |
|------|-----------|-------|
| Header | `bg-card/50 backdrop-blur` + `border-b border-border` | Status bar + logo/search |
| Hero Carousel | Full-bleed images with fade-in animation | Product carousel or banner |
| Product Grid | Cards with `led-strip` border animation | 2-col grid on mobile |
| Bottom Nav | `bg-card/50` + `border-t border-border` | Fixed: Home, Bag, Orders, Account |
| Modals/Popovers | `bg-popover/95 backdrop-blur` + `border border-border` | Elevated, dimmed background |

## Spacing & Rhythm
- Gutter: 1rem (16px) on mobile
- Card padding: 1rem
- Section gap: 1.5rem
- Text line-height: 1.5 (body), 1.2 (headers)
- Letter-spacing: 0 (body), -0.02em (headers)

## Component Patterns
- **Button (Primary)**: Teal bg, white text, hover scale 1.05 + shadow elevation
- **Button (Secondary)**: Gold bg, dark text
- **Card**: Dark bg, subtle border, hover scale 1.02 + shadow lift
- **Input**: Dark border, focused ring teal, placeholder muted
- **Badge**: Inline pill, gold bg for deals, teal for promotions
- **Toast**: Slide-up from bottom, auto-dismiss after 3s

## Motion & Micro-Interactions
- **Default transition**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) (smooth)
- **LED strip**: 3s linear infinite scroll (teal → gold → teal)
- **Card hover**: Scale 1.02 + shadow elevation
- **Button press**: Scale 0.98 instantly, release with bounce
- **Fade-in**: All content loads with 0.5s ease-out fade
- **Loader**: Scale-pulse animation, teal accent

## Signature Detail
**LED-Strip Border Effect**: Every product card has a 1px animated border with continuous moving gradient (teal → gold → teal) cycling every 3s. Creates visual rhythm and premium feel. Implemented via CSS mask + background-size animation.

## Constraints
- Mobile-first, 9:16 aspect ratio in realistic phone frame
- Dark mode only (no light variant)
- All text uses semantic tokens (no raw hex/rgb)
- No shadows > 16px blur (keep crisp)
- Animations max 0.5s (except LED strip at 3s for ambient motion)
- Reserve gold (#f5c242) for deals/badges only, not primary action

## Accessibility
- Minimum 7:1 contrast (foreground on background)
- ARIA labels on all interactive elements
- Focus ring: teal, 2px
- Reduced motion: disable animations if `prefers-reduced-motion`

