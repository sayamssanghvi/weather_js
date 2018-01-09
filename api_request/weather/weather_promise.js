const request=require('request');

var CWeather=(geoLoc)=>{
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        request({url:`https://api.darksky.net/forecast/e9eb51f6ef9c9770ef9cbbcd55f3b711/${geoLoc.Lat},${geoLoc.Lng}?exclude=minutely,hourly,daily,flags&units=si`,
                json:true},
                (error,response,body)=>{
                     if(error || response.statusCode==404)
                        reject("Unable to connect to weather servers.Please Check your internet connection");
                     else{
                        var WData={
                            Temperature:             body.currently.temperature,
                            PrecipitationProbability:body.currently.precipProbability*100,
                            Summary:                 body.currently.summary,
                            DewPoint:                body.currently.dewPoint
                          };
                        resolve(WData);
                        }
             });
    },1000);       
    });
};

module.exports={
    CWeather
};