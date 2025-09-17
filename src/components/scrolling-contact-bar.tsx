
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.48 1.34 5l-1.4 5.02 5.13-1.37c1.45.81 3.09 1.25 4.74 1.25h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2M12.04 20.15h-.01c-1.5 0-2.98-.48-4.2-1.37l-.3-.18-3.12.83.85-3.05-.2-.32C3.54 14.6 3.06 13.06 3.06 12c0-4.98 4.05-9.03 9.03-9.03s9.03 4.05 9.03 9.03-4.05 9.12-9.03 9.12m4.23-5.88c-.22-.11-.53-.26-.61-.29-.08-.03-.28-.05-.4.1-.12.16-.45.58-.55.7-.1.12-.2.13-.37.03-.17-.1-.71-.26-1.35-.83-.5-.45-.84-.8-1.09-1.25-.25-.45-.13-.68.08-.88s.22-.25.33-.38c.11-.12.15-.2.23-.34.08-.14.04-.26-.02-.48s-.61-1.48-.84-2.02c-.23-.55-.46-.47-.64-.47h-.23c-.18 0-.47.07-.71.32-.24.25-.93.9-1.08 2.18-.15 1.28.78 2.53.88 2.71s1.74 2.8 4.22 3.72c.59.22 1.05.35 1.42.45.59.15 1.13.13 1.55.08.47-.06 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.05-.1-.18-.17-.37-.28"/>
    </svg>
);

const contactItems = [
    { icon: <MapPin className="h-5 w-5 mx-2 flex-shrink-0" />, text: "5 El-Gihad, Mit Akaba, Agouza, Egypt", href: "#contact" },
    { icon: <Phone className="h-5 w-5 mx-2 flex-shrink-0" />, text: "+201099993903", href: "tel:+201099993903" },
    { icon: <WhatsAppIcon className="h-5 w-5 mx-2 flex-shrink-0" />, text: "+201099993903", href: "https://wa.me/201099993903" },
    { icon: <Mail className="h-5 w-5 mx-2 flex-shrink-0" />, text: "info@sighteg.com", href: "mailto:info@sighteg.com" },
];

export function ScrollingContactBar() {
    const items = [...contactItems, ...contactItems]; // Duplicate for seamless scroll

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-sm z-50 overflow-hidden border-t border-border">
            <div className="absolute top-0 left-0 w-max flex items-center h-full animate-marquee">
                {items.map((item, index) => (
                    <Link key={index} href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="flex items-center text-lg text-primary hover:text-accent transition-colors duration-300 mx-8 whitespace-nowrap">
                        {item.icon}
                        <span>{item.text}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
