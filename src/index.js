// TODO
import FetchWrapper from "./fetch-wrapper.js"

const API = new FetchWrapper("https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/6283")

const foodName = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs")
const protein = document.querySelector("#create-protein")
const fat = document.querySelector("#create-fat")
const form = document.querySelector("#create-form")

form.addEventListener("submit", event => {
    event.preventDefault()

    API.post("/", {
      fields: {
        name: { stringValue: foodName.value },
        carbs: { integerValue: carbs.value },
        protein: { integerValue: protein.value },
        fat: { integerValue: fat.value }
      }
    })
    .then(data => {
        if(!data.error) {
          foodName.value = ""
          carbs.value = ""
          protein.value = ""
          fat.value = ""
        }
    })
})


