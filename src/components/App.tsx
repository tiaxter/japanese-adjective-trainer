import {FormEvent, useEffect, useState} from 'react'
import './App.css'
import adjectives from '../assets/adjectives.json'
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Adjective} from "@/types/adjective.ts";

adjectives.sort(() => Math.random() - 0.5);

function App() {
  const [adjectiveList, ] = useState<Adjective[]>(adjectives);

  const [score, setScore] = useState(0)

  const [showCorrectAnswer, setShowCorrectAnswer] = useState(true);

  const [currentAdjectiveIndex, setCurrentAdjectiveIndex] = useState(0);

  const [userAnswer, setUserAnswer] = useState('');

  // On change

  const checkAnswer = (event: FormEvent) => {
    event.preventDefault();

    console.log(userAnswer);
    // TODO: conjugate adjective

    // TODO: check if answer is right or not

    // TODO: increase or decrease the score

    // TODO: show the correct answers if wrong

    // TODO: go to the next word
    setCurrentAdjectiveIndex(currentAdjectiveIndex + 1);

    // Empty the input
    setUserAnswer('');
  };

  return (
    <>
      <p className="text-right">Score: {score}</p>

      <div className="w-100 flex flex-col items-center my-4">
        <div className="mb-3.5 flex flex-col items-center">
          <h1 className="text-4xl font-semibold">{adjectiveList[currentAdjectiveIndex].kanji}</h1>
          <p className="text-xl text-gray-400">({adjectiveList[currentAdjectiveIndex].kana})</p>
          <div className="flex items-center">
            <div className="bg-green-500 w-2 h-2 rounded-full mr-2.5"></div>
            <p>Passato</p>
          </div>
        </div>

        <form onSubmit={checkAnswer} className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="" value={userAnswer} onChange={(evt) => setUserAnswer(evt.currentTarget.value)}/>
            <Button type="submit">Answer</Button>
        </form>

        {showCorrectAnswer && <>
            <Separator className="w-1/2 my-6"/>

            <Alert variant='destructive'>
                <AlertTitle className="text-left">Correct answers</AlertTitle>
                <AlertDescription className="text-left">
                    Lorem ipsum dolor si
                </AlertDescription>
            </Alert>
        </>}

      </div>

    </>
  )
}

export default App
