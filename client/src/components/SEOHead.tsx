import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  structuredData?: object;
  canonicalUrl?: string;
}

export default function SEOHead({
  title = "Bourarro Properties - Guaranteed Rent, Zero Hassle",
  description = "Professional property management and guaranteed rent services for landlords. Get market value rent, 0% commission, and full property management for 3-5 years.",
  keywords = "guaranteed rent, property management, landlord services, rental guarantee, property investment, UK property, serviced accommodation, property maintenance",
  ogTitle,
  ogDescription,
  ogImage = "https://bourarroproperties.uk/og-image.jpg",
  ogUrl,
  structuredData,
  canonicalUrl
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Update Open Graph tags
    updateMetaProperty('og:title', ogTitle || title);
    updateMetaProperty('og:description', ogDescription || description);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:url', ogUrl || window.location.href);
    updateMetaProperty('og:type', 'website');
    updateMetaProperty('og:site_name', 'Bourarro Properties');
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);
    
    // Update canonical URL
    updateCanonicalUrl(canonicalUrl || window.location.href);
    
    // Add structured data
    if (structuredData) {
      updateStructuredData(structuredData);
    }
    
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, structuredData, canonicalUrl]);

  return null; // This component doesn't render anything visible
}

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonicalUrl(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function updateStructuredData(data: object) {
  // Generate a unique ID for this structured data
  const dataId = 'structured-data-' + JSON.stringify(data).slice(0, 50).replace(/[^a-z0-9]/gi, '');
  
  // Remove existing structured data with same ID
  const existingScript = document.querySelector(`script[data-schema-id="${dataId}"]`);
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema-id', dataId);
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}