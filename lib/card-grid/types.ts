export interface CardData {
  id: string;
  title: string;
}

export interface Variant1CardData extends CardData {
  icon?: string; // Optional icon component or URL provided by user (default icon used if not provided)
  bulletPoints: string[]; // Array of bullet point texts provided by user
}

export interface Variant2CardData extends CardData {
  image: string; // Image URL or path provided by user
  text: string; // Single line description text provided by user
}

export interface Variant3CardData extends CardData {
  backgroundImage?: string; // Background image URL (optional - auto-generated based on card count if not provided)
  icon?: string; // Optional icon for folded state provided by user (default icon used if not provided)
  text: string; // Text content for unfolded state provided by user
}

export interface Variant4CardData extends CardData {
  icon?: string; // Optional icon component or URL provided by user. If not provided, cycles through default icons: 1.svg, 2.svg, 3.svg, 4.svg from /public/images/components/card-grid/v4/
  text: string; // Body text provided by user
}

export type CardGridVariant = 'feature' | 'image' | 'expandable' | 'centered';

export interface CardGridProps {
  variant: CardGridVariant;
  cards: (Variant1CardData | Variant2CardData | Variant3CardData | Variant4CardData)[];
  className?: string;
}