const fs = require("fs");
const path = require("path");

const path1800 = path.join(__dirname, '1800');
const path2000 = path.join(__dirname, '2000');
const boys = path.join(__dirname, 'boys');
const girls = path.join(__dirname, 'girls');
const Directory = path.join(__dirname, "get-all-files");
const path2021 = path.join(__dirname, "2021");

// 1) Студентів з 1800 перевести в групу на 2000. І навпаки

//  function moveStudents(srcDir,dstDir){
//      fs.readdir(srcDir,(err, files) => {
//          files.forEach(value => {
//              fs.rename(path.join(srcDir,value),path.join(dstDir,value),err => {
//                  if(err){
//                      console.log(err);
//                  }
//              });
//          })
//      })
//  }
// moveStudents(path1800,path2000);

// 2) Перемістити всіх дівчат в папку girls а хлопців в папаку boys.
//  function findGender(filePath){
//      fs.readdir(filePath,(err, files) => {
//          files.forEach(value => {
//              fs.readFile(path.join(filePath,value),(err, data) => {
//                  const {gender}=JSON.parse(data.toString());

//                  if(gender==="female"){
//                      fs.rename(path.join(filePath,value),path.join(girls,value),err =>{
//                          if(err){
//                              console.log(err);
//                          }
//                      })
//                  }else{
//                      fs.rename(path.join(filePath,value),path.join(boys,value),err => {
//                          if(err){
//                              console.log(err);
//                          }
//                      })
//                  }
//              })
//          })
//      })
//  }
// findGender(path1800);
//  * вам потрбіно перемісти всі файлики з вкладених папок в іншу папку. Зробити всі файли на одному рівні вкладеності.
function getAllFiles(fromDir) {
    fs.readdir(fromDir, (err, files) => {
        files.forEach(value => {
            let newPath = path.join(fromDir, value);

            fs.stat(newPath, (err, stats) => {
                if(err){
                    console.log(err);
                }
                stats.isDirectory()
                    ? getAllFiles(newPath)
                    : moveToDir(newPath);
            })
        })
    })
}

function moveToDir(Dir) {
    fs.readFile(Dir, (err, data) => {
        if (err) {
            console.log(err);
        }
        let fileName = Dir.split("\\");
        fileName = fileName[fileName.length - 1];

        fs.rename(Dir,path.join(Directory,fileName),err => {
            if(err){
                console.log(err);
            }
        })
    })
}

getAllFiles(path2021);
