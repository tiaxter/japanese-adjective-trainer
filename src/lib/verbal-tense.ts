export const verbalTenses = [
  'PRESENT',
  'NEGATIVE_PRESENT',
  'FUTURE',
  'NEGATIVE_FUTURE',
  'PAST',
  'NEGATIVE_PAST',
  'UNCERTAIN_FUTURE',
  'NEGATIVE_UNCERTAIN_FUTURE',
  'UNCERTAIN_PAST',
  'NEGATIVE_UNCERTAIN_PAST'
] as const;

export function getRandomVerbalTense() {
  return verbalTenses[Math.floor(Math.random() * verbalTenses.length)];
}