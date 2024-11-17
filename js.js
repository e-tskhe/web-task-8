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

window.addEventListener('DOMContentLoaded', function(event) {
  const form = document.getElementById("form");
  const formFields = form.elements;

  for (let i = 0; i < formFields.length; i++) {
    formFields[i].addEventListener("change", saveFormData);
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

window.onpopstate = function(event) {
  if (event.state && event.state.formOpen) {
    closeForm();
  }
}

function openForm() {
  let form = document.getElementById("form");
  form.style.display = "block"; 
  history.pushState({formOpen: true}, "", "form=open");
}

function closeForm() {
  let form = document.getElementById("form");
  form.style.display = "none";
  history.back();
}

function saveFormData() {
  localStorage.setItem(this.name, this.value);
}

function loadFormData() {
  for (let i = 0; i < formFields.length; i++) {
    formFields[i].value = localStorage.getItem(formFields[i].name);
  }
}

window.onload(loadFormData);