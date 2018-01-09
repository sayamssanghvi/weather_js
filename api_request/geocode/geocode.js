const fs=require('fs');
const request=require('request');

var Address=(address,callback)=>
{
    console.log(`\n----------\nThe Address is ="${address}"\n----------\n`);
    var EncodedAddress=encodeURIComponent(address);
    request({
        url:`http://maps.googleapis.com/maps/api/geocode/json?address=${EncodedAddress}`,
        json:true
    },(error,response,body)=>{
        if(error)
        {       
        callback('Unable to contact google servers.PLease check your internet connection');
        }else if(body.status=="OK")
        {
        fs.writeFileSync('CallBack_Result.json',JSON.stringify(body,undefined,2));
        var Data={
            location:`the requested address=${body.results[0].formatted_address}`,
            Geo_latitude:body.results[0].geometry.location.lat,
            Geo_longitude:body.results[0].geometry.location.lng
        };
        callback(undefined,Data);
        fs.writeFileSync('Output.json',JSON.stringify(Data,undefined,3));;
        }else{
            console.log(`The Entered address="${address}" is Invalid`);    
        }
    });
};

module.exports=
{
    Address
};