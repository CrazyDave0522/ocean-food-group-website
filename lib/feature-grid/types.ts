export interface FeatureGridIntro {
  title: string;
  text: string;
  button: {
    label: string;
    url: string;
  };
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface FeatureGridProps {
  intro: FeatureGridIntro;
  features: FeatureItem[];
  className?: string;
}