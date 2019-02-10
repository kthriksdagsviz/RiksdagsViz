import axios from 'axios'

export default {
    getLedamotByName
}


function getLedamotByName(fname,ename){
    if(!fname){
        fname=""
    }
    if(!ename){
        ename=""
    }
    let url = "http://data.riksdagen.se/personlista/?iid=&fnamn="+ fname +  "&enamn=" + ename + "&f_ar=&kn=&parti=&valkrets=&rdlstatus=tjanst&org=&utformat=json&termlista="
    console.log(url)
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                // xml2js.parseString(response.data, function (err, result) {
                //     resolve(result)
                // });
                resolve(response.data)
                //res.json(resJson)
            })
            .catch((error) => {
                if(error.status == 400){
                    resolve(null)
                }
                else{
                    reject(error)
                }
            })
        
    })
}




