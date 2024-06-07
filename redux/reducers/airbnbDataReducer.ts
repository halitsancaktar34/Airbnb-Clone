import listingsData from "@/assets/data/airbnb-listings.json";
import listingsDateGeo from "@/assets/data/airbnb-listings.geo.json";
import { ADD_TO_FAVORITES, SET_CATEGORY } from "../actionTypes/airbnbDataTypes";

interface FavoriteItem {
  id: any; // Burada uygun bir tür kullanmanız önerilir, örneğin `string` veya `number`
  isLiked?: boolean;
  // Diğer gerekli alanları da buraya ekleyin
}

const initialState = {
  items: listingsData as any,
  geoItems: listingsDateGeo as any,
  category: "Tiny homes",
  favorites: [],
};

const airbnbDataReducer = (
  state = initialState,
  action: {
    payload: any;
    type: any;
  }
) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      const found = state.favorites.find(
        (item: FavoriteItem) => item.id === action.payload.id
      );
      let updatedFavorites;

      if (!found) {
        updatedFavorites = [
          ...state.favorites,
          { ...action.payload, isLiked: true },
        ];
      } else {
        const filtered = state.favorites.filter(
          (i: FavoriteItem) => i.id !== action.payload.id
        );
        updatedFavorites = filtered;
      }

      return {
        ...state,
        favorites: updatedFavorites,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default airbnbDataReducer;
