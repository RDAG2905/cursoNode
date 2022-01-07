const fs = require('fs')

class Contenedor{

    constructor(fileName){
        this.fileName =  fileName
      
    }
    
    
    async save(product){
            const contenido = await this.getAll()
            const products = JSON.parse(contenido)
            const exists =  products.find(producto=>producto.title == product.title);
            
            if (exists == undefined){
            //if (!exists){
                
            
                if(products.length == 0 ){
                    product.id = 1
                
                }else{
                    let maxId = products.slice(-1)[0].id
                    product.id = maxId + 1
                    
                }
                products.push(product)  
                console.log(products)
               /* products.
                forEach(element => {
                console.log(element)    
                });*/
                      
                await fs.promises.writeFile(this.fileName,JSON.stringify(products))
                return product.id
            }else{
                console.error(`El producto ${product.title} ya se encuentra en la lista `); 
            }   
    
    
    }
    
    
    async getById(id){
        const contenido = await this.getAll()
        const products = JSON.parse(contenido)
        const resultado =  products.filter(x => x.id == id)
        return resultado[0]
    }
    
    
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.fileName,'utf-8')
            return contenido
        }catch(err){
            throw new Error(`Error al abrir el archivo: ${err}`)
        }
    }
    
    
    async deleteById(id){
        try{
            const contenido = await this.getAll()
            const products = JSON.parse(contenido)
            const remanente =  products.filter(x => x.id != id)
            await fs.promises.writeFile(this.fileName,JSON.stringify(remanente))
        }catch(error){
            throw new Error(`Error al Eliminar Por Id : ${error}`)
    
        }
    }
    
    
    async deleteAll(){
        await fs.promises.writeFile(this.fileName,JSON.stringify([]))
    }
    
    }
    
    module.exports = Contenedor