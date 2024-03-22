const showAllButton = document.getElementById("showAll");
const showActiveButton = document.getElementById("showActive");
const showCompletedButton = document.getElementById("showCompleted");
let currentId = showAllButton.id;

// Updates the filters if a change is made in the checkboxes
document.addEventListener("change", (e) => {
  if (!e.target.matches(".checkbox")) {
    return;
  }
  filterTasks(currentId);
  setItemsCounter()
});

// Checks if a new task has been added in the taskContainer and updates the filter in case that the currentId is showCompleted
document.addEventListener("addedNewTask", () => {
  setItemsCounter()
  if (currentId === "showCompleted") {
    filterTasks(currentId);
  }
});

// Event Listener for the filtering buttons in the cardFooter. Checks if the div that contains the buttons has been pressed
document.getElementById("cardFooter").addEventListener("click", (e) => {
  // Check if the triggered event's target is a button
  if (e.target.matches("button")) {
    // Call the function that handles the possible buttons and passes the target's id
    filterTasks(e.target.getAttribute("id"));
  }
});

document.getElementById("clearCompleted").addEventListener("click", () => {
  console.log("clear completed");
  
  let tasks = document.getElementsByClassName("task");
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (tasks[i].getElementsByTagName("input")[0].checked) {
      tasks[i].remove();
    }
  }
});

// Takes the id of the that is now selected, resets the style of the three buttons and applies the selected style to the one that matches the id. Updates the value of the global variable 'currentId'
const updateButtonsSytle = (selectedId) => {
  document
    .getElementById("cardFooter")
    .querySelectorAll("button")
    .forEach((button) => {
      button.style.border = "none";
    });
  document.getElementById(selectedId).style.border = "1.5px solid #f5e4e4";
  currentId = selectedId;
};

// Based on the button's id that's passed as a parameted, executes the corresponding action. Calls updateButtonSytle()
const filterTasks = (buttonId) => {
  switch (buttonId) {
    case "showAll":
      setShowAll();
      break;
    case "showActive":
      setShowActive();
      break;
    case "showCompleted":
      setShowCompleted();
      break;
  }
  updateButtonsSytle(buttonId);
};

const setShowAll = () => {
  let tasks = document.getElementsByClassName("task");
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].style.display = "flex";
    if (tasks[i].getElementsByTagName("input")[0].checked) {
      tasks[i].style.display = "flex";
      setTimeout(() => {
        tasks[i].style.transform = "translateX(0)";
      }, 200);
    } else {
      if (currentId === "showCompleted") {
        tasks[i].style.transform = "translateX(100%)";
        setTimeout(() => {
          tasks[i].style.transform = "translateX(0)";
        }, 200);
      }
    }
  }
};

const setShowActive = () => {
  let tasks = document.getElementsByClassName("task");
  for (let i = 0; i < tasks.length; i++) {
    let checkbox = tasks[i].getElementsByTagName("input")[0];
    if (checkbox.checked) {
      tasks[i].style.transform = "translateX(100%)";
      setTimeout(() => {
        tasks[i].style.display = "none";
      }, 200);
    } else {
      if (currentId === "showAll") {
      } else if (currentId === "showCompleted") {
        tasks[i].style.display = "flex";
        setTimeout(() => {
          tasks[i].style.transform = "translateX(0)";
        }, 200);
      }
    }
  }
};

const setShowCompleted = () => {
  let tasks = document.getElementsByClassName("task");
  for (let i = 0; i < tasks.length; i++) {
    let checkbox = tasks[i].getElementsByTagName("input")[0];
    if (!checkbox.checked) {
      if (currentId === "showAll") {
        tasks[i].style.transform = "translateX(-100%)";
        setTimeout(() => {
          tasks[i].style.display = "none";
        }, 200);
      } else {
        tasks[i].style.display = "none";
      }
    } else {
      if (currentId === "showAll") {
        tasks[i].style.display = "flex";
        tasks[i].style.transform = "translateX(0)";
      } else if (currentId === "showActive") {
        tasks[i].style.display = "none";
        tasks[i].style.transform = "translateX(-100%)";

        tasks[i].style.display = "flex";
        setTimeout(() => {
          tasks[i].style.transform = "translateX(0)";
        }, 200);
      }
    }
  }
};

const setItemsCounter = () => {
  document.getElementById('itemsCounter').innerHTML = `${Array.from(document.getElementsByClassName('checkbox')).filter(element => !element.checked).length} items left`
}

// Initial call to the function to set the default selected button to showAll
updateButtonsSytle(currentId);
setItemsCounter()