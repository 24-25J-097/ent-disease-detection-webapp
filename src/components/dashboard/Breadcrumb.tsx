"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  homeLabel?: string;
  homeHref?: string;
}

export default function Breadcrumb({ 
  homeLabel = "Dashboard", 
  homeHref = "/student" 
}: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Skip rendering breadcrumbs on the main dashboard page
  if (pathname === '/student') {
    return null;
  }

  // Generate breadcrumb items from the current path
  const generateBreadcrumbs = () => {
    // Remove the base path and split the remaining path
    const pathWithoutBase = pathname.replace('/student', '');
    if (!pathWithoutBase) return [];

    const segments = pathWithoutBase.split('/').filter(Boolean);
    
    return segments.map((segment, index) => {
      // Create the href for this segment
      const href = `/student${pathWithoutBase.split('/').slice(0, index + 2).join('/')}`;
      
      // Format the label (capitalize first letter)
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      return {
        href,
        label,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();
  
  // If there are no breadcrumbs, don't render anything
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="flex items-center py-2">
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href={homeHref}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {homeLabel}
          </Link>
        </li>
        
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link
              href={breadcrumb.href}
              className={`${
                index === breadcrumbs.length - 1
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground transition-colors"
              }`}
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
