export interface HeroSectionProps {
  /** URL of the background image for desktop */
  backgroundImageUrl: string;
  /** URL of the background image for mobile (optional) */
  mobileBackgroundImageUrl?: string;
  /** Title text (limited to 1 line) */
  title: string;
  /** Description text (limited to 3 lines) */
  text: string;
}