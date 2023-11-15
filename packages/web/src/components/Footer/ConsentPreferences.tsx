"use client";

export function ConsentPreferences() {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        // @ts-ignore
        window.displayPreferenceModal();
      }}
      id="termly-consent-preferences"
    >
      Consent Preferences
    </a>
  );
}
