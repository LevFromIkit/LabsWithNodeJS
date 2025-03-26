$(document).ready(function(){
    $( function() {
        $( "#accordion" ).accordion();
        $( "#slider" ).slider();
        $( "#datepicker" ).datepicker();
        $( "#tabs" ).tabs();
        $( "#progressbar" ).progressbar({
            value: 0
        });
    } );
    
    
    $('#upload_json').on('click', function(file){
        $.ajax({
            url: "gallery.json",
            dataType: "json",
            success: function(data) {
                file = data;
                progress();
            }
        });
    
        var load = function(){
            $('#slide_car').empty();
            $('#slide_car').prepend('<h1>' + file.gallery);
            $('#slide_car').append('</h1>');
            for (var i = 0; i < file.images.length ; i++) {
                    $('#slide_car').append('<img class="image" src="slide/' + file.images[i].file +'" />');
                }
            }
        
        progress = function(){
            var val = 0;
            $( '#slide_car ').empty();
            var interval = setInterval(function() {
                val = val + 1;
                $("#progressbar").progressbar({value: val});
                if (val > 100) {
                    clearInterval(interval);
                    load();
                    alert('Галерея загружена');
                }
            }, 5);
        }
        });
    });
        
    $(document).ready(function() {
        var thumbnails = $('.photo');
        var currentIndex = 0;
      
        thumbnails.click(function() {
          currentIndex = thumbnails.index(this);
          showFullImage();
        });
      
        $('.next-btn').click(function() {
          currentIndex = (currentIndex + 1) % thumbnails.length;
          showFullImage();
        });
      
        $('.prev-btn').click(function() {
          currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
          showFullImage();
        });
      
        $('.close-button').click(function() {
          $('#image-overlay').fadeOut();
        });
      
        $('#image-overlay').click(function(event) {
          if (event.target === this) {
            $(this).fadeOut();
          }
        });
      
        function showFullImage() {
          var fullImageSrc = thumbnails.eq(currentIndex).data('full-image');
          $('#full-image').attr('src', fullImageSrc);
          $('#image-overlay').fadeIn();
        }
      });
      
    
    $(function() {
        var slide_max = 6;
        $( "#slider" ).slider({
          range: true,
          min: 1,
          max: slide_max,
          slide: function(event, ui) {
            if(ui.value > 0){
              $('#slide_img').attr('src', 'slide/' + ui.value + '.jpg');
            }
          }
        });
      });
    
    //Меню аккордеон и смена классов toggleClass
    var accordion = function() {
        var data = $(".accordion").attr("data-accordion");
        $(".accordion-header").on("click", function() {
            if (data === "close") {
                $(".accordion-body").slideUp();
                if ($(this).hasClass("active")) {
                    $(this).toggleClass("active");
                }
                else {
                    $(".accordion-header").removeClass("active");
                    $(this).toggleClass("active");
                }
            }
            else {
                $(this).toggleClass("active");
            }
            $(this).next(".accordion-body").not(":animated").slideToggle();
        });
    }
    
    accordion();

    $( "#buttonShake" ).click(function() {
      $( "#image-collection" ).toggle( "shake" );
    });
    
    $(document).ready(function() {
        $(".ui-progressbar-value").css({ 'background': 'green' });
    });


    $( function() {
        $( "#but_ton" ).on( "click", function() {
          $( "#toggle" ).toggleClass( "container_copy", 1000 );
        });
    } );

    $( function() {
        $( "#but_ton2" ).on( "click", function() {
     
          var options = { to: { width: 200, height: 60 } };

          $( "#toggle" ).effect( "size", options, 500);
        });
     
      } );
