$(document).ready(function() {
  $("#greenModeToggle").on("click", function() {
    if ($("#greenModeToggle").prop("checked")) {
      $("#green-mode-stylesheet").attr("href", "/assets/css/style_green.css");
      $(".terra-mater-logo-wide").attr(
        "src",
        "/assets/images/tm-logo-wide-invert.png"
      );
      $(".terra-mater-logo").attr("src", "/assets/images/tm-logo-invert.png");
    } else {
      $("#green-mode-stylesheet").attr("href", "/assets/css/style_normal.css");
      $(".terra-mater-logo-wide").attr(
        "src",
        "/assets/images/tm-logo-wide.png"
      );
      $(".terra-mater-logo").attr("src", "/assets/images/tm-logo.png");
    }
  });
});
