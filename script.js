var currentDay = moment().format("dddd, MMMM Do");
var saveButton = document.querySelector('btn');

//Display current day on top of the planner
$("#currentDay").text(currentDay);
renderTextareaBackground();

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

let tasks = [];

$("button .btn").on('click', function (event) {

    event.preventDefault();
    var plannedTask = $('#description')
    .val()
    .trim();
    console.log(plannedTask);

    tasks.push(plannedTask);
    localStorage.setItem('myTaskList', JSON.stringify(tasks));

});







