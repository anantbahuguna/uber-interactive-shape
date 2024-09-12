
# Uber Interactive Shape

## My Solution Learnings -

- Delay loop iterations: [Blog]("htttp://www.Link-to-blog")
- Declare and use css variables in css files. And set the variable in style param in jsx. Or directly set the style instead of just variable.
- Queue for storing selection order. Internally, it's using object to store items. (*Could have directly used object instead of making a Queue*)
- Handling of css variables in vanilla JS:
```js
  let htmlStyles = window.getComputedStyle(document.querySelector("html"));
  let rowNum = parseInt(htmlStyles.getPropertyValue("--row-num"));
  document.documentElement.style.setProperty("--row-num", 6);
```
- Replace some values or initialize an array using `fill`
  ```js
  //Fill an existing array
  console.log([1, 2, 3, 4].fill(0, 2)); // [1, 2, 0, 0]
  //Initialize an array of length 5
  console.log(Array(5).fill(0)); // [0, 0, 0, 0, 0]
  //Initialize a 2D array of size 5x4
  console.log(Array(5).fill().map(() => Array(4).fill(0))); // [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  ```
- Grid container with equal dimensions of both container and grid-items
  ```css
  grid-template-columns: repeat(var(--column-count), 1fr);
  grid-auto-rows: 1fr;
  aspect-ratio: 1;
  width: 100%;
  max-width: 400px;
  gap: 30px;
  ```


## Devtools Tech Solution Learnings -

- Discuss requirements before starting coding. You can comment them.
- We can store index of box clicked in order using data structures like          
  - `Array`: Iteration is always in the insertion order but we need quick lookup. ❌
  - `Object`: Iteration may **not** be in the insertion order. ❌
  - `Map`: Iteration is always in the insertion order. It stores key-value pair but we don't need value. ❌
  - `Set`: Iteration is always in the insertion order. ✅
- Flatten 2D array using `flat(depth)` method which takes depth upto which you want to flatten. You can pass it `Infinity` to flatten any depth array. Optimize using `useMemo`.
- For styling changes, add/remove sub-classes like `.box.visible`, `.box.hidden`, `selected` etc.
- Grid container styles
  ```css
  width: fit-content
  ```
- We are able to write code inside `{}` inside `jsx`.
- Attaching event handlers to each element inside a list can use excess memory. To prevent this, attach the event handler to the parent of the elements list. This is called **event delegation**.
  ```html
  <div>
    <button>Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
  </div>
  ```
  ```js
  const div = document.querySelector("div");
  div.addEventListener("click", (event) => {
    if(event.target.tagName === "BUTTON") {
      console.log(event.target.innerText);
    }
  })
  ```
- Use html `data` attributes. They are accessible in both `JS` and `CSS` files.
- Can use recursion with setTimeout. Clear timeout using `ref`
- Add transition styles 