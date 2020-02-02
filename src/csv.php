<!-- File will contain PHP function to save data from Javascript to a CSV file -->
<?php
$list = array (
  array("Peter", "Griffin" ,"Oslo", "Norway"),
  array("Glenn", "Quagmire", "Oslo", "Norway")
);

$file = fopen("calculations.csv","w");

foreach ($list as $line) {
  fputcsv($file, $line);
}

fclose($file);
?>
