//global variables declaration
var currentDay = moment().format("dddd, MMMM Do, YYYY");
var today = new Date();
//var dayOfWeek = moment().format("dddd");
var dayofWeek = "Thursday";
var tasks = [];

// setup tasks in the scheduler, if there are existing tasks in the localstorage
function setUpTasks() {
    tasks = JSON.parse(localStorage.getItem("myTask")) || [];
    for (let i = 0; i < tasks.length; i++) {
        let hour = tasks[i].hour;
        let todo = tasks[i].todo;
        $("[data-hour=" + hour + "]").siblings().filter("textarea").val(todo);
    }
}

//funciton to clear the previous day todo list from localStorage
function setDay(){
    if (currentDay != dayofWeek){
    localStorage.clear();
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
            // if hour is in the past, disable the save button
            $(".saveBtn").prop("disabled", true);
        } else if (id === currentHour) {
            $(this).css("background-color", "rgb(255, 204, 204)");            
        } else {
            $(this).css("background-color", "rgb(204, 255, 204)");           
        }
    });
}

//function to save the tasks in local storage
$(".saveBtn").on('click', function (event) {

    event.preventDefault();
    let id = parseInt($(this).data("hour"));
    let plannedTask = $(this).siblings().filter('textarea').val();
    let newTask = true;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].hour === id) {
            newTask = false;
            tasks[i].todo = plannedTask;
        }
    }
    if (newTask) {
        addTask(id, plannedTask);
    }
    localStorage.setItem('myTask', JSON.stringify(tasks));
});

//function to add new tasks 
function addTask(hr, input) {
    let todo = {
        hour: hr,
        todo: input
    }
    tasks.push(todo);
}


$(document).ready(function () {
    setDay();
    setUpTasks();
    setUp();
})







