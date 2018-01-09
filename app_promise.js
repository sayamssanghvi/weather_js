console.log("\n----------\nStarting Weather Command line Application\n----------\n");
const fs=require('fs');
const yargs=require('yargs');

var Background=require('./api_request/geo_wea_axios');

const argv=yargs
    .option
    ({
        address:
        {
            alias:'a',
                describe:'To find Weather,Enter the particuar Address',
            string:true
        },
        default:
        {
            alias:'d',
            describe:'To set a default address'
        },
        get:{
            alias:'g',
            describe:'To get Weather info on the defalut Address',
        }
    })
    .help()
    .alias('help','h')
    .argv;

    if(argv.a!=undefined)
    {
        var EncodedAddress=encodeURIComponent(argv.a);
        var geoURL=`https://maps.googleapis.com/maps/api/geocode/json?address=${EncodedAddress}&key=AIzaSyCWV0-gZIBHRtez7hgFV9c-jIsDMrTqMVc`;
    
        Background.Background(geoURL);

    }else if(argv.d!=undefined){

        var EncodedAddress={
            A:encodeURIComponent(argv.d)
        };
    
        fs.writeFileSync('default_address.json',JSON.stringify(EncodedAddress));
        console.log('Your default address is saved');

    }else if(argv.g){

        var EncodedAddress=JSON.parse(fs.readFileSync('default_address.json'));
        var geoURL=`https://maps.googleapis.com/maps/api/geocode/json?address=${EncodedAddress.A}&key=AIzaSyCWV0-gZIBHRtez7hgFV9c-jIsDMrTqMVc`; 
        console.log(`Default Address=${EncodedAddress.A}\n`);

        Background.Background(geoURL);
        
    }
