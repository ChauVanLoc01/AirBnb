import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function PositiveNumberString(
  property?: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: PositiveNumberStringConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'PositiveNumberString' })
export class PositiveNumberStringConstraint
  implements ValidatorConstraintInterface
{
  constructor() {}
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'string' && Number(value) > 0;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} is must a positive number`;
  }
}
