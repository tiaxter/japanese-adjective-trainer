import "/node_modules/flag-icons/css/flag-icons.min.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";

const locales = [
  {
    value: 'it',
    flagCode: 'it',
    label: 'Italiano'
  },
  {
    value: 'en',
    flagCode: 'gb',
    label: 'English',
  },
];

export default function LocaleSwitch() {
  const {t, i18n} = useTranslation();
  const [locale, setLocale] = useState<string>(i18n.language);
  const [localeFlagCode, setLocaleFlagCode] = useState("")

  // Change flag code by locale
  useEffect(() => {
    const flagCode = locales.find(
      (singleLocale) => singleLocale.value === locale
    )?.flagCode as string;

    setLocaleFlagCode(flagCode);
  }, [locale])

  // Change locale
  function changeLocale(language: string) {
    setLocale(language)
    i18n.changeLanguage(language);
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span
            className={`fi fi-${localeFlagCode} mr-2`}
          />
          {t(locale)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {
          locales.map(language => (
            <DropdownMenuItem onClick={() => changeLocale(language.value)}>
              <span
                className={`fi fi-${language.flagCode} mr-2`}
              />
              {t(language.value)}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
