const express = require('express'); // Importa la librería Express
const app = express(); // Crea una instancia de la aplicación
app.use(express.json()); // Permite manejar datos en formato JSON desde el cliente

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
// Servicio GET para devolver la lista de nombres
app.get('/nombre', (req, res) => {
    res.json(lista); // Devuelve la lista en formato JSON
});

// Servicio GET con un mensaje de bienvenida personalizado
app.get('/paul', (req, res) => {
    res.send('Hola mi nombre es Paul Ormaza, tengo 21 años');
});

// Servicio GET para una suma simple sin parámetros
app.get('/suma', (req, res) => {
    let n1 = 7;
    let n2 = 3;
    let suma = n1 + n2;
    res.send('El resultado de la suma es: ' + suma);
});

// Servicio GET para una suma usando un parámetro en la URL
app.get('/suma/:n1', (req, res) => {
    let num1 = parseInt(req.params.n1); // Captura el parámetro desde la URL
    let num2 = 3;
    let suma = num1 + num2;
    res.send('El resultado de la suma es: ' + suma);
});

/* ----------------- NUEVAS FIGURAS GEOMÉTRICAS ----------------- */

// 1. CÍRCULO: Calcula el área y el perímetro del círculo
app.get('/figura/circulo/:radio', (req, res) => {
    const pi = 3.1416; // Valor fijo de π
    let radio = parseFloat(req.params.radio); // Recibe el radio desde el cliente

    if (radio > 0) { // Validación para asegurar que el radio es positivo
        let area = pi * radio * radio; // Fórmula del área: π * radio²
        let perimetro = 2 * pi * radio; // Fórmula del perímetro: 2 * π * radio

        res.json({
            figura: 'Círculo',
            radio: radio,
            area: area.toFixed(2),
            perimetro: perimetro.toFixed(2)
        });
    } else {
        res.status(400).send('El radio debe ser un número mayor que 0');
    }
});

// 2. PENTÁGONO: Calcula el área y el perímetro del pentágono
app.get('/figura/pentagono/:lado/:apotema', (req, res) => {
    let lado = parseFloat(req.params.lado); // Longitud de un lado
    let apotema = parseFloat(req.params.apotema); // Apotema del pentágono

    if (lado > 0 && apotema > 0) { // Verifica que los parámetros sean positivos
        let perimetro = 5 * lado; // Perímetro = 5 * lado
        let area = (perimetro * apotema) / 2; // Área = (Perímetro * apotema) / 2

        res.json({
            figura: 'Pentágono',
            lado: lado,
            apotema: apotema,
            area: area.toFixed(2),
            perimetro: perimetro.toFixed(2)
        });
    } else {
        res.status(400).send('El lado y la apotema deben ser números mayores que 0');
    }
});

// 3. TRAPECIO ISÓSCELES: Calcula el área y el perímetro
app.get('/figura/trapecio/:baseMayor/:baseMenor/:lado/:altura', (req, res) => {
    let baseMayor = parseFloat(req.params.baseMayor); // Base mayor
    let baseMenor = parseFloat(req.params.baseMenor); // Base menor
    let lado = parseFloat(req.params.lado); // Lado del trapecio
    let altura = parseFloat(req.params.altura); // Altura del trapecio

    if (baseMayor > 0 && baseMenor > 0 && lado > 0 && altura > 0) { // Validación
        let area = ((baseMayor + baseMenor) * altura) / 2; // Área = [(B + b) * h] / 2
        let perimetro = baseMayor + baseMenor + 2 * lado; // Perímetro = B + b + 2 * lado

        res.json({
            figura: 'Trapecio Isósceles',
            baseMayor: baseMayor,
            baseMenor: baseMenor,
            lado: lado,
            altura: altura,
            area: area.toFixed(2),
            perimetro: perimetro.toFixed(2)
        });
    } else {
        res.status(400).send('Las bases, lados y altura deben ser números mayores que 0');
    }
});

// Servidor escuchando en el puerto 3003
app.listen(3003, () => {
    console.log('Servidor ejecutándose en el puerto 3003 7w7');
});


