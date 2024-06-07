import { LiveUser } from "@/types";
import { create } from "zustand";

type ActivePlayersState = {
  players: Map<string, LiveUser>;
  getActivePlayers: () => LiveUser[];
  getActivePlayersCount: () => number;
  setPlayers: (players: LiveUser[]) => void;
  addPlayer: (player: LiveUser) => void;
  removePlayer: (player: string) => void;
  updatePlayer: (player: LiveUser) => void;
};

export const useActivePlayers = create<ActivePlayersState>((set, get) => {
  return {
    players: new Map(),
    getActivePlayersCount: () => get().players.size,
    getActivePlayers: () => Array.from(get().players.values()),
    setPlayers: (players) => {
      const playerMap = new Map<string, LiveUser>();
      players.forEach((player) => playerMap.set(player.username, player));
      set({ players: playerMap });
    },
    addPlayer: (player) => {
      set((state) => {
        console.log(player);
        state.players.set(player.username, player);
        return {...state};
      });
    },
    removePlayer: (player) => {
      set((state) => {
        state.players.delete(player);
        return {...state};
      });
    },
    updatePlayer: (player) => {
      set((state) => {
        state.players.set(player.username, player);
        return {...state};
      });
    },
  };
});
