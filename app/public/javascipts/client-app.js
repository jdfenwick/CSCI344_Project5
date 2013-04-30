(function () {
    "use strict";
    var main,
        i,
        j,
        atask,
        tasks,
        allTask,
        target,
        button,
        bycat,
        bytask,
        newTask,
        newCat,
        testElements,
        categoryArray,
        allCategory,
        jsonTask,
        clickHandler,
        buttonHandler,
        categoryList,
        singleCategories,
        singleCatArray,
        $ = window.$;
    main = function () {
        $.getJSON("javascripts/lib/all.json", function (toDoList) {
            toDoList.forEach(function (taskList) {
                jsonTask(taskList); // prints all tabs
                buttonHandler(button);
            });// build list of uncompleated tasks
        });
        $("#cats").click(function () {// when the categories tab is clicked...
            categoryList($(".allTasks .ACTab"));// sort the categories
            $(".byCategories").children().remove();
            singleCategories.forEach(function (catA) {
                bycat = $("<div class = 'cat'>" + catA + "</div>");
                $(".byCategories").append(bycat);// add the categories to categories tab
                for (i = 0; i < categoryArray.length; i++) {
                    if (categoryArray[i].match(catA)) {
                        bytask = $("<div>" + tasks[i] + "</div>").addClass("taskList");
                        $(".byCategories").append(bytask);// add the tasks to the categories
                    }// end of if
                }// end of forloop
            });
            $(".taskList").each(function () {// add remove button to tasks in category tab
                $(this).prepend("<button type ='button'>X</button>");
            });
            $(".taskList button").click(function () {// removes tasks in all tab when removed from categorty tab
                atask = $(this).parent().text();
                atask = atask.replace(/^X+/, "");
                testElements = $('.ACTab');
                for (j = 0; j < testElements.length; j++) {
                    if (($(testElements[j]).text()).match(atask)) {
                        $('.ACTab').eq(j).next().remove();
                        $('.ACTab').eq(j).prev().remove();
                        $('.ACTab').eq(j).remove();
                    }// end of if
                }// end of forloop
                $(this).parent().remove();
            });
        });
        buttonHandler = function (element) {// only used once..
            element.click(function () {
                $(this).nextUntil("button").remove();
                $(this).remove();
                return false;
            });
        };
        clickHandler = function (anchor) {// handles events on tabs
            anchor.click(function () {
                target = $(this).attr("href");
                $(".active").removeClass("active");
                $(this).addClass("active");
                $("#" + target).addClass("active");
                return false;
            });
        };
        clickHandler($(".tabs .tab"));
        jsonTask = function (tab) {// break down object and list contents in all tab
            allTask = $("<div>" + tab.description + "</div>").addClass("ACTab");
            allCategory = $("<div>" + tab.categories + "</div>").addClass("category");
            button = $("<button type ='button'>X</button>");
            $(".allTasks").append(button).append(allTask).append(allCategory);
        };
        $("#inputButton").click(function () {// add task and categoris to the DOM
            newTask = $("<div>" + $("#newTask").val() + "</div>").addClass("ACTab");
            newCat = $("<div>" + $("#newCategory").val() + "</div>").addClass("category");
            $(".allTasks").append("<button type ='button'>X</button>").append(newTask).append(newCat);
            $("#newTask").val("");
            $("#newCategory").val("");
            $(".allTasks > button").click(function () {// sets event handler to new buttons
                $(this).nextUntil("button").remove();
                $(this).remove();
            });
        });
        categoryList = function (alldiv) {// map catigories and assign tasks
            tasks = $(alldiv).map(function () { // get tasks into simple array
                return $(this).text();
            }).get();// the get() returnes an array, by default an object is returned
            categoryArray = $(".allTasks .category").map(function () { // get categories into array
                return $(this).text();
            }).get();
            singleCatArray = $(categoryArray).map(function (index, elementC) {// sorts out catigories into single words
                return elementC.split(",");
            }).get();
            singleCategories = singleCatArray.filter(function (elementD, indexD) { // take out duplicate categories
                return singleCatArray.indexOf(elementD) === indexD;
            });
        };// end of categoryList
    } // end of main
    $(document).ready(main);
}()); // end of js-wrapper