import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly price: number;
    
    @ApiProperty()
    readonly commercialName: string;

    @ApiProperty()
    readonly PhotoUrl: string;

    @ApiProperty()
    readonly status: string;
}
