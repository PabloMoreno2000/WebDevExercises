  //Counter of posts
  var iPosts = 0;

  //Variable to store the current post's ID
  var iId = 1;

  //Variable to store the body of the post
  var sPost;

  //Variable to store the title of the present post
  var sTitle;

  //Variable to store the author's username
  var sUsername;

  //Variable to store the options of the custom button
  var sButtonText = "";

  //Variable to store the custom button
  var bCustom;

  //Variable of the comments box state
  var bComments;

  //Variable for the div of the comments
  var dComments;

  //Variable to show or hide the comments
  var bCommentState = false;

  //Variable(boolean) to know which arrow whas pressed the last time
  var bArrow;

$(document).ready(function(){
  sTitle = document.getElementById("title");
  sUsername = document.getElementById("author");
  sPost = document.getElementById("post-text");
  bCustom = document.getElementById("options");
  
  //Comments variables
  dComments = document.getElementById("comments");
  bComments = document.getElementById("button-comments");

  chargePost();
  prepareButton();


  //If the user presses the left arrow
  $(".arrow-left").click(function(){
    previousPost();
    chargePost();
    updateNumber();

    //Charging the comments if necessary
    hideOrShow();
  });

  //If the user presses the right arrow
  $(".arrow-right").click(function(){
    nextPost();
    chargePost();
    updateNumber();

    //Charging the comments if necessary
    hideOrShow();
  });

  //If the user presses an option brom the middle button
  $(".custom-select").click(function(){
      iId = bCustom.value;
      iId = parseInt(iId);
      chargePost();

      //Charging the comments if necessary
      hideOrShow();
  });

  //Comments functions
  $("#button-comments").click(function(){
      //Changing the state of the boolean
      bCommentState = !(bCommentState);

      //Hiding or showing the comments
      hideOrShow();
  });


});

//Function to prepare the custom button
var prepareButton = () => {
  for(let i = 1; i <= posts.length; i++) {
  sButtonText += "<option value = \"" + i + "\">" + i+ "</option>";
   
  }
  $("#options").append(sButtonText);

  $("option").addClass("option-number");
}

//Function that takes the ID and charges the post
var chargePost = () => {
  let iUser = posts[iId - 1].userId;

  sTitle.innerHTML = posts[iId - 1].title;
  sUsername.innerHTML = users[iUser - 1].username;
  sPost.innerHTML = posts[iId - 1].body;
}


var previousPost = () => {
  if(iId > 1){
    iId--;
  }

  else {
    iId = posts.length;
  }

  bArrow = false;
}

var nextPost = () => {
  if(iId == posts.length) {
    iId = 1;
  }

  else {
    iId++;
  }

  bArrow = true;
}

//This funcion updates the post number in the middle button
var updateNumber = () => {
  if(bArrow){
    bCustom.value++;
  }

  else {
    bCustom.value--;
  }
}

  //Function to display the comments of the current post version 2.0
var chargeComments = () => {
  //Var to store the comment
  let Comment;

  //Variable to know in which comment's id start
  let iFirstComment = 0;

  //Container variable for the header, body and footer of the comment
  let Container;

  //Finding the first one
  while(iId !== comments[iFirstComment].postId){
    iFirstComment++;
  }

  //Adding 1 to the value to store the real comment's id
  iFirstComment++;

  //Append each comment
  for(let i = iFirstComment - 1; comments[i].postId === iId; i++){
    Comment = "<div class=\"card\" id = \"comment-card\"><div class=\"card-header\" id = \"header\">";
    Comment += comments[i].name + "</div> <div class=\"card-body\">";
    Comment += "<blockquote class=\"blockquote mb-0\" id = \"body\"> <p>";
    Comment += comments[i].body + "</p> <footer class=\"blockquote-footer\" id = \"footer\">";
    Comment += comments[i].email + "</footer> </blockquote> </div> </div> </br>";

    //dComments.append(Comment);
    dComments.innerHTML += Comment;
  }
}

//Function to hide and show the comments
var hideOrShow = () => {

  //We need to be sure that it is empty before any action
  //And if it is already empty is better to do this than
  //Some comparations and more code
  $("#comments").empty();

  if(bCommentState){
    chargeComments();
    }

}
    
