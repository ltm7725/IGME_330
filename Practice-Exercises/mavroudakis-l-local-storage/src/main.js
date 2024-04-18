import * as storage from "./storage.js"
let items = [];


// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
const showItems = () => {
  // loop though items and stick each array element into an <li>
  // use array.map()!
  // update the innerHTML of the <ol> already on the page
  let str = storage.readFromLocalStorage(0);

  for (let i = 1; str != null; i++) {
    if (i == 1) document.querySelector("ol").innerHTML = "";
    items.push(str);
    let div = document.createElement('li');
    div.innerHTML = str;
    document.querySelector("ol").appendChild(div);
    str = storage.readFromLocalStorage(i);
  }

  if (items.length == 0) document.querySelector("ol").innerHTML = "[List is empty]";
};

// II. declare and implement addItem(str)
// - this will add `str` to the `items` array (so long as `str` is length greater than 0)
const addItem = str => {

  // No empty string
  if (str.trim() != "") {

    // No duplicates
    if (items.length != 0) {
      for (let i = 0; items[i] != null; i++) {
        if (items[i] == str) return;
      }
    }

    items.push(str);
    if (items.length == 1) document.querySelector("ol").innerHTML = "";
    storage.writeToLocalStorage(items.length - 1, str);
    let div = document.createElement('li');
    div.innerHTML = str;
    document.querySelector("ol").appendChild(div);
  }
};

const clearStorage = () => {
  for (let i = 0; items[i]; i++) {
    storage.writeToLocalStorage(i, null);
  }
  document.querySelector("ol").innerHTML = "[List is empty]";
  items = [];
  console.log("check");
}

window.onload = showItems;

document.querySelector("#btn-add").addEventListener("click", () => { addItem(document.querySelector("#thing-text").value) });
document.querySelector("#btn-clear").addEventListener("click", () => { clearStorage() });

// Also:
// - call `addItem()`` when the button is clicked, and also clear out the <input>
// - and be sure to update .localStorage by calling `writeToLocalStorage("items",items)`

// When the page loads:
// - load in the `items` array from storage.js and display the current items
// you might want to double-check that you loaded an array ...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// ... and if you didn't, set `items` to an empty array

// Got it working? 
// - Add a "Clear List" button that empties the items array
