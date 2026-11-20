---
layout: post.njk
title: my opinions/guide to error handling
date: 2026-07-11
tags: posts
---

at some point in your code, regardless of how good it is, you'll get a error. it might even be the very first thing it does. maybe for the small script you have a crash is okay, but eventually you will need to handle that error some way or another in order to recover from something and have it continue as expected.

in this post i want to share my do's and don'ts in error handling which hopefully will help you write better, reliable code. remember these are my opinions but i provide explanations as to why I hold them.

## exceptions are a no
exceptions, as in the ones you `throw` and `try/catch`, should be avoided as much as possible. unless you use a language where exceptions are literally unavoidable (like javascript), though even then try to stay away from them. my reasoning behind this is that throwing exceptions, while convenient, break control flow and are too implicit. they discourage thinking about how to actually recover from something that can fail because you can just assume the exceptions will bubble up to the top-most `try/catch` block, wherever that is.

to illustrate this, let's say we have a classic division function
```js
function div(a, b) {
  return a / b;
}
```

now here's a fun question: will this throw if we divide by zero? the answer is: no we get Infinity (in javascript).

let's look at another one:
```js
function parseUserData(data) {
  return JSON.parse(data);
}
```

will this throw if invalid data is parsed? the answer is, of course, yes. and if you have not wrapped this around a try {} catch {} block, the entire thing will crash. There is nothing here that tells you JSON.parse throws an error (not even the signature!) that you have to handle somehow apart from the javascript documentation. this introduces hidden control flow that you don't think about until it ever crashes.

now think about when you use a function from a library, how are you supposed to know if it throws or not? Sure the function itself might not, but what about the functions that function calls? Hiding control flow isn't the only problem though. If we have a function that creates resources, say in C++:
```cpp
void do_something(void) {
  auto thing = new Thing();
  if (!thing.collectInfo()) throw SomeKindOfError();
  // ...
  free(thing);
}
```

we create a new Thing which allocates memory, but because we throw, it never gets freed. This doesn't save garbage collected languages either, you may setup state that is never cleaned up, or open a file handle, a web resource etc... which you must close but `throw` disrupted the control flow. this very commonly introduces bugs.

This is worse in combination with hidden control flow, consider a function with multiple functions:
```js
function handleLogin(user, password) {
  const db = connectDatabase(); // could throw here
  parseFields(user); // could throw here
  const result = loginUser(db, user, password); // could also throw here
  db.close();
  return result;
}
```

At any point any function here might throw. Nobody tells you to handle the errors here or that they may fail, and when say `parseFields` throws, resources like the database will stay open because exactly where the exception throws is where control flow stops, meaing `db.close()` never runs. The only way to fix this is to manually catch the error from parseFields and close the database.

In short, this pattern is not great because it won't force you to think about where errors might happen, and more importantly, what to do when a error happens or where it comes from. Try to avoid them where possible.


## Result types are a yes
the `Result` type was popularized by Rust, but comes from probably C developers as they've invented everything, and since then the concept has been reused in a lot of new programming languages such as Go in the form of `(res, err)` tuples.

The idea is that your function can either be Ok and return a value, or be not Ok and return a error. the difference here is now you are basically forced to handle the error in some way, because it returns as opposed to just throwing somewhere.

Here's a example of Result in rust:
```rs
fn div(a: f64, b: f64) -> Result<f64, String> {
  if b == 0 { return Err("cannot divide by zero".to_string()); }
  return Ok(a / b);
}
```

what you know now is that the `div` function can fail, because it's directly implied in the function signature itself. it is now your responsibility to handle that error, like:
```rs
let result = div(10.0, 0.0);
match result {
  Ok(val) => println!("10 / 0 = {}", val),
  Err(error) => println!("error: {}", error),
}
```

the benefits here are that there's no hidden control flow. the function can error, you must handle it right there. you handle cleaning resources up, recovering etc. if needed

Another benefit is error propagating. you are explicit about which function fails and who you want to handle the error of it, whereas in exceptions it just propagates to the next try/catch block. As a example in rust:
```rs
fn do_formula(x: f64) -> Result<f64, String> {
  let result = div(x, 0.0)?;
  Ok(result)
}
```

Notice the `?`, which tells this function to do something equivalent to: `if error { return Err(error); }`. This would effectively propagate the error to the next function. This is explicit control flow because with this `?` you specifically told it to propagate further and let the caller handle it. The code does exactly what you told it to.

This pattern is much better because you are now forced to think about how to handle the errors, and it's easier to reason about which functions error. Results are friends. Use them.

## Assertions are a yes
most languages provide a `assert` function. Assertions are conditions which are expected to always be true, and if they are not, immediately exit because we've reached a impossible state. This can literally prevent entire classes of bugs in systems.

For example: `assert(playerCount >= 0);`

playerCount must be above or equal to zero. because logically you cannot have -1 players. if that were to ever happen, the program will quit.
you might think quitting here is a unreasonable thing to do, especially in production, but quitting here would actually be a safer thing to do than to continue executing.

if playerCount were to be below zero, continuing could be harmful as it could cause some sort of undefined behavior, state corruption and other bugs. the state is broken in a unrecoverable way and the program cannot continue safely, so it simply must exit.

of course your program has now crashed (because of a unrecoverable bug you must fix), which means you'll need to restart it. In production you'd typically use some form of a watchdog, which can log the crash and then restart the service or do some other measures.

assertions are friends. use them correctly. 


## In conclusion
exceptions hide control flow, and therefore make error handling more fragile, because it's much harder to reason about errors in written code (like what happens where, how that's handled). try to avoid.

Result types are explicit, force you to think about how to handle errors, and are easier to reason about. use them in recoverable failures, propagate when you want someone else to handle them.

Assertions are explicit, prevent bugs and can save you from corruption or other undefined behavior. use them when checking if critical logic makes any sense and in absolutely disasterous situations.
