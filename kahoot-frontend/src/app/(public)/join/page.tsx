import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import UsernameForm from "../_components/username-form";
// Kahoot.it landing page
export default function Page({
  searchParams
}: {
  searchParams: { quizId: string }
}) {
  console.log(searchParams);
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
        <UsernameForm href={`/instructions?quizId=${searchParams.quizId}`} />
      </div>
    </section>
  );
}
