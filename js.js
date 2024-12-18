$(function(){
  $(".ajaxForm").submit(function(e){
      e.preventDefault();
      var href = $(this).attr("action");
      $.ajax({
          type: "POST",
          dataType: "json",
          url: href,
          data: $(this).serialize(),
          success: function(response){
              if(response.status == "success"){
                  alert("Данные успешно отправлены");
                    $(".ajaxForm")[0].reset();
              }else{
                  alert("Произошла ошибка при отправке данных: " + response.message);
              }
          }
      });
  });
});

window.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById("form");
  const formFields = form.elements;

  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i].type !== "submit")
      formFields[i].addEventListener("change", saveFormData);
  }

  if (localStorage.length !== 0) {
    for (let i = 0; i < formFields.length; i++) {
      if (formFields[i].type !== "submit")
        formFields[i].value = localStorage.getItem(formFields[i].name);
    }
  }
  const btn = document.getElementById("btn");

  let isOpen = false;

  btn.onclick = function() {
    if (isOpen === false) {
      openForm();
      isOpen = true;
    }
    else {
      closeForm();
      isOpen = false;
    }
  }
});

window.addEventListener("popstate", function(event) {
  if (event.state && event.state.formOpen) {
    form.style.display = "block";
    history.pushState({formOpen: true}, "", "form=open");
  }
  else {
    form.style.display = "none";
    this.history.pushState({formOpen: false}, "", "index.html")
    // history.back();
  }
});

function openForm() {
  let form = document.getElementById("form");
  form.style.display = "block"; 
  history.pushState({formOpen: true}, "", "form=open");
}

function closeForm() {
  let form = document.getElementById("form");
  form.style.display = "none";
  this.history.pushState({formOpen: false}, "", "index.html")
  // history.back();
}

function saveFormData() {
  localStorage.setItem(this.name, this.value);
}

window.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementsByName("name")
});