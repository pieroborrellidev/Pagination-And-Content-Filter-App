"use strict"; 

const showPerPage = 10; 
const $itemsNumber = $('.student-list').children().length;
const numberOfPages = Math.ceil($itemsNumber/ showPerPage); // find the exact number of pages needed 
const $students = $('.student-item'); 

// initial state of the list
function init() {    
    $students.css('display', 'none'); 
    $students.slice(0, showPerPage).css('display', 'block'); 
    
}
 

function createPagination() {
    
    $(".page").append($("<div class='pagination'><ul></ul></div>"));

    for(let i = 1; i < numberOfPages + 1; i++ ) 
        $(".pagination ul").append($("<li><a href = '#'>" + i + "</a></li>"));
    
    
    $(".pagination > ul > li:first-child > a").attr("class", "active");
    $(".pagination ul li a").on("click", function(e) {
        
      // add the active class to the selected page    
      $(this).parent().parent().children().children().removeClass("active");
      $(this).addClass("active");
    goToPage(parseInt($(this)[0].text) - 1); 
        
    });    
}

function goToPage(pageNum) {
    const start = showPerPage * pageNum;
    const end = start + showPerPage; 
    
    $students.css('display', 'none');     
    $students.slice(start, end).css('display', 'block'); 
    
}

function searchStudent() {
    $(".page-header").append($('<div class = "student-search"><input placeholder="Search for students...">  <button>Search</button> </div>')); 
    
    $('button').on('click', () => {
    const $filter = $('input').val(); 
    
        
        
    if($filter.length === 0) {
        goToPage(0);
      } else {
        $students.each(function() {
           if ($(this).text().search(new RegExp($filter, "i")) < 0) {
             $(this).fadeOut();
           } else {
             $(this).show();
           }
        });
      }
    });  

}

// start the application 
init(); 
createPagination(); 
searchStudent();


