"use client";

import { IconMail } from "@/app/components/icons/IconMail";
import { IconGitHub } from "@/app/components/icons/IconGitHub";
import { IconLinkedIn } from "@/app/components/icons/IconLinkedIn";
import { PERSONAL } from "@/app/data/personal";
import { useLanguage } from "@/app/providers/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-tertiary font-light">
          &copy; {year} {PERSONAL.name}. {t("footer.rights")}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="text-tertiary hover:text-accent transition-colors duration-300"
            aria-label={t("footer.emailAria", { name: PERSONAL.name })}
          >
            <IconMail className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-tertiary hover:text-accent transition-colors duration-300"
            aria-label={t("footer.githubAria", { name: PERSONAL.name })}
          >
            <IconGitHub className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-tertiary hover:text-accent transition-colors duration-300"
            aria-label={t("footer.linkedinAria", { name: PERSONAL.name })}
          >
            <IconLinkedIn className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
