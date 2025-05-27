export default function HomeStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://entinsight.com/#organization",
        "name": "ENT Insight",
        "url": "https://entinsight.com",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "url": "https://entinsight.com/images/ent-insight-logo.png",
          "contentUrl": "https://entinsight.com/images/ent-insight-logo.png",
          "width": 1000,
          "height": 1000,
          "caption": "ENT Insight"
        },
        "image": { "@id": "https://entinsight.com/#organization" },
        "description": "AI-Powered Medical Conditions Analysis Platform for ENT diagnosis and education"
      },
      {
        "@type": "WebSite",
        "@id": "https://entinsight.com/#website",
        "url": "https://entinsight.com",
        "name": "ENT Insight",
        "description": "AI-Powered ENT Diagnosis Platform",
        "publisher": { "@id": "https://entinsight.com/#organization" },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://entinsight.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": "https://entinsight.com/#webpage",
        "url": "https://entinsight.com",
        "name": "ENT Insight - AI-Powered ENT Diagnosis Platform",
        "isPartOf": { "@id": "https://entinsight.com/#website" },
        "about": { "@id": "https://entinsight.com/#organization" },
        "description": "ENT Insight is an AI-powered platform for diagnosing and learning about Ear, Nose, and Throat conditions with advanced image analysis technology.",
        "breadcrumb": { "@id": "https://entinsight.com/#breadcrumb" },
        "inLanguage": "en-US",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": ["https://entinsight.com"]
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://entinsight.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "AI-Powered ENT Diagnosis",
        "description": "Advanced artificial intelligence for diagnosing ENT conditions with high accuracy",
        "provider": { "@id": "https://entinsight.com/#organization" },
        "serviceType": "Medical Diagnosis",
        "audience": {
          "@type": "Audience",
          "audienceType": "Healthcare Professionals"
        }
      },
      {
        "@type": "Service",
        "name": "Medical Education Platform",
        "description": "Interactive learning platform for medical students to learn ENT diagnosis",
        "provider": { "@id": "https://entinsight.com/#organization" },
        "serviceType": "Medical Education",
        "audience": {
          "@type": "Audience",
          "audienceType": "Medical Students"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
