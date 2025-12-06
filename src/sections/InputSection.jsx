import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Input } from '../components/ui/input';
import useGlobalContext from '../useGlobal';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label";

const InputSection = () => {
  const [amount,setAmount] = useState("");
  const [noofPeople, setNoOfPeople] = useState("");
  const [customTip,setCustomTip] = useState("")
  const btnGroup = useRef(null);
  const [activeBtn,setActiveBtn] = useState(null);
  let {state,inputAmount,inputNoOfPeople,calcTip} = useGlobalContext();

  // Reset input fields when global state resets
  useEffect(() => {
    if (
      state.amount === 0 &&
      state.numberOfPeople === 0 &&
      state.tipAmount === 0
    ) {
      // Batch state updates using a microtask to avoid cascading renders
      queueMicrotask(() => {
        setAmount("");
        setNoOfPeople("");
        setCustomTip("");
        setActiveBtn(null);
      });
    }
  }, [state.amount, state.numberOfPeople, state.tipAmount]);


  const handleClick = (value) => {
    setActiveBtn(value);
    calcTip(value);
  };

  const handleCustomChange = (e) => {
    let value = e.target.value;
    if (value !== "" && parseFloat(value) < 0) {
      value = "0";
      e.target.value = value;
    }
    setCustomTip(value);

    // Only call calcTip if it's a valid number
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setActiveBtn("custom");
      calcTip(num);
    }
  };

  return (
    <div className="grid w-full gap-4 py-4 sm:w-[288px]">
      <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:ring-0">
        <InputGroupAddon align="block-start" className="pt-3">
          <Label htmlFor="amount" className="text-foreground">
            Bill
          </Label>
        </InputGroupAddon>
        <InputGroup className="bg-(--Grey-50) border-2 border-(--Grey-50) hover:border-(--Green-400)">
          <InputGroupInput
            type="number"
            id="amount"
            placeholder="0"
            min="0"
            className="text-end ml-2"
            value={amount}
            onChange={(e) => {
              let val = e.target.value;
              if (val !== "" && parseFloat(val) < 0) val = "0";
              setAmount(val);
              inputAmount(val);
            }}
          />
          <InputGroupAddon align="inline-start" className="bg-(--Grey-50)">
            {/* Dollar sign */}
            <img src="/images/icon-dollar.svg" alt="" />
          </InputGroupAddon>
        </InputGroup>
      </InputGroup>
      <ButtonGroup
        orientation="vertical"
        className="flex flex-col items-start gap-8 sm-[314px] m-w-[214px]"
      >
        <ButtonGroupText className="pt-2 text-foreground">
          Select Tip %
        </ButtonGroupText>
        <ButtonGroup
          ref={btnGroup}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 *:rounded"
        >
          {[5, 10, 15, 25, 50].map((value) => (
            <Button
              key={value}
              variant={activeBtn === value ? "active" : "mine"}
              className="sm:max-w-28"
              onClick={() => handleClick(value)}
            >
              {value}%
            </Button>
          ))}
          <Input
            type="number"
            id="no-of-poeple"
            placeholder="Custom"
            min="0"
            className="text-center text-(--Grey-500) bg-(--Grey-50) hover:bg-(Grey-200) border-2 border-(--Grey-50) hover:border-(--Green-400)"
            value={customTip}
            onChange={handleCustomChange}
          />
        </ButtonGroup>
      </ButtonGroup>
      <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:ring-0">
        <InputGroupAddon
          align="block-start"
          className="pt-3 flex justify-between"
        >
          <Label htmlFor="no-of-people" className="text-foreground">
            Number of People
          </Label>
          {state.showLabel && (
            <Label className="text-red-500">Can't be zero</Label>
          )}
        </InputGroupAddon>
        <InputGroup className="bg-(--Grey-50) border-2 border-(--Grey-50) hover:border-(--Green-400)">
          <InputGroupInput
            type="number"
            id="no-of-people"
            placeholder="0"
            min="0"
            className="text-end ml-2"
            value={noofPeople}
            onChange={(e) => {
              let val = e.target.value;
              if (val !== "" && parseFloat(val) < 0) val = "0";
              setNoOfPeople(val);
              inputNoOfPeople(val);
            }}
          />
          <InputGroupAddon align="inline-start" className="bg-(--Grey-50)">
            {/* Person sign */}
            <img src="/images/icon-person.svg" alt="" />
          </InputGroupAddon>
        </InputGroup>
      </InputGroup>
    </div>
  );
}

export default InputSection
