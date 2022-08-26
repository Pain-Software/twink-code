const HEADER = document.getElementById("traitHeader");
const CONTAINER = document.getElementById("optionsContainer");

HEADER.innerText = "Type of Twink";
CONTAINER.innerHTML = TwinkType.map(
    (type) => `<button type="button" class="h-64 text-white py-2 px-5 bg-blue-700 hover:bg-purple-800 focus:outline-none">${type.label}</button>`
).join("");