import { Button } from "@/components/ui/button"
import InputSection from './sections/InputSection';
import OutputSection from "./sections/OutputSection";
import './App.css'

function TipButton() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}

export {TipButton};

function App() {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center bg-(--Grey-200) no-scrollbar">
        <img src="/images/logo.svg" className="m-8" alt="Tip caculator logo" />
        <div className="px-6 py-6 bg-white max-[550px]:max-w-[355px] rounded-2xl shadow-lg mb-10 sm:mb-30 flex flex-col gap-8 sm:flex-row no-scrollbar">
          <InputSection />
          <OutputSection />
        </div>
      </div>
    </>
  );
}

export default App
