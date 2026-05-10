import { IsNumber } from "class-validator";

export class AppConfiguaration {
    @IsNumber()
    PORT: number;

    constructor() {
        this.PORT = Number(process.env['PORT']) || 3000;
    }
}