import { ApiProperty } from "@nestjs/swagger";

export class BaseEntityResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}