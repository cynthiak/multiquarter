<html>
<head>

  <title>Prototype: Multiquarter Estimating | Estimize</title>

  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

  <!-- jQuery UI -->
  <link href="jquery-ui/jquery-ui.css" rel="stylesheet">
  <script src="jquery-ui/jquery-ui.js"></script>

  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

  <!-- Stylesheet -->
  <link rel="stylesheet" type="text/css" href="style.css">

  <!-- Javascript -->
  <script src="multiquarter.js"></script>

  <!-- URL Parameters -->
  <?php 
    $estimate = $_GET['estimate'];
  ?>

</head>
<body>

<div id="header">
</div>

<div id="quarternav">
  <div class="container quarternav-container">
  </div>
</div>

<div id="content">
  <?php 
    if ($estimate == "single" || $estimate == "") {
      include('_single.php');
    } elseif ($estimate == "multiple") {
      include('_multiple.php');
    } 
  ?>

</div><!--/#content-->


<div id="footer">
</div>

</body>
</html>
