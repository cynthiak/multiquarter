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

  // go into editing mode
  if ($(".multiple-table").hasClass(".multiple-table-submitted")) {
    activateEditingMode();
  }
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
    $(".multiple-table-rev .multiple-table-td-open-two").removeClass("multiple-table-td-plus");
    if ($(".multiple-table").hasClass("multiple-table-submitted")) {
      $(".multiple-table-rev .multiple-table-td-open").removeClass("multiple-table-td-editing");
      $(".multiple-table-rev .multiple-table-td-open-two").addClass("multiple-table-td-editing");
    }
    $(".multiple-table-td-open-two .multiple-table-qtr-close").show();
  } else if ($(this).parent().hasClass("multiple-table-td-open-three")) {
    $(".multiple-table-rev .multiple-table-td-open-three .multiple-table-estimate-plus").hide();
    $(".multiple-table-rev .multiple-table-td-open-three .multiple-table-estimate-input").show();
    $(".multiple-table-rev .multiple-table-td-open-three").removeClass("multiple-table-td-plus");
    if ($(".multiple-table").hasClass("multiple-table-submitted")) {
      $(".multiple-table-rev .multiple-table-td-open").removeClass("multiple-table-td-editing");
      $(".multiple-table-rev .multiple-table-td-open-three").addClass("multiple-table-td-editing");
    }
    $(".multiple-table-td-open-three .multiple-table-qtr-close").show();
  } else if ($(this).parent().hasClass("multiple-table-td-open-four")) {
    $(".multiple-table-rev .multiple-table-td-open-four .multiple-table-estimate-plus").hide();
    $(".multiple-table-rev .multiple-table-td-open-four .multiple-table-estimate-input").show();
    $(".multiple-table-rev .multiple-table-td-open-four").removeClass("multiple-table-td-plus");
    if ($(".multiple-table").hasClass("multiple-table-submitted")) {
      $(".multiple-table-rev .multiple-table-td-open").removeClass("multiple-table-td-editing");
      $(".multiple-table-rev .multiple-table-td-open-four").addClass("multiple-table-td-editing");
    }
    $(".multiple-table-td-open-four .multiple-table-qtr-close").show();
  }

  // revert to editing mode
  $(".multiple-table").removeClass("multiple-table-submitted");
  disableRevenueButton();

});

add_from_revenue = false;
// Click into any of the revenue plus signs
$(".multiple-table-rev .multiple-table-estimate-plus").click(function(){
  add_from_revenue = true;
  activateEditingMode();
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
  $(this).parents(".multiple-table-td-open").addClass("multiple-table-td-edited");
});

// Delete a quarter's estimate
$(".multiple-table-qtr-close").click(function(){
  if ($(this).parent().hasClass("multiple-table-td-open-two")) {
    $(".multiple-table-td-open-two .multiple-table-estimate-plus").show();
    $(".multiple-table-td-open-two .multiple-table-estimate-input").hide();
    $(".multiple-table-td-open-two").addClass("multiple-table-td-plus").removeClass("multiple-table-td-editing").removeClass("multiple-table-td-edited");
    $(".multiple-table-td-open-two .multiple-table-qtr-close").hide();
  } else if ($(this).parent().hasClass("multiple-table-td-open-three")) {
    $(".multiple-table-td-open-three .multiple-table-estimate-plus").show();
    $(".multiple-table-td-open-three .multiple-table-estimate-input").hide();
    $(".multiple-table-td-open-three").addClass("multiple-table-td-plus").removeClass("multiple-table-td-editing").removeClass("multiple-table-td-edited");
    $(".multiple-table-td-open-three .multiple-table-qtr-close").hide();
  } else if ($(this).parent().hasClass("multiple-table-td-open-four")) {
    $(".multiple-table-td-open-four .multiple-table-estimate-plus").show();
    $(".multiple-table-td-open-four .multiple-table-estimate-input").hide();
    $(".multiple-table-td-open-four").addClass("multiple-table-td-plus").removeClass("multiple-table-td-editing").removeClass("multiple-table-td-edited");
    $(".multiple-table-td-open-four .multiple-table-qtr-close").hide();
  }
  $(".multiple-table-td-open").removeClass("multiple-table-td-editing");
  $(".multiple-table-td-open-one").addClass("multiple-table-td-editing");
  estimate_count = estimate_count - 1;
  updateButton();
  enableRevenueButton();
});


