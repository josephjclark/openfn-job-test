# How to unit test an openfn job expression

**Note that you must be using compiler v1.2 (in worker vX and CLI version Y) for expressions with export statements to work**

This repo includes an `importJob` function which will dynamically import and compile an openfn job expression.

You can then unit test any imports from that function.

Let's say you have some job code like this:
```
// expression.js
export const myfn = () => "hello mtuchi";

fn(() => {
  return {
    data: myfn(),
  };
});
```

And let's say you want to unit test `myfn` - which is just a regular vanilla JS function

Use the `importJob` function to import the job as a module:

```
import importJob from "./importer.js";
const { myfn } = await importJob("./expression.js");
```

You may need to specify an adaptor - just pass the name as the second argument:

```
const { myfn } = await importJob("./expression.js", "http");
```

Now you can use it with mocha or jest or ava or whatever you want

```
const { myfn } = await importJob("./expression.js");

it('should work', () => {
    const result = myfn()
    expdect(result).toEqual('hello mtuchi')
})
```

Requirements:
- Any adaptors you want to use must be `npm install`ed to your repo
- You can only unit test pure functions. Not operations or real job steps
- Do not import npm modules in your job code
- This does NOT use or touch the openfn runtime
