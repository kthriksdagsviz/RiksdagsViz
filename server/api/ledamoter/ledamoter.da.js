import axios from 'axios'

export default {
    getLedamotByName,
    getLedamoterBySize,
    getLedamoterByGroup,
    getLedamoterByParams
}


function getLedamoterByParams(params, size){
    
    let url = "http://data.riksdagen.se/personlista/";
    Object.keys(params).map((key) => {
        if(params[key] == undefined){
            params[key] = "";
        }
    })
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params:  params 
        }).then((response) => {
            //console.log(response.data)
            resolve(response.data)
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
                resolve(response.data)
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

function getLedamoterBySize(size){
    let url = "http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=tjanst&org=&utformat=json&termlista="
}

function getLedamoterByGroup(group){
    let url = "http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&termlista=" + group;
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {      
                resolve(response.data)
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




