export type Adjective = {
  kana: string,
  kanji: string,
  verbalTense?: string | null,
  category: 'な' | 'い' | string,
};