// Click button
$(".multiple-table-button-rev").click(function(){
  if ($(this).hasClass("multiple-table-button-rev-create")) {
    // button goes into "saving" mode
    $(this).removeClass("multiple-table-button-rev-create").addClass("multiple-table-button-saving").html("<i class='fa fa-spinner' aria-hidden='true'></i> &nbsp;Saving...");

    // turn off tooltips
    $(".multiple-tooltips").fadeOut();

    setTimeout(function(){

      // button goes into saved mode
      $(".multiple-table-button-rev").fadeTo("slow", 0.0, function(){
        $(this).delay(500).removeClass("multiple-table-button-saving").addClass("multiple-table-button-saved").html("<i class='fa fa-check-circle' aria-hidden='true'></i> &nbsp;Estimates Created").fadeTo("slow", 1.0);
      });

      // go into submitted mode
      $(".multiple-table").addClass("multiple-table-submitted");
      $(".multiple-table-td-edited").addClass("multiple-table-td-submitted");
      $(".multiple-table-td-edited").removeClass("multiple-table-td-editing");
      $(".multiple-table-td-edited").removeClass("multiple-table-td-edited");
      $(".multiple-table-qtr-close").fadeOut();
      $(".multiple-table-td-submitted .multiple-table-estimate-input").fadeOut(function(){
        $(".multiple-table-td-submitted .multiple-table-estimate-saved").fadeIn(function(){
          // fade out locks, fade in consensus
          setTimeout(function(){showConsensus();}, 1200);
        });
      });
      $(".multiple-banner").slideUp();
      setTimeout(function(){
        // Change EPS and rev buttons to "Edit Estimates"
        $(".multiple-table-button-rev").fadeTo(1000, 0.0, function(){
          $(this).delay(100).removeClass("multiple-table-button-green").removeClass("multiple-table-button-saved").addClass("multiple-table-button-edit").html("<i class='fa fa-edit' aria-hidden='true'></i> &nbsp;Edit Estimates").fadeTo("slow", 1.0);
        });
        $(".multiple-table-button-eps").fadeTo(1000, 0.0, function(){
          $(this).delay(100).addClass("multiple-table-button-edit").html("<i class='fa fa-edit' aria-hidden='true'></i> &nbsp;Edit Estimates").fadeTo("slow", 1.0);
        });

      }, 5000);

    }, 2000);
  // 
  } else if ($(this).hasClass("multiple-table-button-edit")) {
    activateEditingMode();
  }
});

function activateEditingMode() {
  $(".multiple-table").removeClass("multiple-table-submitted");
  $(".multiple-table-td-open-one").addClass("multiple-table-td-editing");
  $(".multiple-table-td-submitted .multiple-table-estimate-saved").fadeOut(function() {
    $(".multiple-table-td-submitted .multiple-table-estimate-input").fadeIn(function(){
      $(".multiple-table-td-open-one .multiple-table-estimate-input input").focus();
      $(".multiple-table-td-submitted").removeClass("multiple-table-td-submitted");
    });
  });
  $(".multiple-table-button-rev").removeClass("multiple-table-button-edit").html("<i class='fa fa-floppy-o' aria-hidden='true'></i> &nbsp;Save Estimates");
  $(".multiple-table-button-eps").removeClass("multiple-table-button-edit").html("Next: Revenue");
  $(".multiple-table-estimate-input-number").removeClass("multiple-table-estimate-input-number-edited");
}



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
      $(".multiple-tooltips-rev-two").delay(1000).fadeIn();
    });
    rev_tooltip = 2;
  } else if (rev_tooltip == 2) {
    $(".multiple-tooltips-rev-two").fadeOut(function(){
      $(".multiple-tooltips-rev-three").delay(1000).fadeIn();
    });
    rev_tooltip = 3;
  } else if (rev_tooltip == 3) {
    $(".multiple-tooltips-rev-three").fadeOut(function(){
      $(".multiple-tooltips-rev-four").delay(1000).fadeIn();
    });
    rev_tooltip = 4;
  } else if (rev_tooltip == 4) {
    $(".multiple-tooltips-rev-four").fadeOut(function(){
      if (add_from_revenue == true) {
        $(".multiple-tooltips-rev-finish-eps").delay(1500).fadeIn();
      }
    });
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
    $(".multiple-table-button-rev").delay(600).addClass("multiple-table-button-green").addClass("multiple-table-button-rev-create");
    if (rev_tooltip == 4) {
      $(".multiple-tooltips-rev-button").fadeIn();
    }
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
  $(".multiple-table-td-open-one .multiple-table-estimate-input input").focus();
}

// Toggle to EPS view
function toggleEPS() {
  $(".multiple-table-rev").hide();
  $(".multiple-tooltips-rev").hide();
  $(".multiple-table-eps").show();
  $(".multiple-tooltips-eps").show();
  $(".multiple-table-td-open-one .multiple-table-estimate-input input").focus();
}




// Fade in consensus
function showConsensus() {
  if ($(".multiple-table-td-open-one").hasClass("multiple-table-td-submitted")) {
    $(".multiple-table-td-open-one .multiple-table-estimize-lock").fadeOut(function(){
      $(".multiple-table-td-open-one .multiple-table-estimize-data").fadeIn();
    });
  }
  if ($(".multiple-table-td-open-two").hasClass("multiple-table-td-submitted")) {
    $(".multiple-table-td-open-two .multiple-table-estimize-lock").fadeOut(function(){
      $(".multiple-table-td-open-two .multiple-table-estimize-data").fadeIn();
    });
  }
  if ($(".multiple-table-td-open-three").hasClass("multiple-table-td-submitted")) {
    $(".multiple-table-td-open-three .multiple-table-estimize-lock").fadeOut(function(){
      $(".multiple-table-td-open-three .multiple-table-estimize-data").fadeIn();
    });
  }
  if ($(".multiple-table-td-open-four").hasClass("multiple-table-td-submitted")) {
    $(".multiple-table-td-open-four .multiple-table-estimize-lock").fadeOut(function(){
      $(".multiple-table-td-open-four .multiple-table-estimize-data").fadeIn();
    });
  }


}

});