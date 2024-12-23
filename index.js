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
    // Reemplaza comas por puntos antes de convertir a número
    let lado = parseFloat(req.params.lado.replace(',', '.')); 
    let apotema = parseFloat(req.params.apotema.replace(',', '.')); 

    // Verifica que los valores sean números mayores a 0
    if (lado > 0 && apotema > 0) {
        let perimetro = 5 * lado; // Cálculo del perímetro
        let area = (perimetro * apotema) / 2; // Cálculo del área

        // Respuesta en formato JSON
        res.json({
            
            lado: lado,
            apotema: apotema,
            area: area.toFixed(2), // Redondeo a 2 decimales
            perimetro: perimetro.toFixed(2) // Redondeo a 2 decimales
        });
    } else {
        // Si los valores no son válidos, envía un error
        res.status(400).send('El lado y la apotema deben ser números mayores que 0');
    }
});


// 3. TRAPECIO ISÓSCELES: Calcula el área y el perímetro
app.get('/figura/trapecio/:baseMayor/:baseMenor/:lado/:altura', (req, res) => {
    // Reemplaza comas por puntos antes de convertir a número
    let baseMayor = parseFloat(req.params.baseMayor.replace(',', '.'));
    let baseMenor = parseFloat(req.params.baseMenor.replace(',', '.'));
    let lado = parseFloat(req.params.lado.replace(',', '.'));
    let altura = parseFloat(req.params.altura.replace(',', '.'));

    // Validación de valores positivos
    if (isNaN(baseMayor) || isNaN(baseMenor) || isNaN(lado) || isNaN(altura)) {
        return res.status(400).send('Todos los parámetros deben ser números válidos.');
    }

    if (baseMayor <= 0 || baseMenor <= 0 || lado <= 0 || altura <= 0) {
        return res.status(400).send('Todos los parámetros (baseMayor, baseMenor, lado y altura) deben ser mayores que 0.');
    }

    // Validación geométrica: La base mayor debe ser mayor que la base menor
    if (baseMayor <= baseMenor) {
        return res.status(400).send('La base mayor debe ser mayor que la base menor.');
    }

    // Cálculos del área y perímetro
    let area = ((baseMayor + baseMenor) * altura) / 2; // Área = [(B + b) * h] / 2
    let perimetro = baseMayor + baseMenor + 2 * lado; // Perímetro = B + b + 2 * lado

    // Respuesta en formato JSON
    res.json({
      
        baseMayor: baseMayor,
        baseMenor: baseMenor,
        lado: lado,
        altura: altura,
        area: area.toFixed(2),
        perimetro: perimetro.toFixed(2)
    });
});

//CALCULO DE TRINOMIO CUADRADO PERFECTO

app.get('/trinomio/:a/:b/:operador/:c/:x?', (req, res) => {
    // Captura los parámetros y convierte a números
    let a = parseFloat(req.params.a.replace(',', '.')); // Coeficiente a
    let b = parseFloat(req.params.b.replace(',', '.')); // Coeficiente b
    let operador = req.params.operador; // "+" o "-"
    let c = parseFloat(req.params.c.replace(',', '.')); // Constante c
    let x = req.params.x ? parseFloat(req.params.x.replace(',', '.')) : null; // Valor opcional para la ecuación

    // Validaciones iniciales
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        return res.status(400).send('Los valores de "a", "b" y "c" deben ser números válidos.');
    }

    if (operador !== '+' && operador !== '-') {
        return res.status(400).send('El operador debe ser "+" o "-".');
    }

    if (x !== null && isNaN(x)) {
        return res.status(400).send('El valor de "x" debe ser un número válido si se incluye.');
    }

    // Cálculo del trinomio cuadrado perfecto
    let aCuadrado = Math.pow(a, 2); // a^2
    let bCuadrado = Math.pow(b, 2); // b^2
    let dobleAB = 2 * a * b; // 2ab

    // Resultado del trinomio cuadrado perfecto
    let resultadoTrinomio = operador === '+' 
        ? `${a}^2 + 2*${a}*${b} + ${b}^2 + ${c}`  // Desarrollo del trinomio
        : `${a}^2 - 2*${a}*${b} + ${b}^2 + ${c}`; // Desarrollo del trinomio

    // Expansión para mostrar la solución completa
    let resultadoFinal = operador === '+' 
        ? aCuadrado + dobleAB + bCuadrado + c  // (a + b)^2 + c
        : aCuadrado - dobleAB + bCuadrado + c; // (a - b)^2 + c

    let solucionEcuacion = null;
    let ecuacion = null;

    // Si x está presente, resolver la ecuación
    if (x !== null) {
        // Verificar si x - c es mayor o igual a cero para que se pueda aplicar la raíz cuadrada
        let resultadoSinC = x - c;

        // Si el resultado de x - c es negativo, no tiene solución real
        if (resultadoSinC < 0) {
            return res.status(400).send('No se puede resolver la ecuación: x debe ser mayor o igual a c.');
        }

        let raizResultado = Math.sqrt(resultadoSinC); // Raíz cuadrada del resultado

        // Resolver la ecuación dependiendo del operador
        solucionEcuacion = operador === '+' 
            ? {
                  posiblesValoresA: [`a = ${raizResultado - b}`, `a = ${-raizResultado - b}`],
                  posiblesValoresB: [`b = ${raizResultado - a}`, `b = ${-raizResultado - a}`]
              }
            : {
                  posiblesValoresA: [`a = ${raizResultado + b}`, `a = ${-raizResultado + b}`],
                  posiblesValoresB: [`b = ${raizResultado + a}`, `b = ${-raizResultado + a}`]
              };

        // Construir la ecuación como cadena
        ecuacion = `((${a} ${operador} ${b})^2 + ${c} = ${x})`;
    }

    // Respuesta JSON con el trinomio y, si corresponde, la solución de la ecuación
    res.json({
        trinomio: operador === '+' ? `(${a} + ${b})^2 + ${c}` : `(${a} - ${b})^2 + ${c}`,
        desarrollo: operador === '+' 
            ? `${a}^2 + 2*${a}*${b} + ${b}^2 + ${c}`
            : `${a}^2 - 2*${a}*${b} + ${b}^2 + ${c}`,
        resultadoTrinomio: resultadoTrinomio, // Ahora muestra el desarrollo del trinomio completo
        resultadoFinal: resultadoFinal.toFixed(2), // El valor numérico final del trinomio
        ecuacion: ecuacion, // Solo se muestra si hay un valor de x
        solucionEcuacion: solucionEcuacion // Solo se muestra si hay un valor de x
    });
});



// Servidor escuchando en el puerto 3003
app.listen(3003, () => {
    console.log('Servidor ejecutándose en el puerto 3003 7w7');
});


