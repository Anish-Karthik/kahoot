import React from "react";
import { FaGlobe, FaAngleUp, FaUser, FaUnlockAlt } from "react-icons/fa";
import ChatRoom from "@/components/lobby/ChatRoom";
import PlayerCount from "@/components/lobby/PlayerCount";
import Link from "next/link";
import "./lobby.css"

type Player = {
  id?: number;
  username: string;
  image: string;
};

const Lobby = ({
  searchParams,
}: {
  searchParams: { quizId: number; gameCode: string };
}) => {
  return (
    <section className="home">
      <div className="header">
        <header className="lobby-header">
          <div className="top-left-icon">
            <FaGlobe /> <h3 className="font-semibold"> EN</h3>
          </div>
          <div className="text">
            <h3>Game PIN: {searchParams.gameCode}</h3>
          </div>
          <div className="absolute left-3 size-6 rounded-full bg-white flex items-center justify-center cursor-pointer">
            <FaAngleUp />
          </div>
        </header>
      </div>

      <div className="lobby-container">
        <div className="number">
          <FaUser />
          <PlayerCount />
        </div>
        <div className="Kahoot">
          <img src="/KahootLogo_Full_white.png" alt="" />
        </div>
        <div className="rightside">
          <div className="mr-5 size-6 rounded-full bg-white flex items-center justify-center cursor-pointer">
            <FaUnlockAlt />
          </div>
          <Link
            href={`/quiz?quizId=${searchParams.quizId}&gameCode=${searchParams.gameCode}&status=started`}
            className="start"
          >
            Start
          </Link>
        </div>
      </div>
      <ChatRoom roomNumber={searchParams.gameCode} />
    </section>
  );
};

export default Lobby;
