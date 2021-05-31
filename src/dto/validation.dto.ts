import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ValidationDTO{
    constructor(
        data: ValidationDTO
    ){
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.commercialName = data.commercialName;
        this.photoUrls = data.photoUrls;
        this.status = data.status
    };
    
    @ApiProperty()  
    id: number;
    
    @ApiProperty()  
    name: string;
    
    @ApiProperty()  
    description: string;
    
    @ApiProperty()      
    price: number;
    
    @ApiProperty()  
    commercialName: string;
    
    @ApiProperty()  
    @IsString({each: true})
    photoUrls: Array<string>;
    
    @ApiProperty()  
    @IsEnum(["available", "pending", "sold"],{
        message: 'Status is not valid [available, pending, sold]'
    })
    status: string;

    data:any;
};