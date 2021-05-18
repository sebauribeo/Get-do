export class CreateProductDto {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly commercialName: string;
    readonly PhotoUrl: string;
    readonly status: string;
}
