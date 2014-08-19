optometrist
===========

Option setting via flags, environment variables, and defaults (in that order).

## Why yet another options parser?

Most of the others out there have way too much configuration to cut through,
and for whatever reason environment varibles never got that popular among Nodeists.

## Installation

```bash
npm install optometrist
```

## Methods

### optometrist.get(schema)

Given a schema object, returns an object containing settings.
They're retrieved in the following order of prioirty:

1. Flags
2. Environment variables
3. Schema-provided defaults.

The schema object follows this structure:
```javascript
{
  'key': {
    'description': 'It\'s a key.',
    'required': true
  },
  'otherKey': {
    'description': 'Please spell "key."',
    'default': 'something'
  }
}
```

If you include a 'required' key and it can't be found in any of the three locations,
Optometrist will throw. This is convenient for use with ```optometrist.usage()```, as below.

JSON.parse is used to coerce flags and environment variables back into Javascript objects.

Environment variable and flag names are converted to camel case for your convenience.
So if you define a setting in your schema with a name like 'howManyRomans', it'lll be
looked up in the environment as ```HOW_MANY_ROMANS``` and in the flags as ```--how-many-romans```.

Flags should use the syntax ```--flag=value```.

### optometrist.usage(name, description, schema)

Returns a string containing usage information for the schema. Useful for writing
a command-line application.

Actually, all you have to do is:

```javascript
var schema = {
  foo: {
    required: true
  }
};

var settings;

try {

  settings = optometrist.get(schema);
  console.log('You provided', foo, 'for foo.');

} catch(e) {
  
  console.log(optometrist.usage('myapp', 'Does cool stuff!', schema);
  process.exit(1);

}
```

If the user fails to supply a value for ```foo```, they'll get the following:

```

Does cool stuff!
Usage: myapp options

Options:

  --foo

Any of the parameters can also be set by environment variables:

  FOO

Error: Missing required option foo
```

## Development

```bash
git clone https://github.com/casetext/optometrist
cd optometrist
npm install
npm test
```

## Copyright

© 2014, J2H2, Inc. Licensed under ISC.
