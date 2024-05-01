import {AbstractAdjectiveConjugator} from "@/lib/conjugator/abstract-adjective-conjugator.ts";
import {VerbalTense} from "@/types/verbal-tense.ts";

export class IAdjectiveCategoryConjugator extends AbstractAdjectiveConjugator {
  protected applyAdjectiveModifiersChanges(): void {
    this.adjectiveModifiersByVerbalTense = {
      // Negative conjugation remove the last い
      NEGATIVE_PRESENT: this.removeLastChar,
      NEGATIVE_UNCERTAIN_PAST: this.removeLastChar,
      NEGATIVE_PAST: this.removeLastChar,
      NEGATIVE_UNCERTAIN_FUTURE: this.removeLastChar,
      // Past conjugation remove the last い
      PAST: this.removeLastChar,
      UNCERTAIN_PAST: this.removeLastChar
    };
  }

  protected applyConjugationByVerbalTenseChanges(): void {
    // Add "no verbs" to present
    this.conjugationByVerbalTense.PRESENT = ['です', ''];
    this.conjugationByVerbalTense.FUTURE = ['です', ''];
    // Replace all では with く
    this.conjugationByVerbalTense = Object.fromEntries(
      Object.entries(this.conjugationByVerbalTense).map(([verbalTense, verbs]) => {
        return [verbalTense, verbs.map((verb) => verb.replace('では', 'く'))];
      })
    ) as Record<VerbalTense, string[]>;
    // Replace past verbs
    this.conjugationByVerbalTense.PAST = ['かったです', 'かった'];
    // Replace かった with だった in uncertain past
    this.conjugationByVerbalTense.UNCERTAIN_PAST = this.conjugationByVerbalTense.UNCERTAIN_PAST.map((verb) =>
      verb.replace( 'だった', 'かった')
    );
  }

}