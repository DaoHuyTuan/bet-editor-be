use axum::{routing::get, Router};

use crate::controllers::{PostController, UserController};

const app: Router = Router::new().route(
    "/",
    get(UserController::get_users()).route("/posts", get(PostController::get_posts())),
);
