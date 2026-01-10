export interface HeroProps {
  title: string;
  subtitle?: string;
  variant?: 'center' | 'left';
  backgroundType?: 'image' | 'styled';
  backgroundImageUrl?: string;
  backgroundVariant?: 'solid' | 'gradient';
  contentImageUrl?: string;
  overlay?: boolean;
}
