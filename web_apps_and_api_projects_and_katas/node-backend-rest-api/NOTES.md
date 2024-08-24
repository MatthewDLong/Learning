## Testing approach
I applied double loop TDD.
e.g. Firstly define a failing acceptance criteria (integration test)
    "returns a 400 status and a descriptive error message when an invalid sizeId is given"
    Next, continue TDD (red, green, refactor) for a "validateSizeId" middlware function.
    Repeat until the outer acceptance criteria test passes.
    Demo of how I did this with the above example: https://www.youtube.com/watch?v=mMivsQB-G3E

**Folder structure for tests:**
- Integration tests stored at `src/__tests__`
- Unit tests stored alongside the code e.g.
  - `src/services/moonpig.test.ts`

I categorised my integration tests as follows:

**Positive tests**
- Basic positive tests (happy paths)
- Check basic functionality and the acceptance criteria of the API.

**Extended positive testing with optional parameters**
- Extend positive tests to include optional parameters and extra functionality.  
  e.g include sizeId parameter

**Basic negative tests**
Check the API returns a correct error message when an invalid request is made e.g.
- Unknown route
- Invalid card id
- Invalid size id
- Valid but not available size for a given cardId e.g. 'lg' for 'card001'

**Extended negative testing**
E.g.  
- Check the API returns a correct error message when there is a problem with an upstream data service.

## Performance considerations
I sent Cache-Control headers to the client using middleware e.g.  
`res.set("Cache-Control", "public, max-age=3600, must-revalidate")`

Spawning a new Worker process for each logical CPU core, to scale horizontally, whilst running locally.

I performed load tests locally using 'gatling', whilst running the server with pm2, the report can be viewed at 'report.html'.

I have included pm2 for process management, for when NODE_ENV is 'production'.

I have included the compression midleware.

I have also made use of the NODE_ENV value for different environments: 'development', 'test' and 'production'.

## Design patterns applied
[**Factory creational pattern**](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)  
E.g. in `src/factory.ts` to *potentially* create different variations of HTTP client based on config provided in to the factory method `createHttpClient`.

[Singleton creational pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)  
E.g. in `src/singleton` `createMoonPigService` allows creation of one single instance of `MoonPigService`.

[**Dependency Inversion Principal**](https://github.com/ryanmcdermott/clean-code-javascript#dependency-inversion-principle-dip)  
E.g. in `BaseService` and `MoonPigService` a `client` is passed into the constructor of `MoonPigService`, rather than `MoonPigService` being responsible for instantiating it's own instance of client. This prevents `MoonPigService` from being tightly coupled to a particular type of client.

[**Method chaining**](https://github.com/ryanmcdermott/clean-code-javascript#use-method-chaining)  
E.g. in the `MoonPigService` class. This allows my code to be clean, expressive and less verbose:
```typescript
const formattedCard: FormattedCard = moonpig
    .getCard(cardId)
    .formatCard(sizeId);
```

## Use of git
I have squashed all of my commits down into one commit.

## Improvements I would make
- Define infrastructure
- Define a Swagger definition
- Define a CI/CD pipeline
