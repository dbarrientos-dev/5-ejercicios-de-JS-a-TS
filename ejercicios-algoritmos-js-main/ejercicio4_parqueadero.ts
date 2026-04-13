/**
 * SISTEMA DE GESTIÓN DE PARQUEADERO
 * Registra ingresos, calcula tarifas con descuento por permanencia y genera estadísticas.
 */

// Uso de Enum para mejorar la legibilidad del código
enum TipoVehiculo {
    MOTO = 1,
    CARRO = 2,
    CAMIONETA = 3
}

// Configuración de Tarifas (Centralizado para fácil edición)
const TARIFAS = {
    [TipoVehiculo.MOTO]: 2000,
    [TipoVehiculo.CARRO]: 4000,
    [TipoVehiculo.CAMIONETA]: 6000
};

const UMBRAL_DESCUENTO = 8; // Horas para aplicar descuento
const PORCENTAJE_DESCUENTO = 0.20;

// --- DATOS DE ENTRADA ---
const tiposEntrada: number[] = [1, 2, 3, 1, 3, 2, 1];
const horasEntrada: number[] = [3, 9, 5, 10, 2, 8, 6];

// --- CONTADORES DE JORNADA ---
let contadores = { motos: 0, carros: 0, camionetas: 0 };
let ingresoTotal: number = 0;
let sumaHoras: number = 0;
let totalVehiculos: number = 0;

/**
 * PROCESAMIENTO DE VEHÍCULOS
 */
for (let i = 0; i < tiposEntrada.length; i++) {
    const tipo: number = tiposEntrada[i];
    const horas: number = horasEntrada[i];
    
    let tarifaHora: number = TARIFAS[tipo as TipoVehiculo] || 0;
    let tipoTexto: string = "";

    // Validación y clasificación del tipo de vehículo
    switch (tipo) {
        case TipoVehiculo.MOTO:
            tipoTexto = "Moto";
            contadores.motos++;
            break;
        case TipoVehiculo.CARRO:
            tipoTexto = "Carro";
            contadores.carros++;
            break;
        case TipoVehiculo.CAMIONETA:
            tipoTexto = "Camioneta";
            contadores.camionetas++;
            break;
        default:
            console.log(`⚠️ Registro ${i + 1}: Tipo ${tipo} inválido. Saltando...`);
            continue;
    }

    // Cálculos económicos
    const costoBase: number = tarifaHora * horas;
    const aplicaDescuento: boolean = horas > UMBRAL_DESCUENTO;
    const valorDescuento: number = aplicaDescuento ? costoBase * PORCENTAJE_DESCUENTO : 0;
    const totalPagar: number = costoBase - valorDescuento;

    // --- SALIDA DE RECIBO INDIVIDUAL ---
    console.log(`\n--- VEHÍCULO ${i + 1} REGISTRADO ---`);
    console.log(`Tipo:      ${tipoTexto}`);
    console.log(`Tiempo:    ${horas} horas`);
    console.log(`Subtotal:  $${costoBase.toLocaleString("es-CO")}`);

    if (aplicaDescuento) {
        console.log(`Promo:     -$${valorDescuento.toLocaleString("es-CO")} (TARIFA DÍA COMPLETO)`);
    } else {
        console.log(`Tarifa:    POR HORAS (Sin descuento)`);
    }

    console.log(`TOTAL:     $${totalPagar.toLocaleString("es-CO")}`);

    // Acumulación de datos globales
    ingresoTotal += totalPagar;
    sumaHoras += horas;
    totalVehiculos++;
}

/**
 * CIERRE DE CAJA Y ESTADÍSTICAS
 */
const promedioHoras: number = totalVehiculos > 0 ? sumaHoras / totalVehiculos : 0;

console.log("\n" + "=".repeat(40));
console.log("       REPORTE DE CIERRE DE JORNADA");
console.log("=".repeat(40));
console.log(`Motos: ${contadores.motos} | Carros: ${contadores.carros} | Camionetas: ${contadores.camionetas}`);
console.log(`Total Vehículos:      ${totalVehiculos}`);
console.log(`Promedio Permanencia: ${promedioHoras.toFixed(1)} horas`);
console.log("-".repeat(40));
console.log(`INGRESO TOTAL:        $${ingresoTotal.toLocaleString("es-CO")}`);
console.log("=".repeat(40));