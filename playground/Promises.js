/*
var something=new Promise((resolve,reject)=>{
    reject("Unable to connect");
});

something.then(
               (message)=>{console.log(message);},
               (Errormessage)=>{console.log(Errormessage);  }
);*/
var sum=(a,b) =>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
          if(typeof a =='number' && typeof b=='number')
          {
              resolve(a+b);
          }else
          {
              reject('PLZ Enter a Number');
          }
      },2500);  
    });
};           

sum(5,55).then((message)=>{
                console.log(`Sum= ${message}`);
                return sum(message,552.5);
                })
          .then((SecMessage)=>{console.log(SecMessage)})
          .catch((ErrorMessage)=>{console.log(ErrorMessage)});  