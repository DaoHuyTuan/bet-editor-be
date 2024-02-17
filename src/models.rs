pub mod Models {
    pub mod user {
        #[derive(serde::Serialize, Selectable, Queryable)]
        pub struct User {
            pub name: String,
            pub age: String,
        }
        impl User {
            pub fn get_user(&self) {}
            pub fn login(&self) {}
        }
    }
    pub mod post {
        pub struct Post {
            title: String,
            contents: String,
        }
        impl Post {
            fn get_posts(&self) {}
            fn get_post(&self) {}
        }
    }
}
