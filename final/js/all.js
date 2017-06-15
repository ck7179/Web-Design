/*=====social_link_bg_change=====*/
function socail_g_over(){document.getElementById('socail_g').src ="images/social_google.png"}
function socail_g_out(){document.getElementById('socail_g').src ="images/social_google2.png"}
function socail_t_over(){document.getElementById('socail_t').src ="images/social_twitter.png"}
function socail_t_out(){document.getElementById('socail_t').src ="images/social_twitter2.png"}
function socail_f_over(){document.getElementById('socail_f').src ="images/social_facebook.png"}
function socail_f_out(){document.getElementById('socail_f').src ="images/social_facebook2.png"}
/*=====wrapper_js=====*/
$(document).ready(function(){
	var box = document.getElementById('box');
	var sidebar_ctrl = document.getElementById('sidebar_ctrl');
	var tab;
	var t_button = document.getElementById('t_button');

	//box click event handle
	box.style.cursor = 'pointer';
	box.onclick = function() {
		$(box).addClass("animated zoomIn");   
		$(main).addClass("hide");
		$(main).addClass("animated zoomIn ");
		writeGoogleMapsScript();
	};

	//sidebar_ctrl click event handle
	sidebar_ctrl.style.cursor = 'pointer';
	sidebar_ctrl.onclick = function() {		
		if($(sidebar).hasClass("slide_left")){
			$(sidebar_wrapper).width(320);
			$(sidebar).removeClass("slide_left");
			document.getElementById('sidebar_ctrl_img').src="images/left_arrow.png";
		}else{
			$(sidebar_wrapper).width(30);
			$(sidebar).addClass("slide_left");
			document.getElementById('sidebar_ctrl_img').src="images/right_arrow.png";
		}	
	};

	//tab click event handle

	//t_button click event handle
	t_button.onclick = function(){
		if($(t_button).attr("src") == "images/button_left.png"){
			$(t_button).attr("src","images/button_right.png");
		}else{
			$(t_button).attr("src","images/button_left.png");
		}
	}

	//動態 load google maps api
	function writeGoogleMapsScript(){
		document.oldWrite = document.write;
		document.write = function (text){
			console.log('new document write');
			var parser = new DOMParser();
			var element = parser.parseFromString(text, "text/xml");
			var child = element.firstChild;
			var element = document.createElement("script");
			element.src = child.getAttribute('src');
			element.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(element);
			document.write = document.oldWrite;
		};
		var element = document.createElement("script");
		element.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDTc9Wqj4Bi5DVvh2ngGiinVcsVUagG9fY&callback=initMap";
		element.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(element);
	}
});	

//google maps setting initial function
function initMap(){
	var center = {lat: 22.734225, lng: 120.283528};
	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: center
	});
	var xhr = new XMLHttpRequest();
	xhr.open('get','https://raw.githubusercontent.com/ck7179/Web-Design/master/final/resource/od.txt');
	xhr.send(null);
	xhr.onload = function(){
		var data = JSON.parse(xhr.responseText);
		data = data.result.records;
		var marker_loc = [];
		var markers = [];
		var infoWindows = [];
		for(var i=1;data.length>i;i++){	
			marker_loc[i-1] = {lat: parseFloat(data[i].Latitude), lng: parseFloat(data[i].Longitude)};
   			var marker = new google.maps.Marker({
				position: marker_loc[i-1],
				map: map,
				//label跟title兩個參數會相牴觸
				label: data[i].limit
			});
			markers.push(marker);
			var message = '<span class="marker_title">測速照相機</span><p class="marker_p">位置:'+data[i].Address+'</p><p class="marker_p">方向:'+data[i].direct+'</p>';
			addInfoWindow(marker,message);			
		}
		function addInfoWindow(marker, message) {
            var infoWindow = new google.maps.InfoWindow({
                content: message
            });
            infoWindows.push(infoWindow);
            google.maps.event.addListener(marker, 'click', function () {
            	hideAllInfoWindows(map);
            	infoWindow.open(map, marker);
            });
        }
        function hideAllInfoWindows(map) {
   			infoWindows.forEach(function(infoWindow) {
     		infoWindow.close();
  			});
  		} 
	}
	
}