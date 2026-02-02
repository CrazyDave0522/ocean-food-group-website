"use client";

import type {
  CardGridProps,
  Variant1CardData,
  Variant2CardData,
  Variant3CardData,
  Variant4CardData,
} from "@/lib/card-grid/types";
import Image from "next/image";
import { useState } from "react";

export default function CardGrid({
  variant,
  cards,
  className = "",
}: CardGridProps) {
  const [expandedCard, setExpandedCard] = useState(0); // Index of expanded card for variant 3
  const [mobileTextOnlyCards, setMobileTextOnlyCards] = useState<Set<number>>(
    new Set(),
  ); // Set of card indices in text-only mode on mobile

  const handleCardInteraction = (index: number) => {
    if (variant === "expandable") {
      setExpandedCard(index);
    }
  };

  const handleMobileCardToggle = (index: number) => {
    if (variant === "expandable") {
      setMobileTextOnlyCards((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    }
  };

  const getGridClasses = () => {
    const baseClasses = "grid gap-4";
    const cardCount = cards.length;

    switch (variant) {
      case "feature":
        if (cardCount === 3) {
          return `flex md:grid gap-4 overflow-x-auto md:overflow-x-visible grid-cols-3`;
        }
        return `flex md:grid gap-4 overflow-x-auto md:overflow-x-visible grid-cols-3 lg:grid-cols-4`;
      case "image":
        if (cardCount === 3) {
          return `${baseClasses} grid-cols-2 md:grid-cols-3`;
        }
        return `${baseClasses} grid-cols-2 md:grid-cols-3 lg:grid-cols-4`;
      case "expandable":
        // Expandable cards need more columns for expansion to work properly
        if (cardCount === 3) {
          return `${baseClasses} grid-cols-1 md:grid-cols-4 lg:grid-cols-4`;
        }
        return `${baseClasses} grid-cols-1 md:grid-cols-4 lg:grid-cols-5`;
      case "centered":
        if (cardCount === 3) {
          return `${baseClasses} grid-cols-1 md:grid-cols-3`;
        }
        return `${baseClasses} grid-cols-1 md:grid-cols-3 lg:grid-cols-4`;
      default:
        return baseClasses;
    }
  };

  const renderCard = (card: CardGridProps["cards"][0], index: number) => {
    switch (variant) {
      case "feature":
        return renderFeatureCard(card as Variant1CardData);
      case "image":
        return renderImageCard(card as Variant2CardData);
      case "expandable":
        return renderExpandableCard(card as Variant3CardData, index);
      case "centered":
        return renderCenteredCard(card as Variant4CardData, index);
      default:
        return null;
    }
  };

  const renderFeatureCard = (card: Variant1CardData) => (
    <article
      key={`${variant}-feature-${card.id}`}
      className="group bg-white rounded-lg px-6 py-9 shadow-sm hover:bg-primary hover:-translate-y-2 hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 shrink-0 w-80 md:w-auto feature-card-bg"
      style={{
        backgroundImage: `url(/images/components/card-grid/v1/bg-${cards.length === 3 ? "3card" : "4card"}.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "4px solid #FFF",
      }}
      role="article"
      aria-labelledby={`feature-card-title-${card.id}`}
    >
      <div className="flex flex-col items-start">
        {card.icon && (
          <div className="mb-4">
            <Image
              src={card.icon}
              alt=""
              width={80}
              height={80}
              className="w-20 h-20"
              aria-hidden="true"
            />
          </div>
        )}
        <h3
          id={`feature-card-title-${card.id}`}
          className="font-semibold mb-4 group-hover:text-white transition-colors duration-300"
          style={{ fontSize: "var(--fs-h4)" }}
        >
          {card.title}
        </h3>
        <ul className="space-y-2" role="list">
          {card.bulletPoints.map((point: string, i: number) => (
            <li
              key={i}
              className="flex items-start group-hover:text-white transition-colors duration-300"
              style={{ 
                fontSize: "var(--fs-body)",
                lineHeight: "var(--lh-body)"
              }}
              role="listitem"
            >
              <span
                className="text-primary mr-2 group-hover:text-white transition-colors duration-300"
                aria-hidden="true"
              >
                •
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );

  const renderImageCard = (card: Variant2CardData) => (
    <div key={`${variant}-image-${card.id}`} className="flex flex-col">
      <div className="mb-4">
        <Image
          src={card.image}
          alt=""
          width={330}
          height={400}
          className="w-full aspect-33/40 object-cover rounded-lg"
          aria-hidden="true"
        />
      </div>
      <h3
        id={`image-card-title-${card.id}`}
        className="font-semibold mb-3"
        style={{ fontSize: "var(--fs-h4)" }}
      >
        {card.title}
      </h3>
      <p className="text-gray-600" style={{ fontSize: "var(--fs-body)" }}>
        {card.text}
      </p>
    </div>
  );

  const renderExpandableCard = (card: Variant3CardData, index: number) => {
    const isExpanded = expandedCard === index;
    const isMobileTextOnly = mobileTextOnlyCards.has(index);

    return [
      // Mobile layout - toggle between icon/title and text only
      <article
        key={`${variant}-expandable-mobile-${card.id}`}
        className="md:hidden bg-white rounded-lg p-6 shadow-sm cursor-pointer relative"
        style={{
          backgroundImage: `url(/images/components/card-grid/v3/bg-${index + 1}-mb.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "32px",
          aspectRatio: "67/30",
        }}
        onClick={() => handleMobileCardToggle(index)}
        role="button"
        tabIndex={0}
        aria-labelledby={`expandable-card-title-mobile-${card.id}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleMobileCardToggle(index);
          }
        }}
      >
        {isMobileTextOnly && (
          <div
            className="absolute inset-0 bg-black opacity-50 rounded-lg"
            style={{ borderRadius: "32px" }}
          />
        )}
        <div className="flex items-center h-full relative z-10">
          {isMobileTextOnly ? (
            // Text only mode
            <div className="flex-1">
              <p
                className="text-white text-sm line-clamp-6 text-justify"
                style={{ 
                  fontSize: "var(--fs-body)",
                  whiteSpace: "pre-line",
                  lineHeight: "var(--lh-body)"
                }}
              >
                {card.text}
              </p>
            </div>
          ) : (
            // Icon and title only mode (no text)
            <div className="shrink-0 mr-4">
              {card.icon && (
                <div className="mb-2">
                  <Image
                    src={card.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    aria-hidden="true"
                  />
                </div>
              )}
              <h3
                id={`expandable-card-title-mobile-${card.id}`}
                className="font-semibold text-white"
                style={{ fontSize: "var(--fs-h4)" }}
              >
                {card.title}
              </h3>
            </div>
          )}
        </div>
      </article>,

      // Desktop layout - with expansion
      <article
        key={`${variant}-expandable-desktop-${card.id}`}
        className={`hidden md:block bg-white p-9 shadow-sm cursor-pointer transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 expandable-card-bg-${index} ${
          isExpanded ? "md:col-span-2 lg:col-span-2" : ""
        }`}
        onClick={() => handleCardInteraction(index)}
        onMouseEnter={() => handleCardInteraction(index)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardInteraction(index);
          }
        }}
        style={{
          backgroundImage: `url(/images/components/card-grid/v3/bg-${index + 1}-${cards.length}cards${isExpanded ? "-expanded" : ""}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "32px",
          height: "435px",
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-labelledby={`expandable-card-title-${card.id}`}
        aria-describedby={
          isExpanded ? `expandable-card-content-${card.id}` : undefined
        }
      >
        <div className="flex flex-col">
          {!isExpanded && card.icon && (
            <div className="mb-4">
              <Image
                src={card.icon}
                alt=""
                width={60}
                height={60}
                className="w-15 h-15"
                aria-hidden="true"
              />
            </div>
          )}
          <h3
            id={`expandable-card-title-${card.id}`}
            className="font-semibold mb-4 text-white"
            style={{ fontSize: "var(--fs-h4)" }}
          >
            {card.title}
          </h3>
          <p
            id={`expandable-card-content-${card.id}`}
            className="text-white transition-all duration-300 overflow-hidden"
            style={{
              fontSize: "var(--fs-body)",
              maxHeight: isExpanded ? "150px" : "0px",
              whiteSpace: "pre-line",
              lineHeight: "var(--lh-body)",
            }}
          >
            {card.text}
          </p>
        </div>
      </article>,
    ];
  };

  const renderCenteredCard = (card: Variant4CardData, index: number) => {
    const defaultIcons = ["1.svg", "2.svg", "3.svg", "4.svg"];
    const iconSrc =
      card.icon || `/images/components/card-grid/v4/${defaultIcons[index % 4]}`;

    return (
      <article
        key={`${variant}-centered-${card.id}`}
        className="bg-white rounded-lg py-4 px-6 md:py-9 md:px-8 shadow-lg text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
        style={{
          backgroundImage: `url(/images/components/card-grid/v4/bg-card-mb.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="article"
        aria-labelledby={`centered-card-title-${card.id}`}
      >
        <div className="flex flex-row md:flex-col items-center">
          <div className="mb-0 md:mb-6">
            <Image
              src={iconSrc}
              alt=""
              width={150}
              height={150}
              className="w-16 h-16 md:w-24 md:h-24 max-w-37.5"
              aria-hidden="true"
            />
          </div>
          <div className="flex-1 ml-4 md:ml-0 md:text-center">
            <h3
              id={`centered-card-title-${card.id}`}
              className="font-semibold mb-4"
              style={{ fontSize: "var(--fs-h4)" }}
            >
              {card.title}
            </h3>
            <p className="text-gray-600 text-justify" style={{ 
              fontSize: "var(--fs-body)",
              lineHeight: "var(--lh-body)"
            }}>
              {card.text}
            </p>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      className={`card-grid ${getGridClasses()} ${className}`}
      role="region"
      aria-label={`${variant} card grid with ${cards.length} cards`}
    >
      {cards.map((card, index) => renderCard(card, index))}
    </section>
  );
}
