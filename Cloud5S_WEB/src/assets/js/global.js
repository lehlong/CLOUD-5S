// =====Alert Messege=====
function Message(response) {
  $("#alert-message").empty();
  if (response.Message.MessageType.replaceAll(" ", "") == "E") {
    $("#alert-message").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <h4 class="alert-heading"><i class="bi bi-exclamation-octagon me-1"></i> ${response.Message?.Code} - ${response.Message?.Message}</h4>
  <p>${response.Message?.MessageDetail}</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`).fadeIn();
  } else if (response.Message.MessageType.replaceAll(" ", "") == "W") {
    $("#alert-message").append(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <h4 class="alert-heading"><i class="bi bi-exclamation-triangle me-1"></i> ${response.Message?.Code} - ${response.Message?.Message}</h4>
  <p>${response.Message?.MessageDetail}</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`).fadeIn();
  } else if (response.Message.MessageType.replaceAll(" ", "") == "S") {
    $("#alert-message").append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
  <h4 class="alert-heading"><i class="bi bi-check-circle me-1"></i> ${response.Message?.Code} - ${response.Message?.Message}</h4>
  <p>${response.Message?.MessageDetail}</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`).fadeIn().delay(2000).fadeOut();
  }
}

function MessageDanger(response){
  $("#alert-message").empty();
    $("#alert-message").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <h4 class="alert-heading"><i class="bi bi-exclamation-octagon me-1"></i> Oppsss!</h4>
  <p>Bạn không có quyền vào chức năng này!<br> ${response.message}</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`).fadeIn();
}

function MessageErrorSystem(response){
  $("#alert-message").empty();
    $("#alert-message").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <h4 class="alert-heading"><i class="bi bi-exclamation-octagon me-1"></i> Oppsss! Lỗi hệ thống!</h4>
  <p> ${response.message}</p>
  <p> Mã lỗi: ${response.status}</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`).fadeIn();
}


function ShowLoading() {
  $("#overlay.div-loading").fadeIn();
}

function HideLoading() {
  $("#overlay.div-loading").fadeOut();
}

//======Toggle Sidebar=======
$(function () {
  $(".sidebar-nav .nav-content a").click(function () {
    $click = $(".sidebar-nav .nav-content a");
    $click.removeClass("highlight");
    $(this).addClass("highlight");
    // $("body").addClass("toggle-sidebar");
  })
});