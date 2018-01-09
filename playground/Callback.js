var getUser=(id,callback)=>{
    var user={
        id:id,
        name:'Sayam'
    };
    callback(user);
};

getUser(31,(user)=>{
    console.log(`${user.name}\tis Studying Nodejs`);
}
);