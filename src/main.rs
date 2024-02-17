use axum::{routing::get, Router};

mod routes;
mod controllers;
mod routers;

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app: Router = routers;

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
