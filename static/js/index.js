console.log = function(){};  /*disable all console log */

window.onload = function() {

      localStorage.clear();
     $("#editor").hide();
      var ajaxRequest = new XMLHttpRequest();
			if (ajaxRequest) {
			ajaxRequest.onreadystatechange = ajaxResponse;
			ajaxRequest.open("GET", "/get"); // Where?
			ajaxRequest.send(null);
			}



    function ajaxResponse() {

    		             if(ajaxRequest.readyState != 4){


                     }else if(ajaxRequest.status == 200){

                           createList(ajaxRequest.response);

                     }else{

                     	 alert("Its in Error");
                     }

    }

}
function saveRecord()
{
      var order = new Object();
            order.name = document.getElementById('add_name').value;
            order.code = document.getElementById('add_code').value;
            order.phone =document.getElementById('add_phone').value;
            order.email =document.getElementById('add_email').value;
 alert(JSON.stringify(order))
    var ajaxRequest = new XMLHttpRequest();
		if (ajaxRequest) 
        {
            ajaxRequest.onreadystatechange = ajaxResponse;
            ajaxRequest.open("POST", "/post");
        ajaxRequest.setRequestHeader("Content-Type", "application/json");// Where?
            ajaxRequest.send(JSON.stringify(order));
           
		}
       function ajaxResponse() 
        {
            if(ajaxRequest.readyState != 4)
            {
                console.log("its in process")

            }else if(ajaxRequest.status == 200)
            {
                onload(); 
            }
            else
            {
                console.log("Error")
            }

  }
}

function createList(obj){
     var data = JSON.parse(obj)   /*==Convert string data to JSON Oject so that we can easliy parse it ===*/
     var rowString ="";
      alert(data[0][0]);
     for(var i=0;i<data.length;i++)
     {
         rowString +='<tr>';
         for(var j= 0 ;j<4;j++)
             {
                  rowString +='<td>'+data[i][j] + '</td>';
             }
       rowString += '<td><button onclick="updateRecord(' + i + ')">Edit</button></td>';
        rowString += '<td><button onclick="requestForDelete(' + i + ')">Delete</button></td>';
        rowString += '</tr>';

      }

    document.getElementById('empTable').innerHTML = rowString;
//    document.getElementById("loading").style.display = "none";
}



function requestForDelete(id){
   alert(id);
   var choice =  confirm("Are you sure, you want to delete this record")
   if (choice == true) 
   {
       deleteRecord(id);
        //document.getElementById("loading").style.display = "block";

   }  			
}



function editRecord(record){

     localStorage.setItem('testObject', record);  /*==store the id in the local storag so that we can use to get the record baseed on the id=*/
     window.location.href="profile.html";
}


function deleteRecord(id){
   
      var ajaxRequest = new XMLHttpRequest();
			if (ajaxRequest) 
            {
                ajaxRequest.onreadystatechange = ajaxResponse;
                ajaxRequest.open("DELETE", "/del/"+id); // Where?
                ajaxRequest.send(null);
			}
       function ajaxResponse() {//This gets called when the readyState changes.

		             if(ajaxRequest.readyState != 4){
                    
                         console.log("its in process")

                 }else if(ajaxRequest.status == 200){

                          onload();  /*===Record delted complete load the data again from get api======*/

                 }else{

                 	   console.log("Error")
                 }

  }


}
function updateRecord(id){
   
      var ajaxRequest = new XMLHttpRequest();
			if (ajaxRequest) 
            {
                ajaxRequest.onreadystatechange = ajaxResponse;
                ajaxRequest.open("GET", "/get/"+id); // Where?
                ajaxRequest.send(null);
			}
       function ajaxResponse() {//This gets called when the readyState changes.

		             if(ajaxRequest.readyState != 4){
                    
                         console.log("its in process")

                 }else if(ajaxRequest.status == 200){

                          createForm(ajaxRequest.response,id);  /*===Record delted complete load the data again from get api======*/

                 }else{

                 	   console.log("Error")
                 }

  }


}
function createForm(obj,id)
{
    var data = JSON.parse(obj);   
    var formString ="";
    $("#editor").show();
    document.getElementById('name').value=data[0];
    document.getElementById('code').value=data[1];
    document.getElementById('phone').value=data[2];
    document.getElementById('email').value=data[3];
    formString += ' <button onclick="updateRec(' + id + ');">Update</button> <a onclick="CloseInput()" aria-label="Close">&#10006;</a>';
    $("#editor").append(formString);
    
}
function updateRec(id)
{
      var order = new Object();
            order.name = document.getElementById('name').value;
            order.code = document.getElementById('code').value;
            order.phone =document.getElementById('phone').value;
            order.email =document.getElementById('email').value;
 alert(JSON.stringify(order))
    var ajaxRequest = new XMLHttpRequest();
		if (ajaxRequest) 
        {
            ajaxRequest.onreadystatechange = ajaxResponse;
            ajaxRequest.open("PUT","/put/"+id);
        ajaxRequest.setRequestHeader("Content-Type", "application/json");// Where?
            ajaxRequest.send(JSON.stringify(order));
           
		}
       function ajaxResponse() 
        {
            if(ajaxRequest.readyState != 4)
            {
                console.log("its in process")

            }else if(ajaxRequest.status == 200)
            {
                onload(); 
            }
            else
            {
                console.log("Error")
            }

  }
}


