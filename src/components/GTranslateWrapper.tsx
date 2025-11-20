"use client";

import React, { useEffect } from 'react';

const GTranslateWrapper: React.FC = () => {
  useEffect(() => {
    // Check if the script is already added to prevent duplicates
    if (document.getElementById('gtranslate-script')) {
      return;
    }

    // Define settings on the window object
    // Using 'any' to bypass TypeScript's strict window typing
    (window as any).gtranslateSettings = {
      default_language: "pt",
      native_language_names: true,
      detect_browser_language: true,
      languages: ["pt", "es", "en", "de", "el", "ru", "tr"],
      wrapper_selector: ".gtranslate_wrapper"
    };

    // Create and append the script
    const script = document.createElement('script');
    script.id = 'gtranslate-script';
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);

  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="gtranslate_wrapper"></div>
  );
};

export default GTranslateWrapper;