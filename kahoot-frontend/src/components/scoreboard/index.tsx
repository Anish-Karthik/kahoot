import React from "react";
import "./index.css";
import { cn } from "@/lib/utils";
import { Leaderboard } from "@/types";

const demoLeaderboardData = [
  {
    position: 2,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/714/714036.png",
    username: "Divya",
    score: 6794,
  },
  {
    position: 1,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1810/1810989.png",
    username: "Karthik",
    score: 6853,
  },
  {
    position: 3,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/141/141836.png",
    username: "Janani",
    score: 6034,
  },
  {
    position: 4,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/141/141793.png",
    username: "Jakshi",
    score: 5980,
  },
  {
    position: 5,
    imageUrl: "https://cdn-icons-png.freepik.com/512/141/141782.png",
    username: "Tamizh",
    score: 5978,
  },
  {
    position: 6,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/141/141783.png",
    username: "Gopinath",
    score: 5845,
  },
  {
    position: 7,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/424/424791.png",
    username: "Mathan",
    score: 5799,
  },
  {
    position: 4 + 4,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/141/141793.png",
    username: "Jakshi",
    score: 5980,
  },
  {
    position: 5 + 4,
    imageUrl: "https://cdn-icons-png.freepik.com/512/141/141782.png",
    username: "Tamizh",
    score: 5978,
  },
  {
    position: 6 + 4,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/141/141783.png",
    username: "Gopinath",
    score: 5845,
  },
  {
    position: 7 + 4,
    imageUrl: "https://cdn-icons-png.flaticon.com/512/424/424791.png",
    username: "Mathan",
    score: 5799,
  },
];

const Scoreboard = ({
  leaderboardData = demoLeaderboardData,
}: {
  leaderboardData?: Leaderboard[];
}) => {
  return (
    <section className="section overflow-y-auto">
      <div className="center">
        <h1 className="mb-16  text-3xl font-bold">Podium!</h1>
        <div className="top3">
          {leaderboardData.slice(0, 3).map((item) => (
            <div
              className={cn(
                "item",
                item.position === 1 &&
                  "!bg-[#f9d71c] scale-110 hover:!scale-125",
                item.position === 2 && "!bg-[#d3d3d3]",
                item.position === 3 &&
                  "!bg-[#cd7f32] scale-y-90 hover:!scale-100 hover:!scale-x-110"
              )}
              key={item.position}
            >
              <div className="pos">{item.position}</div>
              <div
                className="pic"
                style={{
                  backgroundImage: `url('${item.imageUrl}')`,
                }}
              ></div>
              <div className="name">{item.username}</div>
              <div className="score">{item.score}</div>
            </div>
          ))}
        </div>
        <div className="list">
          {leaderboardData.slice(3).map((item) => (
            <div className="item" key={item.position}>
              <div className="pos">{item.position}</div>
              <div
                className="pic"
                style={{
                  backgroundImage: `url('${item.imageUrl}')`,
                }}
              ></div>
              <div className="name">{item.username}</div>
              <div className="score">{item.score}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Scoreboard;
