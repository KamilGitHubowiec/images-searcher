const APP_ACCESS_KEY: string = "i5C6TJTnfiMGXZD3XDzdTjj7KKXgcGpSTXnGHLahO_U";

export const getPhotosUrl = (query: string, page: number = 1) => {
  return `https://api.unsplash.com/search/photos?client_id=${APP_ACCESS_KEY}&query=${query}&page=${page}&per_page=30`;
}

export const getPhotoUrl= (id: string) => {
  return `https://api.unsplash.com/photos/:${id}?client_id=${APP_ACCESS_KEY}`;
}

export const getRandomPhotoUrl = () => {
  return `https://api.unsplash.com/photos/random?client_id=${APP_ACCESS_KEY}`;
}
