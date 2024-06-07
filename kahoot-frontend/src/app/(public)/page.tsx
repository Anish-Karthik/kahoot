import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import JoinQuizForm from "./_components/join-quiz-form";
import Link from "next/link";
// Kahoot.it landing page
export default function Home() {
  return (
    <section className="w-full h-full">
      <div className="flex flex-col items-center relative z-20 mx-auto -mt-10">
        <div className="py-14">
          <Image
            src="/KahootLogo_Full_white.png"
            alt="logo"
            width={200}
            height={50}
          />
        </div>
        <JoinQuizForm />
      </div>
      <div className="fixed bottom-10 inset-x-0 z-20">
        <div className="flex justify-center gap-4">
          <Link href="/questionset">
            <Button className="text-center font-bold bg-white text-black/90 w-32 rounded-sm">
              Create
            </Button>
          </Link>
          {/* <Button className="text-center font-bold bg-white text-black/90 w-32 rounded-sm">Join</Button> */}
        </div>
      </div>
    </section>
  );
}
