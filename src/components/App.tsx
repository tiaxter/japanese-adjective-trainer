import {FormEvent, useEffect, useState} from 'react'
import './App.css'
import adjectives from '../assets/adjectives.json'
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Adjective} from "@/types/adjective.ts";
import {AbstractAdjectiveConjugator} from "@/lib/conjugator/abstract-adjective-conjugator.ts";
import {NaAdjectiveCategoryConjugator} from "@/lib/conjugator/na-adjective-category-conjugator.ts";
import {IAdjectiveCategoryConjugator} from "@/lib/conjugator/i-adjective-category-conjugator.ts";
import {VerbalTense} from "@/types/verbal-tense.ts";
import {getRandomVerbalTense} from "@/lib/verbal-tense.ts";
import {useTranslation} from "react-i18next";
import LocaleSwitch from "@/components/locale-switch.tsx";

adjectives.sort(() => Math.random() - 0.5);
const initialVerbalTense = getRandomVerbalTense();

function App() {
  const { t } = useTranslation();

  const [adjectiveList, ] = useState<Adjective[]>(adjectives);

  const [score, setScore] = useState(0)

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const [currentAdjectiveIndex, setCurrentAdjectiveIndex] = useState(0);

  const [verbalTenseToConjugate, setVerbalTenseToConjugate] = useState<VerbalTense>(initialVerbalTense)

  const [userAnswer, setUserAnswer] = useState<string>('');

  const [correctAnswers, setCorrectAnswers] = useState<Adjective[]>([]);

  // If user type the new answer then hide previous correct answers
  useEffect(() => {
    if (userAnswer != '' && showCorrectAnswer) {
      setShowCorrectAnswer(false);
    }
  }, [showCorrectAnswer, userAnswer]);

  // On change

  const checkAnswer = (event: FormEvent) => {
    event.preventDefault();

    // Get the current adjective
    const currentAdjective: Adjective = adjectiveList[currentAdjectiveIndex];

    // Setup adjective conjugator
    let conjugator: AbstractAdjectiveConjugator;

    // Instantiate the right conjugator
    if (currentAdjective.category === 'な') {
      conjugator = new NaAdjectiveCategoryConjugator(currentAdjective);
    } else {
      conjugator = new IAdjectiveCategoryConjugator(currentAdjective);
    }

    const conjugatedAdjective: Adjective[] = conjugator.conjugate(verbalTenseToConjugate);
    console.log(conjugatedAdjective, userAnswer);

    // Check if answer is right or not
    let hasUserAnsweredCorrectly = false;
    for (const conjugatedAdjectiveElement of conjugatedAdjective) {
      if (conjugatedAdjectiveElement.kana === userAnswer || conjugatedAdjectiveElement.kanji === userAnswer){
        hasUserAnsweredCorrectly = true;
        break;
      }
    }

    // Increase or decrease the score
    if (hasUserAnsweredCorrectly) {
      setScore(score + 1);
    } else {
      setScore(score - 2);
    }

    // Generate new random verbal tense
    setVerbalTenseToConjugate(getRandomVerbalTense());

    // Go to the next word
    setCurrentAdjectiveIndex(currentAdjectiveIndex + 1);

    // Empty the input
    setUserAnswer('');

    // Show the correct answers if wrong
    if (!hasUserAnsweredCorrectly) {
      setCorrectAnswers(conjugatedAdjective);
      setShowCorrectAnswer(true)
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <LocaleSwitch />
        <p className="text-right">{t('Score')}: {score}</p>
      </div>

      <div className="w-100 flex flex-col items-center my-4">
        <div className="mb-3.5 flex flex-col items-center">
          <h1 className="text-4xl font-semibold">{adjectiveList[currentAdjectiveIndex].kanji}</h1>
          <p className="text-xl text-gray-400">({adjectiveList[currentAdjectiveIndex].kana})</p>
          <div className="flex items-center">
            <div className="bg-green-500 w-2 h-2 rounded-full mr-2.5"></div>
            <p>{t(verbalTenseToConjugate)}</p>
          </div>
        </div>

        <form onSubmit={checkAnswer} className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="" value={userAnswer} onChange={(evt) => setUserAnswer(evt.currentTarget.value)}/>
            <Button type="submit">{t('Answer')}</Button>
        </form>

        {showCorrectAnswer && <>
            <Separator className="w-1/2 my-6"/>

            <Alert variant='destructive'>
                <AlertTitle className="text-left">{t('Correct answers')}</AlertTitle>
                <AlertDescription className="text-left">
                  <ul className="ml-5">
                    {
                      correctAnswers.map((correctAnswer, index) => [
                        <li className="list-disc" key={index + index + 1}>{correctAnswer.kana}</li>,
                        <li className="list-disc" key={index + index + 2}>{correctAnswer.kanji}</li>
                      ]).flat()
                    }
                  </ul>
                </AlertDescription>
            </Alert>
        </>}
      </div>

    </>
  )
}

export default App
