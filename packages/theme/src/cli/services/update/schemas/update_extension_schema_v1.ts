/**
 * IMPORTANT: Do not modify this file.
 *
 * This file is generated by the `pnpm run schema:generate` command and should
 * not be modified.
 *
 * Any changes to the schemas for `update_extension` files require the creation
 * of a new schema file at `https://github.com/Shopify/theme-liquid-docs`.
 *
 * This is necessary because Shopify must support legacy `update_extension.json`
 * scripts. Once a new schema is published, it must be supported forever without
 * breaking backward compatibility.
 */
import {zod as z} from '@shopify/cli-kit/node/schema'

export const schemaUrlV1 =
  'https://raw.githubusercontent.com/Shopify/theme-liquid-docs/main/schemas/update/update_extension_schema_v1.json'

export const schemaV1 = z
  .object({
    $schema: z.string(),
    theme_name: z.string(),
    theme_version: z.string(),
    operations: z
      .array(
        z
          .object({
            id: z.string(),
            actions: z
              .array(
                z.union([
                  z
                    .object({
                      action: z.literal('move'),
                      file: z.any().superRefine((x, ctx) => {
                        const schemas = [z.string(), z.object({source: z.string(), target: z.string()})]
                        const errors = schemas.reduce(
                          (errors: z.ZodError[], schema) =>
                            ((result) => ('error' in result ? [...errors, result.error] : errors))(schema.safeParse(x)),
                          [],
                        )
                        if (schemas.length - errors.length !== 1) {
                          ctx.addIssue({
                            path: ctx.path,
                            code: 'invalid_union',
                            unionErrors: errors,
                            message: 'Invalid input: Should pass single schema',
                          })
                        }
                      }),
                      from_key: z.string(),
                      to_key: z.string(),
                    })
                    .strict(),
                  z
                    .object({
                      action: z.literal('copy'),
                      file: z.any().superRefine((x, ctx) => {
                        const schemas = [z.string(), z.object({source: z.string(), target: z.string()})]
                        const errors = schemas.reduce(
                          (errors: z.ZodError[], schema) =>
                            ((result) => ('error' in result ? [...errors, result.error] : errors))(schema.safeParse(x)),
                          [],
                        )
                        if (schemas.length - errors.length !== 1) {
                          ctx.addIssue({
                            path: ctx.path,
                            code: 'invalid_union',
                            unionErrors: errors,
                            message: 'Invalid input: Should pass single schema',
                          })
                        }
                      }),
                      from_key: z.string(),
                      to_key: z.string(),
                    })
                    .strict(),
                  z
                    .object({
                      action: z.literal('add'),
                      file: z.string(),
                      key: z.string(),
                      value: z.any().superRefine((x, ctx) => {
                        const schemas = [z.record(z.any()), z.array(z.any())]
                        const errors = schemas.reduce(
                          (errors: z.ZodError[], schema) =>
                            ((result) => ('error' in result ? [...errors, result.error] : errors))(schema.safeParse(x)),
                          [],
                        )
                        if (schemas.length - errors.length !== 1) {
                          ctx.addIssue({
                            path: ctx.path,
                            code: 'invalid_union',
                            unionErrors: errors,
                            message: 'Invalid input: Should pass single schema',
                          })
                        }
                      }),
                    })
                    .strict(),
                  z
                    .object({
                      action: z.literal('update'),
                      file: z.string(),
                      key: z.string(),
                      old_value: z.string(),
                      new_value: z.string(),
                    })
                    .strict(),
                  z
                    .object({
                      action: z.literal('delete'),
                      file: z.string(),
                      key: z.string(),
                      value: z.string().optional(),
                    })
                    .strict(),
                ]),
              )
              .min(1),
          })
          .strict(),
      )
      .min(1),
  })
  .strict()