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

  var TrainName = "";
  var Destination = "";
  var Frequency = 0;
  var currenttime = moment();

  $("#run").on("click",function(e){
    e.preventDefault();
    TrainName = $("#TrainName").val().trim();
    Destination = $("#Destination").val().trim();
    Frequency = $("#Frequency").val().trim();

    var FirstTrainTime = $("#FirstTrainTime").val().trim();
    var appendtraintime = moment(FirstTrainTime, "hmm").format("H:m");

    var traintime = moment(FirstTrainTime, "hmm");
    var minutesaway = traintime.diff(currenttime, "minutes");

console.log("traintime: " + traintime);
console.log("currenttime: " + currenttime);
console.log("minuteaway: " + minutesaway);

    firebase.database().ref().push({
      TrainName:TrainName,
      Destination:Destination,
      NextArrival:appendtraintime,
      Frequency:Frequency, 
      minutesaway:minutesaway,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// if(currenttime == traintime) {

//   traintime = moment(traintime).add(Frequency, 'minutes');
//   var minutesaway = moment(traintime).subtract(currenttime, 'minutes');

//   firebase.database().ref().update({
//    TrainName:TrainName,
//    Destination:Destination,
//    NextArrival:traintime,
//    Frequency:Frequency, 
//    minutesaway:minutesaway,
//    dateAdded: firebase.database.ServerValue.TIMESTAMP
//  });

// } else if (currenttime != traintime) {
//   traintime = moment(traintime).add(0, 'minutes');
//   var minutesaway = moment(traintime).subtract(currenttime, 'minutes');

//   firebase.database().ref().update({
//    TrainName:TrainName,
//    Destination:Destination,
//    NextArrival:traintime,
//    Frequency:Frequency, 
//    minutesaway:minutesaway,
//    dateAdded: firebase.database.ServerValue.TIMESTAMP
//  });

// };

firebase.database().ref().on("child_added",function(snapshot){

  var row=$("<tr></tr>");
  
  $(row).append("<td>"+snapshot.val().TrainName+"</td>");
  $(row).append("<td>"+snapshot.val().Destination+"</td>");
  $(row).append("<td>"+snapshot.val().Frequency+"</td>");
  $(row).append("<td>"+snapshot.val().NextArrival+"</td>");
  $(row).append("<td>"+snapshot.val().minutesaway+"</td>");

  $("#TrainScheduler").append(row);
  
});
});