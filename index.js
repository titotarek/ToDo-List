let allTasks = document.querySelector(".tasks");
let inputBtn = document.querySelector(".add");
let input = document.querySelector(".input");

// create Empty Array to Store the Tasks

let arrayOfTasks = [];

if (window.localStorage.getItem("task")) {
	arrayOfTasks = JSON.parse(window.localStorage.getItem("task"));
}

// trigger the get data from local storage
getDataFromLocalStorage();

// Add Task
inputBtn.onclick = function () {
	if (input.value !== "") {
		addTaskToArray(input.value); // add Task to Array addTaskToArray
		input.value = ""; // Empty the input field
	}
};

//  click on Task Element

allTasks.addEventListener("click", function (e) {
	if (e.target.classList.contains("del")) {
		deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
		e.target.parentElement.remove();
	}
});

function addTaskToArray(taskText) {
	//  task Data
	const task = {
		id: Date.now(),
		title: taskText,
		status: false,
	};

	//  Push Tasks to  Array Of Tasks

	arrayOfTasks.push(task);
	// Add Tasks To Page

	addElementsToPageFrom(arrayOfTasks);
	//  for testing
	//  console.log(arrayOfTasks)
	//  console.log(JSON.stringify(arrayOfTasks))
	addDataToLocalStorage(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
	allTasks.innerHTML = "";

	arrayOfTasks.forEach((task) => {
		//  create the Main Div Element
		let div = document.createElement("div");
		div.className = "task";
		div.setAttribute("data-id", task.id);
		div.appendChild(document.createTextNode(task.title));
		console.log(div);
		// create  Delate Button Element
		let span = document.createElement("span");
		span.className = "del";
		// put style for the delate button
		span.style.width = "40px";
		span.style.backgroundColor = "red";
		span.style.color = "white";
		span.style.marginLeft = "300px";
		span.style.padding = "3px 20px";
		span.style.marginTop = "20px";
		span.appendChild(document.createTextNode("Delate"));
		div.appendChild(span);
		// put the main div to allTasks div
		allTasks.appendChild(div);
	});
}

function addDataToLocalStorage(arrayOfTasks) {
	window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
	let data = window.localStorage.getItem("task");

	if (data) {
		let tasks = JSON.parse(data);
		addElementsToPageFrom(tasks);
	}
}

function deleteTaskWith(taskId) {
	// just for explanation
	// for(let i = 0 ; i < arrayOfTasks.length; i++ ){
	//   console.log(`${arrayOfTasks[i].id} === ${taskId}`)
	// }
	arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
	addDataToLocalStorage(arrayOfTasks);
}
