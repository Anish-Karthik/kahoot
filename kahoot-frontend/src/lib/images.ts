export const images = [
  "https://cdn-icons-png.flaticon.com/512/714/714036.png",
  "https://cdn-icons-png.flaticon.com/512/1810/1810989.png",
  "https://cdn-icons-png.flaticon.com/512/141/141836.png",
  "https://cdn-icons-png.flaticon.com/512/141/141793.png",
  "https://cdn-icons-png.freepik.com/512/141/141782.png",
  "https://cdn-icons-png.flaticon.com/512/141/141783.png",
  "https://cdn-icons-png.flaticon.com/512/424/424791.png",
  "/players/profile1.png",
  "/players/profile2.png",
  "/players/profile3.png",
  "/players/profile4.webp",
  "/players/profile5.webp",
];

export const getRandomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};