
export interface Bikestation {
    FID?: number;
    ID: number;
    Nimi?: string;
    Namn?: string;
    Name?: string;
    Osoite?: string;
    Adress?: string;
    Kaupunki?: string;
    Stad?: string;
    Operaattor?: string;
    Kapasiteet?: number;
    x?: number;
    y?: number;
}

export interface Trip {
    Departure: string;
    Return: string;
    Departure_station_id: number;
    Departure_station_name: string;
    Return_station_id: number;
    Return_station_name: string;
    Covered_distance: number;
    Duration: number;
}
