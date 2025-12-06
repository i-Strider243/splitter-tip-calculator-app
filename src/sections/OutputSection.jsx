import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from '../components/ui/button';
import useGlobalContext from "../useGlobal";

const OutputSection = () => {
  const {state,reset} = useGlobalContext();
  const {tipAmount, totalPerPerson} = state;
  
  return (
    <Card className="bg-(--Green-900) text-(--Grey-50) rounded-2xl flex flex-col justify-between sm:w-74">
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center mt-4">
          <div className="text-xs pr-4 text-start text-nowrap">
            <span className="block">Tip Amount</span>
            <span className="text-(--Grey-200) text-[10px] font-light">
              / person
            </span>
          </div>
          <output className="text-2xl sm:text-3xl text-(--Green-400) overflow-x-scroll no-scrollbar">
            ${tipAmount.toFixed(2)}
          </output>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs pr-4 text-start text-nowrap">
            <span className="block">Total</span>
            <span className="text-(--Grey-200) text-[10px] font-light">
              / person
            </span>
          </div>
          <output className="text-2xl sm:text-3xl text-(--Green-400) overflow-x-scroll no-scrollbar">
            ${totalPerPerson.toFixed(2)}
          </output>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={tipAmount || totalPerPerson ? "reset" : "inactive"}
          className="w-full focus-visible:border-(--Grey-200)/50 focus-visible:ring-(--Grey-200)"
          onClick={reset}
        >
          RESET
        </Button>
      </CardFooter>
    </Card>
  );
}

export default OutputSection
