console.log = function(){};  /*disable all console log */

window.onload = function() {
   CloseInput();
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) {
			ajaxRequest.onreadystatechange = ajaxResponse;
			ajaxRequest.open("GET", "/get"); // Where?
			ajaxRequest.send(null);
    }

    function ajaxResponse() {
        if(ajaxRequest.readyState != 4) {
              console.log("its in process")
        }
        else if(ajaxRequest.status == 200){
            createList(ajaxRequest.response);
            }
        else{
            alert("Its in Error");
        }
    }
}

function saveRecord(){
    var order = new Object();
    order.name = document.getElementById('add_name').value;
    order.code = document.getElementById('add_code').value;
    order.phone =document.getElementById('add_phone').value;
    order.email =document.getElementById('add_email').value;
    document.getElementById('add_name').value ="";
    document.getElementById('add_code').value = "";
    document.getElementById('add_phone').value = "";
    document.getElementById('add_email').value = "";
//    alert(JSON.stringify(order))
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("POST", "/post");
        ajaxRequest.setRequestHeader("Content-Type", "application/json");
        ajaxRequest.send(JSON.stringify(order));  
    }
    function ajaxResponse() {
        if(ajaxRequest.readyState != 4)
        {
            console.log("its in process")

        }else if(ajaxRequest.status == 200){
            alert("Record Saved Successfully");
            onload(); 
        }
        else{
            console.log("Error")
        }
  }
}

function createList(obj){
     var data = JSON.parse(obj)  /*Convert string data to JSON Oject*/
     var rowString ="";
     for(var i=0;i<data.length;i++){
         rowString +='<tr>';
         for(var j= 0 ;j<data[i].length;j++){
            rowString +='<td id="tt">'+data[i][j] + '</td>';
        }
        rowString += '<td id="tt"><button onclick="updateRecord(' + i + ')" class="btn btn-info test">Edit</button> <button onclick="requestForDelete(' + i + ')" class="btn btn-warning">Delete</button></td>';
        rowString += '</tr>';
      }
    document.getElementById('empTable').innerHTML = rowString;
}

function requestForDelete(id){
   //alert(id);
   var choice =  confirm("Are you sure, you want to delete this record")
   if (choice == true) {
       deleteRecord(id);
    }  			
}

function deleteRecord(id){
    var ajaxRequest = new XMLHttpRequest();
	if (ajaxRequest) 
    {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("DELETE", "/del/"+id);
        ajaxRequest.send(null);
	}
    function ajaxResponse() {//This gets called when the readyState changes.
        if(ajaxRequest.readyState != 4){
            console.log("its in process")
        }
        else if(ajaxRequest.status == 200){
            alert("Record Deleted Successfully")
            onload();  /*===Record delted complete load the data again*/
        }
        else{
            console.log("Error")
        }
  }
}

function updateRecord(id){
    var ajaxRequest = new XMLHttpRequest();
	if (ajaxRequest) {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("GET", "/get/"+id);
        ajaxRequest.send(null);
	}
    function ajaxResponse() {//This gets called when the readyState changes.
        if(ajaxRequest.readyState != 4){
            console.log("its in process")
        }else if(ajaxRequest.status == 200){
            createForm(ajaxRequest.response,id);
        }
        else{
            console.log("Error")
        }
  }
}

function createForm(obj,id){
    var data = JSON.parse(obj);   
    var formString ="";
    $("#editor").show();
    $("#addEmp").hide();
    document.getElementById('name').value=data[0];
    document.getElementById('code').value=data[1];
    document.getElementById('phone').value=data[2];
    document.getElementById('email').value=data[3];
    formString += '<br> <button onclick="updateRec(' + id + ');" class="btn btn-info">Update</button> <button onclick="CloseInput();" class="btn btn-default">Cancel</button>';
    document.getElementById('btn').innerHTML = formString; 
}
function updateRec(id){
    var order = new Object();
    order.name = document.getElementById('name').value;
    order.code = document.getElementById('code').value;
    order.phone =document.getElementById('phone').value;
    order.email =document.getElementById('email').value;
    //alert(JSON.stringify(order))
    var ajaxRequest = new XMLHttpRequest();
    if (ajaxRequest) {
        ajaxRequest.onreadystatechange = ajaxResponse;
        ajaxRequest.open("PUT","/put/"+id);
        ajaxRequest.setRequestHeader("Content-Type", "application/json");// Where?
        ajaxRequest.send(JSON.stringify(order));       
    }
    function ajaxResponse(){
        if(ajaxRequest.readyState != 4){
            console.log("its in process")
        }
        else if(ajaxRequest.status == 200) {
            alert("Record Updated Successfully")
            onload(); 
        }
        else{
            console.log("Error")
        }
  }
}

function CloseInput(){
      $("#editor").hide();
      $("#addEmp").show();
}


