// fixed array length with recursive
type ConstraintsLengthArray<T, N extends number, R extends T[] = []> = number extends N
    ? T[]
    : R['length'] extends N
    ? R
    : ConstraintsLengthArray<T, N, [T, ...R]>;

export default ConstraintsLengthArray;
