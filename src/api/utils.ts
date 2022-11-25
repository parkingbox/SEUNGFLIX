export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
export function makeVideoPath(key: string) {
  return `https://youtube.com/embed/${key}?showinfo=0&controls=0&enablejsapi=1&t=6&origin=http://localhost:3000`;
}

export const NothingPoster =
  "https://user-images.githubusercontent.com/79081800/150473965-fbc32c06-12b2-4b22-8c75-fba34e923475.jpg";

