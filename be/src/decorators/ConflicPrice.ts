import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function ConflicPrice(
  property: 'price_min' | 'price_max',
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: new ConflicPriceConstraint(property),
    });
  };
}

@ValidatorConstraint({ name: 'ConflicPrice' })
export class ConflicPriceConstraint implements ValidatorConstraintInterface {
  private readonly property: string;
  constructor(prop: string) {
    this.property = prop;
  }
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    if (this.property === 'price_max') {
      return Number(relatedValue) > Number(value);
    }
    return Number(relatedValue) < Number(value);
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Price max is must bigger than price min!';
  }
}
