// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash)
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]")
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault()
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target)
            $target.focus()
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false
            } else {
              $target.attr("tabindex", "-1") // Adding tabindex for elements not focusable
              $target.focus() // Set focus again
            }
          }
        )
      }
    }
  })

$.urlParam = function (name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.search
  )

  return results !== null
    ? decodeURIComponent(results[1]).split("+").join(" ") || 0
    : false
}

$(document).ready(function () {
  $("div.burger").on("click", function () {
    $(".hiddenList").slideToggle()
  })
  $(".hiddenList ul li a").on("click", function () {
    $(".hiddenList").slideToggle()
  })

  console.log("HEREE")
  $("#myModal").click(function () {
    $(this).css("display", "none")
  })

  let succesfulMessage = $.urlParam("message")
  let errorMessage = $.urlParam("errormessage")
  if (succesfulMessage || errorMessage) {
    let message = succesfulMessage ? succesfulMessage : errorMessage
    $("#customHeaderModal").css(
      "background-color",
      succesfulMessage ? "" : "red"
    )
    $("#modalText").text(message)
    $("#myModal").css("display", "block")
  }
})
