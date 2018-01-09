const request=require('request');
const fs=require('fs');

var CWeather=(geoLoc,callback)=>{
    request({   
        url:`https://api.darksky.net/forecast/e9eb51f6ef9c9770ef9cbbcd55f3b711/${geoLoc.Lat},${geoLoc.Lng}?exclude=minutely,hourly,daily,flags&units=si`,
        json:true
    },(error,response,body)=>{
        if(error || response.statusCode==404)
        {
            callback("Unable to connect to weather servers.Please Check your internet connection");
        }else{
            fs.writeFileSync("OutputWeather.js",JSON.stringify(response,undefined,3));
              var Data={
                  Temperature:             body.currently.temperature,
                  PrecipitationProbability:body.currently.precipProbability*100,
                  Summary:                 body.currently.summary,
                  DewPoint:                body.currently.dewPoint
              };
              callback(undefined,Data);
        }
        });
};

module.exports={
    CWeather
};