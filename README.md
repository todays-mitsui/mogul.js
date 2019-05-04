# Mogul ⛷

evaluates λ-calculations step by step.

![Mogul 実行イメージ](https://mogul-a2928.firebaseapp.com/screenshot.png)

## Example

```
> s(k, k)(:x)
  → k(:x)(k(:x))
  → :x

> and(true, or(false, true))
  → true(or(false)(true))(false)
  → (x=>y=>x)(or(false)(true))(false)
  → (y=>or(false)(true))(false)
  → or(false)(true)
  → false(true)(true)
  → (x=>y=>y)(true)(true)
  → (y=>y)(true)
  → true

> eq(add(2, 1), 3)
  → and(gte(add(2)(1))(3))(lte(add(2)(1))(3))
  → gte(add(2)(1))(3)(lte(add(2)(1))(3))(false)
  → isZero(sub(3)(add(2)(1)))(lte(add(2)(1))(3))(false)
  → sub(3)(add(2)(1))(_=>false)(true)(lte(add(2)(1))(3))(false)
  → add(2)(1)(pred)(3)(_=>false)(true)(lte(add(2)(1))(3))(false)
  → (f=>x=>2(f)(1(f)(x)))(pred)(3)(_=>false)(true)(lte(add(2)(1))(3))(false)
  ...
  → (u=>u=>u=>true)(g=>h=>h(g(g=>h=>h(g(_=>false)))))(g=>h=>h(g(_=>false)))(_=>false)
  → (u=>u=>true)(g=>h=>h(g(_=>false)))(_=>false)
  → (u=>true)(_=>false)
  → true
```

## Build Setup

``` bash
# install dependencies
$ yarn install

# build for production and launch server
$ yarn run build
$ yarn start
```
