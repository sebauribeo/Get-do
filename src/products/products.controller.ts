import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        this.productsService.create(createProductDto);
    };

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll()
    }
}
