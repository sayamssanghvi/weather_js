const axios=require('axios');

var Background=(geoURL)=>{
    
    axios.get(geoURL)
    .then((Gdata)=>{
        
        if(Gdata.data.status=='ZERO_RESULTS'){
            throw new Error('Unable to find given the address');
        }

        var location=Gdata.data.results[0].formatted_address;
        var lat=Gdata.data.results[0].geometry.location.lat;
        var lng=Gdata.data.results[0].geometry.location.lng;
        var weaURL=`https://api.darksky.net/forecast/e9eb51f6ef9c9770ef9cbbcd55f3b711/${lat},${lng}?exclude=minutely,hourly,daily,flags&units=si`    

        console.log(`Full Address=${location}\n`);
        return axios.get(weaURL);
   
    })
   .then((Wdata)=>{

        console.log(`Temperature=${Wdata.data.currently.temperature}\n`);
        console.log(`PrecipitationProbability=${Wdata.data.currently.precipProbability*100}\n`);
        console.log(`Summary=${Wdata.data.currently.summary}\n`);
        console.log(`DewPoint=${Wdata.data.currently.dewPoint}\n`);

    })
    .catch((errorMessage)=>{

        if(errorMessage.code == 'ENOTFOUND')
            console.log('Unable to connect to  servers');
        else if(errorMessage.code == 'EAI_AGAIN')
            console.log('Please check your internet connections');  
        else
            console.log(errorMessage.message);

    });
};

module.exports={
    Background
};