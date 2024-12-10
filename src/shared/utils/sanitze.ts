import { ErrorResponse } from '@nodesandbox/response-kit';
import { ObjectSchema, ValidationError } from 'joi';

/**
 * Sanitizes and validates input data against a schema
 * Returns a structured object with success status and data or error details
 */
export const sanitize = <T>(
  data: Record<string, any>,
  schema: ObjectSchema<T>,
): { success: boolean; data?: T; error?: ErrorResponse } => {
  // console.log('⚔️⚔️⚔️⚔️⚔️ data', data);
  // console.log('🕯️🕯️🕯️🕯️🕯️ schema', schema);

  const { error, value } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  }) as {
    error: ValidationError | undefined;
    value: Partial<T>;
  };
  // console.log('value sanitize ✔️✔️✔️✔️', value);
  if (error) {
    const message = error.details.map((i) => i.message).join(', ');
    console.log('----->', sanitize);
    const suggestions = [
      'Check the format of the submitted data',
      'Ensure all required fields are present',
    ];
    // console.log('error sanitize ❌❌❌❌', error);

    return {
      success: false,
      error: new ErrorResponse('VALIDATION_ERROR', message, suggestions, error),
    };
  }

  // Sanitize and build the valid data object
  const sanitizedData = Object.keys(schema.describe().keys).reduce(
    (acc, key) => {
      const val = value[key as keyof T];
      if (val !== undefined) {
        acc[key as keyof T] = val;
      }
      return acc;
    },
    {} as T,
  );

  return {
    success: true,
    data: sanitizedData,
  };
};
