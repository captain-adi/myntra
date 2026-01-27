import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "ONLINE SHOPPING",
    links: [
      "Men",
      "Women",
      "Kids",
      "Home & Living",
      "Beauty",
      "Gift Card",
      "Myntra Insider",
    ],
  },
  {
    title: "CUSTOMER POLICIES",
    links: [
      "Contact Us",
      "FAQ",
      "T&C",
      "Terms of Use",
      "Track Orders",
      "Shipping",
      "Returns",
    ],
  },
  {
    title: "USEFUL LINKS",
    links: [
      "Blog",
      "Careers",
      "Site Map",
      "Corporate Information",
      "Whitehat",
      "Privacy Policy",
    ],
  },
] as const;

const socialLinks = [
  { icon: Facebook, hoverColor: "hover:text-blue-500", label: "Facebook" },
  { icon: Instagram, hoverColor: "hover:text-pink-500", label: "Instagram" },
  { icon: Twitter, hoverColor: "hover:text-blue-400", label: "Twitter" },
  { icon: Youtube, hoverColor: "hover:text-red-500", label: "Youtube" },
] as const;

const Footer = () => {
  return (
    <footer className=" relative bottom-0">
      <div className="py-8 bg-gray-200 flex justify-evenly flex-wrap">
        {footerLinks.map((section, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-gray-800 text-sm mb-6 font-bold">
              {section.title}
            </h3>
            {section.links.map((link, i) => (
              <Link
                key={i}
                to="#"
                className="text-gray-600 text-sm mb-1 hover:text-gray-800"
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <hr className="border-gray-300" />

      <div className="flex justify-between items-center p-4 container mx-auto">
        <p className="text-gray-500">
          © 2023 www.myntra.com. All rights reserved.
        </p>

        <div className="flex space-x-4">
          {socialLinks.map(({ icon: Icon, hoverColor, label }) => (
            <Link
              key={label}
              to="#"
              className={`text-gray-600 ${hoverColor}`}
              aria-label={label}
            >
              <Icon size={20} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
