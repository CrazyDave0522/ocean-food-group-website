export interface HeroProps {
  title: string;
  subtitle?: string;
  variant?: 'center' | 'left';
  backgroundType?: 'image' | 'styled' | 'video';
  backgroundImageUrl?: string;
  mobileBackgroundImageUrl?: string;
  backgroundVideoUrl?: string;
  backgroundVariant?: 'solid' | 'gradient';
  contentImageUrl?: string;
  overlay?: boolean;
}
