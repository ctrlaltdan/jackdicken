
function log(x){
	console.log(x);
}

// slideshow
ss = {
	position: 1,
	delay: 6000,
	t: 0,
	i: 0,
	slideHtml: [],
	slides: 0,
	AnimateSlider: function() {
		log("in AnimateSlider");
		$("#ActiveSlide").fadeOut(1000, function(){
		
			log("Fading out current slide");

			ss.position++;
			log("next position is: " + ss.position);

			if(ss.position > ss.slides){
				ss.position = 1;
				log("position > slides so set next slide to 1");
			}
			
			$("#ActiveSlide").html(ss.slideHtml[ss.position]);

			$("#ActiveSlide").fadeIn(1000);
			
		});
	},
	Move: function(dir) {
		log("IN move || dir = " + dir);
		clearInterval(ss.t);
		
		if(dir == -1){
			log("Go back");
			if((ss.position - 2) < 1)
				ss.position = (ss.slides - 1);
			else 
				ss.position = (ss.position - 2);
		}
		else
			log("Go forwards");
		
		ss.AnimateSlider();
		
		ss.t = setInterval(ss.AnimateSlider, ss.delay);
	},
	OnReady: function() {
	
		log("in ss OnReady");

		$("#slideshow").append('<div id="ActiveSlide"></div>');
		$("#slideshow").append('<span id="left"></span>');
		$("#slideshow").append('<span id="right"></span>');

		$("#slideshow").hover(
			function(){
				$("#left").fadeIn();
				$("#right").fadeIn();
			},
			function(){
				$("#left").fadeOut();
				$("#right").fadeOut();
			}
		);

		$("#left").click(function(){
			ss.Move(-1);	
		});
		
		$("#right").click(function(){
			ss.Move(1);
		});

		ss.slides = $("#slideshow .slide").length;

		log("ss.slides = " + ss.slides);

		// take the html from the dom and insert it into into an array
		for(i = 1;i <= ss.slides;i++){
			ss.slideHtml[i] = $("#slideshow .slide:nth-child("+i+")").html();
			log("content of "+i+" is: " + ss.slideHtml[i]);
		}
		
		$("#ActiveSlide").html(ss.slideHtml[1]);
		
		// start animation
		ss.t = setInterval(ss.AnimateSlider, ss.delay);
	}
}


var isClosed = true;

$(document).ready(function(){

	// set up menu hover effects
	
	$("#menu li.hasChildren").mouseenter(
		function(){
			log("mouseenter function");
			if(isClosed == true){
				var el = $(this).find("ul");
				el.slideDown('slow');
				isClosed = false;
			}
		}).mouseleave(
		function(){
			log("mouseleave function");
			if(isClosed == false){
				var el = $(this).find("ul");
				el.slideUp('slow', function(){
					isClosed = true;
				});
			}
		}
	);
	
	// initialise the slider if it exists
	
	if($("#slideshow")) ss.OnReady();

});