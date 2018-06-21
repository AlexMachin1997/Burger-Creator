/* 
Import Notes: 
- Imports axios so the baseURL can be construcuted
*/

import axios from "axios"

/* 
Axios-orders Notes: 
- Creates a baseURL which is the url provided by firebase for the database
- Its then exported and when the axios-orders is imported the post can be used like this /posts.json as the partial URL is created here
*/

//Creating An Axios Instance And Configuring The Base URL
const instance = axios.create({
    baseURL: "https://burger-builder-backend-server.firebaseio.com/"
});

export default instance;