// TODO
import FetchWrapper from "./fetch-wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";
import snackbar from "snackbar";
import AppData from "./app-data.js";
import "chart.js";

const API = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/6283"
);

const appData = new AppData();

const foodName = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");
const form = document.querySelector("#create-form");
const list = document.querySelector("#food-list");
const context = document.querySelector("#app-chart").getContext("2d");
const calories = document.querySelector("#total-calories");

const displayEntry = (name, carbs, protein, fat) => {
  appData.addFood(carbs, protein, fat);
  return `<li class="card">
          <div>
            <h3 class="name">${capitalize(name)}</h3>
            <div class="calories">${calculateCalories(
              carbs,
              protein,
              fat
            )} calories</div>
            <ul class="macros">
              <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
              <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
              <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
            </ul>
          </div>
        </li>`;
};

let chartInstance = null;

const renderChart = () => {
  chartInstance?.destroy();

  chartInstance = new Chart(context, {
    type: "bar",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: ["Macronutrients"],
          data: [
            appData.getTotalCarbs(),
            appData.getTotalProtein(),
            appData.getTotalFat(),
          ],
          backgroundColor: ["#25AEEE", "#FECD52", "#57D269"],
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

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
        displayEntry(foodName.value, carbs.value, protein.value, fat.value)
      );

      renderChart();
      calories.textContent = appData.getTotalCalories();

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
        displayEntry(
          document.fields.name.stringValue,
          document.fields.carbs.integerValue,
          document.fields.protein.integerValue,
          document.fields.fat.integerValue
        )
      );
    });
    renderChart();
    calories.textContent = appData.getTotalCalories();
  });
};

init();
