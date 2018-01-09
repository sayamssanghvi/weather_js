const fs=require('fs');
const request=require('request');

var Address=(Address)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            var EncodedAddress=encodeURIComponent(Address);
            request({url:`https://maps.googleapis.com/maps/api/geocode/json?address=${EncodedAddress}&key=AIzaSyCWV0-gZIBHRtez7hgFV9c-jIsDMrTqMVc`,
                     json:true},
                     (error,response,body)=>{
                        if(error){
                            resolve('Unable to contact google servers');
                        }else if(body.status=="OK")
                        {
                        var Data={
                            location:`the requested address=${body.results[0].formatted_address}`,
                            Geo_latitude:body.results[0].geometry.location.lat,
                            Geo_longitude:body.results[0].geometry.location.lng
                        };
                            resolve(Data);
                        }else{
                            reject('The entered address is invalid');
                     }
                     
                    });            
        },1000)
    });
};

module.exports={
    Address
};