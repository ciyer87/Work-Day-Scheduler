//global variables declaration
var currentDay = moment().format("dddd, MMMM Do, YYYY");
var newDay = new Date();
var curDay = newDay.getUTCDay();
var tasks = [];

// setup tasks in the scheduler, if there are existing tasks in the localstorage
function setUpTasks() {
    tasks = JSON.parse(localStorage.getItem("myTask")) || [];

    for (let i = 0; i < tasks.length; i++) {
        let hour = tasks[i].hour;
        let todo = tasks[i].todo;
        let day = tasks[i].day;
        //check to see if the day the notes was saved is the same as today.  if so, keep the notes.
        if (day === curDay) {
            $("[data-hour=" + hour + "]").siblings().filter("textarea").val(todo);
        }
        // if current day is not equal to the day the notes was saved, clear localstorage
        else {
            localStorage.clear();
        }
    }
}

//Display current day on top of the planner
function setUp() {
    $("#currentDay").text(currentDay);
    renderTextareaBackground();
}

// Audit each time block to display past, current and future timeblocks
function renderTextareaBackground() {
    let currentHour = parseInt(moment().format("H"));
    $("textarea.description").each(function (i) {
        let id = parseInt($(this).attr("id"));
        if (id < currentHour) {
            $(this).css("background-color", "rgb(208, 208, 225)");
        } else if (id === currentHour) {
            $(this).css("background-color", "rgb(255, 204, 204)");
        } else {
            $(this).css("background-color", "rgb(204, 255, 204)");
        }
    });
}

//function to save the tasks in local storage
// id - represents the hour the user clicked
// plannedTask - to do text that the user entered
// weekday - the day the notes was entered/saved in local storage
$(".saveBtn").on('click', function (event) {

    event.preventDefault();
    let id = parseInt($(this).data("hour"));
    let plannedTask = $(this).siblings().filter('textarea').val();
    var today = new Date();
    var weekday = today.getUTCDay();
    let newTask = true;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].hour === id) {
            newTask = false;
            tasks[i].todo = plannedTask, weekday;
        }
    }
    if (newTask) {
        addTask(id, plannedTask, weekday);
    }
    localStorage.setItem('myTask', JSON.stringify(tasks));
});

//function to add new tasks 
function addTask(hr, input, weekday) {
    let todo = {
        hour: hr,
        todo: input,
        day: weekday
    }
    tasks.push(todo);
}

$(document).ready(function () {
    setUpTasks();
    setUp();
})