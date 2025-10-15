import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
        <div className="text-4xl font-bold text-green-500">
          Hello World
        </div>
        <Button>Click me</Button>
      </div>
    </>
  )
}
