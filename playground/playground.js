// Async Basics
console.log("Starting Async");

var Callback=() =>{
    console.log("This is a Asynchronous task");
}

setTimeout(Callback,10000);

setTimeout(()=>{
    console.log("This is Asynchronous Task-2");
},0);

console.log("Finishing Async");
