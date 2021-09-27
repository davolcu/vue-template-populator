# vue-template-populator

[![version](https://img.shields.io/npm/v/vue-template-populator.svg)](https://www.npmjs.com/package/vue-template-populator)
[![install-size](https://packagephobia.now.sh/badge?p=vue-template-populator)](https://packagephobia.now.sh/result?p=vue-template-populator)
[![license](https://img.shields.io/npm/l/vue-template-populator.svg)](https://github.com/davolcu/vue-template-populator/blob/master/LICENSE)

## Overview

`vue-template-populator` Is a Vue library to enhance the automation of methods and computed props based on your data props. The library will automatically create setter methods, boolean computed getters and computed quick-access getters for all your component's data props.

## Instalation

```sh
npm install vue-template-populator
```

or

```sh
yarn add vue-template-populator
```

## Usage

### Initialization

- Download the package: `npm install vue-template-populator`

- Import the library on your Vue components as follows:

```js
import { VuePopulator } from 'vue-template-populator';
```

- From here just call `VuePopulator` whenever you need to, and pass `this` to auto-generate all the setter methods, boolean getters and quick-access getters, for the data props defined on your Component:

```js
VuePopulator(this);
```

_That being said, I highly recommend it to call it just once, in the `created` LCH or after the first async request response._

- Optionally you could also pass a configuration object for some extra settings, such as defining the default fallback value for a type of data prop:

```js
VuePopulator(this, config);
```

### Fallback values

As you will notice, the creatted setter methods have a fallback value, in case you call them with no params, to clear the value. By default, these fallback values are the following ones:

| Type       | Default Value      |
| -----------| ------------------ |
| string     | ''                 |
| number     | 0                  |
| boolean    | false              |
| array      | []                 |
| object     | null               |
| undefined  | undefined          |

_If you disagree with some of the default fallback values, check the **Configuration file** section._

### Configuration file

You may disagree with some of default fallback values by variable type, that's completely understandable. On the initialization section, I've mentioned an optional configuration file. Well that's a work in progress feature to add fine-grained configuration while using the library. The config param must be an object and, for now, it supports the following attributes:

| Property              | Description |
| --------------------- | ----------- |
| overrideFallbackMap   | This property must be an object. It could include one or more of the types defined in the **Fallback Values** section as keys followed by the expected fallback value. For example: `{ overrideFallbackMap: { object: {}, number: 20 }}` |

## Examples

### Example 1

In this example I'll cover the setter and boolean getters.
Let's say we have this component:

```js
export default {
    name: 'BroComponent',
    data() {
        return {
            name: '',
            surname: '',
            friends: [],
        }
    },
};
```

This is a pretty straightforward component, which manages the `name`, `surname` and the list of `friends` of a Bro. Now if you would like to use this component, you probably would like to set these data props, check if they have value different than an empty string, check if the array has any elements, etc. For all of these cases you would probably have to create methods such as `setName` or `hasFriends`, to handle events properly or render HTML or not.

That's what VuePopulator does for you, automatically. You would write just a couple of extra lines as follows:

```js
import { VuePopulator } from 'vue-template-populator';

export default {
    name: 'BroComponent',
    data() {
        return {
            name: '',
            surname: '',
            friends: [],
        }
    },
    created() {
        VuePopulator(this);
    },
};
```

And the library will automatically create the following methods for you to use them:

```js
setName(name = '') {
    this.name = name;
},

setSurname(surname = '') {
    this.surname = surname;
},

setFriends(friends = []) {
    this.friends = friends;
},
```

It also will create the following computed for you:

```js
hasName() {
    return !!this.name;
},

hasSurname() {
    return !!this.surname;
},

hasFriends() {
    return !!this.friends.length;
},
```

Quite cool and easy to use huh!

```js
import { VuePopulator } from 'vue-template-populator';

export default {
    name: 'BroComponent',
    data() {
        return {
            name: '',
            surname: '',
            friends: [],
        }
    },
    created() {
        VuePopulator(this);
        
        console.log(this.hasName);
        // false
        
        this.setName('davolcu');
        console.log(this.name, this.hasName);
        // "davolcu", true
    },
};
```

### Example 2

In this second example, I'll show you the quick-access getter. 

#### Example 2.1

To get a more realistic use-case, let's say we have a component which gets the data in an async way, from a `getData` method imported from a `services` layer file:

```js
import { getData } from 'services.js';

export default {
    name: 'BroComponent',
    data() {
        return {
            bro: null,
        }
    },
    methods: {
        // Get the data for the component
        fetchData() {
            // Do async request
            getData().then((response) => {
                this.bro = { ...response.data }
            });
        }
    },
    created() {
        this.fetchData();
    },
};
```

Again, this is an straightforward scenario, a component which gets the data from an API, so we don't know the structure `bro` will have. For instance, let's assume that `response.data` will have the following structure: `{ name: 'dav', surname: 'olcu', friends: [] }`. As I've mentioned before, you can call the populator in any moment, so let's call it right after the response assignation:

```js
import { VuePopulator } from 'vue-template-populator';
import { getData } from 'services.js';

export default {
    name: 'BroComponent',
    data() {
        return {
            bro: null,
        }
    },
    methods: {
        // Get the data for the component
        fetchData() {
            // Do async request
            getData().then((response) => {
                this.bro = { ...response.data }
                VuePopulator(this);
            });
        }
    },
    created() {
        this.fetchData();
    },
};
```

As I've already explained, the `setBro` method, and the `hasBro` computed will be created. But as `bro` is an object, some quick-access computed getters will be created too, actually there'll be one for each property of the object. So in this case the following computed getters will be created:

- `broName`: Quick-access to `bro.name`.
- `broSurname`: Quick-access to `bro.surname`.
- `broFriends`: Quick-access to `bro.friends`.

```js
.
.
.
methods: {
    // Get the data for the component
    fetchData() {
        // Do async request
        getData().then((response) => {
            this.bro = { ...response.data }
            VuePopulator(this);
            
            console.log(this.broName, this.broSurname)
            // "dav", "olcu"
        });
    }
},
.
.
.
```

#### Example 2.2

Not only that, if any of the properties of any object is actually another object, the same process will be applied, resulting on an infinite nesting quick-access system. So, given the same scenario, let's assume `response.data` this time is `{ metadata: { name: 'dav', surname: { first: 'ol', last: 'cu' }}, friends: [] }`. Then, the following will be created:

- `broMetadataName`: Quick-access to `bro.metadata.name`.
- `broMetadataSurnameFirst`: Quick-access to `bro.metadata.surname.first`.
- `broMetadataSurnameLast`: Quick-access to `bro.metadata.surname.last`.
- `broFriends`: Quick-access to `bro.friends`.

```js
.
.
.
methods: {
    // Get the data for the component
    fetchData() {
        // Do async request
        getData().then((response) => {
            this.bro = { ...response.data }
            VuePopulator(this);
            
            console.log(this.broMetadataName, this.broMetadataSurnameLast)
            // "dav", "cu"
        });
    }
},
.
.
.
```
