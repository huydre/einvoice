import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/product.repositoy";
import { CreateProductTcpRequest } from "@common/interfaces/tcp/product";


@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async create(data: CreateProductTcpRequest) {
        const { sku, name} = data;

        const exits = await this.productRepository.exits(sku, name);
        if (exits) {
            throw new BadRequestException('Product already exits');
        }

        return this,this.productRepository.create(data);
    }

    getList() {
        return this.productRepository.findAll();
    }
}