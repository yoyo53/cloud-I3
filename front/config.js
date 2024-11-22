if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let config = {
    api_url: process.env.NODE_ENV !== 'production' ? process.env.API_URL : "__NEXT_APP_API_URL__",
    base_url: process.env.NODE_ENV !== 'production' ? process.env.BASE_PATH : "/__NEXT_APP_BASE_PATH__"
};

module.exports = { config }