'use client';

import Image from 'next/image';
import { FeatureGridProps } from '@/lib/feature-grid/types';
import GlassmorphismButton from '@/components/GlassmorphismButton';

export function FeatureGrid({ intro, features, className }: FeatureGridProps) {
  // Component doesn't render if fewer than 3 features are provided
  if (!features || features.length < 3) {
    return null;
  }

  // Use only the first 3 features
  const displayFeatures = features.slice(0, 3);

  const handleUnitClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`feature-grid ${className || ''}`}>
      {/* Intro Column - merged across 2 rows */}
      <div className="feature-grid__intro">
        <div className="feature-grid__intro-content">
          <h2 className="feature-grid__intro-title">{intro.title}</h2>
          <p className="feature-grid__intro-text">{intro.text}</p>
          <GlassmorphismButton
            label={intro.button.label}
            url={intro.button.url}
          />
        </div>
      </div>

      {/* Feature Units - alternating pattern */}
      {displayFeatures.map((feature, index) => {
        const isImageFirst = index % 2 === 1; // Unit 2, 4, 6... have image first

        return (
          <div
            key={feature.id}
            className="feature-grid__unit"
            onClick={() => handleUnitClick(feature.link)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleUnitClick(feature.link);
              }
            }}
            aria-label={`Learn more about ${feature.title}`}
          >
            {isImageFirst ? (
              <>
                {/* Image first, content second */}
                <div className="feature-grid__unit-image">
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="feature-grid__unit-content">
                  <h3 className="feature-grid__unit-title">{feature.title}</h3>
                  <p className="feature-grid__unit-description">{feature.description}</p>
                </div>
              </>
            ) : (
              <>
                {/* Content first, image second */}
                <div className="feature-grid__unit-content">
                  <h3 className="feature-grid__unit-title">{feature.title}</h3>
                  <p className="feature-grid__unit-description">{feature.description}</p>
                </div>
                <div className="feature-grid__unit-image">
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}