import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import * as transformer from 'class-transformer';
import { validate } from "class-validator";
import {ValidationException} from "../exceptions/validation-exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    console.log('obj')
    const obj = transformer.plainToClass(metadata.metatype, value)
    console.log('obj')
    const errors = await validate(obj)
    console.log(errors)
    if (errors.length) {
      //console.log(errors)
      let messages = errors.map(error => {
        return `${error.property} - ${Object.values(error.constraints).join(', ')}`
      })
      throw new ValidationException(messages)
    }
    return value
  }
}
