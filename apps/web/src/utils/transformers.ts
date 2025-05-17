import superjson from "superjson";

interface DataTransformer {
  serialize: (object: FormData | Record<string, unknown>) => FormData;
  deserialize: (object: unknown) => Record<string, unknown>;
}

export class FormDataTransformer implements DataTransformer {
  serialize(object: FormData | Record<string, unknown>): FormData {
    if (!(object instanceof FormData)) {
      throw new Error("Expected FormData");
    }

    return object;
  }

  deserialize(object: unknown): Record<string, unknown> {
    return object as Record<string, unknown>;
  }
}

export const jsonTransformer = superjson;
