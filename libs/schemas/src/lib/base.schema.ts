import { Prop, SchemaFactory, Virtual, Schema } from "@nestjs/mongoose";
import { Type } from "@nestjs/common";
import { ObjectId } from "mongodb";

export class BaseSchema {
    _id: ObjectId;

    @Virtual({
    get: function(this: any) {
        return this._id?.toString();
        },
    })
    id: string;

    @Prop({ type: Date, default: new Date() })
    createdAt: Date;

    @Prop({ type: Date, default: new Date() })
    updatedAt: Date;
}

export const createSchema = <TClass = any>(target: Type<TClass>): any => {
    const schema = SchemaFactory.createForClass(target);

    schema.set('toJSON', {
        virtuals: true
    });

    schema.set('toObject', {
        virtuals: true
    });

    schema.set('versionKey', false);

    schema.set('timestamps', true);

    return schema;
}