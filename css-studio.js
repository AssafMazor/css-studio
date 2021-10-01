var total = 0;
var selectedSquare;
var num = 0

var squareList = {
}

function addSquare(){
    total= total + 1
    var squaresPanle = $(".squares-panle").html() || "";
    squaresPanle += `
        <div class = "square square${total}" onclick="onSquareClick(${total})">   
        </div>
    ` 
    $(".squares-panle").html(squaresPanle);
    squareList[total] = {
        "width":Math.floor(Math.random() * 100) + 30,
        "height":Math.floor(Math.random() * 100) + 30,
        "background-color":"white",
        "border":"white",
        "top": Math.floor(Math.random() * 690) + 1,
        "left": Math.floor(Math.random() * 690) + 1,
        "border-width":"1",
        "content":"",
        "zIndex":""
    }
    selectedSquare = total
    dragSquares(selectedSquare)
    renderSquareList();
    renderSquareProps(total)
    $(".squares-panle .square").removeClass("selected-square");
    $(`.squares-panle .square${total}`).addClass("selected-square");
}

function dragSquares(x){
    $(`.square${x}`).draggable({
        start: function(e , ui) {
          ui.helper.addClass("dragging");
        },
        stop: function(e , ui) {
          ui.helper.removeClass("dragging");
          squareList[x]["top"] =  ui.position.top;
          squareList[x]["left"] =  ui.position.left;
          renderSquareProps(x)
        }
    });
}

//----------------------------------
// renderSquareList
//----------------------------------

function renderSquareList(){
    var keys = Object.keys(squareList); 
    keys.forEach((key)=>{
        render(key);
    })
}

//----------------------------------
// render
//----------------------------------

function render(objId){
    var obj = squareList[objId]
    var keys = Object.keys(obj); 

    keys.forEach((key)=>{
        $(`.square${objId}`).css(key ,obj[key] )
    })
}

function renderSquareProps(id){
    let square = squareList[id];

    $(".width").val(square["width"])
    $(".height").val(square["height"])
    $(".background-color").text(square["background-color"])
    $(".border-color").text(square["border"])
    $(".top").val(square["top"]) 
    $(".left").val(square["left"]) 
    $(".border-width").val(square["border-width"])
    $("#colorpicker-border-color").spectrum("set", square["border"]);
    $("#colorpicker-background-color").spectrum("set", square["background-color"]);
    $(".z-index-num").html(square["zIndex"])
}  

function onSquareClick(id){
    $(".squares-panle .square").removeClass("selected-square");
    $(`.squares-panle .square${id}`).addClass("selected-square");
    selectedSquare = id
    dragSquares(id)
    renderSquareProps(id)
}

function checkWidth(){
   var width = $(".width").val() 
    if(!isValidSize(width)){
        $(".width-row .width").addClass("error")
    }else {
        saveData()
    }  
}

function checkHeight(){
    var height = $(".height").val() 
    if(!isValidSize(height)){
        $(".height-row .height").addClass("error")
    }else {
        saveData()
    }  
}

function checkLeft(){
    var left = $(".left-row .left").val() 
    if(!isValidSize(left)){
        $(".left-row .left").addClass("error")
    }else {
        saveData()
    }  
}

function checkTop(){
    var top = $(".top-row .top").val() 
    if(!isValidSize(top)){
        $(".top-row .top").addClass("error")
    }else {
        saveData()
    }  
}

function checkBorderWidth(){
    var borderWidth = $(".border-width").val() 
    if(!isValidSize(borderWidth)){
        $(".border-width").addClass("error")
    }else {
        saveData()
    }  
}
 

//----------------------------------
// isValidSize
//----------------------------------

function isValidSize(size){      
    if(isNaN(size)){ 
        return false
    }
    if(size < 0){
        return false                                                                                                                                                   
    }                                 
    if(size > 800){
        return false
    }
    return true
}


//----------------------------------
// saveData
//----------------------------------

function saveData(){
    let square = squareList[selectedSquare];

    square.width = $(".width").val()
    square.height = $(".height").val()
    square["background-color"]= $(".background-color").html()
    square.top = $(".top-row .top").val()
    square.left = $(".left-row .left").val()
    square["border-width"] = $(".border-width").val()
    square["border"] = $(".border-color").val()
    square["zIndex"] = $(".z-index-num").html()
    render(selectedSquare)
}


//----------------------------------
// resetData
//----------------------------------

function resetData(){
    $(".width").val("")
    $(".height").val("")
    $(".background-color").val("")
    $(".border").val("")
}

//----------------------------------
// resetStyle
//----------------------------------

function resetStyle(){
    $(".border-color").html("")
    $(".background-color").html("")
    $(".top-row .top").val("")
    $(".left-row .left").val("")
    $(".border-width").val("")
    $(".width-row .width").removeClass("error")
    $(".height-row .height").removeClass("error")
    $(".left-row .left").removeClass("error")
    $(".top-row .top").removeClass("error")
}

function clearSquars(){
    $(".squares-panle .square").remove();
    squareList = {};
}

function openMenu(){ 
    $(".panle").addClass("hide")
    $(".main-title").addClass("selected")
    $(".menu-panle").removeClass("hide")
    $(".content-panle").addClass("hide")
    $(".main-title-contant").removeClass("selected")
}

function openContent(){
    $(".panle").addClass("hide")
    $(".main-title-contant").addClass("selected")
    $(".content-panle").removeClass("hide")
    $(".main-title").removeClass("selected")
}

function onTextAreaChange(){
    var str = $(".content").val() 
    if(str.length > 500){
        str = str.substring(0, 500);
        $(".content").val(str); 
    }
    $(".num-of").html(str.length)
}

function onTextAreaBlur(){
    let square = squareList[selectedSquare];
    square["content"] = $(".content").val()
    $(`.square${selectedSquare}`).html(square["content"])
}

function plusIndexClick(){
    num = num + 1
    if(num > total){
        num = total
    }
    $(".z-index-num").html(num)
    squareList[selectedSquare]["zIndex"] = num
    render(selectedSquare)
}

function minusIndexClick(){
    num = num - 1
    if(num < 0){
        num = 0
    }
    $(".z-index-num").html(num)
    squareList[selectedSquare]["zIndex"] = num
    render(selectedSquare)
}


//----------------------------------
// setEvents
//----------------------------------


function setEvents(){
    $(".reset-btn").click(function (){
        resetData()
        resetStyle()
    })
    $("#colorpicker-background-color").spectrum({
        color:"white",
        change: function(backgroundColor) {
            $(".background-color").html(backgroundColor.toHexString())
            squareList[selectedSquare]["background-color"] =`${backgroundColor.toHexString()}`;
            render(selectedSquare)
        }
    });
    $("#colorpicker-border-color").spectrum({
        color:"white",
        change: function(color) {
            $(".border-color").html(color.toHexString())
            squareList[selectedSquare]["border"] = ` ${color.toHexString()}`;
            render(selectedSquare)
        }
    });
}

//----------------------------------
// click events
//----------------------------------


$(document).ready(function() {
    setEvents()
    renderSquareList()
})




