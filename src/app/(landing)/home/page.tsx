import { Metadata } from "next";
import HomePage from '@/app/(landing)/home/HomePage';
import HomeStructuredData from '@/app/(landing)/home/HomeStructuredData';

export const metadata: Metadata = {
  title: "Home",
  description: "ENT Insight - AI-Powered platform for diagnosing and learning about Ear, Nose, and Throat conditions with advanced image analysis technology.",
  openGraph: {
    title: "ENT Insight - AI-Powered ENT Diagnosis Platform",
    description: "Advanced AI technology for ENT diagnosis and medical education",
    images: [
      {
        url: "/images/ent-insight-og.png",
        width: 1200,
        height: 630,
        alt: "ENT Insight Platform",
      },
    ],
  },
};

export default function HomeIndexPage() {
  return (
    <>
      <HomeStructuredData />
      <HomePage />
    </>
  );
}
