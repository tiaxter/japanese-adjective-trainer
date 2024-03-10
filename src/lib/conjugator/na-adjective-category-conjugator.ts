import {AbstractAdjectiveConjugator} from "@/lib/conjugator/abstract-adjective-conjugator.ts";

export class NaAdjectiveCategoryConjugator extends AbstractAdjectiveConjugator {
  protected applyAdjectiveModifiersChanges(): void {
    this.adjectiveModifiersByVerbalTense = {
      PRESENT: this.removeLastChar,
      NEGATIVE_PRESENT: this.removeLastChar,
      FUTURE: this.removeLastChar,
      NEGATIVE_FUTURE: this.removeLastChar,
      PAST: this.removeLastChar,
      NEGATIVE_PAST: this.removeLastChar,
      UNCERTAIN_FUTURE: this.removeLastChar,
      NEGATIVE_UNCERTAIN_FUTURE: this.removeLastChar,
      UNCERTAIN_PAST: this.removeLastChar,
      NEGATIVE_UNCERTAIN_PAST: this.removeLastChar
    };
  }

  protected applyConjugationByVerbalTenseChanges(): void {
    // Silence is worth more than a thousand words
  }
}