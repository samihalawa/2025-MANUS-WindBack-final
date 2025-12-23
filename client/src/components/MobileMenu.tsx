import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  links: Array<{
    label: string;
    href: string;
    isExternal?: boolean;
  }>;
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <nav className="py-6 px-4">
                <div className="space-y-2">
                  {links.map((link, index) => (
                    <div key={index}>
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 rounded-lg text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href}>
                          <a
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-lg text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {link.label}
                          </a>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
