$(function(){
    
  var config = {
    apiKey: "AIzaSyAFNOdX6RMulhHTaDzosMipfRnLqLis2Q0",
    authDomain: "train-scheduler-f2a5e.firebaseapp.com",
    databaseURL: "https://train-scheduler-f2a5e.firebaseio.com",
    projectId: "train-scheduler-f2a5e",
    storageBucket: "",
    messagingSenderId: "920904280529"
  };
  firebase.initializeApp(config);

  var TrainName="";
  var Destination="";
  var FirstTrainTime="";
  var Frequency=0;

  $("#run").on("click",function(e){
    e.preventDefault();
    TrainName=$("#TrainName").val().trim();
    Destination=$("#Destination").val().trim();
    FirstTrainTime=$("#FirstTrainTime").val().trim();
    Frequency=$("#Frequency").val().trim();

  firebase.database().ref().push({
    TrainName:TrainName,
    Destination:Destination,
    FirstTrainTime:FirstTrainTime,
    Frequency:Frequency, 
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  });
});

firebase.database().ref().on("child_added",function(snapshot){

  var row=$("<tr></tr>");
  
  $(row).append("<td>"+snapshot.val().TrainName+"</td>");
  $(row).append("<td>"+snapshot.val().Destination+"</td>");
  $(row).append("<td>"+snapshot.val().Frequency+"</td>");
  $(row).append("<td>"+snapshot.val().FirstTrainTime+"</td>");

  $("#TrainScheduler").append(row);
  
});
});



// minutes away is arrival time minus current time in minutes
//next arrival is 