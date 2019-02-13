import axios from 'axios'
import  NewsAPI  from 'newsapi'
const newsapi = new NewsAPI('9fc445b0edd1444389c546a48c340109');



export default {
    getNyheterByParams
}


function getNyheterByParams(params, size){
    //let url = encodeURI("https://newsapi.org/v2/everything?apiKey=9fc445b0edd1444389c546a48c340109")
    Object.keys(params).map((key) => {
        if(params[key] == undefined){
            params[key] = "";
        }
    })
    return new Promise((resolve, reject) => {
        newsapi.v2.everything(params).then(response => {
                resolve(response)
            /*
              {
                status: "ok",
                articles: [...]
              }
            */
          });
        // axios.get(url, {
        //     params:  params,
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     } 
        // }, ).then((response) => {
        //     resolve(response)
        // })
        // .catch((error) => {
        //     if(error.status == 400){
        //         resolve(null)
        //     }
        //     else{
        //         reject(error)
        //     }
        // })
    })

}

