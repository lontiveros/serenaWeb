export class Proyecto {
    nombre: string;
    zona: string;
    barrio: string;
    area: string;
    lote: string;
    plantas: number;
    superficie: ProyectoSuperficie;
    locales: ProyectoLocales;
}

class ProyectoSuperficie {
    cubierta: number;
    semicubierta: number;
    pileta: number;
    total: number;
}

class ProyectoLocales {
    estar: number;
    comedor: number;
    cocina: number;
    dormitorio: number;
    vestidor: number;
    estudio: number;
    bano: number;
    toilette: number;
    lavadero: number;
    baulera: number;
    galeria: number;
}