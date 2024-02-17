pub mod UserController {
    use crate::models::Models::user::User;
    use axum::{
        extract::State,
        http::StatusCode,
        response::Json,
        routing::{get, post},
        Router,
    };
    fn internal_error<E>(err: E) -> (StatusCode, String)
    where
        E: std::error::Error,
    {
        (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
    }
    pub async fn get_users(
        State(pool): State<deadpool_diesel::postgres::Pool>,
    ) -> Result<Json<Vec<User>>, (StatusCode, String)> {
        let conn = pool.get().await.map_err(internal_error)?;
        let res = conn
            .interact(|conn| users::table.select(User::as_select()).load(conn))
            .await
            .map_err(internal_error)?
            .map_err(internal_error)?;
        Ok(Json(res))
        // let user = User {
        //     name: String::from("tuan"),
        //     age: String::from("324"),
        // };
        // user.get_user();
        // println!("hello {} with age {}", user.name, user.age);
    }
}

pub mod PostController {
    pub fn get_posts() {}
}
