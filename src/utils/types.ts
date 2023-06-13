export type TValute = {
    ID: number,
    Name: string,
    Value: number,
    CharCode: string,
    Nominal: string,
    value?: number
}

export type TResponse = TValute & { Valute: TValute[] };