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
            const data = Object.assign({}, response.data.personlista)
            if (data['@hits'] == 1) {
                data.person = Array(data.person)
            }
            if(size > 0 && size < data['@hits']){
                data.person.splice(0, data['@hits'] - size);
                data['@hits'] = size;
            }
            resolve(data)
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
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                console.log(response)
                //resolve(response.data)
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




