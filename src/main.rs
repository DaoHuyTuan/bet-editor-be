mod controllers;
mod models;

use crate::controllers::{PostController, UserController};
use crate::models::Models::{post, user};
use axum::{
    http::{request::Parts, StatusCode},
    response::Json,
    routing::{get, post},
    Router,
};
use diesel::prelude::*;

use post::Post;

#[tokio::main]
async fn main() {
    let db_url = std::env::var("DB_URL").unwrap();
    let manager = deadpool_diesel::postgres::Manager::new(db_url, deadpool_diesel::Runtime::Tokio1);
    let pool = deadpool_diesel::postgres::Pool::builder(manager)
        .build()
        .unwrap();
    let app = Router::new()
        .route("/users", get(UserController::get_users()))
        .route("/posts", get(PostController::get_posts()))
        .with_state(pool);
    // build our application with a single route
    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
