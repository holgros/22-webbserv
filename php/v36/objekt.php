<?php
class Vegetable {

   var $edible;
   var $color;

   function __construct($edible, $color="green")
   {
       $this->edible = $edible;
       $this->color = $color;
   }

   function is_edible()
   {
       return $this->edible;
   }

   function what_color()
   {
       return $this->color;
   }

} // end of class Vegetable

$veggie = new Vegetable(true);
echo "Ätbar? ";
echo $veggie->is_edible();
echo "<br>";
echo "Färg? ";
echo $veggie->what_color();
?>