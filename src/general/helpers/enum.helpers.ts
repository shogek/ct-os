/** Call this method in the `default` case for TypeScript to check that your `switch` statement checks all cases. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertExhaustiveSwitchStatement(_x: never): never {
   throw new Error("Didn't expect to get here")
}
