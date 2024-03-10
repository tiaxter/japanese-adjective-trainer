import {VerbalTense} from "@/types/verbal-tense.ts";
import {Adjective} from "@/types/adjective.ts";

export abstract class AbstractAdjectiveConjugator {
  /**
   * @description Constructor
   *
   * @param adjective
   */
  public constructor(protected adjective: Adjective) {
    this.applyConjugationByVerbalTenseChanges();
    this.applyAdjectiveModifiersChanges();
  }

  /**
   * @description An object that contain various verbs conjugation by verbal tenses
   *
   * @protected
   */
  protected conjugationByVerbalTense: Record<VerbalTense, string[]> = {
    // Present conjugation
    PRESENT: ['です', 'だ'],
    NEGATIVE_PRESENT: ['ではありません', 'ではない'],
    // Future conjugation
    FUTURE: ['です', 'だ'],
    NEGATIVE_FUTURE: ['ではありません', 'ではない'],
    // Past conjugation
    PAST: ['でした', 'だった'],
    NEGATIVE_PAST: ['ではありませんでした', 'ではなかった'],
    // Uncertain past conjugation
    UNCERTAIN_PAST: ['だったでしょう', 'だっただろう'],
    NEGATIVE_UNCERTAIN_PAST: ['ではなかったでしょう', 'ではかっただろう'],
    // Uncertain future conjugation
    UNCERTAIN_FUTURE: ['でしょう', 'だろう'],
    NEGATIVE_UNCERTAIN_FUTURE: ['ではないでしょう', 'ではないだろう'],
  };

  /**
   * @description An object that contain various callbacks to be called based of verbal tense conjugation
   *
   * @protected
   */
  protected adjectiveModifiersByVerbalTense: Partial<Record<VerbalTense, (adj: Adjective) => Adjective>> = {};

  /**
   * @description Conjugate adjective passing verbal tense
   *
   * @param verbalTense
   * @private
   */
  public conjugate(verbalTense: VerbalTense) {
    // Modify the adjective using the adjective modifier
    const adjective = this.adjectiveModifiersByVerbalTense?.[verbalTense]?.(this.adjective) ?? this.adjective;
    // Conjugate the adjective
    return this.conjugationByVerbalTense[verbalTense].map(conjugation => {
      return {
        verbalTense,
        kana: `${adjective.kana}${conjugation}`,
        kanji: `${adjective.kanji}${conjugation}`,
      };
    });
  }

  protected abstract applyConjugationByVerbalTenseChanges(): void;
  protected abstract applyAdjectiveModifiersChanges(): void;

  protected removeLastChar(adjective: Adjective): Adjective {
    let { kana, kanji } = adjective;
    kana = kana.substring(0, kana.length - 1);
    kanji = kanji.substring(0, kanji.length - 1);

    return {
      ...adjective,
      kana,
      kanji
    };

  }
}