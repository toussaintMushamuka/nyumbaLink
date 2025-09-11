import React from "react";

interface FooterProps {
  text?: string;
  links?: { label: string; href: string }[];
  year?: number;
}

const Footer: React.FC<FooterProps> = ({
  text = "NyumbaLink © Tous droits réservés",
  links = [],
  year = new Date().getFullYear(),
}) => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-10 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {text} - {year}
        </p>
        {links.length > 0 && (
          <div className="flex gap-4 mt-2 md:mt-0">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
