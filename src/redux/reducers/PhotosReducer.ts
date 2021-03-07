export const photosReducer = (state = { photos: {} }, action: any) => {
  switch (action.type) {
      case "PHOTOS_REQUEST":
          return { loading: true, photos: {} }
      case "PHOTOS_SUCCESS":
          return { loading: false, photos: action.payload }
      case "PHOTOS_FAIL":
          return { loading: false, error: action.payload }
      default:
          return state
  }
}