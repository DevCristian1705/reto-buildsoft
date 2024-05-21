export interface ICurrencyExchange{
    disclaimer: string;
    license: string;
    timestamp: number;
    base: string;
    rates:  { [key: string]: number };
}

