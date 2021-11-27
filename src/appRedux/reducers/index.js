import { combineReducers } from "redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Post from "./Post";
import Utility from "./Utitlity";
import PostTypes from "./PostTypes";
import RoomTypes from "./RoomTypes";
import Admin from "./Admin";
import { connectRouter } from "connected-react-router";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    common: Common,
    post: Post,
    utility: Utility,
    postTypes: PostTypes,
    roomTypes: RoomTypes,
    admin: Admin,
  });
