const express = require ('express');
const app = express();
app.use(express.json());

var lista = [{
    id:'1',
    nombre:'Paul'
},{
    id:'2',
    nombre:'Jose'
}];

//USO APP
//WEB SERVICE DE TIPO GET
//estructura de servicio web aser un nombre es una cadena
app.get('/nombre',(req,res)=>{
    res.json(lista);

});

app.get('/paul',(req, res)=>{
    res.send('Hola mi nombre es Paul Ormaza, tengo 21 años');

});

app.get('/suma',(req, resp)=>{
    let n1=7;
    let n2=3;
    let suma = n1+n2;
    resp.send(suma+'');
});

app.get('/suma/:n1',(req, resp)=>{
    //obtiene el dato
    let num1 = parseInt(req.params.n1);
    let num2=3;
    let suma = num1+num2;
    resp.send('El resultado de la suma es :'+suma);
});


app.listen(3003,()=>{
    console.log('Se levanto el servicio en el puerto 3003')
})