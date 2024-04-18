//THIS IS NOT MY CODE!!! rgb to hex converter by "Code_r" for use in API requests

// Javascript code to convert the given RGB
 // color code to Hex color code
  
 // function to convert decimal to hexadecimal
 function decToHexa(n)
 {
     // char array to store hexadecimal number
     let hexaDeciNum = Array.from({length: 2}, (_, i) => 0);
     
     // counter for hexadecimal number array
     let i = 0;
     while (n != 0) {
     
         // temporary variable to store remainder
         let temp = 0;
     
         // storing remainder in temp variable.
         temp = n % 16;
     
         // check if temp < 10
         if (temp < 10) {
             hexaDeciNum[i] = String.fromCharCode(temp + 48);
             i++;
         }
         else {
             hexaDeciNum[i] =  String.fromCharCode(temp + 55);
             i++;
         }
     
         n = Math.floor(n / 16);
     }
     
     let hexCode = "";
     if (i == 2) {
         hexCode+=hexaDeciNum[0];
         hexCode+=hexaDeciNum[1];
     }
     else if (i == 1) {
         hexCode = "0";
         hexCode+=hexaDeciNum[0];
     }
     else if (i == 0)
         hexCode = "00";
     
     // Return the equivalent
     // hexadecimal color code
     return hexCode;
 }
     
 // Function to convert the
 // RGB code to Hex color code
 function convertRGBtoHex(R, G, B)
 {
     if ((R >= 0 && R <= 255)
         && (G >= 0 && G <= 255)
         && (B >= 0 && B <= 255)) {
     
         let hexCode = "#";
         hexCode += decToHexa(R);
         hexCode += decToHexa(G);
         hexCode += decToHexa(B);
     
         return hexCode;
     }
     
     // The hex color code doesn't exist
     else
         return "-1";
 }