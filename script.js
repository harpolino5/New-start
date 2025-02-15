fetch("http:/localhost:3000/jokes", {
    method:"get"
}).then(res=>res.json()).then(data=>{
    console.log(data)
})