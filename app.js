console.log("\n----------\nStarting Weather Command line Application\n----------\n");
const fs=require('fs');
const yargs=require('yargs');


//const geocode=require('./api_request/geocode/geocode');
const geocode_promise=require('./api_request/geocode/geocode_promise');
//const weather=require('./api_request/weather/weather');
const weather_promise=require('./api_request/weather/weather_promise');

const argv=yargs
    .option
    ({
        address:
        {
            alias:'a',
            demand:true,
            describe:'To find Weather,Enter the particuar Address',
            string:true
        }
    })
    .help()
    .alias('help','h')
    .argv;

  /*  geocode.Address(argv.a,(errorMessage,result)=>{
        if(errorMessage)
        {
            console.log(errorMessage);
        }else{
            console.log(JSON.stringify(result,undefined,3));
            var Lat=result.Geo_latitude;
            var Lng=result.Geo_longitude;
            weather.CWeather({Lat,Lng},(errorMessage,result)=>{
                if(errorMessage)
                {
                    console.log(errorMessage);
                }else{
                        console.log(`Temperature=${result.Temperature}`);
                        console.log(`Rain Probability=${result.PrecipitationProbability}%`);
                        console.log(`What is the Day gonna be like?\n${result.Summary}`);
                        console.log(`DewPoint=${result.DewPoint}`);
                    }
                });
        }
    });*/

    geocode_promise.Address(argv.a)
    .then((Data)=>{
            console.log(JSON.stringify(Data,undefined,2));
            var Lat=Data.Geo_latitude;
            var Lng=Data.Geo_longitude; 
            return weather_promise.CWeather({Lat,Lng});
        })
    .then((WData)=>{
            console.log(JSON.stringify(WData,undefined,2));
        })
    .catch((errorMessage)=>{
            console.log(errorMessage);
        });
