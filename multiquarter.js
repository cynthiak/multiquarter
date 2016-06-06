$(document).ready(function(){

$(".multiple-tooltips-eps").delay(2000).fadeIn();


// Toggle to revenue
$(".multiple-table-tabs-tab-revenue").click(function(){
  toggleRevenue();
});
$(".multiple-table-button-eps").click(function(){
  toggleRevenue();
});

// Toggle to EPS
$(".multiple-table-tabs-tab-eps").click(function(){
  toggleEPS();
});



// Click into any of the EPS plus signs
var estimate_count = 1
$(".multiple-table-eps .multiple-table-estimate-plus").click(function(){
  enableEPSButton();
  fadeNextEPSTooltip();
  $(this).fadeTo(0).hide();
  $(".multiple-table-eps .multiple-table-td-editing").removeClass("multiple-table-td-editing")
  $(this).parent(".multiple-table-td-plus").removeClass("multiple-table-td-plus").addClass("multiple-table-td-editing");
  $(this).siblings(".multiple-table-estimate-input").fadeIn();
  // update button count
  if (estimate_count < 4) {
    estimate_count++;
    updateButton();
  }
  // activate the revenue equivalents as well
  if ($(this).parent().hasClass("multiple-table-td-open-two")) {
    $(".multiple-table-rev .multiple-table-td-open-two .multiple-table-estimate-plus").hide();
    $(".multiple-table-rev .multiple-table-td-open-two .multiple-table-estimate-input").show();
    $(".multiple-table-rev .multiple-table-td-open-two").removeClass("multiple-table-td-plus")
    $(".multiple-table-td-open-two .multiple-table-qtr-close").show();
  } else if ($(this).parent().hasClass("multiple-table-td-open-three")) {
    $(".multiple-table-rev .multiple-table-td-open-three .multiple-table-estimate-plus").hide();
    $(".multiple-table-rev .multiple-table-td-open-three .multiple-table-estimate-input").show();
    $(".multiple-table-rev .multiple-table-td-open-three").removeClass("multiple-table-td-plus")
    $(".multiple-table-td-open-three .multiple-table-qtr-close").show();
  } else if ($(this).parent().hasClass("multiple-table-td-open-four")) {
    $(".multiple-table-rev .multiple-table-td-open-four .multiple-table-estimate-plus").hide();
    $(".multiple-table-rev .multiple-table-td-open-four .multiple-table-estimate-input").show();
    $(".multiple-table-rev .multiple-table-td-open-four").removeClass("multiple-table-td-plus")
    $(".multiple-table-td-open-four .multiple-table-qtr-close").show();
  }
});

// Click into any of the revenue plus signs
$(".multiple-table-rev .multiple-table-estimate-plus").click(function(){
  disableRevenueButton();
  fadeNextRevenueTooltip();
  $(this).fadeTo(0).hide();
  $(".multiple-table-rev .multiple-table-td-editing").removeClass("multiple-table-td-editing")  
  $(this).parent(".multiple-table-td-plus").removeClass("multiple-table-td-plus").addClass("multiple-table-td-editing");
  $(this).siblings(".multiple-table-estimate-input").fadeIn();
  // update button count
  if (estimate_count < 5) {
    estimate_count++;
    updateButton();
  }
  // activate the eps equivalents as well
  enableEPSButton();
  if ($(this).parent().hasClass("multiple-table-td-open-two")) {
    $(".multiple-table-eps .multiple-table-td-open-two .multiple-table-estimate-plus").hide();
    $(".multiple-table-eps .multiple-table-td-open-two .multiple-table-estimate-input").show();
    $(".multiple-table-td-open-two .multiple-table-qtr-close").show();
  } else if ($(this).parent().hasClass("multiple-table-td-open-three")) {
    $(".multiple-table-eps .multiple-table-td-open-three .multiple-table-estimate-plus").hide();
    $(".multiple-table-eps .multiple-table-td-open-three .multiple-table-estimate-input").show();
    $(".multiple-table-td-open-three .multiple-table-qtr-close").show();
  } else if ($(this).parent().hasClass("multiple-table-td-open-four")) {
    $(".multiple-table-eps .multiple-table-td-open-four .multiple-table-estimate-plus").hide();
    $(".multiple-table-eps .multiple-table-td-open-four .multiple-table-estimate-input").show();
    $(".multiple-table-td-open-four .multiple-table-qtr-close").show();
  }
});



// Click into the first EPS input box
$(".multiple-table-eps .multiple-table-td-open-one .multiple-table-estimate-input-number").focus(function(){
  enableEPSButton();
  fadeNextEPSTooltip();
  $(this).css({"color": "#555555", "fontStyle": "normal"});
});



// Click into an EPS input box
$(".multiple-table-eps .multiple-table-estimate-input-number").focus(function(){
  $(".multiple-table-eps .multiple-table-td-editing").removeClass("multiple-table-td-editing");
  $(this).parents(".multiple-table-td-open").addClass("multiple-table-td-editing");
  $(this).css({"color": "#555555", "fontStyle": "normal"});
});

// Click into a revenue input box
$(".multiple-table-rev .multiple-table-estimate-input-number").focus(function(){
  fadeNextRevenueTooltip();
  $(".multiple-table-rev .multiple-table-td-editing").removeClass("multiple-table-td-editing");
  $(this).parents(".multiple-table-td-open").addClass("multiple-table-td-editing");
  $(this).css({"color": "#555555", "fontStyle": "normal"});
});



// Update revenue field, check if revenue button should be enabled
$(".multiple-table-rev .multiple-table-estimate-input-number").change(function(){
  enableRevenueButton();
});

// Adjust estimates, update YoY growth
$(".multiple-table-estimate-input-number").on('input', function(){ 
  var yoy = $(this).parents(".multiple-table-td-open").find(".multiple-table-estimate-yoy-number");
  var yoy_number = parseInt(yoy.html());
  yoy_number = yoy_number + 3;
  yoy.html(yoy_number);
  $(this).addClass("multiple-table-estimate-input-number-edited");
});

// Delete a quarter's estimate
$(".multiple-table-qtr-close").click(function(){
  if ($(this).parent().hasClass("multiple-table-td-open-two")) {
    $(".multiple-table-td-open-two .multiple-table-estimate-plus").show();
    $(".multiple-table-td-open-two .multiple-table-estimate-input").hide();
    $(".multiple-table-td-open-two").addClass("multiple-table-td-plus").removeClass("multiple-table-td-editing");
    $(".multiple-table-td-open-two .multiple-table-qtr-close").hide();
  } else if ($(this).parent().hasClass("multiple-table-td-open-three")) {
    $(".multiple-table-td-open-three .multiple-table-estimate-plus").show();
    $(".multiple-table-td-open-three .multiple-table-estimate-input").hide();
    $(".multiple-table-td-open-three").addClass("multiple-table-td-plus").removeClass("multiple-table-td-editing");
    $(".multiple-table-td-open-three .multiple-table-qtr-close").hide();
  } else if ($(this).parent().hasClass("multiple-table-td-open-four")) {
    $(".multiple-table-td-open-four .multiple-table-estimate-plus").show();
    $(".multiple-table-td-open-four .multiple-table-estimate-input").hide();
    $(".multiple-table-td-open-four").addClass("multiple-table-td-plus").removeClass("multiple-table-td-editing");
    $(".multiple-table-td-open-four .multiple-table-qtr-close").hide();
  }
  $(".multiple-table-td-open").removeClass("multiple-table-td-editing");
  $(".multiple-table-td-open-one").addClass("multiple-table-td-editing");
  estimate_count = estimate_count - 1;
  updateButton();
  enableRevenueButton();
});






// ------------------------------------------- FUNCTIONS

// Fade in next EPS tooltip
var eps_tooltip = 1;
function fadeNextEPSTooltip() {
  if (eps_tooltip == 1) {
    $(".multiple-tooltips-eps-one").fadeOut(function(){
      $(".multiple-tooltips-eps-two").delay(500).fadeIn();
    });
    eps_tooltip = 2;
  } else if (eps_tooltip == 2) {
    if ( $(".multiple-table-td-open-two .multiple-table-estimate-plus").css('display') != 'none' ) {
      $(".multiple-tooltips-eps-two").fadeOut(function(){
        $(".multiple-tooltips-eps-three").delay(500).fadeIn();
      });
      eps_tooltip = 3;
    }
  } else if (eps_tooltip == 3) {
    if ( $(".multiple-table-td-open-three .multiple-table-estimate-plus").css('display') != 'none' ) {
      $(".multiple-tooltips-eps-three").fadeOut(function(){
        $(".multiple-tooltips-eps-four").delay(500).fadeIn();
      });
      eps_tooltip = 4;
    }
  } else if (eps_tooltip == 4) {
    if ( $(".multiple-table-td-open-four .multiple-table-estimate-plus").css('display') != 'none' ) {
      $(".multiple-tooltips-eps-four").fadeOut(function(){
        $(".multiple-tooltips-eps-button").delay(500).fadeIn();
      });
      eps_tooltip = 5;
    }
  }

}

// Fade in next revenue tooltip
var rev_tooltip = 1;
function fadeNextRevenueTooltip() {
  if (rev_tooltip == 1) {
    $(".multiple-tooltips-rev-one").fadeOut(function(){
      $(".multiple-tooltips-rev-two").delay(500).fadeIn();
    });
    rev_tooltip = 2;
  } else if (rev_tooltip == 2) {
    $(".multiple-tooltips-rev-two").fadeOut(function(){
      $(".multiple-tooltips-rev-three").delay(500).fadeIn();
    });
    rev_tooltip = 3;
  } else if (rev_tooltip == 3) {
    $(".multiple-tooltips-rev-three").fadeOut(function(){
      $(".multiple-tooltips-rev-four").delay(500).fadeIn();
    });
    rev_tooltip = 4;
  } else if (rev_tooltip == 4) {
    $(".multiple-tooltips-rev-four").fadeOut(function(){
      $(".multiple-tooltips-rev-button").delay(500).fadeIn();
    });
    rev_tooltip = 5;
  }
}

// Enable EPS button
function enableEPSButton() {
  $(".multiple-table-button-eps").prop("disabled", false);
  $(".multiple-table-button-eps").delay(100).fadeTo("fast", 1.0);
}

// Enable rev button
function enableRevenueButton() {
  rev_one = true;
  rev_two = true;
  rev_three = true;
  rev_four = true;

  // if all active revenue numbers are all different from defaults
  if (!$(".multiple-table-rev .multiple-table-td-open-one").hasClass("multiple-table-td-plus") && $(".multiple-table-rev .multiple-table-td-open-one .multiple-table-estimate-input-number").val() == "2300") {
    rev_one = false;
  }
  if (!$(".multiple-table-rev .multiple-table-td-open-two").hasClass("multiple-table-td-plus") && $(".multiple-table-rev .multiple-table-td-open-two .multiple-table-estimate-input-number").val() == "2330") {
    rev_two = false;
  }
  if (!$(".multiple-table-rev .multiple-table-td-open-three").hasClass("multiple-table-td-plus") && $(".multiple-table-rev .multiple-table-td-open-three .multiple-table-estimate-input-number").val() == "2321") {
    rev_three = false;
  }
  if (!$(".multiple-table-rev .multiple-table-td-open-four").hasClass("multiple-table-td-plus") && $(".multiple-table-rev .multiple-table-td-open-four .multiple-table-estimate-input-number").val() == "2400") {
    rev_three = false;
  }

  if (rev_one && rev_two && rev_three && rev_four) {
    $(".multiple-table-button-rev").prop("disabled", false);
    $(".multiple-table-button-rev").fadeTo(100, 1.0);
    $(".multiple-table-button-rev").delay(600).addClass("multiple-table-button-green");
  }
}

// Disable rev button 
function disableRevenueButton() {
  $(".multiple-table-button-rev").prop("disabled", true);
  $(".multiple-table-button-rev").fadeTo(100, 0.3);
  $(".multiple-table-button-rev").delay(600).removeClass("multiple-table-button-green");
}

// Update revenue button
function updateButton() {
  if (estimate_count > 1) {
    $(".multiple-table-button-rev").html("Create " + estimate_count + " Estimates &raquo;");
  } else {
    $(".multiple-table-button-rev").html("Create " + estimate_count + " Estimate &raquo;");
  }

}

// Toggle to revenue view
function toggleRevenue() {
  $(".multiple-table-eps").hide();
  $(".multiple-tooltips-eps").hide();
  $(".multiple-table-rev").show();
  $(".multiple-tooltips-rev").delay(500).fadeIn();
}

// Toggle to EPS view
function toggleEPS() {
  $(".multiple-table-rev").hide();
  $(".multiple-tooltips-rev").hide();
  $(".multiple-table-eps").show();
  $(".multiple-tooltips-eps").show();
}







});