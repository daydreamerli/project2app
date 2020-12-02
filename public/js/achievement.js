$(document).ready(function() {
    // $("#flip").click(function() {
    //     $("#panel").slideToggle("slow");
    // });
    // $("#flip2").click(function() {
    //     $("#panel2").slideToggle("slow");
    // });
    // $("#flip3").click(function() {
    //     $("#panel3").slideToggle("slow");
    // });
    // $("#flip4").click(function() {
    //     $("#panel4").slideToggle("slow");
    // });
    // $("#flip5").click(function() {
    //     $("#panel5").slideToggle("slow");
    // });
    for (x = 1; x < 6; x++) {
        let DOM = "#flip" + x;
        let DOM1 = "#panel" + x;
        $(DOM).click(function() {
            $(DOM1).slideToggle("slow");

        });
    }
});