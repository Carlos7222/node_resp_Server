




//=======
//puerto
//======
process.env.PORT= process.env.PORT || 3000
//=======
//entorno
//======
process.env.NODE_ENV= process.env.NODE_ENV || 'dev';

let urldb;
if(process.env.NODE_ENV=='dev'){
    urldb='mongodb://localhost:27017/cafe'
}else{
    urldb='mongodb+srv://carlos7888:lomaspro85@cluster0.tjpjm.mongodb.net/cafe?retryWrites=true&w=majority'
}
 
process.env.urldb=urldb;