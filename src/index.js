// TODO
import FetchWrapper from "./fetch-wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";
import snackbar from "snackbar";

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/6283"
);

const foodName = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");
const form = document.querySelector("#create-form");
const list = document.querySelector("#food-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  API.post("/", {
    fields: {
      name: { stringValue: foodName.value },
      carbs: { integerValue: carbs.value },
      protein: { integerValue: protein.value },
      fat: { integerValue: fat.value },
    },
  }).then((data) => {
    if (!data.error) {
      list.insertAdjacentHTML(
        "beforeend",
        `<li class="card">
          <div>
            <h3 class="name">${capitalize(foodName.value)}</h3>
            <div class="calories">${calculateCalories(
              carbs.value,
              protein.value,
              fat.value
            )} calories</div>
            <ul class="macros">
              <li class="carbs"><div>Carbs</div><div class="value">${
                carbs.value
              }g</div></li>
              <li class="protein"><div>Protein</div><div class="value">${
                protein.value
              }g</div></li>
              <li class="fat"><div>Fat</div><div class="value">${
                fat.value
              }g</div></li>
            </ul>
          </div>
         </li>`
      );

      foodName.value = "";
      carbs.value = "";
      protein.value = "";
      fat.value = "";

      snackbar.show("Food added successfully.");
    } else {
      snackbar.show("Some data is missing.");
      return;
    }
  });
});

const init = () => {
  // TODO: Get the saved entries and list them
  API.get("/").then((data) => {
    data.documents?.forEach((document) => {
      list.insertAdjacentHTML(
        "beforeend",
        `<li class="card">
        <div>
          <h3 class="name">${capitalize(document.fields.name.stringValue)}</h3>
          <div class="calories">${calculateCalories(
            document.fields.carbs.integerValue,
            document.fields.protein.integerValue,
            document.fields.fat.integerValue
          )} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${
              document.fields.carbs.integerValue
            }g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${
              document.fields.protein.integerValue
            }g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${
              document.fields.fat.integerValue
            }g</div></li>
          </ul>
        </div>
      </li>`
      );
    });
  });
};

init();
