import {unionArrayStrategy} from '../../private/common/array.js'
import deepMerge from 'deepmerge'
import {Dictionary, ObjectIterator, ValueKeyIteratee} from 'lodash'
import lodashPickBy from 'lodash/pickBy.js'
import lodashMapValues from 'lodash/mapValues.js'
import lodashIsEqual from 'lodash/isEqual.js'
import differenceWith from 'lodash/differenceWith.js'
import fromPairs from 'lodash/fromPairs.js'
import toPairs from 'lodash/toPairs.js'
import get from 'lodash/get.js'
import set from 'lodash/set.js'
import lodashIsEmpty from 'lodash/isEmpty.js'

/**
 * Deep merges the two objects and returns a new object with the merge result.
 *
 * @param lhs - One of the objects to be merged.
 * @param rhs - Another object to be merged.
 * @param arrayMergeStrategy - Strategy used to merge the array typed fields. Union strategy is used by default to avoid
 * duplicated elements.
 * @returns A Javascrip tobject with th emerged objects.
 */
export function deepMergeObjects<T1, T2>(
  lhs: Partial<T1>,
  rhs: Partial<T2>,
  arrayMergeStrategy: (destinationArray: unknown[], sourceArray: unknown[]) => unknown[] = unionArrayStrategy,
): T1 & T2 {
  return deepMerge(lhs, rhs, {arrayMerge: arrayMergeStrategy})
}

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @param object - The source object.
 * @param predicate - The function invoked per property.
 * @returns Returns the new object.
 */
export function pickBy<T>(object: Dictionary<T> | null | undefined, predicate: ValueKeyIteratee<T>): Dictionary<T> {
  return lodashPickBy(object, predicate)
}

/**
 * Creates an object with the same keys as object and values generated by running each own
 * enumerable property of object through iteratee. The iteratee function is
 * invoked with three arguments: (value, key, object).
 *
 * @param source - The object to iterate over.
 * @param callback - The function invoked per iteration.
 * @returns Returns the new mapped object.
 */
export function mapValues<T extends object, TResult>(
  source: T | null | undefined,
  callback: ObjectIterator<T, TResult>,
): {[P in keyof T]: TResult} {
  return lodashMapValues(source, callback)
}

/**
 * Deeply compares two objects and returns true if they are equal.
 *
 * @param one - The first object to be compared.
 * @param two - The second object to be compared.
 * @returns True if the objects are equal, false otherwise.
 */
export function deepCompare(one: object, two: object): boolean {
  return lodashIsEqual(one, two)
}

/**
 * Return the difference between two nested objects.
 *
 * @param one - The first object to be compared.
 * @param two - The second object to be compared.
 * @returns Two objects containing the fields that are different, each one with the values of one object.
 */
export function deepDifference(one: object, two: object): [object, object] {
  const changes = differenceWith(toPairs(one), toPairs(two), deepCompare)
  const changes2 = differenceWith(toPairs(two), toPairs(one), deepCompare)
  return [fromPairs(changes), fromPairs(changes2)]
}

/**
 * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
 *
 * @param object - The object to query.
 * @param path - The path of the property to get.
 * @returns - Returns the resolved value.
 */
export function getPathValue<T = object>(object: object, path: string): T | undefined {
  return get(object, path) === undefined ? undefined : (get(object, path) as T)
}

/**
 * Sets the value at path of object. If a portion of path doesn't exist, it's create.
 *
 * @param object - The object to modify.
 * @param path - The path of the property to set.
 * @param value - The value to set.
 * @returns - Returns object.
 */
export function setPathValue(object: object, path: string, value?: unknown): object {
  return set(object, path, value)
}

/**
 * Checks if value is an empty object, collection, map, or set.
 *
 * @param object - The value to check.
 * @returns - Returns true if value is empty, else false.
 */
export function isEmpty(object: object): boolean {
  return lodashIsEmpty(object)
}
